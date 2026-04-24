import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Search, BarChart3, Trophy, Globe, Moon, Menu, Home } from "lucide-react";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: Home }, 
    { path: "/search", label: "Search score", icon: Search },
    { path: "/report", label: "Score spectrum", icon: BarChart3 },
    { path: "/top10", label: "Top 10 A", icon: Trophy },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false); 
  };

  return (
    <div className="relative flex h-screen bg-[#f3f4f6] font-sans overflow-hidden">

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-28 flex flex-col items-center py-6 border-r border-gray-200 bg-[#f3f4f6] shrink-0 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8">
          <button 
            onClick={() => handleNavigation('/')}
            className="w-14 h-14 bg-[#2E4F42] rounded-[20px] flex items-center justify-center text-white shadow-md hover:bg-[#1f362d] transition-colors"
          >
            <Search size={26} strokeWidth={2.5} />
          </button>
        </div>
        
        <nav className="flex flex-col gap-4 w-full px-3 flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center py-3.5 rounded-[20px] transition-all duration-200 ${
                  isActive
                    ? "bg-[#2E4F42] text-white shadow-md" 
                    : "text-gray-600 hover:bg-[#EAEFEA] hover:text-[#2E4F42]" 
                }`}
              >
                <Icon size={24} className="mb-1.5" />
                <span className="text-xs font-medium text-center">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="flex flex-col gap-4 mt-auto">
          <button className="w-11 h-11 rounded-full border-2 border-[#DCE4DC] flex items-center justify-center text-[#4A6559] hover:bg-[#EAEFEA] transition-colors">
            <Globe size={20} />
          </button>
          <button className="w-11 h-11 rounded-full border-2 border-[#DCE4DC] flex items-center justify-center text-[#4A6559] hover:bg-[#EAEFEA] transition-colors">
            <Moon size={20} />
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-y-auto w-full">

        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-200 px-4 sm:px-8 py-4 shrink-0">
          <div className="flex items-center gap-3">
            
            <button 
              className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={26} />
            </button>

            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-gray-800">
              G-Scores THPT
            </h1>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <Outlet context={{ search: '' }} />
          </div>
        </main>

        <footer className="shrink-0 border-t border-gray-200 bg-white px-4 sm:px-8 py-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4 sm:gap-0 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} G-Scores. All rights reserve.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <button className="hover:text-[#2E4F42] transition-colors font-medium">Policies</button>
              <button className="hover:text-[#2E4F42] transition-colors font-medium">Private</button>
              <button className="hover:text-[#2E4F42] transition-colors font-medium">Contact</button>
            </div>
          </div>
        </footer>
      </div>
      
    </div>
  );
}