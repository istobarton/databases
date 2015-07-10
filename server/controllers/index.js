var models = require('../models');
var bluebird = require('bluebird');
var orm = require('../db');



module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      orm.Message.findAll({ include: [orm.User] })
        .then(function(results){
          var output = results.map(function(res){
            return {text: res.getDataValue('text'), username: res.getDataValue('username'), roomname: res.getDataValue('roomname')};
          })
          console.log(JSON.stringify(output)+ "____****____*******_______")
          res.json({results: output});
        });

      //models.messages.get(req, res);
    },
    post: function (req, res) {
      orm.User.findOrCreate({where:{username: req.body.username}})
        .then(function(user){
          var params = {
            text: req.body.text,
            UserId: user[0].dataValues.id,
            roomname: req.body.roomname
          };
          orm.Message.create(params).then(function(){
            res.sendStatus(201);
          });
        });
      // models.messages.post(req, res);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req, res);
    },
    post: function (req, res) {
      models.users.post(req, res);
    }
  }
};


