import React from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../utils/navData";
import { IoIosArrowDropdown } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-3 px-10 bg-primary text-white shadow-md">
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
      <button className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
        <IoIosArrowDropdown />
        <span>Rishabh</span>
      </button>
    </nav>
  );
};

export default Navbar;
