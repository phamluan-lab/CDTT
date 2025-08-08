import React, { useEffect, useState } from "react";
import menuService from "../../services/menuService"; 
import { NavLink } from "react-router"; 

const Nav = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const result = await menuService.getMenus(0, "mainmenu", 10);
        console.log("Dữ liệu menu:", result); 
        if (Array.isArray(result)) {
          setMenus(result); 
        } else {
          console.error("Dữ liệu không phải là mảng:", result);
        }
      } catch (error) {
        console.error("Lỗi khi tải menu:", error.message || error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMenus();
  }, []);

  if (loading) {
    return <div>Đang tải menu...</div>; 
  }

  return (
    <nav className="mainmenu bg-amber-400">
      <div className="container mx-auto md:px-6">
        <ul className="flex">
       
          {menus.length > 0 ? (
            menus.map((menu) => (
              <li key={menu.id} className="border-b-4 hover:border-blue-500">
                <NavLink
                to={`/${
                  menu.link === 'menu-1'
                    ? 'san-pham'
                    : menu.link === 'menu-2'
                    ? 'tin-tuc'
                    : menu.link === 'menu-3'
                    ? 'lien-he'
                    : menu.link
                }`}
                  
                  className={({ isActive }) =>
                    `inline-block p-4 text-xl ${isActive ? "border-red-500" : "border-transparent"}`
                  }
                >
                  {menu.name}
                </NavLink>
              </li>
               
            ))
          ) : (
            <li className="text-red-500">Không có menu để hiển thị</li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
