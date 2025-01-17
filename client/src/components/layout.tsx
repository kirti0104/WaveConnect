// src/components/Layout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
   
  return (
    <div className="flex h-screen">
     
      <div
        className="bg-[#3E5677] w-[296px] h-screen fixed top-0 left-0"
        style={{
          marginTop: "0px",
          gap: "0px",
        }}
      >
        <div className="appLogo mt-8 ms-24">
            <img src="/appLogo.png" alt="logo"/>
        </div>
        <ul className="text-white px-12 pt-4 space-y-4">
        <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
           <Link to="/dashboard" className="flex items-center gap-2">
             <img src="/dashboard.png" className="h-8 w-8" alt="Dashboard Icon" />
              <span>Dashboard</span>
              </Link>
             </li>
          <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
             <Link to="/profile/:userId" className="flex items-center gap-2">
            <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>My Profile</span>
            </Link>
         </li>
           <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
            <Link to="/preferences" className="flex items-center gap-2">
            <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>Preferences</span>
            </Link>
         </li>
           <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
             <Link to="/friends" className="flex items-center gap-2">
            <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>Friends</span>
            </Link>
         </li>
            <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
              <Link to="/createWaves" className="flex items-center gap-2">
              <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>Create Waves</span>
              </Link>
            
         </li>
            <li className="cursor-pointer hover:bg-[#BEA16E] p-2 rounded flex items-center gap-2">
            <img src="/linechart.png" className="h-8 w-8" alt="linechart Icon" />
            <span>Change Password</span>
         </li>
        </ul>
         <div className="logoutButton text-white absolute bottom-14 ms-16 flex gap-4">
          <Link to="/login" className="flex items-center gap-2">
          <img src="/logoutArrow.png " className="h-6 w-6"/>
          <span>Log Out</span>
          </Link>
            
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[296px] flex-1">
        {/* Header */}
       <div className="bg-white h-[89px] w-[80%] fixed top-0 left-[296px] flex items-center justify-between px-6 border-b border-gray-300">
        <div className="text-lg font-semibold"></div>
          <div className="flex items-center space-x-4">
           <img src="" alt="Profile" className="w-12 h-12 rounded-full border border-gray-300" />
    
       <div className="flex flex-col text-right">
       <span className="text-sm font-medium text-gray-500">Good Afternoon</span>
      <span className="text-base font-semibold text-gray-800">John Doe</span>
    </div>
  </div>
</div>



        
        <div className="max-h-[80vh] overflow-y-auto mt-[89px] p-8 bg-[#EEF5F6] main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
