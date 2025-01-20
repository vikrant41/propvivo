import React, { useEffect, useState } from "react";
import {
  ArrowBlueIcon,
  ArrowIcon,
  SearchIcon,
} from "../components/shared/Icons";
import { useRouter } from "next/router";
import { allPosts } from "./api/posts";

const blog = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAll, setShowAll] = useState(false);

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = category ? post.category === category : true;
    const matchesTag = tag ? post.tags.includes(tag) : true;
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  const uniqueCategories = Array.from(
    new Set(allPosts.map((post) => post.category))
  );
  const uniqueTags = Array.from(new Set(allPosts.map((post) => post.tags)));

  const categoryCounts = allPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tagCounts = allPosts.reduce((acc, post) => {
    acc[post.tags] = (acc[post.tags] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const visibleTags = showAll ? uniqueTags : uniqueTags.slice(0, 2);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-4" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-10">
              <h5 className="font-medium">Categories</h5>
              <ul className="divide-y">
                <li
                  className={`cursor-pointer py-4 hover:text-accent1 transition-all duration-200 ${
                    !category ? "text-accent1" : "text-pvBlack"
                  }`}
                  onClick={() => setCategory(null)}
                >
                  All Categories ({allPosts.length})
                </li>
                {uniqueCategories.map((cat) => (
                  <li
                    key={cat}
                    className={`cursor-pointer py-4 hover:text-accent1 transition-all duration-200 ${
                      category === cat ? " text-accent1" : "text-pvBlack"
                    }`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat} ({categoryCounts[cat]})
                  </li>
                ))}
              </ul>
            </div>

            {/* Tag Filter */}
            <div className="">
              <h5 className="font-medium">Tags</h5>
              <ul className="">
                <li
                  className={`cursor-pointer font-normal px-3 py-1 inline-block transition-all duration-300 bg-accent1 hover:bg-accent text-white rounded-md mr-2 mb-2 ${
                    !tag ? "bg-accent" : ""
                  }`}
                  onClick={() => setTag(null)}
                >
                  All Tags ({allPosts.length})
                </li>
                {visibleTags.map((t) => (
                  <li
                    key={t}
                    className={`cursor-pointer font-normal px-3 py-1 inline-block transition-all duration-300 bg-accent1 hover:bg-accent text-white rounded-md mr-2 mb-2 ${
                      tag === t ? "bg-accent" : ""
                    }`}
                    onClick={() => setTag(t)}
                  >
                    {t} ({tagCounts[t]})
                  </li>
                ))}
              </ul>

              {uniqueTags.length > 3 && (
                <button
                  className="mt-2 text-accent1 transition-all duration-300 underline hover:text-accent"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-x-9 gap-y-10 md:gap-y-15">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.id} className="">
                    <div className="relative">
                      {post.blogimg ? (
                        <img
                          src={post.blogimg}
                          alt={post.title || "PropVivo Blog Image"}
                          className="rounded-3xl object-cover w-full"
                        />
                      ) : (
                        <img
                          src="https://placehold.jp/30/cccccc/ffffff/360x260.png?text=No+image+Found"
                          className="rounded-3xl object-cover w-full"
                        />
                      )}
                      <p className="text-pvBlack bg-white rounded-md px-2 py-1 absolute top-3 left-3">
                        {post.date}
                      </p>
                    </div>
                    <div className="my-5">
                      <h5
                        onClick={() =>
                          router.push({
                            pathname: `/blog/${post.title}`,
                            // query:{
                            //   title:post.title
                            // }
                          })
                        }
                        className="mb-3 font-medium cursor-pointer hover:text-accent1 transition-all duration-500"
                      >
                        {post.title}
                      </h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.content
                            ? post.content.length > 50
                              ? `${post.content.substring(0, 50)} ...`
                              : post.content
                            : "",
                        }}
                      ></div>
                    </div>

                    <div
                      onClick={() =>
                        router.push({
                          pathname: `/blog/${post.title}`,
                          // query:{
                          //   title:post.title
                          // }
                        })
                      }
                      className="group flex items-center gap-2 uppercase underline text-accent1 cursor-pointer"
                    >
                      Read More{" "}
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

export default blog;
