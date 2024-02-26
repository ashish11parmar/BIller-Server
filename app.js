const express = require('express');
const db = require('./db/connection');
const PORT = process.env.PORT || 3001;
const indexRouter = require('./router/index.router');
const app = express();

app.use(express.json());

//_______MainRoute________//
app.use('/', indexRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})