import React, { useState, useEffect } from 'react';
import orderService from '../../../services/orderService';
import userService from '../../../services/userService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [growth, setGrowth] = useState(0); // sẽ tính sau
  const [loading, setLoading] = useState(true);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const orderData = await orderService.list();
        setOrders(orderData);
        const userData = await userService.list();
        setUsers(userData);
        // Tổng doanh thu
        const revenue = orderData.reduce((sum, order) => sum + (order.price_sale || order.total || 0), 0);
        setTotalRevenue(revenue);
        // Doanh thu theo tháng
        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const now = new Date();
        const thisYear = now.getFullYear();
        const revenueByMonth = months.map((m) => {
          const monthOrders = orderData.filter(order => {
            if (!order.created_at) return false;
            const d = new Date(order.created_at);
            return d.getMonth() + 1 === m && d.getFullYear() === thisYear;
          });
          return {
            month: `T${m}`,
            revenue: monthOrders.reduce((sum, o) => sum + (o.price_sale || o.total || 0), 0)
          };
        });
        setMonthlyRevenue(revenueByMonth);
        // Tăng trưởng doanh thu tháng này so với tháng trước
        const thisMonth = now.getMonth() + 1;
        const revThis = revenueByMonth[thisMonth - 1]?.revenue || 0;
        const revPrev = revenueByMonth[thisMonth - 2]?.revenue || 0;
        const growthValue = revPrev > 0 ? (((revThis - revPrev) / revPrev) * 100).toFixed(1) : 0;
        setGrowth(growthValue);
        // Hoạt động gần đây từ đơn hàng mới nhất
        const activities = orderData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6)
          .map(order => ({
            name: order.name || 'Khách hàng',
            action:
              order.status === 1
                ? 'đang xử lý đơn hàng'
                : order.status === 2
                  ? 'đã hoàn thành đơn hàng'
                  : order.status === 3
                    ? 'đã hủy đơn hàng'
                    : 'đã đặt đơn hàng mới',
            time: order.created_at ? timeAgo(order.created_at) : '',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          }));
        setRecentActivities(activities);
      } catch (error) {
        setOrders([]);
        setUsers([]);
        setTotalRevenue(0);
        setMonthlyRevenue([]);
        setRecentActivities([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Hàm tính thời gian tương đối
  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 60000); // phút
    if (diff < 1) return 'vừa xong';
    if (diff < 60) return `${diff} phút trước`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
  }

  return (
    <div className="p-6 bg-[#f6fcfc] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <div className="text-gray-500 text-sm mb-1 flex items-center gap-2">Tổng người dùng <span>👥</span></div>
          <div className="text-2xl font-bold">{users.length.toLocaleString('vi-VN')}</div>
          <div className="text-green-600 text-xs mt-1">+20.1% so với tháng trước</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <div className="text-gray-500 text-sm mb-1 flex items-center gap-2">Đơn hàng <span>🛒</span></div>
          <div className="text-2xl font-bold">{orders.length.toLocaleString('vi-VN')}</div>
          <div className="text-green-600 text-xs mt-1">+15.3% so với tháng trước</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <div className="text-gray-500 text-sm mb-1 flex items-center gap-2">Doanh thu <span>₫</span></div>
          <div className="text-2xl font-bold">₫{totalRevenue.toLocaleString('vi-VN')}</div>
          <div className="text-green-600 text-xs mt-1">+12.5% so với tháng trước</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-start">
          <div className="text-gray-500 text-sm mb-1 flex items-center gap-2">Tăng trưởng <span>📈</span></div>
          <div className="text-2xl font-bold">{growth}%</div>
          <div className="text-green-600 text-xs mt-1">+2.1% so với tháng trước</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="font-bold text-lg mb-2">Doanh thu theo tháng</div>
          <div className="text-gray-500 text-sm mb-4">Biểu đồ doanh thu 12 tháng gần nhất</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
              <Tooltip formatter={v => `₫${v.toLocaleString('vi-VN')}`} />
              <Bar dataKey="revenue" fill="#222" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="font-bold text-lg mb-2">Hoạt động gần đây</div>
          <div className="text-gray-500 text-sm mb-4">Các hoạt động mới nhất trong hệ thống</div>
          <ul>
            {recentActivities.map((act, idx) => (
              <li key={idx} className="flex items-center gap-3 mb-3">
                <img src={act.avatar} alt={act.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <span className="font-semibold">{act.name}</span> <span className="text-gray-600">{act.action}</span>
                  <div className="text-xs text-gray-400">{act.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
