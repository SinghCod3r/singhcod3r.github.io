import { Metadata } from "next";
import BlogView from "@/components/BlogView";
import { fetchMediumRssPosts } from "@/lib/rss";

export const metadata: Metadata = {
  title: "Medium Blog | Ayush Singh (SinghCod3r)",
  description:
    "Medium article archive — technical engineering dispatches on Linux systems tooling, AI agent containment, and OpenPrinting by Ayush Singh.",
  alternates: {
    canonical: "/medium-blog/",
    types: {
      "application/rss+xml": "/medium-blog/rss.xml",
    },
  },
  openGraph: {
    title: "Medium Blog | Ayush Singh (SinghCod3r)",
    description:
      "Medium article archive — technical engineering dispatches on Linux systems tooling, AI agent containment, and OpenPrinting by Ayush Singh.",
    url: "https://singhcod3r.github.io/medium-blog/",
    type: "website",
  },
};

export default async function MediumBlogPage() {
  const { posts, isLiveRss } = await fetchMediumRssPosts();

  return <BlogView initialPosts={posts} isLiveRss={isLiveRss} />;
}