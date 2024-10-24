import axios from './axios';
import React, { createContext, useEffect, useState } from 'react'


export const ProductContext  = createContext();

 const Context = (props) => {
    const [products,setProducts] =  useState(
        JSON.parse(localStorage.getItem("products")) || null
    );

    const getproducts = async ()=>{
    try{
        const {data} = await axios("/products");
        setProducts(data);
    }
    catch(err){
        console.log(err);
    }
    };

    useEffect(()=>{
    getproducts();
  
    },[])

    console.log(products);
    

  return (
    <ProductContext.Provider value={ [products,setProducts] }>
       {props.children}
    </ProductContext.Provider>
    )
}
export default Context;