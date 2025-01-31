import React from "react";
import Link from "next/link";

const DashboardLayout = ({ children }) => {
    const menuItems = [
        { name: "Content", path: "/dashboard/content" },
        { name: "Images", path: "/dashboard/images" },
        { name: "HeroSection", path: "/dashboard/HeroContentManager" },
        { name: "Design Solution Cards", path: "/dashboard/DesignSolutionCards" },
        { name: "Projects Card", path: "/dashboard/ProjectsManager" },
        { name: "Testimonial", path: "/dashboard/Testimonail" },
        { name: "Teams Manage", path: "/dashboard/TeamsManager" },
        { name: "Blog manage", path: "/dashboard/BlogManager" },
        { name: "Portfolio Manag", path: "/dashboard/PortfolioManager" },

    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen overflow-y-auto fixed">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">
                    Admin Dashboard
                </div>
                <ul className="mt-4">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.path}
                                className="flex items-center px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:translate-x-2"
                            >
                                <span className="mr-2">•</span> {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Footer or additional content */}
                <div className="p-4 text-center text-xs text-gray-500 border-t border-gray-700">
                    © 2023 Admin Panel
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 overflow-y-auto p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;