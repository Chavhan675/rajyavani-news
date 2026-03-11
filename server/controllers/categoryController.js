import Category from "../models/Category.js"

export const createCategory = async (req,res)=>{

 try{

  const {name,description,parent,featured} = req.body

  const exists = await Category.findOne({name})

  if(exists){
   return res.status(400).json({message:"Category already exists"})
  }

  const category = new Category({
   name,
   description,
   parent: parent || null,
   featured: featured || false
  })

  await category.save()

  res.status(201).json(category)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const getCategories = async (req,res)=>{

 try{

  const categories = await Category.find({status:"active"})
  .sort({name:1})

  res.json(categories)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const getSingleCategory = async (req,res)=>{

 try{

  const category = await Category.findOne({slug:req.params.slug})

  if(!category){
   return res.status(404).json({message:"Category not found"})
  }

  res.json(category)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const updateCategory = async (req,res)=>{

 try{

  const category = await Category.findById(req.params.id)

  if(!category){
   return res.status(404).json({message:"Category not found"})
  }

  const {name,description,featured,status} = req.body

  category.name = name || category.name
  category.description = description || category.description
  category.featured = featured ?? category.featured
  category.status = status || category.status

  await category.save()

  res.json(category)

 }catch(error){

  res.status(500).json({message:error.message})

 }

}

export const deleteCategory = async (req,res)=>{

 try{

  const category = await Category.findById(req.params.id)

  if(!category){
   return res.status(404).json({message:"Category not found"})
  }

  await category.deleteOne()

  res.json({message:"Category deleted"})

 }catch(error){

  res.status(500).json({message:error.message})

 }

}