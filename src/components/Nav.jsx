import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context';
import { Link } from 'react-router-dom';

const Nav = () => {


const [products] = useContext(ProductContext);

let distict_category = products && products.reduce((acc,cv)=>[...acc,cv.category],[]);

distict_category = [...new Set(distict_category)];


  return (
    
        <nav className='w-[20%] h-full bg-slate-100 flex flex-col items-center pt-5'>
       <a className='py-3 px-5 border rounded border-blue-400 text-sky-400' href="/create">Add new product</a>
       <hr className='my-3 w-[80%]' />
       <h1 className='text-2xl font-light w-[80%] mb-5'>Categories Filter</h1>

       <div className=' w-[80%]'>

        {distict_category.map((c,i)=> 
        <Link key={i} to={`/?category=${c}`} className=' mb-3 flex items-center'>
        <span className='block w-[10px] h-[10px] bg-red-200 rounded-full mx-2'></span> 
          {c}
        </Link>
        )}

       </div>
      </nav>
    
  )
}

export default Nav