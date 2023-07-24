import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

router.use(cors());

app.listen(5000, () => {
  console.log('server running')
}).on('error', (err) => {
  console.error("Ошибка при запуске сервера: ", err.message);
});

app.get('/', (req, res) => {
  res.send('Hello world');
});


const contactEmail = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'adamsuper148@gmail.com',
        pass: 'nkhgbdeaxqbbmcxp',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

contactEmail.verify(error => {
    if(error) {
        console.log(error);
    } else {
        console.log('ready to send');
    }
});

router.post('/contact', (req, res) => {
    const name = req.body.fullName;
    const email = req.body.email;
    const message = req.body.message;

    const mail = {
        from: name,
        to: 'adamsuper148@gmail.com',
        subject: `New Message From ${name}`,
        html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>`
    };

    contactEmail.sendMail(mail, error => {
        if(error) {
            res.json(error);
            console.log('error',  res.json(error));
        } else {
            res.json({
                code: 200, status: 'Message sent'
            });
        };
    });
});