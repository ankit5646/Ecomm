import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Loading } from './Loading';
import { ProductContext } from '../utils/Context';

const Details = () => {
   const navigate = useNavigate();
   const[products,setProducts]=useContext(ProductContext);

   const {id} = useParams();

   const [product,setproduct]=useState(null);
   
   const ProductDeleteHandler = (id)=>{
      const FilterProducts = products.filter((p)=> p.id !== id);
      setProducts(FilterProducts);
      localStorage.setItem("products",JSON.stringify(FilterProducts));
      navigate('/');
      

   }

   const editHandler = ()=>{
    
    
    navigate('/');
   }
  
  useEffect(()=>{
    if(!product){
      setproduct( products.filter( (p) => p.id == id)[0]);
    }
  },[])

  return product ? (
    <>
      <div className='w-[70%] h-full flex items-center  m-auto py-[10%]'>
        <img className='w-[55%] h-[75%] object-contain m-5' src={product.image} alt="" />
        <div className="content w-[40%]">
          <h1 className='text-2xl mb-5'>{product.title}</h1>
          <h2 className='font-mono m-3 text-blue-300'>${product.price}</h2>
          <p className='font-light m-3 mb-[5%]'>{product.description}</p>

          <Link  to={`/edit/${product.id}`}  className='py-3 px-5 border rounded border-blue-400 text-sky-400 mx-5'>Edit</Link>
          <button onClick={()=> ProductDeleteHandler(product.id)} className='py-3 px-5 border rounded border-red-400 text-red-400 mx-5'>Delete</button>

        </div>

      </div>
    </>
  ) : (
    <Loading/>
  )
}

export default Details