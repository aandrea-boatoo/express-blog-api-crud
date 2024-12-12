const express = require("express");
const app = express();
const PORT = 3000;
const posts = require('./data/post');
const postRouter = require('./route/postRoute.js');
// Asset statici
app.use(express.static('public'));

// GESTIONE ERRORI
const errorsHandler = require("./middlewares/errorHandler.js");
const errorNotFound = require("./middlewares/errorNotFound.js");
const corsPolicy = require("./middlewares/corsPolicy.js");

app.use(corsPolicy);
app.use(errorsHandler);
app.use(notFound);

// Rotte
app.get('/', (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/pages" });
})


// COLLEGAMENTO ROUTERS
app.use('/posts', postRouter);


// Json BODY
app.use(express.json());

app.get('/bacheca', (req, res) => {
    const post = req.query.titolo;
    let response = {
        totalCount: posts.length,
        data: [...posts],
        page: 1,
        status: "ok",
    }
    res.json(response);
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Pages not found(error404)</h1>');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})