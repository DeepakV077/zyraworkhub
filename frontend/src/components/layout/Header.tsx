import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebaseClient";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import logoImage from "./assets/Log1.png";

export default function Header() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target))
        setIsUserMenuOpen(false);
      // if click is outside the nav (which contains dropdowns), close any open submenu
      if (navRef.current && !navRef.current.contains(target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  type SubNav = { name: string; href: string };
  type NavItem =
    | { name: string; href: string; submenu?: undefined }
    | { name: string; submenu: SubNav[]; href?: undefined };

  const navigation: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      submenu: [
        { name: "Webinars", href: "/webinars" },
        { name: "Design Studio", href: "/design-studio" },
        { name: "Marketing", href: "/marketing" },
      ],
    },
    { name: "Portfolio", href: "/portfolio" },
    {
      name: "Blog",
      submenu: [
        { name: "All Posts", href: "/blog" },
        { name: "Success Stories", href: "/blog/success-stories" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path?: string) =>
    !path ? false : path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // 🔸 Brand gradient (orange → gold)
  const activeGradient =
    "bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-transparent bg-clip-text";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/70 border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* --- Logo --- */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Zyra WorkHub"
              className="w-11 h-11 rounded-xl hover:scale-105 transition-transform"
            />
            <span className="hidden sm:block font-extrabold text-3xl bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-transparent bg-clip-text tracking-tight">
              Zyra Academy
            </span>
          </Link>

          {/* --- Desktop Nav --- */}
          <div className="hidden lg:flex items-center space-x-8" ref={navRef}>
            {navigation.map((item) => {
              if (item.submenu) {
                const isOpen = openDropdown === item.name;
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={() =>
                        setOpenDropdown((prev) => (prev === item.name ? null : item.name))
                      }
                      className={`inline-flex items-center gap-1.5 text-lg font-medium ${
                        isActive("/services")
                          ? activeGradient
                          : "text-gray-700 hover:text-[#FF7A00]"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-180 text-[#FF7A00]" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute left-0 mt-3 w-52 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-200 ${
                        isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                      }`}
                    >
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block px-4 py-3 text-lg text-gray-700 hover:bg-orange-50 hover:text-[#FF7A00]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-lg font-medium transition-colors ${
                    isActive(item.href)
                      ? activeGradient
                      : "text-gray-700 hover:text-[#FF7A00]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* --- User / Auth --- */}
          <div className="hidden lg:flex items-center gap-5">
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="text-lg font-medium text-gray-700 hover:text-[#FF7A00]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-lg font-semibold bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 hover:shadow-sm transition"
                >
                  <img
                    src={currentUser.photoURL || "/favicon.ico"}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                <div
                  className={`absolute right-0 mt-3 w-52 bg-white rounded-lg border border-gray-100 shadow-xl transition-all duration-200 ${
                    isUserMenuOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-lg font-semibold text-gray-800 truncate">
                      {currentUser.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-lg text-gray-700 hover:bg-gray-50 w-full"
                  >
                    <UserIcon className="w-4 h-4" /> Profile
                  </button>
                  <button
                    onClick={async () => {
                      await signOut(auth);
                      setIsUserMenuOpen(false);
                      navigate("/");
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-lg text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* --- Mobile Toggle --- */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen((p) => !p)}
              className="p-2 text-gray-700 hover:text-[#FF7A00]"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* --- Mobile Nav --- */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 mt-2 rounded-xl shadow-sm p-4 space-y-2">
            {navigation.map((item) =>
              item.submenu ? (
                <details key={item.name} className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-lg font-medium py-2 text-gray-800 hover:text-[#FF7A00]">
                    {item.name}
                    <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-4 space-y-1 mt-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-lg text-gray-600 hover:text-[#FF7A00]"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-lg text-gray-800 hover:text-[#FF7A00]"
                >
                  {item.name}
                </Link>
              )
            )}

            <div className="pt-3 border-t border-gray-100">
              {!currentUser ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center text-lg text-gray-700 py-2 hover:text-[#FF7A00]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center text-lg font-semibold bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-white py-2 rounded-full hover:scale-105"
                  >
                    Join Now
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center text-lg text-gray-700 py-2 hover:text-[#FF7A00]"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut(auth);
                      setIsMobileMenuOpen(false);
                      navigate("/");
                    }}
                    className="block w-full text-center text-lg text-red-600 py-2 border border-gray-200 rounded-md hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
