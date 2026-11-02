import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app-bg flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div key={location.pathname} className="animate-page">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
