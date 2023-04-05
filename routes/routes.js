const express = require('express');
const storage = require('../helper/storage');
const studentController = require('../controller/student');
const router = express.Router();
const Student = require('../db/model/student');
const Category = require('../db/model/category');
const mongoose = require('mongoose');

router.post('/student', storage, studentController.postStudent);
router.get('/student', studentController.getStudent);
router.get('/studentcatid', studentController.getStudentByCatergory);

router.delete('/student/:id', (req,res)=>{

    if(!mongoose.isValidObjectId(req.params.id)){
      res.status(400).json('invalid product')
    }
    Student.findByIdAndRemove(req.params.id).then(student=>{
       if(student){
         return res.status(200).json({status:'success', message:'student deleted successfully'})
       }
        res.status(400).json({status:'failed', message:'student not found'})
     }).catch(err=>{
       res.status(500).json({success:'failed', error:err})
     })
  });
  router.get('/student/:id', async (req,res)=>{
    const student = await Student.findById(req.params.id).populate('category');

    if(!student){
        return res.status(500).json({messaage:"Student with the given ID is not found"})
    }
    else{
        res.status(200).send(student);
    }
})
  router.put('/student/:id',storage,async(req,res,next)=>{
    try{
    //   const category = await Category.findById(req.body.category);
    // if(!category){
    //    return res.status(400).json({error:'invalid category'})
  
    // }
    const student = await Student.findById(req.params.id);
    if(!student) return res.send('No student found to update');
    let imagePath
    const file = req.file;
    if(file){
    const fileName= file.filename;
    const basePath =`${req.protocol}://${req.get('host')}/pics/`;
    imagePath = `${basePath}${fileName}`;
     }
    else{
    imagePath = student.image
    }
    const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
       {
        category:req.body.category,
          name:req.body.name,
          dob:req.body.dob,
          image:imagePath,
          course:req.body.course,
          passingyear:req.body.passingyear,
          duration:req.body.duration,
      
      },
      {new:true}
      )
     const students = await updatedStudent.save();
     
     res.send(students);
    }
    catch(error){
      console.error(error)
      res.send('server error')
    }
})
module.exports = router;