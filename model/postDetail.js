const rp = require('request-promise');
const himalaya = require('himalaya');
const cheerio = require('cheerio');

let URL = 'https://www.reddit.com/r/OldSchoolCool/comments/8fqjdl/17_year_old_jackie_mitchell_applying_makeup/';

module.exports = {
  get: (req) => {
    URL = req.param("URL");
    return rp(URL)
    .then((htmlString) => {
      const $ = cheerio.load(htmlString, {
            recognizeSelfClosing: true
        });
      const htmlToJSON = himalaya.parse(htmlString);
      const title = $('.content .title').text();
      const contents = $('.expando .usertext-body').text();
      const createdBy = $('div#siteTable').children('.thing').children('.entry').children('.top-matter').children('.tagline')
      .children('.author').text();

      // const comment = $('.commentarea .nestedlisting').find('.md').eq(1).text();

      // 가장 부모 댓글들만 가져 옴
      const comments = [];
      $('div.thing').each(function(i, element){

        const comment = $(this).children('.entry').children('.usertext').children('.usertext-body').children('.md').text();
        const createdBy = $(this).children('.entry').children('.tagline').children('.author').text();
        const points = $(this).children('.entry').children('.tagline').children('.unvoted').text();
        const children = [];

        const container = {
          comment: comment,
          createdBy: createdBy,
          points: points,
        }
        comments.push(container);
      })

      const container = {
        title: title,
        contents: contents,
        createdBy: createdBy,
        comments: comments,
      }
      console.log(container);
      return container;
    });
  }

  ,
  post: (req) => {
    // do something
  },
}
