import React, { useEffect, useState } from "react";
import { Rocket, Star, Target } from "lucide-react";
import BackgroundRings from "./patter.jsx";

const HeroOverlay = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = 200;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="
        relative w-full overflow-hidden rounded-2xl
        h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[340px]
        group
      "
    >
      {/* Background SVG */}
      <BackgroundRings className="absolute inset-0 w-full h-full" />

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-300/20"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(
            45deg,
            rgba(255, 157, 0, ${0.2 + scrollProgress * 0.3}) 0%,
            rgba(255, 107, 0, ${0.3 + scrollProgress * 0.3}) 50%,
            rgba(255, 61, 0, ${0.4 + scrollProgress * 0.3}) 100%
          )`,
        }}
      />

      <div className="relative z-10 h-full flex items-center">
        <div
          className="
            container mx-auto
            px-3 sm:px-4 md:px-6 lg:px-8
            flex flex-row items-center justify-between
            gap-4 md:gap-6 lg:gap-8
            w-full
          "
        >
          {/* Text Section - Always left side */}
          <div className="text-white flex-1 min-w-0">
            <div className="relative">
              <h1
                className="
                  text-[15px] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
                  font-extrabold leading-tight drop-shadow-lg
                  transform-gpu
                  transition-all duration-700
                "
                style={{
                  transform: `translateY(${scrollProgress * -5}px)`,
                  opacity: 1 - scrollProgress * 0.2,
                }}
              >
                Everest International
                <br />
                <div className="relative inline-block">
                  <span className="text-yellow-300 relative z-10">
                    Management Consultancy
                  </span>
                  
                  {/* Animated underline - positioned under the yellow text only */}
                  <div className="relative">
                    <div
                      className="
                        h-[3px] sm:h-1
                        bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400
                        rounded-full
                        transform origin-left
                        transition-all duration-500
                        mt-0.5 sm:mt-1
                      "
                      style={{
                        width: '100%',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s infinite linear',
                      }}
                    />
                    
                    {/* Glow effect under the line */}
                    <div
                      className="
                        absolute -bottom-1 left-0 right-0
                        h-2 sm:h-3
                        bg-gradient-to-r from-yellow-400/30 via-orange-500/20 to-yellow-400/30
                        blur-[2px] sm:blur-[3px]
                        -z-10
                        opacity-60
                      "
                    />
                  </div>
                </div>
              </h1>
            </div>

            {/* Services badges */}
            <div
              className="
                mt-2 sm:mt-3
                flex flex-col xs:flex-row flex-wrap
                items-start xs:items-center
                gap-1.5 sm:gap-2
              "
              style={{
                transform: `translateY(${scrollProgress * 3}px)`,
              }}
            >
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-[10px] sm:text-xs">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  Training
                </span>
                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-[10px] sm:text-xs">
                  <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  ISO Consulting
                </span>
                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-[10px] sm:text-xs">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  Safety & Compliance
                </span>
              </div>
            </div>
          </div>

          {/* Rocket Section - Always right side */}
          <div className="relative flex-shrink-0 ml-2 sm:ml-4">
            <div
              className="
                relative
                rounded-xl sm:rounded-2xl md:rounded-3xl
                bg-white/10 backdrop-blur-xl
                shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:shadow-[0_15px_40px_rgba(0,0,0,0.4)]
                p-2.5 sm:p-4 md:p-6
                transform-gpu
                transition-all duration-700
                hover:rotate-2 hover:scale-105
                group/rocket
                min-w-[60px] sm:min-w-[80px] md:min-w-[100px]
              "
              style={{
                transform: `translateY(${scrollProgress * -15}px) rotate(${
                  scrollProgress * 3
                }deg)`,
              }}
            >
              <Rocket
                className="
                  text-yellow-300
                  drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] sm:drop-shadow-[0_12px_25px_rgba(0,0,0,0.6)]
                  w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16
                  transition-all duration-500
                  group-hover/rocket:translate-y-[-3px]
                  animate-bounce
                "
                style={{
                  animationDuration: "2.5s",
                }}
              />

              {/* Animated rocket trail */}
              <div
                className="
                  absolute -right-1 sm:-right-2 top-1/2 -translate-y-1/2
                  w-6 sm:w-8 md:w-10 h-0.5 sm:h-1
                  bg-gradient-to-l from-yellow-500/50 to-transparent
                  opacity-0
                  group-hover/rocket:opacity-100
                  group-hover/rocket:w-8 sm:group-hover/rocket:w-12
                  transition-all duration-500
                "
              >
                {/* Flame particles */}
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="
                      absolute right-0 top-1/2 -translate-y-1/2
                      w-1.5 h-1.5 sm:w-2 sm:h-2
                      bg-yellow-400 rounded-full
                      opacity-0
                      group-hover/rocket:opacity-100
                      group-hover/rocket:animate-ping
                    "
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Orbiting elements */}
            <div className="absolute inset-0 -z-10 hidden sm:block">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-yellow-300/20"
                  style={{
                    animation: `orbit ${8 + i * 2}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                    width: `${80 + i * 30}px`,
                    height: `${80 + i * 30}px`,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>

            {/* Glow effect */}
            <div
              className="
                absolute -inset-3 sm:-inset-4 md:-inset-5
                bg-gradient-to-r from-yellow-400/20 to-orange-500/15 
                blur-xl sm:blur-2xl -z-10 rounded-full
                opacity-50
                group-hover/rocket:opacity-70
                transition-opacity duration-500
              "
            />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-5px) translateX(5px); }
          50% { transform: translateY(3px) translateX(-3px); }
          75% { transform: translateY(-3px) translateX(-5px); }
        }

        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroOverlay;