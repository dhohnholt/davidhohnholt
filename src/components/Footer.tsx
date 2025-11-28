import { Heart, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white/90 py-20 w-full">
      <div className="w-full px-8 lg:px-16 max-w-6xl mx-auto">
        {/* Top: three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 — About */}
          <div>
            <h3 className="text-2xl font-light tracking-tight mb-4">
              David Hohnholt
            </h3>
            <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
              Portraits, sports, events — photographed with intention and
              crafted with care.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5">
              <a
                href="https://linkedin.com/in/davidhohnholt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://instagram.com/davidhohnholt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="mailto:david@davidhohnholt.com"
                className="text-white/50 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-lg font-light mb-4">Explore</h4>
            <ul className="space-y-2 text-white/60">
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/portfolio"
                  className="hover:text-white transition-colors duration-200"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4 className="text-lg font-light mb-4">Services</h4>
            <ul className="space-y-2 text-white/60">
              <li>Sports Photography</li>
              <li>Portrait Sessions</li>
              <li>Event Coverage</li>
              <li>Digital Content</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/60">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-400" /> by David
            Hohnholt
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} David Hohnholt. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
