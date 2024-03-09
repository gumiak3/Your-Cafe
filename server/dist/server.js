"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./routes/auth");
const app = (0, express_1.default)();
// import routes
app.use("/api/user/", auth_1.router);
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(5000, () => console.log("Server running on port 5000"));
//# sourceMappingURL=server.js.map
