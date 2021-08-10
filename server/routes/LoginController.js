const express = require('express')

const cors = require('cors')

const router = express.Router();

const Chat = require('../connections');

router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.post('/', (req, res) => {

    Chat.select('*').from('users as A')
        .join('genders as B', 'B.GenderID', '=', 'A.Gender')
        .where({ Username: req.body.Username, Password: req.body.Password, 'A.DeletedDate': null })
        .then(data => {
            if (data.length == 1) {
                let user = data[0]
                delete user.Password
                res.send(user)
            } else {
                res.status(500).json({ errorMsg: 'Invalid Username/Password' })
            }
        })
})

module.exports = router;

