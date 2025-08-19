import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaSave } from 'react-icons/fa'
import { NavLink, useNavigate, useParams } from 'react-router'
import postService from '../../../services/postService'

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [detail, setDetail] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [topicId, setTopicId] = useState("")
  const [status, setStatus] = useState("1")

   const [posts, setPosts] = useState([]);
    useEffect(() => {
      (async () => {
        const result = await postService.list();
        setPosts(result);
      })();
    }, []);

    useEffect(() => {
        (async () => {
          const post = await postService.getRow(id);
          console.log('Danh mục đã được tìm thấy:', post);
          setTitle(post.title);
          setDetail(post.detail);
          setDescription(post.description);
          setType(post?.type);
          setTopicId(post.topicId);
          setStatus(Number(post?.status ?? 1));
          
        })();
      }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault()

    
      const thumbnailInput = document.getElementById("thumbnail")
      const thumbnail = thumbnailInput?.files?.[0]

      const formData = new FormData()
      formData.append("title", title)
      formData.append("detail", detail)
      formData.append("description", description)
      formData.append("type", type)
      formData.append("topic_id", topicId)
      formData.append("status", status)
      if (thumbnail) {
        formData.append("thumbnail", thumbnail)
      }

      const result = await postService.update(formData, id);
      if (result.success) {
        alert('Cập nhật bài viết thành công');
        navigate('/admin/post');
      } else {
        alert('Cập nhật bài viết thất bại');
      }
   
  }

  return (
    <form onSubmit={handleUpdate}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold uppercase text-green-700">CẬP NHẬT BÀI VIẾT</h1>
        <div>
          <button type="submit" className="bg-green-600 p-2 rounded-xl text-white mx-1">
            <FaSave className="inline" /> Lưu
          </button>
          <NavLink to="/admin/post/create" className="bg-sky-600 p-2 rounded-xl text-white mx-1">
            <FaArrowLeft className="inline" /> Thêm mới
          </NavLink>
        </div>
      </div>

      <div className="p-4 border border-[#cccccc]">
        <div className="flex gap-6">
          <div className="basis-9/12">
            <div className="mb-3">
              <label htmlFor="title">Tên bài viết</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" className="p-2 border rounded-xl w-full mt-1" />
            </div>
            <div className="mb-3">
              <label htmlFor="detail">Chi tiết bài viết</label>
              <textarea value={detail} onChange={(e) => setDetail(e.target.value)} id="detail" className="p-2 border rounded-xl w-full mt-1"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="description">Mô tả</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" className="p-2 border rounded-xl w-full mt-1"></textarea>
            </div>
            <div className='mb-3'>
              <label htmlFor='type'>Loại</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="type"
                className="p-2 border rounded-xl w-full mt-2"
              >
                <option value="">-- Chọn vị trí --</option>
                <option value="post">Post</option>
                <option value="page">Page</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="topicId">Chủ đề</label>
              <input value={topicId} onChange={(e) => setTopicId(e.target.value)} id="topicId" className="p-2 border rounded-xl w-full mt-1" />
            </div>

          </div>

          <div className="basis-3/12">
            <div className="mb-3">
              <label htmlFor="thumbnail">Hình ảnh</label>
              <input type="file" id="thumbnail" className="p-2 border rounded-xl w-full mt-2" />
            </div>
            <div className="mb-3">
              <label htmlFor="status">Trạng thái</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} id="status" className="p-2 border rounded-xl w-full mt-2">
                <option value="1">Hiện</option>
                <option value="0">Ẩn</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Create
