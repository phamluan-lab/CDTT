// File: src/pages/frontend/home/CartPage.jsx

import React, { useState, useEffect } from "react";
import { useCart } from "../../frontend/home/CartContext";
import { UrlImg } from "../../../config";
import cartService from "../../../services/cartService";
import orderService from "../../../services/orderService";
import momoService from "../../../services/momoService";
import Breadcrumb from '../home/BreadCrumb';
import { useNavigate } from 'react-router';
import MomoPayment from '../../../components/MomoPayment';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  // State cho thông tin khách hàng
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showMomoPayment, setShowMomoPayment] = useState(false);

  // Lấy user_id khi component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          if (user && user.id) {
            setUserId(user.id);
            // Tùy chọn: điền thông tin người dùng vào form nếu có
            setCustomerName(user.name || '');
            setCustomerEmail(user.email || '');
            setCustomerPhone(user.phone || '');
            setCustomerAddress(user.address || '');
          }
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng từ localStorage:", err);
      }
    };
    fetchUserId();
  }, []);

  const validateForm = () => {
    if (!customerName.trim()) {
      setError('Vui lòng nhập họ và tên');
      return false;
    }
    if (!customerPhone.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return false;
    }
    if (!customerEmail.trim()) {
      setError('Vui lòng nhập email');
      return false;
    }
    if (!customerAddress.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng');
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    setError(null);
    setSuccessMessage(null);

    if (cartItems.length === 0) {
      setError('Giỏ hàng trống. Vui lòng thêm sản phẩm.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (paymentMethod === 'MoMo') {
      setShowMomoPayment(true);
      return;
    }

    const orderData = {
      user_id: userId,
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
      note: customerNote,
      paymentMethod: paymentMethod,
      products: cartItems.map(item => ({
        product_id: item.id,
        price_root: item.price_root,
        qty: item.quantity
      }))
    };

    setLoading(true);

    try {
      const response = await orderService.create(orderData);
      
      if (response.success) {
        setSuccessMessage("Đặt hàng thành công! Chúng tôi sẽ xử lý đơn hàng ngay.");
        // Xóa từng sản phẩm trong giỏ hàng
        cartItems.forEach(item => {
          removeFromCart(item.id);
        });
        navigate('/gio-hang');
      } else {
        setError(response.message || 'Có lỗi xảy ra khi đặt hàng');
      }
    } catch (error) {
      console.error('Lỗi đặt hàng:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Có lỗi xảy ra trong quá trình đặt hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleMomoPayment = async () => {
    if (!validateForm()) {
      return;
    }

    const orderData = {
      user_id: userId,
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      address: customerAddress,
      note: customerNote,
      paymentMethod: 'MoMo',
      products: cartItems.map(item => ({
        product_id: item.id,
        price_root: item.price_root,
        qty: item.quantity
      }))
    };

    try {
      const response = await momoService.createPayment({
        ...orderData,
        amount: getTotalPrice(),
        orderInfo: `Thanh toan don hang - ${customerName}`
      });

      if (response.payUrl) {
        window.location.href = response.payUrl;
      } else {
        setError('Không thể tạo URL thanh toán');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi xử lý thanh toán MoMo');
      console.error('MoMo payment error:', error);
    }
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', to: '/' },
    { label: 'Giỏ hàng', to: '/gio-hang' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <h2 className="text-2xl font-bold border-l-4 border-yellow-400 pl-4 mb-4">
        GIỎ HÀNG CỦA BẠN
      </h2>

      <div className="bg-gray-100 p-3 mb-4 text-sm text-gray-700 rounded flex items-center justify-between">
        <div className="bg-yellow-400 w-6 h-6 mr-2 rounded-full"></div>
        <p className="flex-1">
          Mua tối thiểu <strong>2.400.000₫</strong> để được <strong>MIỄN PHÍ VẬN CHUYỂN</strong>
        </p>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <div className="grid grid-cols-6 bg-gray-100 py-2 px-4 text-sm font-semibold">
          <span className="col-span-3">THÔNG TIN SẢN PHẨM</span>
          <span className="text-center">ĐƠN GIÁ</span>
          <span className="text-center">SỐ LƯỢNG</span>
          <span className="text-right">THÀNH TIỀN</span>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center py-8">Giỏ hàng của bạn trống.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-6 items-center py-4 px-4 border-b">
              <div className="col-span-3 flex items-center space-x-4">
                <img
                  src={UrlImg + "product/" + item.thumbnail}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <button
                    className="text-sm text-blue-500 hover:underline mt-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>

              <p className="text-center text-red-600 font-bold">{item.price_root.toLocaleString()}₫</p>

              <div className="flex items-center justify-center space-x-2">
                <button
                  className="w-6 h-6 bg-gray-200 rounded text-center"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="w-6 h-6 bg-gray-200 rounded text-center"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className="text-right text-red-600 font-bold">
               {((item.price_root ?? 0) * (item.quantity ?? 0)).toLocaleString()}₫

              </p>
            </div>
          ))
        )}
      </div>

      {/* Form thông tin đặt hàng */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Thông tin nhận hàng & Thanh toán</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="customerName">Họ và tên *</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="customerPhone">Số điện thoại *</label>
            <input
              type="tel"
              id="customerPhone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="customerEmail">Email *</label>
            <input
              type="email"
              id="customerEmail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="customerAddress">Địa chỉ giao hàng *</label>
            <input
              type="text"
              id="customerAddress"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2" htmlFor="customerNote">Ghi chú</label>
            <textarea
              id="customerNote"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="mt-4">
          <label className="block text-gray-700 mb-2">Phương thức thanh toán</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="paymentMethod"
                value="Chuyển khoản"
                checked={paymentMethod === 'Chuyển khoản'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Chuyển khoản</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="paymentMethod"
                value="Thu hộ (COD)"
                checked={paymentMethod === 'Thu hộ (COD)'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Thu hộ (COD)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="paymentMethod"
                value="MoMo"
                checked={paymentMethod === 'MoMo'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">Thanh toán qua MoMo</span>
            </label>
          </div>
        </div>
      </div>

      {/* Tổng tiền và nút thanh toán */}
      <div className="flex justify-between items-center mt-6">
        <a href="/" className="text-blue-600 hover:underline">Tiếp tục mua hàng</a>
        <div className="text-right">
          <p className="text-lg font-bold mb-2">
            TỔNG TIỀN:{" "}
            <span className="text-red-600">{getTotalPrice().toLocaleString()}₫</span>
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-left">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded text-left">
              {successMessage}
            </div>
          )}

          {paymentMethod === 'MoMo' ? (
            <button
              onClick={handleMomoPayment}
              className={`mt-2 px-6 py-2 bg-pink-600 text-white rounded ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-700'
              }`}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? 'Đang xử lý...' : 'Thanh toán với MoMo'}
            </button>
          ) : (
            <button
              onClick={handleCheckout}
              className={`mt-2 px-6 py-2 bg-purple-600 text-white rounded ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
              }`}
              disabled={loading || cartItems.length === 0}
            >
              {loading ? 'Đang xử lý...' : 'THANH TOÁN'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;