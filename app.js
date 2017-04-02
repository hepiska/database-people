const express = require('express');
const app = express();
const bodyParser=require('body-parser')
let index=require('./routers/index');

app.use(bodyParser.urlencoded({extended:true}));
app.use('/',index);


app.listen(3000, () => {
  console.log("Server berjalan...");
});
