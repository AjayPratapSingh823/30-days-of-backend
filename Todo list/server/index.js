const express= require('express');
const app =express();
const mongoose =require('mongoose');
const cors=require('cors');
const TodoModel=require('./model/TodoModel');
//middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test');
//Route
app.post('/add',(req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task:task
    }).then(result=>res.json(result))
      .catch(err=>res.json(err));
})


//route for getting task in home page
app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

//route for update todo list
app.put('/update/:id',(req,res)=>{
    const {id}=req.params
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
//route for delete task
app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
//Run Server
const PORT =3001;
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
})