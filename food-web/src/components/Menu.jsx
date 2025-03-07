import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes";

const Menu = () => {
    return (
        <nav className="menu d-none">
            <ul>
                {routes.filter(route => !route.meta.isDynamic && route.name !== "NotFound" && !route.meta.isIndex).map((route) => (
                    <li key={route.path}>
                        <NavLink
                            to={route.path}
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
