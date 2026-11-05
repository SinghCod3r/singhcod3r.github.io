export interface MediumPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  year: string;
  readTime: string;
  category: "AI & Security" | "Open Source" | "OpenPrinting";
  categoryColor: string;
  tags: string[];
  thumbnail: string;
  mediumUrl: string;
}

export const FALLBACK_POSTS: MediumPost[] = [
  {
    id: "ai-agents-containment",
    title: "AI Agents Are Getting More Powerful. The Next Big Problem Is Containing Them",
    slug: "ai-agents-are-getting-more-powerful-the-next-big-problem-is-containing-them",
    excerpt: "For years, we asked AI to write code. Now we are asking AI to run code. That difference is much bigger than it sounds. A coding assistant that suggests a function is one thing. An autonomous agent with terminal and repo access requires strict sandboxing and least-privilege architecture.",
    date: "Sep 30",
    year: "2026",
    readTime: "8 min read",
    category: "AI & Security",
    categoryColor: "#d8ff58",
    tags: ["AI Agents", "Security", "Sandboxing", "Systems"],
    thumbnail: "/blog/ai-agents-containment.png",
    mediumUrl: "https://singhcod3r.medium.com/ai-agents-are-getting-more-powerful-the-next-big-problem-is-containing-them-18c318ebbd29",
  },
  {
    id: "gsoc-system-config-printer",
    title: "I Almost Quit Open Source After GSoC 2026 — Then system-config-printer Changed Everything",
    slug: "i-almost-quit-open-source-after-gsoc-2026-then-system-config-printer-changed-everything",
    excerpt: "How learning Python, finding great mentors, and diving into one Linux project changed the way I think about software engineering. Overcoming burnout and discovering why real-world Linux tools matter.",
    date: "Aug 24",
    year: "2026",
    readTime: "6 min read",
    category: "Open Source",
    categoryColor: "#a786ff",
    tags: ["GSoC", "Open Source", "Linux", "Python", "Mentorship"],
    thumbnail: "/blog/gsoc-system-config-printer.png",
    mediumUrl: "https://singhcod3r.medium.com/i-almost-quit-open-source-after-gsoc-2026-then-system-config-printer-changed-everything-49ff8c2707d1",
  },
  {
    id: "openprinting-dead-upstream-url",
    title: "Fixing a Dead Upstream URL in OpenPrinting: A Small but Important Contribution",
    slug: "fixing-a-dead-upstream-url-in-openprinting-a-small-but-important-contribution",
    excerpt: "Open-source maintenance often means fixing things that users never notice but depend on every day. A merged pull request tracking broken metadata in driver repositories to keep legacy hardware printing smoothly.",
    date: "Aug 24",
    year: "2026",
    readTime: "3 min read",
    category: "OpenPrinting",
    categoryColor: "#7ff3da",
    tags: ["OpenPrinting", "Linux Foundation", "Bug Fix", "Git"],
    thumbnail: "/blog/openprinting-dead-upstream-url.png",
    mediumUrl: "https://singhcod3r.medium.com/fixing-a-dead-upstream-url-in-openprinting-a-small-but-important-contribution-e07f94526d09",
  },
  {
    id: "openprinting-splix-driver-metadata",
    title: "My Pull Request to OpenPrinting Got Merged: Fixing SpliX Driver Metadata",
    slug: "my-pull-request-to-openprinting-got-merged-fixing-splix-driver-metadata",
    excerpt: "Open source is not only about writing new code. Sometimes, fixing small but critical details makes a big impact. Updating upstream metadata to ensure Samsung and Xerox laser printers match the correct drivers.",
    date: "Dec 14",
    year: "2025",
    readTime: "3 min read",
    category: "OpenPrinting",
    categoryColor: "#7ff3da",
    tags: ["Pull Request", "OpenPrinting", "Drivers", "SpliX"],
    thumbnail: "/blog/openprinting-splix-driver.png",
    mediumUrl: "https://singhcod3r.medium.com/my-pull-request-to-openprinting-got-merged-fixing-splix-driver-metadata-23558cb44dfc",
  },
  {
    id: "foomatic-db-printer-data",
    title: "My First Merged Pull Request: Regenerating Printer Data from Foomatic-DB",
    slug: "my-first-merged-pull-request-regenerating-printer-data-from-foomatic-db",
    excerpt: "How I used foomatic-db to generate complete static printer data and learned from open-source reviews. What it takes to land your very first contribution in an established Linux Foundation project.",
    date: "Dec 14",
    year: "2025",
    readTime: "5 min read",
    category: "Open Source",
    categoryColor: "#a786ff",
    tags: ["Linux", "Open Source", "Foomatic-DB", "Python", "Data"],
    thumbnail: "/blog/foomatic-db-printer-data.png",
    mediumUrl: "https://singhcod3r.medium.com/my-first-merged-pull-request-regenerating-printer-data-from-foomatic-db-eba2f7324b34",
  },
];

export async function fetchMediumRssPosts(): Promise<{ posts: MediumPost[]; isLiveRss: boolean }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch("https://medium.com/feed/@Singhcod3r", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`Medium RSS responded with status: ${res.status}. Using fallback posts.`);
      return { posts: FALLBACK_POSTS, isLiveRss: false };
    }

    const xml = await res.text();
    const items = xml.split("<item>").slice(1);

    if (items.length === 0) {
      return { posts: FALLBACK_POSTS, isLiveRss: false };
    }

    const parsedPosts: MediumPost[] = items.map((item, idx) => {
      // 1. Title
      const titleMatch =
        item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
        item.match(/<title>([\s\S]*?)<\/title>/);
      const title = titleMatch ? titleMatch[1].trim() : "Untitled Article";

      // 2. Link
      const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
      let mediumUrl = linkMatch ? linkMatch[1].trim() : "https://medium.com/@Singhcod3r";
      mediumUrl = mediumUrl.split("?")[0];

      // 3. Date
      const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const rawDate = dateMatch ? dateMatch[1].trim() : "";
      const dateObj = rawDate ? new Date(rawDate) : new Date();
      const monthDay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const year = dateObj.getFullYear().toString();

      // 4. Categories & Category Grouping
      const rawCategories = [
        ...item.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g),
      ].map((m) => m[1]);

      let category: MediumPost["category"] = "Open Source";
      let categoryColor = "#a786ff";

      const catLower = rawCategories.join(" ").toLowerCase() + " " + title.toLowerCase();
      if (catLower.includes("agent") || catLower.includes("ai") || catLower.includes("security")) {
        category = "AI & Security";
        categoryColor = "#d8ff58";
      } else if (
        catLower.includes("openprinting") ||
        catLower.includes("printer") ||
        catLower.includes("splix")
      ) {
        category = "OpenPrinting";
        categoryColor = "#7ff3da";
      } else {
        category = "Open Source";
        categoryColor = "#a786ff";
      }

      // Convert slug-style categories to clean display tags (e.g. "software-engineering" -> "Software Engineering")
      const tags = rawCategories.slice(0, 4).map((c) =>
        c
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      );

      // 5. Content, Image & Excerpt
      const contentMatch = item.match(
        /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/
      );
      const content = contentMatch ? contentMatch[1] : "";

      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/);
      let thumbnail =
        imgMatch && imgMatch[1]
          ? imgMatch[1]
          : FALLBACK_POSTS[idx]?.thumbnail || "/blog/ai-agents-containment.png";

      // Transform Medium's 301 redirected /max/ URLs directly into direct CDN /v2/resize:fit:800/ URLs
      if (thumbnail.includes("cdn-images-1.medium.com/max/")) {
        thumbnail = thumbnail
          .replace("/max/1024/", "/v2/resize:fit:800/")
          .replace("/max/800/", "/v2/resize:fit:800/");
      }

      // Plaintext excerpt
      const plainText = content
        .replace(/<figcaption>[\s\S]*?<\/figcaption>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const words = plainText.split(/\s+/).length;
      const readTime = `${Math.max(3, Math.ceil(words / 200))} min read`;
      const excerpt =
        plainText.length > 20
          ? plainText.slice(0, 210).trim() + "..."
          : FALLBACK_POSTS[idx]?.excerpt || "";

      return {
        id: `rss-post-${idx}`,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        excerpt,
        date: monthDay,
        year,
        readTime,
        category,
        categoryColor,
        tags: tags.length > 0 ? tags : ["Open Source", "Software"],
        thumbnail,
        mediumUrl,
      };
    });

    return { posts: parsedPosts, isLiveRss: true };
  } catch (error) {
    console.warn("Failed to fetch Medium RSS feed:", error);
    return { posts: FALLBACK_POSTS, isLiveRss: false };
  }
}
