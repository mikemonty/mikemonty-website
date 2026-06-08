module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  const toIsoDate = (value) => {
    if (!value) return "";
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return String(value).slice(0, 10);
  };

  eleventyConfig.addFilter("dateDisplay", function (value) {
    if (!value) return "";
    const date = new Date(`${toIsoDate(value)}T00:00:00`);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  eleventyConfig.addFilter("dateIso", function (value) {
    return toIsoDate(value);
  });

  eleventyConfig.addFilter("sortByDateDesc", function (items) {
    return [...items].sort((a, b) => {
      const aDate = a.data?.date || a.date || a.date_iso || "";
      const bDate = b.data?.date || b.date || b.date_iso || "";
      return String(bDate).localeCompare(String(aDate));
    });
  });

  eleventyConfig.addFilter("tutorialsForLevel", function (tutorials, levelSlug) {
    return [...tutorials]
      .filter((tutorial) => tutorial.difficulty_slug === levelSlug)
      .sort((a, b) => a.order - b.order);
  });

  eleventyConfig.addFilter("collectionForLevel", function (items, levelSlug) {
    return [...items]
      .filter((item) => item.data?.difficulty_slug === levelSlug)
      .sort((a, b) => (a.data?.order || 0) - (b.data?.order || 0));
  });

  eleventyConfig.addFilter("videosNewestFirst", function (videos) {
    return [...videos].sort((a, b) => {
      return String(b.upload_date).localeCompare(String(a.upload_date));
    });
  });

  eleventyConfig.addFilter("where", function (items, key, value) {
    return [...items].filter((item) => item[key] === value);
  });

  eleventyConfig.addFilter("absoluteUrl", function (url) {
    if (!url) return "/";
    return url.startsWith("/") ? url : `/${url}`;
  });

  eleventyConfig.addFilter("limit", function (items, count) {
    return [...items].slice(0, count);
  });

  eleventyConfig.addFilter("previousInCollection", function (items, currentUrl) {
    const index = [...items].findIndex((item) => item.url === currentUrl);
    return index > 0 ? items[index - 1] : null;
  });

  eleventyConfig.addFilter("nextInCollection", function (items, currentUrl) {
    const index = [...items].findIndex((item) => item.url === currentUrl);
    return index >= 0 && index < items.length - 1 ? items[index + 1] : null;
  });

  eleventyConfig.addCollection("essaysSorted", function (collectionApi) {
    return collectionApi.getFilteredByTag("essays").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tutorialsSorted", function (collectionApi) {
    return collectionApi.getFilteredByTag("tutorials").sort((a, b) => {
      const levelCompare = String(a.data.difficulty_slug).localeCompare(String(b.data.difficulty_slug));
      if (levelCompare !== 0) return levelCompare;
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  eleventyConfig.addCollection("videosSorted", function (collectionApi) {
    return collectionApi.getFilteredByTag("yoyoVideos").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("projectsSorted", function (collectionApi) {
    return collectionApi.getFilteredByTag("projects").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"]
  };
};
