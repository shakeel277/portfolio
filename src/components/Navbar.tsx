import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import profileAsset from "../assets/profile-transparent.png.asset.json";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    // Start paused
    lenis.stop();

    // Handle smooth scroll animation frame
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle resize
    window.addEventListener("resize", () => {
      lenis?.resize();
    });

    return () => {
      lenis?.destroy();
      document.body.classList.remove("lock-scroll");
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        lenis?.stop();
        document.body.classList.add("lock-scroll");
      } else {
        lenis?.start();
        document.body.classList.remove("lock-scroll");
      }
      return next;
    });
  };

  const handleLinkClick = (targetSelector: string, e?: React.MouseEvent) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      lenis?.start();
      document.body.classList.remove("lock-scroll");
    }

    const target = document.querySelector(targetSelector) as HTMLElement;
    if (target) {
      if (e) e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.5,
        });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className={`header ${isMenuOpen ? "nav-open" : ""}`}>
        <a
          href="#landingDiv"
          className="navbar-title navbar-avatar"
          data-cursor="disable"
          aria-label="Home"
          onClick={(e) => handleLinkClick("#landingDiv", e)}
        >
          <img src={profileAsset.url} alt="Shakeel Ahmed" />
        </a>
        <a
          href="mailto:s03072637158@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          s03072637158@gmail.com
        </a>
        
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={isMenuOpen ? "active" : ""}>
          <li>
            <a
              data-href="#about"
              href="#about"
              onClick={(e) => handleLinkClick("#about", e)}
            >
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a
              data-href="#work"
              href="#work"
              onClick={(e) => handleLinkClick("#work", e)}
            >
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a
              data-href="#contact"
              href="#contact"
              onClick={(e) => handleLinkClick("#contact", e)}
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
