import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Services',
      href: '#',
      submenu: [
        { name: 'Webinars', href: '/webinars' },
        { name: 'Design Studio', href: '/design-studio' },
        { name: 'Marketing Partnership', href: '/marketing' },
      ],
    },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-orange to-accent-yellow flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110">
              <span className="text-white text-2xl font-heading font-bold">Z</span>
            </div>
            <span className="text-2xl font-heading font-bold gradient-text hidden sm:block">
              Zyra WorkHub
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) =>
              item.submenu ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-orange transition-colors font-medium">
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-slide-down">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-orange transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-gray-700 hover:text-primary-orange transition-colors font-medium ${
                    isActive(item.href) ? 'text-primary-orange' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/speakers/apply" className="btn-secondary text-sm">
              Become a Speaker
            </Link>
            <Link to="/contact" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary-orange transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) =>
                item.submenu ? (
                  <div key={item.name} className="flex flex-col space-y-2">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <div className="pl-4 flex flex-col space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-gray-600 hover:text-primary-orange transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-gray-700 hover:text-primary-orange transition-colors font-medium ${
                      isActive(item.href) ? 'text-primary-orange' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <div className="pt-4 flex flex-col space-y-3">
                <Link
                  to="/speakers/apply"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-secondary text-center text-sm"
                >
                  Become a Speaker
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary text-center text-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
