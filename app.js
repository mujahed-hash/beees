const express = require('express');
const cors = require('cors');
const {mongoose} = require('./db/mongoose');
const app =  express();
var path = require('path');
const studentRoute = require('./routes/routes')
const categoryRoute = require('./routes/category');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 3000;
app.use('/pics', express.static(path.join('pics')))
app.use('/api', studentRoute);
app.use('/api/category', categoryRoute);




//error handler
// app.use((err, req, res) => {
//     if (err.name === 'ValidationError') {
//         var ValErrors = [];
//         Object.keys(err.errors).forEach(key=>ValErrors.push(err.errors[key].message));
//         res.status(422).send(ValErrors)
//     }
    
// });
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, (req,res)=>{
    console.log(`running on port ${port}`)
})