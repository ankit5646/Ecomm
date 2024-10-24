import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../utils/Context';
import {nanoid} from "nanoid";
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const[products,setProducts]=useContext(ProductContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [product,setproduct]=useState({
        title: "",
        image: "",
        category: "",
        price: "",
        description: "",
    }
        
    );

    const changeHandler = (e)=>{
        //console.log(e.target.name, e.target.value);
        setproduct({...product,[e.target.name]:e.target.value})
        
    }
   


    useEffect(()=>{
        setproduct(products.filter((p)=>p.id == id)[0]); 
    },[id])
    console.log(product);

    const AddProductHandeler = (e) => {
        e.preventDefault();
  
        if(
             product.image.length < 3||
            product.title.trim().length < 3||
            product.category.trim().length < 3||
            product.price.trim() < 0||
            product.description.trim().length < 10){
          alert("please provide valid details");
          return;
        }
  
        

        const pi = products.findIndex((p)=> p.id == id);
        const copyProduct = [...products];
        copyProduct[pi] = {...products[pi],...product};
        console.log(product, pi);
        

     setProducts(copyProduct);
     localStorage.setItem("products",JSON.stringify(copyProduct));
     navigate('/');
     
 }
      

  return (
    <div>
        <div>
    <form 
        onSubmit={AddProductHandeler}
        className='p-[5%] w-screen h-screen flex flex-col items-center' action=""> 
        <h1 className='text-3xl m-5'>Add New Product</h1>

        <input 
         type="url" 
         placeholder='image URL' 
         className='text-xl w-[50%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         name="image"
         onChange={changeHandler}
         value={product && product.image}
         />

        <input 
         type="text" 
         placeholder='title' 
         className='text-xl w-[50%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3'
         name="title" 
         onChange={changeHandler}
         value={product && product.title}
         />

         <div className='w-1/2 flex justify-between'>
         <input 
         type="text" 
         placeholder='Category' 
         className='text-xl w-[40%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         name="category"
         onChange={changeHandler}
         value={product && product.category}
         />

        <input 
         type="number" 
         placeholder='price' 
         className='text-xl w-[40%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         name="price" 
         onChange={changeHandler}
         value={product && product.price}
         />
         </div>

         <textarea  placeholder='Enter product discription.....' rows="8"
         className='text-xl w-[50%] bg-zinc-100 rounded-xl py-1 px-5 font-light mb-3' 
         name='description'
         onChange={changeHandler}
         value={product && product.description}
         ></textarea>

    <div className="w-1/2">
    <button  className=' py-3 px-5 border rounded border-blue-400 text-sky-400' href="/create">Add Edit to  product</button>
    </div>
        
    </form>

    
      
    </div>
    </div>
  )
}

export default Edit