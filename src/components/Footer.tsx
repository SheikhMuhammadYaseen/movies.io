import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0f1219] via-[#171b2c] to-[#1f1635] text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
          {/* Home Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-white font-medium mb-2 sm:mb-4 text-sm sm:text-base">Home</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/categories" className="hover:text-violet-400 transition-colors">Categories</Link></li>
              <li><Link to="/devices" className="hover:text-violet-400 transition-colors">Devices</Link></li>
              <li><Link to="/pricing" className="hover:text-violet-400 transition-colors">Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-violet-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Movies Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-white font-medium mb-2 sm:mb-4 text-sm sm:text-base">Movies</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/genres" className="hover:text-violet-400 transition-colors">Genres</Link></li>
              <li><Link to="/trending" className="hover:text-violet-400 transition-colors">Trending</Link></li>
              <li><Link to="/new-release" className="hover:text-violet-400 transition-colors">New Release</Link></li>
              <li><Link to="/popular" className="hover:text-violet-400 transition-colors">Popular</Link></li>
            </ul>
          </div>

          {/* Shows Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-white font-medium mb-2 sm:mb-4 text-sm sm:text-base">Shows</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/genres" className="hover:text-violet-400 transition-colors">Genres</Link></li>
              <li><Link to="/trending" className="hover:text-violet-400 transition-colors">Trending</Link></li>
              <li><Link to="/new-release" className="hover:text-violet-400 transition-colors">New Release</Link></li>
              <li><Link to="/popular" className="hover:text-violet-400 transition-colors">Popular</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-white font-medium mb-2 sm:mb-4 text-sm sm:text-base">Support</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/contact-us" className="hover:text-violet-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Subscription Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-white font-medium mb-2 sm:mb-4 text-sm sm:text-base">Subscription</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/plans" className="hover:text-violet-400 transition-colors">Plans</Link></li>
              <li><Link to="/features" className="hover:text-violet-400 transition-colors">Features</Link></li>
            </ul>
          </div>

          {/* Connect With Us Column */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-white font-medium mb-2 sm:mb-4 text-sm sm:text-base">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-violet-400 transition-colors">
                <Facebook size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-violet-400 transition-colors">
                <Twitter size={16} className="sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-violet-400 transition-colors">
                <Linkedin size={16} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-4 sm:pt-8 border-t border-violet-900/20 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-xs sm:text-sm text-center sm:text-left">
            ©2025 Shaikh Muhammad Yaseen, All Rights Reserved
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <Link to="/terms" className="hover:text-violet-400 transition-colors">Terms of Use</Link>
            <Link to="/privacy" className="hover:text-violet-400 transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-violet-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};