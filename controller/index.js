const reddit = require('../model/reddit');


module.exports = {
  reddit: {
    get: (req, res) => (reddit.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      res.sendStatus(400);
    })
  }
};
