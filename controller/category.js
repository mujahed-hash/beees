const Category = require('../db/model/category');

exports.getCategory= async (req,res)=>{
   const categories = await Category.find();

   res.status(201).json(categories);
}

exports.postCategory = async (req,res)=>{
 try{
    const {name} = req.body;
    const {icon} = req.body;
    const {color} = req.body;
    const createCategory = new Category({
        name,
        icon,
        color
    });

   const createdCategory= await createCategory.save();

   res.status(201).json({
       createCategory:{
            ...createdCategory._doc
       }
   })
 }
 catch(error){
   console.error(error)
   console.log('caused error', error);
   res.send(error)
 }
}