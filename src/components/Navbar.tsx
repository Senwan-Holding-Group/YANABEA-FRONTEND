import { NavLink } from "react-router";
import LOGO from "/LOGO.svg";
import { navItems } from "@/lib/constants";

const Navbar = () => {
  return (
    <div className="bg-white px-6 py-4 h-[3.875rem] rounded-b-[12px] flex items-center justify-between w-screen ">
      <img src={LOGO} alt="Logo"  />
      <div className=" hidden lg:block ">
        {navItems.map((i) => (
          <nav
            key={i.title}
            className=" w-full flex items-center  transition-all ease-in-out text-base  gap-10  ">
            {i.items.map((item) => (
              <NavLink
                to={item.path}
                key={item.label}
                style={({ isActive }) => ({
                  color: isActive ? "#143456" : "#AAA7A8",
                  borderBottom: isActive ? "2px solid #8A9AAB" : "none",
                })}>
                <span className=" text-nowrap  font-semibold text-lg ">      
                  {item.navLabel}
                </span>
              </NavLink>
            ))}
          </nav>
        ))}
      </div>
      <span className="font-semibold text-lg text-Primary-500">Malik</span>
    </div>
  );
};

export default Navbar;
