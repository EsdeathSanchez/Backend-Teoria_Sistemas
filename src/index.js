const express = require("express");

const app = express();

app.set("port",400);
app.listen(app.get("port"));