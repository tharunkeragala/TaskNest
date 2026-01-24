import React, { useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/userContext";
import { DEFAULT_AVATAR } from "../../constants/images";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      
      {/* Left */}
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold">
            TN
          </div>
          <h2 className="text-lg font-medium text-black">TaskNest</h2>
        </div>
      </div>

      {/* Right – User Avatar */}
      <div className="relative group">
        <img
          src={user?.profileImageUrl || DEFAULT_AVATAR}
          alt="User avatar"
          className="w-9 h-9 rounded-full object-cover cursor-pointer "
          onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
        />

        {/* Dropdown */}
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <img
              src={user?.profileImageUrl || DEFAULT_AVATAR}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile SideMenu */}
      {openSideMenu && (
        <div className="fixed top-16 left-0 bg-white z-40">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
