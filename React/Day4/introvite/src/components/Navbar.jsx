import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div>
        <h2>Navbar</h2>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Services
        </NavLink>

        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Courses
        </NavLink>

        <NavLink
          to="/gallery"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Gallery
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Help
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;