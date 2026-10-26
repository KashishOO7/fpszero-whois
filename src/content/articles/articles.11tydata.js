const fs = require("node:fs");

const shelved = (data) => {
  const c = data.category;
  if (!c) return false;
  return Array.isArray(c) ? c.filter(Boolean).length > 0 : true;
};

const cache = new Map();
function opening(inputPath) {
  if (!cache.has(inputPath)) {
    const body = fs.readFileSync(inputPath, "utf8").replace(/^---[\s\S]*?\r?\n---\r?\n/, "");
    const plain = body
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/^\s{0,3}(#{1,6}|>)\s*/gm, "")
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    let text = plain.slice(0, 200);
    if (plain.length > 200) text = text.slice(0, text.lastIndexOf(" "));
    const stop = text.search(/[.!?](\s|$)(?=[^.!?]*$)/);
    if (stop > 80) text = text.slice(0, stop + 1);
    cache.set(inputPath, text.trim());
  }
  return cache.get(inputPath);
}

module.exports = {
  layout: "layouts/article.njk",
  eleventyComputed: {
    permalink: (data) => (shelved(data) ? `/archive/${data.page.fileSlug}/` : false),
    eleventyExcludeFromCollections: (data) => !shelved(data),
    description: (data) => data.description || opening(data.page.inputPath),
  },
};
