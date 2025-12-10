import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import logoImage from './assets/Log.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about#team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Webinars', href: '/webinars' },
      { name: 'Design Studio', href: '/design-studio' },
      { name: 'Marketing Partnership', href: '/marketing' },
      { name: 'Call for Speakers', href: '/speakers/apply' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Success Stories', href: '/blog?category=success' },
      { name: 'FAQ', href: '/faq' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/108633491', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/zyraworkhub', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/team.zyra', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@zyraworkhub', label: 'YouTube' },
  ];

  return (
    <footer className="bg-[#0d0d0d] text-gray-300 relative overflow-hidden">
      {/* Subtle top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-200"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        {/* Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img
              src={logoImage}
              alt="Zyra WorkHub"
              className="w-14 h-14 rounded-full object-cover drop-shadow-[0_0_12px_rgba(255,200,80,0.3)]"
              />
              <span className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Zyra Academy
              </span>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Empowering youth through next-generation webinars, design services, and strategic marketing.
              Building innovation and leadership for a smarter future.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center
                             border border-transparent hover:border-yellow-400 hover:scale-110
                             hover:shadow-[0_0_12px_rgba(255,200,80,0.3)] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-300 hover:text-yellow-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-lg mb-4 text-white capitalize">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-yellow-300 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info + Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-orange-400" />
                <a href="mailto:zyra.teams.in@gmail.com" className="hover:text-yellow-300 transition-colors">
                  zyra.teams.in@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-orange-400" />
                <a href="tel:+919176711456" className="hover:text-yellow-300 transition-colors">
                  +91 9176711456
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>

            <div className="flex flex-col md:items-end space-y-3">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear}{' '}
                <span className="text-yellow-300 font-medium">Zyra WorkHub</span>. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-gray-400 hover:text-yellow-300 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-yellow-300 transition-colors text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Bar */}
      <div className="bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-300 h-[3px] w-full"></div>
    </footer>
  );
}
