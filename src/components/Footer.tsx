import { Heart, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#014040] text-white py-12 w-full">
      <div className="w-full px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
          <div>
            <h3 className="font-bold text-xl mb-4">David Hohnholt</h3>
            <p className="text-gray-300 mb-4">
              Digital Content Creator & Marketing Enthusiast
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/davidhohnholt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/davidhohnholt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:david@davidhohnholt.com"
                className="text-gray-300 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="/portfolio" className="hover:text-white transition-colors duration-200">Portfolio</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Digital Content Creation</li>
              <li>Photography</li>
              <li>Marketing Campaigns</li>
              <li>Web Development</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 max-w-screen-2xl mx-auto">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> by David Hohnholt
          </p>
          <p className="mt-2">&copy; 2025 David Hohnholt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}