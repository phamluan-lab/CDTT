import React from 'react'
import Slider from './Slider';
import ProductNew from './ProductNew';
import ProductSale from './ProductSale';
import PostSale from './PostSale';
import ProductCategory from './ProductCategory';
import PostNew from './PostNew';

const Home = () => {
  return (
    <>
    
         <section className='slider mt-5'>
          <div className='flex md:flex-row flex-col gap-6'>
            <div className='basis-8/12'>
             <Slider />
            
            </div>
            <div className='basis-4/12'>
            <PostSale />
            </div>
          </div>
        </section>
        <ProductNew />
        <ProductSale />
        <ProductCategory />
        <PostNew />
       
        
    </>
  )
}

export default Home
