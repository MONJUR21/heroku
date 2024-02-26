const { name } = require("ejs");
const express = require("express");
const app = express();
const port = process.env.port|3000;

app.set("view engine","ejs");

app.use(express.static("./public"))

app.get("/", (req, res) => {
  res.render("index",{V: "Monjur"});
});
// app.use((req,res,next)=>{
//   console.log("Monjur");
// });
app.get("/myName", (req, res) => {
  // console.log(req);
  res.send("<h3>Md. Monjur rahaman</h3>");
});
app.get("/myName/:username", (req, res) => {
  // console.log(req);
  res.send(`<h2>${req.params.username}</h2>`);
});
app.get('/simulate-error', (req, res, next) => {
  const err = new Error('Simulated error');;
  next(err);
});

app.use((error1,req, res, next) => {
  res.status(500);
  console.log(error1.message);
  res.send(`Error: ${error1.message}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
