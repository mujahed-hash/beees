const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category')
const Category = require('../db/model/category');


router.get('/', categoryController.getCategory);
router.get('/:id', async (req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category){
        return res.status(500).json({messaage:"Category with the given ID is not found"})
    }
    else{
        res.status(200).send(category);
    }
})
router.post('/', categoryController.postCategory);

router.delete('/:id', (req,res)=>{
     Category.findByIdAndRemove(req.params.id).then( category =>{
       if(category){
           res.status(201).json({status: "success", message: "category is deleted successfully"});   
          }
          else{
           return res.status(404).json({error: 'could not find category'})
          }
     }).catch(err=>{
         return res.status(400).json({error:err});
     });
});

router.put('/:id',(req,res,next)=>{
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, categories)=>{

        if(err){
            res.status(500).json({error:err})
        }
        else{
            res.send(categories)
        }
    }
    )
})
router.get('/get/count', async (req,res)=>{
    const categoryCount = await Category.countDocuments();

    if(!categoryCount) return res.status(404).json('No categories')

    res.send({
      categoryCount: categoryCount
    });
});
module.exports = router;