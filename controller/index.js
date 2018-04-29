const postDetail = require('../model/postDetail');


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
  }
};
