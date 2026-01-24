import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { DEFAULT_AVATAR } from "../../constants/images";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  // Handle menu click
  const handleClick = (route) => {
    // 🔥 Catch ALL logout cases
    if (route === "logout" || route === "/logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  // Logout handler (bulletproof)
  const handleLogout = () => {
    console.log("Logging out...");

    localStorage.clear();
    clearUser();

    // Hard redirect to bypass auth guards & stale context
    window.location.href = "/login";
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
      {/* User Info */}
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <img
          src={user?.profileImageUrl || DEFAULT_AVATAR}
          alt={user?.name || "User profile"}
          className="w-20 h-20 bg-slate-400 rounded-full object-cover"
          onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
        />

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>

        <p className="text-[12px] text-gray-500">
          {user?.email || ""}
        </p>
      </div>

      {/* Menu */}
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px]
            ${
              activeMenu === item.label
                ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
                : "text-gray-700"
            }
            py-3 px-6 mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
