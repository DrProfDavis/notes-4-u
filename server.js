const express = require('express');
const app = express();
const PORT = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const htmlRouter = require("./routes/html.js");
const apiRouter = require("./routes/api.js");

app.use(htmlRouter);
app.use("/api", apiRouter);

app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
);