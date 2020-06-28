const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

require('./routes/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
