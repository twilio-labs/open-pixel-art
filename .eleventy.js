module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy({
    'node_modules/nes.css/css': 'assets/nes.css'
  });

  return {
    htmlTemplateEngine: 'njk'
  };
};
