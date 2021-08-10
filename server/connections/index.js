const Chat = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'chat'
    }
});

module.exports = Chat;

