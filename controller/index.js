const someModel = require('../model/something');


module.exports = {
  someWhere: {
    get: (req, res) => (something.get(req))
    .then((result) => {
      const body = JSON.stringify(result);
      res.json(body);
    })
    .catch((err) => {
      res.sendStatus(400);
    })
  }
};
