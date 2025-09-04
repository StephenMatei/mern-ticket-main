import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import {
  RiMenu3Fill,
  RiContactsBook2Fill,
  RiFolderInfoFill,
  RiInformationLine,
} from "react-icons/ri";
import { GiCrossMark } from "react-icons/gi";
import { FaHome, FaTachometerAlt } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "../../../pages/shared/Shared.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const navLinks = [
    { title: "Home", link: "/", icon: <FaHome /> },
    { title: "Events", link: "/event", icon: <RiFolderInfoFill /> },
    { title: "About", link: "/about", icon: <RiInformationLine /> },
    { title: "Contact", link: "/contact", icon: <RiContactsBook2Fill /> },
  ];

  const activeLink = ({ isActive }) => ({
    fontWeight: isActive ? 600 : 400,
    color: isActive ? "#4F46E5" : "#1F2937",
  });

  // Hide navbar on scroll down, show on scroll up
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        setShow(window.scrollY > lastScrollY);
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed w-full z-50 shadow-md bg-white transition-transform ${
        show ? "-translate-y-20" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-12 py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-lobster text-indigo-600">
            Sammy-Kioko Events
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((navItem) => (
            <li key={navItem.title}>
              <NavLink
                to={navItem.link}
                style={activeLink}
                className="px-3 py-2 rounded-md transition-colors duration-300 hover:bg-indigo-100 hover:text-indigo-600"
              >
                {navItem.title}
              </NavLink>
            </li>
          ))}

          {!user && (
            <>
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
                >
                  Sign In
                </Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button
            onClick={toggleDrawer}
            className="text-2xl text-indigo-600 hover:text-indigo-800 transition"
          >
            <RiMenu3Fill />
          </button>
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
            className="p-4 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex justify-end mb-6">
                <GiCrossMark
                  className="text-2xl text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  onClick={toggleDrawer}
                />
              </div>
              <ul className="flex flex-col gap-6">
                {navLinks.map((navItem) => (
                  <li key={navItem.title} onClick={toggleDrawer}>
                    <NavLink
                      to={navItem.link}
                      style={activeLink}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-300"
                    >
                      {navItem.icon} {navItem.title}
                    </NavLink>
                  </li>
                ))}

                {!user && (
                  <>
                    <li>
                      <Link
                        to="/register"
                        className="w-full px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition"
                        onClick={toggleDrawer}
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="w-full px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
                        onClick={toggleDrawer}
                      >
                        Sign In
                      </Link>
                    </li>
                  </>
                )}

                {user && (
                  <>
                    <li onClick={toggleDrawer}>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
                      >
                        <FaTachometerAlt /> Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onLogout();
                          toggleDrawer();
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="text-center mt-8 text-gray-500">
              &copy; {new Date().getFullYear()} Sammy-Kioko Events
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
