import React from 'react'
import { UrlImg} from './config';
import { NavLink } from 'react-router';
<<<<<<< HEAD
=======
import FavoriteButton from './pages/frontend/components/FavoriteButton';
>>>>>>> 6358b48 (cap nhat code)

const ProductCard = (props) => {
  if (!props.product) return null; 
  const pro = props.product;
<<<<<<< HEAD
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
=======
  const discountPercentage = pro.price_root > pro.price_sale
    ? Math.round((1 - pro.price_sale / pro.price_root) * 100)
    : 0;

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1'>
      <NavLink to={"/san-pham/" + pro.slug}>
        <div className='hinh relative'>
          <img src={UrlImg + "product/" + pro.thumbnail} className='w-full object-cover '
          alt={pro.thumbnail}/>
          
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{discountPercentage}%
            </div>
          )}
          <div className="absolute top-2 right-2">
            <FavoriteButton productId={pro.id} />
          </div>
        </div>
        
        <div className='p-4'>
          <h3 className='text-lg font-semibold mb-2 line-clamp-2'>{pro.name ?? "Tên sản phẩm"}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-600 text-xl font-semibold">{pro.price_sale?.toLocaleString('vi-VN')}₫</span>
            {pro.price_root > pro.price_sale && (
               <span className="line-through text-gray-500 text-sm">{pro.price_root?.toLocaleString('vi-VN')}₫</span>
            )}
          </div>
        </div>
      </NavLink>
>>>>>>> 6358b48 (cap nhat code)
    </div>
  )
}
export default ProductCard;





