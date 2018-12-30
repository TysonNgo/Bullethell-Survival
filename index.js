const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port || 8080;

app.use(express.static(path.join(__dirname, 'node_modules/phaser/dist/')));
app.use('/assets', express.static(path.join(__dirname, 'assets/')));
app.use('/', express.static(path.join(__dirname, 'dist/')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => console.log(`listening on port ${port}`))