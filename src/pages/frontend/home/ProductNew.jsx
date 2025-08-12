import React, { useEffect, useState } from 'react'
import ProductCard from '../../../ProductCard';
import productService from '../../../services/productService';
const ProductNew = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const products = await productService.productnew(8);
      console.log("Kết quả từ API:", products);
      setProducts(products);
    })();
  }, []);
  return (
    <>
      <section className='mt-5'>
          <h1 className='text-2xl text-center py-4'><strong>Sản phẩm mới</strong>
          </h1>
          <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
            {products.map(function (item,index){
              return <ProductCard key={index} product={item} />
            })}
   
          </div>

        </section>
    </>
  )
}

export default ProductNew
