import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const posts = [
  {
    title: "AI Agents Are Getting More Powerful. The Next Big Problem Is Containing Them",
    link: "https://singhcod3r.medium.com/ai-agents-are-getting-more-powerful-the-next-big-problem-is-containing-them-18c318ebbd29",
    pubDate: "Wed, 30 Sep 2026 00:00:00 GMT",
    guid: "https://singhcod3r.medium.com/ai-agents-are-getting-more-powerful-the-next-big-problem-is-containing-them-18c318ebbd29",
    category: "AI & Security",
    author: "Ayush Singh",
    description: "For years, we asked AI to write code. Now we are asking AI to run code. That difference is much bigger than it sounds. A coding assistant that suggests a function is one thing. An autonomous agent with terminal and repo access requires strict sandboxing and least-privilege architecture.",
    image: "https://singhcod3r.github.io/blog/ai-agents-containment.png",
  },
  {
    title: "I Almost Quit Open Source After GSoC 2026 — Then system-config-printer Changed Everything",
    link: "https://singhcod3r.medium.com/i-almost-quit-open-source-after-gsoc-2026-then-system-config-printer-changed-everything-49ff8c2707d1",
    pubDate: "Mon, 24 Aug 2026 00:00:00 GMT",
    guid: "https://singhcod3r.medium.com/i-almost-quit-open-source-after-gsoc-2026-then-system-config-printer-changed-everything-49ff8c2707d1",
    category: "Open Source",
    author: "Ayush Singh",
    description: "How learning Python, finding great mentors, and diving into one Linux project changed the way I think about software engineering. Overcoming burnout and discovering why real-world Linux tools matter.",
    image: "https://singhcod3r.github.io/blog/gsoc-system-config-printer.png",
  },
  {
    title: "Fixing a Dead Upstream URL in OpenPrinting: A Small but Important Contribution",
    link: "https://singhcod3r.medium.com/fixing-a-dead-upstream-url-in-openprinting-a-small-but-important-contribution-e07f94526d09",
    pubDate: "Mon, 24 Aug 2026 00:00:00 GMT",
    guid: "https://singhcod3r.medium.com/fixing-a-dead-upstream-url-in-openprinting-a-small-but-important-contribution-e07f94526d09",
    category: "OpenPrinting",
    author: "Ayush Singh",
    description: "Open-source maintenance often means fixing things that users never notice but depend on every day. A merged pull request tracking broken metadata in driver repositories to keep legacy hardware printing smoothly.",
    image: "https://singhcod3r.github.io/blog/openprinting-dead-upstream-url.png",
  },
  {
    title: "My Pull Request to OpenPrinting Got Merged: Fixing SpliX Driver Metadata",
    link: "https://singhcod3r.medium.com/my-pull-request-to-openprinting-got-merged-fixing-splix-driver-metadata-23558cb44dfc",
    pubDate: "Sun, 14 Dec 2025 00:00:00 GMT",
    guid: "https://singhcod3r.medium.com/my-pull-request-to-openprinting-got-merged-fixing-splix-driver-metadata-23558cb44dfc",
    category: "OpenPrinting",
    author: "Ayush Singh",
    description: "Open source is not only about writing new code. Sometimes, fixing small but critical details makes a big impact. Updating upstream metadata to ensure Samsung and Xerox laser printers match the correct drivers.",
    image: "https://singhcod3r.github.io/blog/openprinting-splix-driver.png",
  },
  {
    title: "My First Merged Pull Request: Regenerating Printer Data from Foomatic-DB",
    link: "https://singhcod3r.medium.com/my-first-merged-pull-request-regenerating-printer-data-from-foomatic-db-eba2f7324b34",
    pubDate: "Sun, 14 Dec 2025 00:00:00 GMT",
    guid: "https://singhcod3r.medium.com/my-first-merged-pull-request-regenerating-printer-data-from-foomatic-db-eba2f7324b34",
    category: "Open Source",
    author: "Ayush Singh",
    description: "How I used foomatic-db to generate complete static printer data and learned from open-source reviews. What it takes to land your very first contribution in an established Linux Foundation project.",
    image: "https://singhcod3r.github.io/blog/foomatic-db-printer-data.png",
  },
];

function generateRssXml(items) {
  const channelTitle = "Ayush Singh (SinghCod3r) — Technical Engineering Dispatches";
  const channelLink = "https://singhcod3r.github.io/blog/";
  const channelDescription =
    "Technical articles and engineering dispatches on Linux systems engineering, OpenPrinting printer driver architecture, and AI agent containment by Ayush Singh.";
  const feedUrl = "https://singhcod3r.github.io/blog/rss.xml";
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = items
    .map(
      (item) => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <dc:creator><![CDATA[${item.author}]]></dc:creator>
      <category><![CDATA[${item.category}]]></category>
      <description><![CDATA[${item.description}]]></description>
      <enclosure url="${item.image}" length="0" type="image/png" />
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom" 
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${channelTitle}</title>
    <link>${channelLink}</link>
    <description>${channelDescription}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>https://singhcod3r.github.io/my_image.webp</url>
      <title>${channelTitle}</title>
      <link>${channelLink}</link>
    </image>
${itemsXml}
  </channel>
</rss>
`;
}

const outDir = path.join(__dirname, "..", "public", "blog");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const rssContent = generateRssXml(posts);
fs.writeFileSync(path.join(outDir, "rss.xml"), rssContent, "utf-8");
console.log("Successfully generated public/blog/rss.xml with", posts.length, "items.");
