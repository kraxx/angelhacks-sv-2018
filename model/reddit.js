const rp = require('request-promise');
const himalaya = require('himalaya');
// const cheerio = require('cheerio');

const URL = 'http://www.reddit.com';

//
// const options = {
//   uri: URL,
//   transform: (body) => (cheerio.load(body)),
// }


module.exports = {
  get: (req) => (rp(URL))
  .then((htmlString) => {
    const htmlToJSON = himalaya.parse(htmlString);
    console.log(htmlToJSON)
    return htmlToJSON;
  })
  ,
  post: (req) => {
    // do something
  },
}
