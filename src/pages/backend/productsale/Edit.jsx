import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import productsaleService from '../../../services/productsaleService';
// Bỏ dayjs

// Helper function to format date from ISO string to 'YYYY-MM-DDTHH:mm' for datetime-local input
const formatDateForInput = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return ''; // Check for invalid date
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Helper function to format date from 'YYYY-MM-DDTHH:mm' input to 'YYYY-MM-DD HH:mm:ss' for backend
const formatDateForBackend = (inputString) => {
    if (!inputString) return '';
    // Input string is already in a format parseable by Date
    const date = new Date(inputString);
    if (isNaN(date.getTime())) return ''; // Check for invalid date
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Include seconds, default to 00 if not available from input type
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [saleData, setSaleData] = useState(null);
    const [formData, setFormData] = useState({
        productid: '',
        price_sale: '',
        date_begin: '',
        date_end: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Fetch dữ liệu khuyến mãi
    useEffect(() => {
        const fetchSaleData = async () => {
            try {
                setLoading(true);
                const result = await productsaleService.getById(id); // Sửa lại để gọi getById thay vì update
                if (result && result.success && result.product_sale) {
                    const sale = result.product_sale;
                    setSaleData(sale);
                    // Điền dữ liệu vào state form, định dạng cho input datetime-local
                    setFormData({
                        productid: sale.productid,
                        price_sale: sale.price_sale,
                        date_begin: formatDateForInput(sale.date_begin),
                        date_end: formatDateForInput(sale.date_end),
                    });
                } else {
                    alert(result?.message || 'Không tìm thấy khuyến mãi hoặc lỗi tải dữ liệu');
                    navigate('/admin/product-sales'); // Quay lại trang danh sách nếu lỗi
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu khuyến mãi:', error);
                alert('Lỗi khi tải dữ liệu khuyến mãi');
                navigate('/admin/product-sales'); // Quay lại trang danh sách nếu lỗi
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSaleData();
        } else {
            alert('Không có ID khuyến mãi được cung cấp');
            navigate('/admin/product-sales');
        }
    }, [id, navigate]);

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.productid || !formData.price_sale || !formData.date_begin || !formData.date_end) {
            alert('Vui lòng điền đầy đủ các trường.');
            return;
        }

        // Date validation using native Date objects
        const dateBegin = new Date(formData.date_begin);
        const dateEnd = new Date(formData.date_end);

        if (isNaN(dateBegin.getTime()) || isNaN(dateEnd.getTime())) {
             alert('Ngày không hợp lệ.');
             return;
        }

        if (dateEnd <= dateBegin) { // Use <= for validation based on backend rule (after:date_begin)
            alert('Ngày kết thúc phải sau ngày bắt đầu!');
            return;
        }

        try {
            setLoading(true);
            // Format dates back to backend's expected format (YYYY-MM-DD HH:mm:ss)
            const dataToSend = {
                ...formData,
                date_begin: formatDateForBackend(formData.date_begin),
                date_end: formatDateForBackend(formData.date_end),
            };

            const result = await productsaleService.update(id, dataToSend);
            if (result && result.productSales) {
                 alert('Cập nhật khuyến mãi thành công');
                 navigate('/admin/product-sales'); // Quay lại trang danh sách sau khi cập nhật
            } else {
                 alert(result?.message || 'Lỗi khi cập nhật khuyến mãi');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật khuyến mãi:', error);
            alert(error.response?.data?.message || error.message || 'Đã xảy ra lỗi không xác định khi cập nhật.');
        } finally {
            setLoading(false);
        }
    };

    if (!saleData && loading) {
        return <div className="p-6">Đang tải dữ liệu...</div>;
    }

     if (!saleData && !loading && id) {
        return <div className="p-6">Không tìm thấy dữ liệu khuyến mãi cho ID: {id}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Chỉnh sửa khuyến mãi</h1>
            
            {saleData && ( // Chỉ hiển thị form khi có dữ liệu khuyến mãi
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-item">
                        <label className="block text-sm font-medium text-gray-700">Mã sản phẩm</label>
                        <input
                            type="text"
                            name="productid"
                            value={formData.productid}
                            disabled // productid không nên sửa
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100"
                        />
                    </div>

                    <div className="form-item">
                        <label className="block text-sm font-medium text-gray-700">Giá khuyến mãi</label>
                        <input
                            type="number"
                            name="price_sale"
                            value={formData.price_sale}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div className="form-item">
                        <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
                        <input
                            type="datetime-local"
                            name="date_begin"
                            value={formData.date_begin}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div className="form-item">
                        <label className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
                        <input
                            type="datetime-local"
                            name="date_end"
                            value={formData.date_end}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/product-sales')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Đang cập nhật...' : 'Cập nhật khuyến mãi'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Edit; 