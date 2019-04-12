const express = require('express');
const stripe = require('stripe')(require('./config.json').STRIPE_KEY);

let app;

const createPaymentSession = async () => {
    return new Promise((resolve, reject) => {
        stripe.checkout.sessions.create(
            {
                success_url: "http://localhost:3000/paymentComplete.html",
                cancel_url: "http://localhost:3000",
                payment_method_types: ['card'],
                line_items: [{
                    amount: 1110,
                    quantity: 1,
                    name: 'Item',
                    currency: 'eur',
                    images: ['https://via.placeholder.com/150']
                }]
            },
            {stripe_version: '2018-11-08; checkout_sessions_beta=v1'},
            function(err, session) {
                if (err) reject(err);
                resolve(session);
            }
        );
    })
    
}

const setupServer = () => {
    app = express();
    app.post('/api/createPaymentSession', async (req, res) => {
        const session = await createPaymentSession();
        res.send(session);
    })
    app.use(express.static('public'));
}

const startServer = () => {
    app.listen(3000, () => console.log('Started on 3000'));
}

const main = () => {
    setupServer();
    startServer();
}

main();