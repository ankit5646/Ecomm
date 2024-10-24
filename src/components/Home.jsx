import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Loading } from './Loading'
import axios from '../utils/axios';

const Home = () => {

const [products] = useContext(ProductContext);
const {search}  = useLocation();
const category = decodeURI(search.split("=")[1]);

const [filter,setfilter]=useState(null);

const getproductcategory = async()=> {

  try {
    const{data} = await axios.get(`/products/category/${category}`)
    setfilter(data);
  } catch (error) {
    console.log(error);
    
  }
};

useEffect((()=>{
  if(!filter || category == 'undefined'){
    setfilter(products);
  }
    if(category != 'undefined'){
      setfilter(products.filter((p)=>p.category == category));
    }
}),[category,products])



  return products ?  ( 
 <>

    <Nav/>

      <div className='w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto'>

        {filter && filter.map((p,i)=> <Link key={p.id} to={`/details/${p.id}`} className='mr-3 mb-3 card p-5 border shadow rounded-sm w-[20%] h-[35vh] flex flex-col items-center justify-center'>

                                <div className="hover:scale-105 w-full mb-5 h-[80%] bg-contain bg-no-repeat  bg-center bg-[]"
            
                                  style={{
                                backgroundImage: `url(${p.image})`,
                                          }}></div>

                                <h1>{p.title}</h1>  

                              </Link>)
          }

      </div>
  </>
              )
   : (<Loading />)
}

export default Home