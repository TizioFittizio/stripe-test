const express = require('express');

const app = express();

app.post('/api/payment', (req, res) => {
    res.sendStatus(201);
})

app.use(express.static('public'));

app.listen(3000, () => console.log('Started on 3000'));