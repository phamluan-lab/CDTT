import React from 'react'
import { UrlImg} from './config';
import { NavLink } from 'react-router';

const ProductCard = (props) => {
  if (!props.product) return null; 
  const pro = props.product;
  return (
    <div>
      <div className='hinh'>
        <NavLink to={"/san-pham/" + pro.slug}>
        <img src={UrlImg + "product/" + pro.thumbnail} className='w-full'
        alt={pro.thumbnail}/>
        </NavLink>
      </div>
      <div className='w-48 mt-2'>
        <h3 className='text-xl font-bold'>{pro.name ?? "Tên sản phẩm"}</h3>
       <span className="text-red-600 text-xl font-semibold mr-10">{pro.price_sale}₫</span>
        <span className="line-through text-gray-500">{pro.price_root}₫</span>
      </div>
    </div>
  )
}
export default ProductCard;





