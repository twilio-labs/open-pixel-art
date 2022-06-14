const fs = require('fs');

// File path on how we know it's a docker instance
const dockerEnvFile = '/.dockerenv';

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy({
    'node_modules/nes.css/css': 'assets/nes.css'
  });

  // This is so we can expose the docker port and host to be accesible
  if (fs.existsSync(dockerEnvFile)) {
    eleventyConfig.setBrowserSyncConfig({
      notify: false,
      host: '0.0.0.0'
    });
  }

  return {
    htmlTemplateEngine: 'njk'
  };
};
