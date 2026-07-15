import { PropsWithChildren, useRef } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";
  const portraitRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = portraitRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tiltX", `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty("--tiltY", `${(x * 10).toFixed(2)}deg`);

    // Parallax for decorative layers
    wrapper.style.setProperty("--px", `${(x * 18).toFixed(2)}px`);
    wrapper.style.setProperty("--py", `${(y * 18).toFixed(2)}px`);
    wrapper.style.setProperty("--px2", `${(-x * 28).toFixed(2)}px`);
    wrapper.style.setProperty("--py2", `${(-y * 28).toFixed(2)}px`);
  };

  const handleLeave = () => {
    const el = portraitRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;
    el.style.setProperty("--tiltX", "0deg");
    el.style.setProperty("--tiltY", "0deg");
    wrapper.style.setProperty("--px", "0px");
    wrapper.style.setProperty("--py", "0px");
    wrapper.style.setProperty("--px2", "0px");
    wrapper.style.setProperty("--py2", "0px");
  };

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {" "}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <div ref={wrapperRef} className="landing-portrait-wrapper">
              <div className="portrait-ambient-glow" aria-hidden="true" />
              <div className="portrait-radial-light" aria-hidden="true" />
              <div
                ref={portraitRef}
                className="landing-portrait"
                aria-label={config.developer.fullName}
                role="img"
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
              >
                {/* Premium futuristic frame layers */}
                <div className="futuristic-frame-border" />
                <div className="futuristic-frame-glass" />
                
                {/* Floating unique HUD corner decorations */}
                {/* Top-left: floating glass square with a glowing node */}
                <div className="hud-corner hud-corner--top-left">
                  <div className="glass-square">
                    <span className="glowing-node" />
                  </div>
                </div>

                {/* Top-right: curved neon cyber corner */}
                <div className="hud-corner hud-corner--top-right">
                  <div className="cyber-curve" />
                  <span className="cyber-dot" />
                </div>

                {/* Bottom-left: minimal L-shaped glowing corner */}
                <div className="hud-corner hud-corner--bottom-left">
                  <div className="l-bracket" />
                </div>

                {/* Bottom-right: floating glass square with cyan glow */}
                <div className="hud-corner hud-corner--bottom-right">
                  <div className="glass-square-cyan">
                    <span className="cyan-pixel" />
                  </div>
                </div>

                {/* Holographic reflection overlay */}
                <div className="holographic-reflection" />

                <img src={`${import.meta.env.BASE_URL}images/mypic.jpeg`} alt={config.developer.fullName} />
              </div>
            </div>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <img src={`${import.meta.env.BASE_URL}images/mypic.jpeg`} alt={config.developer.fullName} />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
