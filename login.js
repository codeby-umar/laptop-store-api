const express = require('express');
const app = express();


const author = [
    {
        "id" : 1,
        "login" : "umar@gmail.com",
        "password" : 1213232
    },
    {
        "id" : 2,
        "login" : "umar@gmail.com",
        "password" : 1213232
    },
    {
        "id" : 3,
        "login" : "umar@gmail.com",
        "password" : 1213232
    }
]

app.get('/' , (req ,res) =>{
    res.send("Salom o'zingga xush kelding ?")
});

app.get('/login' , (req , res)=>{
    res.json(author)
});


const port = process.env.PORT || 8000;
app.listen(port , (req , res)=>{
    console.log(`Sizning yaratgan websiteingiz ${port} da ishlamoda ...`)
})