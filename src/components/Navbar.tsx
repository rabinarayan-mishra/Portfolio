import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FaRobot } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    const isDesktop = window.innerWidth > 1024;

    if (isDesktop) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        speed: 1.3,
        effects: true,
      });

      smoother.scrollTop(0);
      smoother.paused(true);
    }

    const links = document.querySelectorAll(
      ".header ul a"
    );

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;

      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();

          const elem =
            e.currentTarget as HTMLAnchorElement;

          const section =
            elem.getAttribute("data-href");

          if (section && smoother) {
            smoother.scrollTo(
              section,
              true,
              "top top"
            );
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  return (
    <>
      <div className="header">

        {/* LOGO + THEME */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <a
            href="/#"
            className="navbar-title"
            data-cursor="disable"
          >
            RM
          </a>

          <ThemeToggle />
        </div>

        {/* EMAIL */}
        <a
          href="mailto:mrabinarayan43@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          mrabinarayan43@gmail.com
        </a>

        {/* NAVIGATION */}
        <ul>

          <li>
            <a
              data-href="#about"
              href="#about"
            >
              <HoverLinks text="ABOUT" />
            </a>
          </li>

          <li>
            <a
              data-href="#work"
              href="#work"
            >
              <HoverLinks text="WORK" />
            </a>
          </li>

          <li>
            <a
              data-href="#contact"
              href="#contact"
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>

          <li>
            <a
              data-href="#terminal"
              href="#terminal"
            >
              <HoverLinks
                text={
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaRobot
                      size={18}
                      style={{
                        transform:
                          "translateY(-2px)",
                      }}
                    />

                    ASK AI
                  </span>
                }
              />
            </a>
          </li>

        </ul>
      </div>

      {/* BACKGROUND DECORATION */}
      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;