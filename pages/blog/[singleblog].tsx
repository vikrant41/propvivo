import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { allPosts } from "../api/posts";
import { ArrowBlueIcon } from "../../components/shared/Icons";

interface BlogProps {
  post: {
    id: string;
    title: string;
    blogimg: string;
    date: string;
    description: string;
    category: string;
    tags: string;
    content: string;
  };
}

const SingleBlog = ({ post }: BlogProps) => {
  const router = useRouter();

  // If the page isn't generated yet, fallback to loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <button onClick={() => router.push("/blog")} className="text-pvBlack mb-5 flex items-center gap-3">
        <ArrowBlueIcon className="rotate-180" /> Back to Blogs
      </button>
      <div className="flex flex-col gap-y-2">
        <div className="relative mb-5">
          {post.blogimg ? (
            <img
              src={`../${post.blogimg}`}
              alt={post.title || "PropVivo Blog Image"}
              className="rounded-3xl object-cover w-full max-h-96"
            />
          ) : (
            <img
              src="https://placehold.jp/30/cccccc/ffffff/360x260.png?text=No+image+Found"
              className="rounded-3xl object-cover w-full max-h-96"
            />
          )}
        </div>
        <h1 className="lg:text-5xl mb-4">{post.title}</h1>
        <p>{post.date}</p>
        <p>{post.description}</p>

        <div
          className="text-gray-700 mb-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for each blog post
  const paths = allPosts.map((post) => ({
    params: { singleblog: post.id },
  }));

  return {
    paths,
    fallback: true, // Fallback to dynamic generation if not pre-rendered
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { singleblog } = context.params!;
  const post = allPosts.find((p) => p.id === singleblog);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

export default SingleBlog;
