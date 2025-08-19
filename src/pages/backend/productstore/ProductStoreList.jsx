import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import productStoreService from '../../../services/productStoreService';

const ProductStoreList = () => {
    const [productStores, setProductStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    // Fetch danh sách kho (tất cả)
    const fetchProductStores = async () => {
        try {
            setLoading(true);
            // Gọi service mới để lấy TẤT CẢ bản ghi kho
            const response = await productStoreService.getAllProductStores();

            // Kiểm tra xem response có phải là đối tượng và có thuộc tính success không
            if (response && typeof response === 'object' && response.success) {
                setProductStores(response.product_stores || []);
                // Không còn product object ở đây
            } else {
                setProductStores([]);
                // Hiển thị thông báo lỗi từ response nếu có, ngược lại hiển thị lỗi chung
                alert(response?.message || 'Lỗi khi tải dữ liệu kho');
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu kho:', error);
            setProductStores([]);
            // Xử lý lỗi chi tiết hơn từ error object
            const errorMessage = error.message || 'Đã xảy ra lỗi không xác định khi tải dữ liệu kho.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductStores(); // Gọi fetch khi component mount
    }, []); // Dependency array rỗng để chỉ chạy 1 lần khi mount

    // Xử lý thêm mới
    const handleAdd = () => {
        setEditingId(null);
        setModalVisible(true);
        // Khi thêm mới, form cần nhập product_id
    };

    // Xử lý cập nhật
    const handleEdit = (record) => {
        setEditingId(record.id);
        setModalVisible(true);
        // Form sửa cần hiển thị dữ liệu record, bao gồm product_id
    };

    // Xử lý xóa
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            try {
                // API xóa cần cả product_id và id bản ghi kho
                // product_id cần lấy từ bản ghi đang xóa
                const recordToDelete = productStores.find(store => store.id === id);
                if (recordToDelete) {
                    await productStoreService.deleteProductStore(recordToDelete.product_id, id);
                    alert('Xóa thành công');
                    fetchProductStores();
                } else {
                     alert('Không tìm thấy bản ghi để xóa.');
                }
            } catch (error) {
                alert(error.message || 'Lỗi khi xóa');
            }
        }
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const values = {
            // product_id cần lấy từ form khi thêm mới/sửa toàn bộ kho
            product_id: formData.get('product_id'), 
            price_root: formData.get('price_root'),
            qty: formData.get('qty'),
        };

        try {
            if (editingId) {
                // API cập nhật cần cả product_id và editingId
                 const recordToUpdate = productStores.find(store => store.id === editingId);
                 if(recordToUpdate) {
                    await productStoreService.updateProductStore(recordToUpdate.product_id, editingId, values);
                    alert('Cập nhật thành công');
                 } else {
                     alert('Không tìm thấy bản ghi để cập nhật.');
                 }
            } else {
                 // API thêm mới cần product_id
                if(values.product_id) {
                     await productStoreService.createProductStore(values.product_id, values);
                     alert('Thêm mới thành công');
                } else {
                     alert('Vui lòng nhập mã sản phẩm.');
                }
            }
            setModalVisible(false);
            fetchProductStores();
        } catch (error) {
            alert(error.message || 'Lỗi khi lưu dữ liệu');
        }
    };

    // Định nghĩa lại cột hiển thị
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
        },
         {
            title: 'Mã sản phẩm',
            dataIndex: 'product_id',
            key: 'product_id',
            width: 120,
        },
        {
            title: 'Giá gốc',
            dataIndex: 'price_root',
            key: 'price_root',
            width: 150,
            render: (price) => new Intl.NumberFormat('vi-VN').format(price) + ' đ',
        },
        {
            title: 'Số lượng',
            dataIndex: 'qty',
            key: 'qty',
            width: 120,
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <div className="space-x-2">
                    <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </button>
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(record.id)}
                    >
                        Xóa
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý tất cả kho</h1> {/* Cập nhật tiêu đề */}
                     {/* Không còn hiển thị tên sản phẩm cụ thể */}
                </div>
                 <div className="flex gap-2">
                    {/* Nút Quay lại có thể không còn cần thiết nếu đây là trang chính */}
                    {/* <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => navigate('/admin/...')}
                    >
                        Quay lại
                    </button> */}
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAdd}
                    >
                        Thêm mới
                    </button>
                </div>
            </div>

            {loading ? (
                <div>Đang tải...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                {columns.map(column => (
                                     <th key={column.key} className="px-4 py-2">{column.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(productStores) && productStores.length > 0 ? (
                                productStores.map((store) => (
                                    <tr key={store.id}>
                                        <td className="border px-4 py-2">{store.id}</td>
                                        <td className="border px-4 py-2">{store.product_id}</td> {/* Thêm cột product_id */}
                                        <td className="border px-4 py-2">
                                            {new Intl.NumberFormat('vi-VN').format(store.price_root)} đ
                                        </td>
                                        <td className="border px-4 py-2">{store.qty}</td>
                                        <td className="border px-4 py-2">
                                            <div className="space-x-2">
                                                <button
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                                    onClick={() => handleEdit(store)}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                    onClick={() => handleDelete(store.id)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="text-center py-4"> {/* Sử dụng colSpan động */}
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {modalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingId ? "Cập nhật kho" : "Thêm mới kho"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {/* Thêm trường chọn product_id khi thêm mới/sửa toàn bộ kho */}
                            {!editingId && (
                                <div className="mb-4">
                                    <label className="block mb-2">Mã sản phẩm</label>
                                    <input
                                        type="text"
                                        name="product_id"
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                            )}
                            
                            <div className="mb-4">
                                <label className="block mb-2">Giá gốc</label>
                                <input
                                    type="number"
                                    name="price_root"
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Số lượng</label>
                                <input
                                    type="number"
                                    name="qty"
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded"
                                    onClick={() => setModalVisible(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    {editingId ? "Cập nhật" : "Thêm mới"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductStoreList; 