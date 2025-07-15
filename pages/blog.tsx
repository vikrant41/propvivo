import React, { useEffect, useState } from "react";
import { ArrowBlueIcon, SearchIcon } from "../components/shared/Icons";
import { useRouter } from "next/router";
import { GET_ALL_BLOGS } from "../graphql/queries/GetAllBlogsQueries";
import { useQuery } from "@apollo/client";
import apiClient from "../apollo/apiClient";
import { convertUTCToLocalDate } from "../Utils/Utils";
import CenteredLoader from "../components/CommonComponents/CenterLoader";
import { debounce } from "../components/Util/intex";

const Blog = () => {
  // all state management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Debounced search handler
  const debouncedHandleSearch = debounce((text: string) => {
    setDebouncedSearchTerm(text);
  }, 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // -----------GET ALL BLOGS -------------------
  const {
    data: getAllBlogsData,
    loading: getAllBlogsDataLoading,
    refetch,
  } = useQuery(GET_ALL_BLOGS, {
    variables: {
      request: {
        pageCriteria: { enablePage: false, pageSize: 0, skip: 0 },
        requestParam: {
          isCorporate: true,
          filterByKeyword: debouncedSearchTerm,
          blogCategory: selectedCategory || null,
          keyword: selectedTags.join(",") || null,
        },
        requestSubType: "List",
        requestType: "GlobalSearch",
      },
    },
    client: apiClient,
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
  });

  // Loading state handling
  if (getAllBlogsDataLoading) {
    return <CenteredLoader />;
  }

  // Check if we have data
  const blogs = getAllBlogsData?.blogQueries?.getAllBlog?.data?.blogs || [];
  const categories =
    getAllBlogsData?.blogQueries?.getAllBlog?.data?.categories || [];
  const keywords =
    getAllBlogsData?.blogQueries?.getAllBlog?.data?.keywords || [];

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    refetch();
  };

  // Handle tag (keyword) selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
    refetch();
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedHandleSearch(value);
  };

  return (
    <section className="py-9 md:py-16 relative">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start gap-9">
          <div
            className="flex flex-col p-7 bg-pvLightBlue rounded-2xl"
            style={{
              width: isMobile ? "100%" : "360px",
            }}
          >
            <div className="mb-10">
              <h5 className="font-medium">Search</h5>
              <div className="flex relative">
                <input
                  type="text"
                  className="px-4 py-3 pr-10 rounded-md flex-1 placeholder:text-accent2 text-pvBlack focus-visible:ring-1 focus-visible:outline-none"
                  placeholder="Enter Keyword"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-4" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-10">
              <h5 className="font-medium">Categories</h5>
              <ul className="divide-y">
                {categories.map((cat) => (
                  <li
                    key={cat.blogCategory}
                    className={`cursor-pointer py-4 hover:text-accent1 transition-all duration-200 text-pvBlack ${
                      selectedCategory === cat.blogCategory ? "font-bold" : ""
                    }`}
                    onClick={() => handleCategorySelect(cat.blogCategory)}
                  >
                    {cat.displayBlogCategory} ({cat.blogCount})
                  </li>
                ))}
              </ul>
            </div>

            {/* Tag Filter (Keywords) */}
            <div className="mb-10">
              <h5 className="font-medium">Tags</h5>
              <ul>
                {keywords.map((keyword) => (
                  <li
                    key={keyword.keyword}
                    className={`cursor-pointer font-normal px-3 py-1 inline-block transition-all duration-300 bg-accent1 hover:bg-accent text-white rounded-md mr-2 mb-2 ${
                      selectedTags.includes(keyword.keyword)
                        ? "bg-accent"
                        : "bg-accent1"
                    }`}
                    onClick={() => handleTagSelect(keyword.keyword)}
                  >
                    {keyword.keyword} ({keyword.blogCount})
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-x-9 gap-y-10 md:gap-y-15">
              {blogs.length > 0 ? (
                blogs.map((post) => (
                  <div key={post.blogId}>
                    <div className="relative">
                      {post.document?.uri ? (
                        <img
                          src={post.document?.uri}
                          alt={post.title || "Blog Image"}
                          className="rounded-3xl object-cover w-full"
                        />
                      ) : (
                        <img
                          src="https://placehold.jp/30/cccccc/ffffff/360x260.png?text=No+image+Found"
                          className="rounded-3xl object-cover w-full"
                        />
                      )}
                      <p className="text-pvBlack bg-white rounded-md px-2 py-1 absolute top-3 left-3">
                        {convertUTCToLocalDate(post?.userContext?.createdOn)}
                      </p>
                    </div>
                    <div className="my-5">
                      <h5
                        onClick={() =>
                          router.push({
                            pathname: `/blog/${post.blogId}`,
                          })
                        }
                        className="mb-3 font-medium cursor-pointer hover:text-accent1 transition-all duration-500"
                      >
                        {post.title}
                      </h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            post.description?.length > 50
                              ? `${post.description.substring(0, 50)} ...`
                              : post.description,
                        }}
                      ></div>
                    </div>

                    <div
                      onClick={() =>
                        router.push({
                          pathname: `/blog/${post.blogId}`,
                        })
                      }
                      className="group flex items-center gap-2 uppercase underline text-accent1 cursor-pointer"
                    >
                      Read More
                      <ArrowBlueIcon className="group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
