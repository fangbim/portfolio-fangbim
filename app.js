const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/home.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html')
})

app.post('/', (req, res) => {

    const myEmail = 'fajaranggitoabimanyu@gmail.com';
    const sandiApp = 'hpgaxtnbwjflzehe';

    const yourName = req.body.yourName;
    const email = req.body.email;
    const yourSubject = req.body.yourSubject;
    const msg = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: myEmail,
            pass: sandiApp
        }
    });

    var mailOptions = {
        from: email,
        to: myEmail,
        subject:'[FROM_PORTFOLIO]' + yourSubject,
        text: msg  + 
            + 'from: ' + email + ', Name:' + yourName
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });

    res.sendFile(__dirname + '/home.html')
})


app.listen(port, () => console.log(`Running on server http://localhost:${port}`))