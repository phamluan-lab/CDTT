import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import productService from '../../../services/productService';
import categoryService from '../../../services/categoryService';
import brandService from '../../../services/brandService';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TextAlign } from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

// const GEMINI_API_KEY = 'AIzaSyDtijNyvDQJvkvZgnRz7fbkyymJxQ7NJRo'; // Thay bằng API key của bạn

// async function generateDescriptionWithGemini(productName) {
//   const prompt = `Viết mô tả chi tiết, hấp dẫn cho sản phẩm: ${productName}. Có thể chèn 1 ảnh minh họa (dùng thẻ <img> với link ảnh minh họa phù hợp).`;
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }]
//       }),
//     }
//   );
//   const data = await response.json();
//   return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
// }

const Create = () => {

  const navigate = useNavigate();

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);

  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState(0);
  const [priceBuy, setPriceBuy] = useState(100);
  const [priceSale, setPriceSale] = useState(100);
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [status, setStatus] = useState(1);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Color,
      TextStyle,
    ],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const brands = await brandService.getList();
        const categorys = await categoryService.getList();
        setCategorys(categorys);
        setBrands(brands);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    })();
  }, []);

  const handleProductStore = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Vui lòng nhập tên sản phẩm!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('detail', detail);
      formData.append('description', description);
      formData.append('qty', qty);
      formData.append('price_buy', priceBuy);
      formData.append('price_sale', priceSale);
      formData.append('category_id', Number(categoryId));
      formData.append('brand_id', Number(brandId));
      formData.append('status', status);

      if (!categoryId || isNaN(categoryId) || parseInt(categoryId) <= 0) {
        alert("Vui lòng chọn danh mục hợp lệ!");
        return;
      }
      const thumbnail = document.getElementById('thumbnail')?.files?.[0];
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }
      images.forEach(img => {
        formData.append('images[]', img);
      });

      await productService.create(formData);
      navigate('/admin/product');
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      if (error.response?.data?.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert('Lỗi không xác định!');
      }
    }
  };

  // Thanh công cụ định dạng giống Word
  const Toolbar = ({ editor }) => {
    if (!editor) return null;
    return (
      <div className="flex flex-wrap gap-2 mb-2 bg-gray-100 p-2 rounded">
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="toolbar-btn">↺</button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="toolbar-btn">↻</button>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'toolbar-btn active' : 'toolbar-btn'}><b>B</b></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'toolbar-btn active' : 'toolbar-btn'}><i>I</i></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'toolbar-btn active' : 'toolbar-btn'}><u>U</u></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'toolbar-btn active' : 'toolbar-btn'}><s>S</s></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'toolbar-btn active' : 'toolbar-btn'}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'toolbar-btn active' : 'toolbar-btn'}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'toolbar-btn active' : 'toolbar-btn'}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'toolbar-btn active' : 'toolbar-btn'}>1. List</button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'toolbar-btn active' : 'toolbar-btn'}>Trái</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'toolbar-btn active' : 'toolbar-btn'}>Giữa</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'toolbar-btn active' : 'toolbar-btn'}>Phải</button>
        <button onClick={() => editor.chain().focus().setColor('#e53e3e').run()} className="toolbar-btn" style={{ color: '#e53e3e' }}>A</button>
        <button onClick={() => editor.chain().focus().setColor('#3182ce').run()} className="toolbar-btn" style={{ color: '#3182ce' }}>A</button>
        <button onClick={() => editor.chain().focus().setColor('#38a169').run()} className="toolbar-btn" style={{ color: '#38a169' }}>A</button>
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="toolbar-btn">Bảng</button>
        <button
          onClick={() => {
            const url = prompt('Nhập URL ảnh:');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="toolbar-btn"
        >
          Ảnh
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'toolbar-btn active' : 'toolbar-btn'}>P</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'toolbar-btn active' : 'toolbar-btn'}>❝</button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="toolbar-btn">—</button>
        <button onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className="toolbar-btn">Xóa định dạng</button>
      </div>
    );
  };

  return (
    <>
      <form onSubmit={handleProductStore}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold uppercase text-green-700">THÊM SẢN PHẨM</h1>
          <div>
            <button type="submit" className="bg-green-600 p-2 rounded-xl text-white mx-1">
              <FaSave className="inline" /> Lưu
            </button>
            <NavLink to="/admin/product" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
              <FaArrowLeft className="inline" /> Quay lại
            </NavLink>
          </div>
        </div>

        <div className="p-4 border border-[#cccccc]">
          <div className="flex gap-6">
            <div className="basis-9/12">
              <div className="mb-3">
                <label htmlFor="name">Tên sản phẩm</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border rounded-xl w-full mt-1"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="detail">Chi tiết</label>
                <textarea
                  id="detail"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="p-2 border rounded-xl w-full mt-1"
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="description">Mô tả</label>
                <Toolbar editor={editor} />
                <button
                  type="button"
                  onClick={() => {
                    if (editor) {
                      editor.commands.setContent(
                        `<h2>Giới thiệu sản phẩm mới</h2>\n<p>Sản phẩm chất lượng cao, bảo hành 12 tháng.</p>\n<img src=\"/src/assets/iphone1.webp\" alt=\"Sản phẩm\" style=\"max-width:200px;\"/>`
                      );
                    }
                  }}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Tạo nội dung mẫu
                </button>
                {/* <button
                  type="button"
                  disabled={loadingAI}
                  onClick={async () => {
                    setLoadingAI(true);
                    const aiContent = await generateDescriptionWithGemini(name);
                    if (editor) {
                      editor.commands.setContent(aiContent);
                    }
                    setLoadingAI(false);
                  }}
                  className="ml-2 px-2 py-1 bg-purple-600 text-white rounded"
                >
                  {loadingAI ? 'Đang sinh mô tả...' : 'Tạo mô tả AI (Gemini)'}
                </button> */}
                <div className="p-2 border rounded-xl w-full mt-1 min-h-[150px] bg-white">
                  <EditorContent editor={editor} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="mb-3">
                  <label htmlFor="qty">Số lượng</label>
                  <input
                    type="number"
                    id="qty"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 border rounded-xl w-full mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="pricebuy">Giá gốc</label>
                  <input
                    type="number"
                    id="pricebuy"
                    value={priceBuy}
                    onChange={(e) => setPriceBuy(e.target.value)}
                    className="p-2 border rounded-xl w-full mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="pricesale">Giá khuyến mãi</label>
                  <input
                    type="number"
                    id="priceSale"
                    value={priceSale}
                    onChange={(e) => setPriceSale(e.target.value)}
                    className="p-2 border rounded-xl w-full mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="basis-3/12">
              <div className="mb-3">
                <label htmlFor="category_id">Danh mục</label>
                <select
                  id="category_id"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value="">Chọn danh mục</option>
                  {Array.isArray(categorys) &&
                    categorys.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="brand_id">Thương hiệu</label>
                <select
                  id="brand_id"
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="thumbnail">Hình ảnh</label>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="p-2 border rounded-xl w-full mt-2"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="images">Hình chi tiết (nhiều hình)</label>
                <input
                  type="file"
                  id="images"
                  multiple
                  onChange={e => setImages([...e.target.files])}
                  className="p-2 border rounded-xl w-full mt-2"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="status">Trạng thái</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(Number(e.target.value))}
                  className="p-2 border rounded-xl w-full mt-2"
                >
                  <option value={1}>Hiện</option>
                  <option value={0}>Ẩn</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;
