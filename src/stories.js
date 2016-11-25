const COUNTRY_DATA = {
  GB: '../data/uk.json'
}

module.exports.all = function (country) {
  return require(COUNTRY_DATA[country]).items
}

module.exports.get = function (country, number) {
  return module.exports.all(country)[number - 1]
}

module.exports.format = function (story) {
  return [
    story.title.toUpperCase(),
    story.summary,
    `For the full story, visit http://www.bbc.com${story.url}`
  ].join('\n')
}

module.exports.formatList = function (stories) {
  return stories.map((sty, idx) => `(${idx + 1}) ${sty.title}`).join('\n')
}
