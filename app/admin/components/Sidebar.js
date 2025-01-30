import React from "react";
import Link from "next/link";
import "../../global.css";

const Sidebar = () => {
  const menuItems = [
    { name: "Content", path: "/dashboard/content" },
    { name: "Images", path: "/dashboard/images" },
    { name: "HeroSection", path: "/dashboard/HeroContentManager" },
    { name: "Design Solution Cards", path: "/dashboard/DesignSolutionCards" },
    { name: "Projects Card", path: "/dashboard/ProjectsManager" },
    { name: "Testimonial", path: "/dashboard/Testimonail" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4 text-lg font-bold">Admin Dashboard</div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className="block px-4 py-2 hover:bg-gray-700"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
