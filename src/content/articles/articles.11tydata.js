const shelved = (data) => {
  const c = data.category;
  if (!c) return false;
  return Array.isArray(c) ? c.filter(Boolean).length > 0 : true;
};

module.exports = {
  layout: "layouts/article.njk",
  eleventyComputed: {
    permalink: (data) => (shelved(data) ? `/archive/${data.page.fileSlug}/` : false),
    eleventyExcludeFromCollections: (data) => !shelved(data),
  },
};
