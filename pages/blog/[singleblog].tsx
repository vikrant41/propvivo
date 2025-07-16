import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  ArrowBlueIcon,
  CalenderIcon,
  ProfileIcon,
} from "../../components/shared/Icons";
import { GET_ALL_BLOGS } from "../../graphql/queries/GetAllBlogsQueries";
import apiClient from "../../apollo/apiClient";
import { convertUTCToLocalDate } from "../../Utils/Utils";
import CenteredLoader from "../../components/CommonComponents/CenterLoader";
import TopBanner from "../../components/CommonComponents/TopBanner";

interface BlogProps {
  post: {
    blogId: string;
    title: string;
    blogImg: string | null;
    description: string;
    content: string;
    userContext: {
      createdByUserName: string;
      createdOn: string;
    };
  } | null;
}

const SingleBlog = ({ post }: BlogProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <CenteredLoader />;
  }

  if (!post) {
    return (
      <div className="container mx-auto py-10">
        <button
          onClick={() => router.push("/blog")}
          className="text-pvBlack mb-5 flex items-center gap-3"
        >
          <ArrowBlueIcon className="rotate-180" /> Back to Blogs
        </button>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <div>
          {post.blogImg ? (
            <TopBanner backgroundImage={`"${post.blogImg}"`} />
          ) : (
            <img
              src="https://placehold.jp/30/cccccc/ffffff/360x260.png?text=No+image+Found"
              className="rounded-3xl object-cover w-full max-h-96"
            />
          )}
          <div className="absolute bottom-10 container left-0 right-0">
            <h1 className="lg:text-4xl mb-4 text-white">{post.title}</h1>
            <div className="flex items-center text-white gap-4">
              <div className="flex items-center gap-2">
                <ProfileIcon />
                {post?.userContext?.createdByUserName}
              </div>
              <div className="flex items-center gap-2">
                <CalenderIcon />
                {convertUTCToLocalDate(post.userContext?.createdOn)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10 singleContent">
        <div className="flex flex-col gap-y-2">
          <button
            onClick={() => router.push("/blog")}
            className="text-btnDarkBlue mb-5 flex items-center gap-3"
          >
            <ArrowBlueIcon className="rotate-180" /> Back to Blogs
          </button>

          <div className="max-w-4xl mx-auto">
            <h1 className="lg:text-4xl mb-7">{post.title}</h1>

            {post.description && (
              <div
                className="mb-6"
                dangerouslySetInnerHTML={{ __html: post.description }}
              ></div>
            )}

            {post.content && (
              <div
                className="text-gray-700 mb-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { singleblog } = context.params;

  try {
    const { data } = await apiClient.query({
      query: GET_ALL_BLOGS,
      variables: {
        request: {
          pageCriteria: { enablePage: false, pageSize: 0, skip: 0 },
          requestParam: {
            isCorporate: true,
            filterByKeyword: null,
            blogCategory: null,
            keyword: null,
          },
          requestSubType: "List",
          requestType: "GlobalSearch",
        },
      },
    });

    const blogs = data?.blogQueries?.getAllBlog?.data?.blogs || [];
    const blog = blogs.find((blog: any) => blog.blogId === singleblog);

    const post = blog
      ? {
          ...blog,
          blogImg: blog.document?.uri || null, // ✅ Fix: extract blogImg
        }
      : null;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      props: {
        post: null,
      },
    };
  }
};

export default SingleBlog;
