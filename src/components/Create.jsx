import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context';
import {nanoid} from "nanoid";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {
    const navigate = useNavigate();
    const[products,setProducts]=useContext(ProductContext);
    const [title,settitle]=useState("");
    const [image,setimage]=useState("");
    const [category,setcategory]=useState("");
    const [price,setprice]=useState("");
    const [description,setdescription]=useState("");

    const AddProductHandeler = (e) => {
      e.preventDefault();

      if(title.trim().length < 3 ||title.trim().length < 3|| category.trim().length < 3 || price.trim() <= 0 || description.trim().length < 10){
        alert("please provide valid details");
        return;
      }

      const product = {
        id : nanoid(),
        title, 
        image, 
        category, 
        price, 
        description
      };
      setProducts([...products, product]);

      localStorage.setItem("products",JSON.stringify([...products, product]))
      toast.success("Product Added!")
      navigate('/');
    }
    
    
  return (
    <div>
    <form 
        onSubmit={AddProductHandeler}
        className='p-[5%] w-screen h-screen flex flex-col items-center' action=""> 
        <h1 className='text-3xl m-5'>Add New Product</h1>

        <input 
         type="url" 
         placeholder='image URL' 
         className='text-xl w-[50%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         onChange={(e) => setimage(e.target.value)}
         value={image}
         />

        <input 
         type="text" 
         placeholder='title' 
         className='text-xl w-[50%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         onChange={ (e)=> settitle(e.target.value)}
         value={title}
         />

         <div className='w-1/2 flex justify-between'>
         <input 
         type="text" 
         placeholder='Category' 
         className='text-xl w-[40%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         onChange={(e) => setcategory(e.target.value)}
         value={category}
         />

        <input 
         type="number" 
         placeholder='price' 
         className='text-xl w-[40%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         onChange={ (e)=> setprice(e.target.value)}
         value={price}
         />
         </div>

         <textarea  placeholder='Enter product discription.....' rows="8"
         className='text-xl w-[50%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         onChange={(e) => setdescription(e.target.value)}
         value={description}
         ></textarea>

    <div className="w-1/2">
    <button className=' py-3 px-5 border rounded border-blue-400 text-sky-400' href="/create">Add new product</button>
    </div>
        
    </form>

    
      
    </div>
  )
}

export default Create