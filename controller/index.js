const postDetail = require('../model/postDetail');
const index = require('../model/index');

module.exports = {
  postDetail: {
    get: (req, res) => (postDetail.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      res.sendStatus(400);
    })
  },
  index: {
    get: (req, res) => (index.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      res.sendStatus(400);
    })
  }
};
