import React from 'react'
import Thanhtoan1 from '../../assets/thanhtoan1.webp';
import Payment2 from '../../assets/payment2.webp';
import Payment3 from '../../assets/payment3.webp';
import Logo from '../../assets/logo.webp';
const Footer = () => {
  return (
    <footer className="myfooter bg-violet-500 text-white pt-7">
      <section className='mb-7'>
        <div className="container mx-auto md:px-6 px-2">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
            <div className="basis-4/12">
              <img src={Logo} className='w-full' alt="" />
              <p>Hệ thống cửa hàng BeanMobile chuyên bán lẻ điện thoại, máy tính laptop, smartwatch, smarthome, phụ kiện chính hãng - Giá tốt, giao miễn phí.</p>
              <h3 className='text-xl uppercase text-yellow-500'>Hình thức thanh toán</h3>
              <div className="grid grid-cols-3 gap-5">
                <img src={Thanhtoan1} className='w-full' alt="" />
                <img src={Payment2} className='w-full' alt="" />
                <img src={Payment3} className='w-full' alt="" />
              </div>
            </div>

            <div className="basis-4/12">
              <h3 className='text-xl uppercase text-yellow-500 py-3'>Chính sách</h3>
              <ul>
                <li><a className='block my-3' href="">Chính sách thành viên</a></li>
                <li><a className='block my-3' href="">Chính sách thanh toán</a></li>
                <li><a className='block my-3' href="">Hướng dẫn mua hàng</a></li>
                <li><a className='block my-3' href="">Qùa tặng tri ân</a></li>
                <li><a className='block my-3' href="">Chính sách thành viên</a></li>
              </ul>

            </div>
            <div className="basis-3/12">
              <h3 className='text-xl uppercase text-yellow-500 py-3'>Thông tin chung</h3>
              <ul>
                <li><a className='block my-3' href="">Trang chủ</a></li>
                <li><a className='block my-3' href="">Giới thiệu
                </a></li>
                <li><a className='block my-3' href="">Sản phẩm</a></li>
                <li><a className='block my-3' href="">Tin tức</a></li>
                <li><a className='block my-3' href="">Liên hệ</a></li>
              </ul>
            </div>
            <div className="basis-3/12">
              <h3 className='text-xl uppercase text-yellow-500 py-3'>Hỗ trợ khách hàng</h3>
              <ul>
                <li><a className='block my-3' href="">Trang chủ</a></li>
                <li><a className='block my-3' href="">Giới thiệu</a></li>
                <li><a className='block my-3' href="">Sản phẩm</a></li>
                <li><a className='block my-3' href="">Tin tức</a></li>
                <li><a className='block my-3' href="">Liên hệ</a></li>
              </ul>
            </div>
          </div>

        </div>
      </section>
      <section className='border-t-2 border-amber-100 '>
        <div className="container mx-auto py-3 text-center">
          Thiết kế bởi: Phạm Công Luận
        </div>
      </section>
    </footer>
  )
}

export default Footer
