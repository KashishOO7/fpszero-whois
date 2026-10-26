const fs = require("node:fs");
const categories = require("./src/_data/categories.js");
const library = require("./src/_data/library.json");
const site = require("./src/_data/site.js");
const about = require("./src/_data/about.js");
const projects = require("./src/_data/projects.js");
const photos = require("./src/_data/photos.js");

const ARTICLE_GLOB = "src/content/articles/*.md";

const wordCache = new Map();
function wordCount(inputPath) {
  if (!wordCache.has(inputPath)) {
    const raw = fs.readFileSync(inputPath, "utf8");
    const body = raw.replace(/^---[\s\S]*?\r?\n---\r?\n/, "");
    wordCache.set(inputPath, body.split(/\s+/).filter(Boolean).length);
  }
  return wordCache.get(inputPath);
}

const SHELF_CODE = Object.fromEntries(library.shelves.map((s) => [s.slug, s.code]));

function shelvesOf(item) {
  const c = item.data.category;
  if (!c) return [];
  return (Array.isArray(c) ? c : [c]).filter(Boolean);
}

function shelfMark(item, accession) {
  const d = item.date;
  const ym = `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  const code = SHELF_CODE[shelvesOf(item)[0]] || "UNC";
  return `FPS · ${code} · ${ym} · ${String(accession).padStart(2, "0")}`;
}

const SHORT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });

  eleventyConfig.addFilter("isoDate", (d) => d.toISOString().slice(0, 10));
  eleventyConfig.addFilter("readableDate", (d) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(d)
  );

  const PUBLICATIONS = [
    [/kashish101\.substack\.com/, "Beyond the Absurd"],
    [/fpszero\.substack\.com/, "A Principia"],
    [/medium\.com/, "Medium"],
  ];
  const originLabel = (url, source) => {
    for (const [pattern, name] of PUBLICATIONS) {
      if (pattern.test(url || "")) return name;
    }
    return source ? source[0].toUpperCase() + source.slice(1) : "elsewhere";
  };
  eleventyConfig.addFilter("originLabel", originLabel);

  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  eleventyConfig.addFilter("inlineLinks", (s) =>
    escapeHtml(s).replace(
      /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer external">$1</a>'
    )
  );

  eleventyConfig.addFilter("osBundle", (articles) => {
    const bundle = {
      site: {
        name: site.name,
        author: site.author,
        brand: site.brand,
        domain: site.domain,
        url: site.url,
        email: site.email,
        role: site.role,
        profiles: site.profiles,
      },
      about,
      shelves: library.shelves.map(({ slug, name, code, gloss }) => ({ slug, name, code, gloss })),
      articles: articles.map((a) => ({
        slug: a.page.fileSlug,
        url: a.url,
        title: a.data.title,
        date: a.date.toISOString().slice(0, 10),
        label: SHORT.format(a.date),
        shelves: a.data.shelves,
        tags: a.data.tags || [],
        words: a.data.words,
        source: a.data.source && a.data.source !== "original" ? originLabel(a.data.source_url, a.data.source) : "",
        sourceUrl: a.data.source && a.data.source !== "original" ? a.data.source_url || "" : "",
        description: a.data.description,
        mark: a.data.shelfMark,
      })),
      projects: projects.map((p) => ({
        slug: p.slug,
        name: p.name,
        url: p.url,
        blurb: p.blurb,
        stamps: p.stampLabels.map((s) => s.label),
        kicker: p.detail.kicker,
        lede: p.detail.lede,
        sections: p.detail.sections.map((s) => ({ heading: s.heading, body: s.body, list: s.list || [] })),
        facts: p.detail.facts,
        links: p.detail.links,
      })),
      photos,
    };
    return JSON.stringify(bundle).replace(/</g, "\\u003c");
  });

  const allArticles = (api) =>
    api.getFilteredByGlob(ARTICLE_GLOB).sort((a, b) => b.date - a.date);

  eleventyConfig.addCollection("articles", (api) => {
    const shelved = [];
    for (const item of allArticles(api)) {
      const shelves = shelvesOf(item);
      if (!shelves.length) continue;
      for (const shelf of shelves) {
        if (!categories.all.includes(shelf)) {
          throw new Error(
            `${item.inputPath}: category "${shelf}" is not one of ` +
              categories.all.join(", ")
          );
        }
      }
      item.data.shelves = shelves;
      item.data.primaryShelf = shelves[0];
      shelved.push(item);
    }

    [...shelved]
      .sort((a, b) => a.date - b.date)
      .forEach((item, i) => {
        item.data.accession = i + 1;
        item.data.shelfMark = shelfMark(item, i + 1);
        item.data.words = wordCount(item.inputPath);
      });

    return shelved;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
