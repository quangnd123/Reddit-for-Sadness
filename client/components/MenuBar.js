import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { AuthContext } from "../context/auth.js";

export function MenuBar() {
  const [activeItem, setActiveItem] = useState("home");
  const { user, logout } = useContext(AuthContext);
  const menuBar = user ? (
    <Menu pointing secondary color="teal">
      <Link href="/" passHref>
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={() => setActiveItem("Home")}
        />
      </Link>
      <Link href="/schedule" passHref>
        <Menu.Item
          name="Schedule Appointment"
          active={activeItem === "Schedule Appointment"}
          onClick={() => setActiveItem("Schedule Appointment")}
        />
      </Link>
      <Link href="/about" passHref>
        <Menu.Item
          name="About Us"
          active={activeItem === "About Us"}
          onClick={() => setActiveItem("About Us")}
        />
      </Link>

      <Menu.Menu position="right">
        <Link href={`/user/${user._id}`} passHref>
          <Menu.Item name={user.username} />
        </Link>
        <Link href={`/login`} passHref>
          <Menu.Item name="Logout" onClick={logout} />
        </Link>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary color="teal">
      <Link href="/" passHref>
        <Menu.Item
          name="Home"
          active={activeItem === "Home"}
          onClick={() => setActiveItem("Home")}
        />
      </Link>
      <Link href="/schedule" passHref>
        <Menu.Item
          name="Schedule Appointment"
          active={activeItem === "Schedule Appointment"}
          onClick={() => setActiveItem("Schedule Appointment")}
        />
      </Link>
      <Link href="/about" passHref>
        <Menu.Item
          name="About Us"
          active={activeItem === "About Us"}
          onClick={() => setActiveItem("About Us")}
        />
      </Link>

      <Menu.Menu position="right">
        <Link href="/login" passHref>
          <Menu.Item
            name="Login"
            active={activeItem === "Login"}
            onClick={() => setActiveItem("Login")}
          />
        </Link>

        <Link href="/register" passHref>
          <Menu.Item
            name="Register"
            active={activeItem === "Register"}
            onClick={() => setActiveItem("Register")}
          />
        </Link>
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
}
