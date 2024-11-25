import { GiHamburgerMenu } from "react-icons/gi";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LiaUserLockSolid } from "react-icons/lia";
import { useState } from "react";
import { SidebarProps, Section } from "../types/index";

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const tabs = [
    { id: "users" as Section, icon: LuUsers2, label: "Users" },
    {
      id: "roles" as Section,
      icon: MdOutlineAdminPanelSettings,
      label: "Roles",
    },
    {
      id: "permissions" as Section,
      icon: LiaUserLockSolid,
      label: "Permissions",
    },
  ];

  return (
    <div
      className={`h-screen bg-gradient-to-b from-indigo-600 to-purple-700 text-white flex flex-col rounded-tr-lg rounded-br-lg shadow-lg transition-all duration-500 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}>
      <div className="p-4 flex items-center border-b border-indigo-500">
        <h1
          className={`text-xl font-bold tracking-wide overflow-hidden transition-all duration-500 ease-in-out ${
            collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
          }`}>
          Admin Panel
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Toggle Sidebar">
          <GiHamburgerMenu size={20} />
        </button>
      </div>
      <nav className="mt-4 flex-grow">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center p-4 hover:bg-indigo-500 transition-all rounded-l-lg ${
              activeTab === tab.id ? "bg-indigo-500 shadow-lg" : ""
            } focus:outline-none focus:ring-2 focus:ring-indigo-400`}>
            <tab.icon
              size={24}
              className={`transition-transform ${
                activeTab === tab.id
                  ? "text-white scale-110"
                  : "text-indigo-200"
              }`}
            />
            <span
              className={`ml-4 text-lg whitespace-nowrap transition-all duration-500 ease-in-out ${
                collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
              } ${activeTab === tab.id ? "text-white font-semibold" : "text-indigo-200"}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
      <div
        className={`p-4 ${collapsed ? "none" : "border-t border-indigo-500"}`}>
        <p
          className={`text-center text-xs transition-all duration-500 ease-in-out ${
            collapsed ? "opacity-0 w-0" : "opacity-100 w-full text-indigo-300"
          }`}>
          &copy; 2024 Admin Panel
        </p>
      </div>
    </div>
  );
}
