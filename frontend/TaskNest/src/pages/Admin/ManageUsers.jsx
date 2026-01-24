import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.USERS.GET_ALL_USERS
      );
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      } else {
        setAllUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // 📥 Download user report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.REPORTS.EXPORT_USERS,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading user report:", error);
      toast.error("Failed to download user report. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // 🔍 FRONTEND SEARCH FILTER
  const filteredUsers = allUsers.filter((user) => {
    const searchText = searchQuery.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText)
    );
  });

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h2 className="text-xl font-medium">Team Members</h2>

          <div className="flex flex-wrap items-center gap-3">
            {/* Download Button */}
            <button
              className="flex download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>

            {/* Search Bar (Desktop) */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="hidden md:block px-3 py-2 border rounded-md text-sm w-64"
            />
          </div>

          {/* Search Bar (Mobile) */}
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block md:hidden mt-3 px-3 py-2 border rounded-md text-sm w-full"
          />
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No users found.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
