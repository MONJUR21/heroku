const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
// const bodyParser=require("body-parser")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  const existingUser = await collection.findOne({ name: data.name });
  if(req.body.password.length<=8)
  {
    res.redirect("/signup");
  }
  

  else if (existingUser) {
    res.redirect('/signup');
  } else {
    const hashedPassword=await bcrypt.hash(data.password,10);

    data.password=hashedPassword;
    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.render("login");
  }
});
app.post("/login",async (req,res)=>{
    try {
        const check= await collection.findOne({name:req.body.username});
        if(!check){
            res.send("Username cannot found");
        }
        const isPasswordMatch=await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch)
        {
            res.render("home");
        }
        else{
            res.send("Wrong password")
        }
    } catch{
        res.send("Wrong password");
    }
})
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
