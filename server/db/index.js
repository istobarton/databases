var Sequelize = require('Sequelize');
var orm = new Sequelize('chat', 'root', '', {host:'localhost', dialect: 'mysql', define:{timestamps: false}});



var User = orm.define('User', {
  username: Sequelize.STRING
});

var Message = orm.define('Message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.hasMany(Message);
Message.belongsTo(User);

User.sync();
Message.sync();

exports.User = User;
exports.Message = Message;

// var mysql = require('mysql');

// // Create a database connection and export it from this file.
// // You will need to connect with the user "root", no password,
// // and to the database "chat".

// module.exports = mysql.createConnection({
//   // host:'localhost',
//   user: 'root',
//   password: '',
//   database: 'chat'
// });

// module.exports.connect(function(err){
//   if(err) { console.error(err); }
// });


