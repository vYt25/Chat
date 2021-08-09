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
    Chat.table('messages').insert(
        {
            Sender: req.body.from,
            Reciever: req.body.to,
            Message: req.body.msg,
            CreatedDate: now,
            UpdatedDate: now
        }
    ).then((data) => {
        res.send('success')
    })
})

router.get('/', (req, res) => {
    let param = req.query.users.split(",")
    Chat.select('*').from('messages')
        .whereIn('Sender', param)
        .whereIn('Reciever', param)
        .then(data => {
            res.send(data)
        })
})

module.exports = router;

