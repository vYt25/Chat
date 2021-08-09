const express = require('express')

const cors = require('cors')

const router = express.Router();

const Chat = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'chat'
    }
});

let timestamp = new Date().toISOString().split('T')
timestamp[1] = timestamp[1].split('.')[0]
const now = timestamp.join(' ')

router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.post('/', (req, res) => {

    Chat.select('*').from('users as A')
        .join('genders as B', 'B.GenderID', '=', 'A.Gender')
        .where({ Username: req.body.Username, Password: req.body.Password })
        .then(data => {
            if (data.length == 1) {
                let user = data[0]
                res.send({
                    UserID: user.UserID,
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Gender: user.Gender,
                    GenderName: user.GenderName,
                })
            } else {
                res.status(500).json({ errorMsg: 'Invalid Username/Password' })
            }
        })
})

module.exports = router;

