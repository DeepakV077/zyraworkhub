import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import logoImage from "./assets/Log.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImage}
                alt="Zyra Academy"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-xl font-heading font-bold gradient-text">
                Zyra Academy
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Empowering youth through high-impact webinars, design innovation,
              and meaningful collaborations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-primary-orange">About</Link></li>
              <li><Link to="/webinars" className="text-gray-600 hover:text-primary-orange">Webinars</Link></li>
              <li><Link to="/portfolio" className="text-gray-600 hover:text-primary-orange">Portfolio</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary-orange">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-orange" />
                zyra.teams.in@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-orange" />
                +91 91767 11456
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-orange" />
                Chennai, India
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.linkedin.com/company/108633491"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-gray-600"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/team.zyra"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 text-gray-600"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {year} <span className="font-medium text-gray-700">Zyra Academy</span>. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-primary-orange">Privacy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-primary-orange">Terms</Link>
          </div>
        </div>

      </div>

      {/* Thin Gold Accent */}
      <div className="h-[2px] bg-gradient-to-r from-primary-orange to-accent-yellow" />
    </footer>
  );
}
