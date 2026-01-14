import React from "react";
import { SIDE_MENU_DATA } from "../../utils/sideMenuData";

const SideMenu = () => {
  return (
    <div className="absolute top-[140%] right-0 w-40 flex flex-col bg-primary rounded-md overfolow-hidden shadow-2xl">
      {SIDE_MENU_DATA.map((item) => (
        <button className="flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-white/10 transition-all text-white border-b border-white/5 last:border-0 cursor-pointer">
          <span>{item.label}</span>
          <item.icon />
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
