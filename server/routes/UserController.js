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

router.use(cors()) //Cross-Origin Resource Sharing (CORS)
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

//use router instead of app

router.post('/details', (req, res) => {
    Chat.select(
        'A.UserID',
        'A.FirstName',
        'A.MiddleName',
        'A.LastName',
        'A.Gender',
        'B.GenderName',
        'A.DeletedDate'
    ).from('users as A')
        .join('genders as B', 'B.GenderID', '=', 'A.Gender')
        .where('UserID', 'IN', req.body)
        .then(response => {
            res.send(response)
        }).catch(err => {
            console.log(err)
        })
})

router.patch('/', (req, res) => {
    let UserID = req.body.UserID
    let values = req.body
    delete values.UserID
    delete values.GenderName
    Chat.table('users')
        .where("UserID", UserID)
        .update(values)
        .then(() => {
            res.send('Success')
        })
})


router.delete('/:UserID', (req, res) => {
    Chat.table('users')
        .where("UserID", req.params.UserID)
        .update({ DeletedDate: now })
        .then(() => {
            res.send('Success')
        })
})

router.put('/:UserID', (req, res) => {
    Chat.table('users')
        .where("UserID", req.params.UserID)
        .update({ DeletedDate: null })
        .then(() => {
            res.send('Success')
        })
})
module.exports = router;

