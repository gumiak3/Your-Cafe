"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./routes/auth");
var app = (0, express_1.default)();
// import routes
app.use("/api/user/", auth_1.router);
app.get("/", function (req, res) {
    res.send("Server is running");
});
app.listen(5000, function () { return console.log("Server running on port 5000"); });
