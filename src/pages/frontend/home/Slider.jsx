import React, { useEffect, useState } from "react";
import bannerService from "../../../services/bannerService";
import { UrlImg } from "../../../config";

const Slider = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { banners } = await bannerService.bannerlist("slideshow", 5);
        setBanners(banners);
      } catch (error) {
        console.error("Lỗi khi tải banner:", error.message);
      }
    };

    fetchBanners();

    // Tạo interval tự động chuyển slide mỗi 3 giây
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // 3000ms = 3 giây

    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) return <div>Đang tải...</div>;

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <img
        src={UrlImg + "banner/" + banners[currentIndex].image}
        alt={banners[currentIndex].name}
        className="w-full max-w-screen-xl h-[450px] object-cover rounded-lg transition-all duration-500"
      />
    </div>
  );
};

export default Slider;


