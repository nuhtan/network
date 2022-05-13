const express = require('express');
const app = express();
const port = 8003;

app.get('/', (req, res) => {
	res.sendFile('dist/index.html', { root: __dirname } );
});

app.use(express.static('dist'));

app.listen(port, "0.0.0.0" , () => {
	console.log(`Server listening on port ${port}`);
});
