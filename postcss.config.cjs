module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'custom-properties': false
      }
    }),
    require('autoprefixer')
  ]
}