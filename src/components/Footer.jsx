import { Facebook, Linkedin, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-blue-900 via-indigo-900 to-purple-900 text-white py-10 relative z-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Branding */}
        <div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-pink-400 text-transparent bg-clip-text mb-2">
            Civil Engineering Tools
          </h1>
          <p className="text-gray-300 text-sm">
            Modern tools for professional civil engineers. Built with ❤️ for precision.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-white">Quick Links</h2>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li><a href="/bbs-calculator" className="hover:text-yellow-300">BBS Calculator</a></li>
            <li><a href="/brick-calculator" className="hover:text-yellow-300">Brick Calculator</a></li>
            <li><a href="/unit-converter" className="hover:text-yellow-300">Unit Converter</a></li>
            <li><a href="/load-calculator" className="hover:text-yellow-300">Load Calculator</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-white">Connect</h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="mailto:someone@example.com" className="hover:text-blue-300"><Mail size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-blue-500"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Github size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Civil Engineering Tools. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
