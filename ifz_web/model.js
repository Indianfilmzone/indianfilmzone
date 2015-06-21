var DB = require('./config').DB;

var User = DB.Model.extend({
   tableName: 'tblUsers',
   idAttribute: 'userId',
});

module.exports = {
   User: User
};