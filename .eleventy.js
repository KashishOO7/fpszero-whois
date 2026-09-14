const fs = require("node:fs");
const categories = require("./src/_data/categories.js");

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

const library = require("./src/_data/library.json");
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

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: "/" });

  const FELL = "node_modules/@fontsource/im-fell-english/files/im-fell-english-latin-400";
  eleventyConfig.addPassthroughCopy({
    [`${FELL}-normal.woff2`]: "fonts/im-fell-english-400.woff2",
    [`${FELL}-italic.woff2`]: "fonts/im-fell-english-400-italic.woff2",
  });

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
  eleventyConfig.addFilter("originLabel", (url, source) => {
    for (const [pattern, name] of PUBLICATIONS) {
      if (pattern.test(url || "")) return name;
    }
    return source ? source[0].toUpperCase() + source.slice(1) : "elsewhere";
  });

  const SPINE_PALETTE = Object.fromEntries(library.shelves.map((s) => [s.slug, s.palette]));

  const SHELF_CAP = 10;

  eleventyConfig.addFilter("stackLayout", function (posts, shelfSlug) {
    const GAP = 5;
    const PAD = 22;
    const FLOOR = 340;
    const TYPE = 15;
    const CHAR = 7.6;
    const wobble = [1, 0.93, 0.98, 0.89, 0.96, 0.91, 1, 0.94];

    const shown = posts.slice(0, SHELF_CAP);
    let x = PAD;
    const books = shown.map((post, i) => {
      const words = post.data.words || 400;
      const width = Math.round(Math.min(78, Math.max(34, 32 + words / 34)));
      const height = Math.round(Math.min(300, 300 * wobble[i % wobble.length]));
      const top = FLOOR - height;

      const room = Math.floor((height - 64) / CHAR);
      const title = post.data.title || "";
      const label = title.length > room ? title.slice(0, Math.max(4, room - 1)).trimEnd() + "…" : title;

      const palette =
        SPINE_PALETTE[shelfSlug] ||
        SPINE_PALETTE[post.data.primaryShelf] ||
        library.shelves[library.shelves.length - 1].palette;
      const book = {
        url: post.url,
        title,
        label,
        words,
        mark: (post.data.shelfMark || "").split(" ").slice(-1)[0],
        colour: palette[i % palette.length],
        x, width, height, top,
        centreX: x + width / 2,
        centreY: top + height / 2,
        bandTop: top + 22,
        bandLow: FLOOR - 34,
        fontSize: TYPE,
      };
      x += width + GAP;
      return book;
    });

    return {
      books,
      width: x + PAD,
      height: FLOOR + 30,
      floor: FLOOR,
      shown: shown.length,
      total: posts.length,
    };
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

  eleventyConfig.addCollection("unshelved", (api) =>
    allArticles(api).filter((item) => !shelvesOf(item).length)
  );

  eleventyConfig.addCollection("tagList", (api) => {
    const tags = new Set();
    for (const item of allArticles(api)) {
      if (!shelvesOf(item).length) continue;
      for (const tag of item.data.tags || []) tags.add(tag);
    }
    return [...tags].sort();
  });

  for (const category of categories.all) {
    eleventyConfig.addCollection(category, (api) =>
      allArticles(api).filter((item) => shelvesOf(item).includes(category))
    );
  }

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
