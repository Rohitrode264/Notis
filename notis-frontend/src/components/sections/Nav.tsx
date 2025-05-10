import { useState } from "react";
import { MapPin, Globe, Newspaper, Menu, X } from "lucide-react";
interface NavProps {
    currentCategory: string;
    onCategoryChange: (category: string) => void;
  }
export const Nav = ({ currentCategory, onCategoryChange }:NavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e:React.MouseEvent<HTMLAnchorElement>, itemText:string) => {
    e.preventDefault();
    onCategoryChange(itemText);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const navItems = [
    { icon: <MapPin size={18} />, text: "India", href: "India" },
    { icon: <Globe size={18} />, text: "Global", href: "global" },
    { icon: <Newspaper size={18} />, text: "Current Affairs", href: "ca" }
  ];

  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition duration-200 ${
              currentCategory === item.text ? "bg-white/10 text-blue-400" : ""
            }`}
            onClick={(e) => handleNavClick(e, item.text)}
          >
            {item.icon}
            <span>{item.text}</span>
          </a>
        ))}
      </nav>

      <button
        className="md:hidden flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-200"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 md:hidden">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-200"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-full">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center space-x-3 px-5 py-4 my-2 rounded-lg hover:bg-white/10 transition duration-200 text-xl ${
                  currentCategory === item.text ? "bg-white/10 text-blue-400" : ""
                }`}
                onClick={(e) => handleNavClick(e, item.text)}
              >
                {item.icon}
                <span>{item.text}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
