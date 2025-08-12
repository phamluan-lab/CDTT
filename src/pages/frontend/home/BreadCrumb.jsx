import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router';
 // icon phân cách (nếu dùng Lucide hoặc Heroicons)

const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-gray-100 px-4 py-2 text-sm">
      <div className="flex items-center space-x-1 text-gray-600">
        {items.map((item, index) => (
          <span key={index} className="flex items-center">
            {index !== 0 && <FaChevronRight className="mx-2" />}
            {item.to ? (
              <Link to={item.to} className="hover:underline hover:text-orange-500">
                {item.label}
              </Link>
            ) : (
              <span className="text-orange-500">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
