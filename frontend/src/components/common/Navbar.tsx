import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImg from "../../assets/logo.png";

export default function Navbar() {
  const user = { name: "Brij Kishor" };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-300">
      <div className="flex justify-between items-center px-6 md:px-20 py-3">
        <Link to="/" className="flex justify-center items-center cursor-pointer">
          <img src={logoImg} alt="logo" className="w-10 h-10 rounded-full mr-1" />
          <p className="text-2xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300">
            Resume
          </p>
        </Link>

        <div className="hidden md:flex gap-6 justify-center items-center">
          <p className="hover:text-green-600 px-5 py-2 rounded-full text-base text-gray-800 cursor-pointer bg-gray-100 hover:bg-gray-200 hover:border">
            {user?.name}
          </p>
          <button className="px-5 py-2 rounded-full bg-gray-800 hover:bg-gray-600 text-base text-white cursor-pointer">
            Logout
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white border-t border-gray-200 shadow-sm pb-3 animate-slide-down">
          <p className="mt-2 mb-2 hover:text-green-600 px-5 py-2 rounded-full text-base text-gray-800 cursor-pointer bg-gray-100 hover:bg-gray-200">
            {user?.name}
          </p>
          <button className="px-5 py-2 rounded-full bg-gray-800 hover:bg-gray-600 text-base text-white cursor-pointer">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
