const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  uri: 'http://www.reddit.com',
  transform: (body) => (cheerio.load(body)),
}

module.exports = {
  get: (req) => (rp(options))
  .then((htmlString) => {
    console.log(htmlString)
    return htmlString;
  })
  ,
  post: (req) => {
    // do something
  },
}
