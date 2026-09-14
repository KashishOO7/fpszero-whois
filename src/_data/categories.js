const library = require("./library.json");

const shelves = library.shelves.map(({ slug, name, gloss }) => ({ slug, name, gloss }));
const all = shelves.map((s) => s.slug);

module.exports = {
  shelves,
  all,
  archive: all,
};
