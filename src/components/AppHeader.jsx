import { DarkThemeToggle, Navbar } from "flowbite-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function AppHeader({ openDrawer, setOpenDrawer }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [active, setActive] = useState("");

  function handleOpen() {
    setOpenDrawer(true);
    setActive("goals");
  }

  return (
    <Navbar className="fixed top-0 z-10 w-full border-b-2" fluid>
      <Navbar.Brand>
        <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Job Tracker
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link>
          <Link
            className={`${active === "home" && "font-bold dark:text-white"}`}
            to={`/?${searchParams.toString()}`}
            onClick={() => {
              window.scrollTo(0, 0);
              setActive("home");
            }}
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link onClick={() => setActive("analytics")}>
          <a
            href="#analytics"
            className={`${active === "analytics" && "font-bold dark:text-white"}`}
          >
            Analytics
          </a>
        </Navbar.Link>
        <Navbar.Link onClick={handleOpen}>
          <p className={`${active === "goals" && "font-bold dark:text-white"}`}>
            Goals
          </p>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
