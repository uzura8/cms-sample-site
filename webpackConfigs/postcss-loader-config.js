module.exports = {
  loader: 'postcss-loader',// Setting for PostCSS
  options: {
    postcssOptions: {
      plugins: [
        require('autoprefixer')({
          grid: true, // use CSS Grid Layout
          flexbox: true,
        })
      ],
    },
    sourceMap: true,
  }
}
