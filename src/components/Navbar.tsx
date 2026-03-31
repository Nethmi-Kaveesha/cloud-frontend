import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, Cloud } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="border-b border-[#D4AF37]/20 bg-[#0A0A0A]/90 backdrop-blur">
      <div className="container flex h-16 max-w-screen-2xl items-center px-8 mx-auto">
        
        <div className="mr-4 hidden md:flex items-center">
          <Link to="/" className="mr-8 flex items-center space-x-2 group">
            
            <div className="p-2 rounded-xl bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-all">
              <Cloud className="h-6 w-6 text-[#D4AF37]" />
            </div>

            <span className="hidden font-bold sm:inline-block text-2xl tracking-tight bg-gradient-to-r from-[#D4AF37] to-[#B8902F] bg-clip-text text-transparent">
              Cloude
            </span>
          </Link>

          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className={`transition-colors hover:text-[#D4AF37] ${
                pathname === "/" ? "text-[#E5E5E5]" : "text-[#A3A3A3]"
              }`}
            >
              Home
            </Link>

            {token && (
              <Link
                to="/dashboard"
                className={`transition-colors hover:text-[#D4AF37] ${
                  pathname?.startsWith("/dashboard")
                    ? "text-[#E5E5E5]"
                    : "text-[#A3A3A3]"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <nav className="flex items-center space-x-4">
            
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] h-10 px-6 text-[#E5E5E5]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#D4AF37] text-black hover:bg-[#B8902F] h-10 px-6 shadow-md transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-[#D4AF37]/30 text-[#E5E5E5] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] h-10 px-6 transition-all"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            )}

          </nav>
        </div>
      </div>
    </nav>
  );
}