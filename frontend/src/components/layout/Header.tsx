import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import logoImage from "../../assets/Logos/BlueZyra.png";
import logoImage from "../../assets/Logos/InZyra.png";
// import logoImage from "../../assets/Logos/YellowZyra.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
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
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 font-poppins">
        <div className="flex justify-between items-center h-20">
          {/* --- Logo --- */}
          <a 
            href="/"
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={logoImage}
              alt="Zyra Academy"
              className="w-35 h-20 hover:scale-105 transition-transform"
            />
          </a>

          {/* --- Desktop Nav --- */}
          <div className="hidden lg:flex items-center gap-8" ref={navRef}>
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
                      className={`inline-flex items-center gap-1.5 text-base font-medium transition-colors ${
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
                      className={`absolute left-0 mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-200 ${
                        isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
                      }`}
                    >
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block px-4 py-3.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-[#FF7A00] transition-colors"
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
                  className={`text-base font-medium transition-colors ${
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
                  <summary className="flex justify-between items-center cursor-pointer text-base font-medium py-2.5 text-gray-800 hover:text-[#FF7A00] transition-colors">
                    {item.name}
                    <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-4 space-y-1 mt-2">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-sm font-medium text-gray-600 hover:text-[#FF7A00] transition-colors"
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
                  className="block py-2.5 text-base font-medium text-gray-800 hover:text-[#FF7A00] transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}

          </div>
        </div>
      </nav>
    </header>
  );
}
