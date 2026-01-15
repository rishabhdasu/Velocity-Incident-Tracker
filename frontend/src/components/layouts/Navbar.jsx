import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../utils/navData";
import { IoIosArrowDropdown } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import SideMenu from "./SideMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="flex justify-between py-3 px-10 bg-primary text-white shadow-md top-0 sticky">
      <NavLink
        to="/"
        className="font-bold flex items-center gap-1 text-yellow-300 tracking-tight text-xl"
      >
        <span>Velocity</span>
        <AiFillThunderbolt />
      </NavLink>
      <ul className="flex items-center gap-2 list-none m-0 p-0">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/20 text-white shadow-sm"
                    : "bg-white/50 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-1 cursor-pointer hover:text-gray-200"
        >
          <IoIosArrowDropdown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
          <span>Rishabh</span>
        </button>
        {isOpen && <SideMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
