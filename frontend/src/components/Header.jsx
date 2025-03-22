import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropLogin, setDropLogin] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate(user?.role === 'recruiter' ? '/recruiter/dashboard' : '/candidate/dashboard');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropLogin && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropLogin(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropLogin]);

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? " shadow-sm" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white">
              <span className="font-bold">P</span>
            </div>
            <span className={`ml-2 text-lg font-semibold ${isScrolled ? "text-gray-900" : "text-white"}`}>ProHire</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {["Jobs", "Pricing", "Contact"].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => 
                  isActive ? "text-indigo-600 text-sm font-medium" : `text-sm font-medium ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>

          {user ? (
            <div className="account-section">
              <button className="group relative overflow-hidden rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:shadow-xl" onClick={handleAccountClick}>
              <span className="relative z-10">My Account ({user.role})</span>
              <span className="absolute bottom-0 right-0 h-full w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4" ref={dropdownRef}>
              <div className="relative">
                <button
                  onClick={() => setDropLogin(!dropLogin)}
                  className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isScrolled ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50" : "border border-white/30 text-white hover:bg-white/10"}`}
                >
                  Login
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropLogin && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20">
                    <Link to="/recruiter/auth" className="block px-4 py-3 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 text-sm" onClick={() => setDropLogin(false)}>
                      Login as Recruiter
                    </Link>
                    <Link to="/candidate/auth" className="block px-4 py-3 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 text-sm" onClick={() => setDropLogin(false)}>
                      Login as Candidate
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"} focus:outline-none`}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;