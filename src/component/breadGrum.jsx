import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => {
  const location = useLocation();

  return (
    <nav className="flex items-center text-sm">
      <ol className="flex items-center gap-1">
        {items.map((item, index) => {
          const isActive = location.pathname === item.to;

          return (
            <li
              key={index}
              className="
                flex items-center
                opacity-0
                translate-y-2
                animate-[fadeIn_0.4s_ease-out_forwards]
              "
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Router Link */}
              {item.to ? (
                <Link
                  to={item.to}
                  className={`
                    relative
                    transition-colors duration-300
                    ${
                      isActive
                        ? "font-semibold text-amber-600"
                        : "text-gray-600 hover:text-amber-600"
                    }
                    group
                  `}
                >
                  {item.label}

                  {/* underline animation */}
                  {!isActive && (
                    <span
                      className="
                        absolute left-0 -bottom-0.5
                        h-[2px] w-0
                        bg-amber-500
                        transition-all duration-300
                        group-hover:w-full
                      "
                    />
                  )}
                </Link>
              ) : (
                <span className="font-semibold text-amber-600">
                  {item.label}
                </span>
              )}

              {/* Divider */}
              {index < items.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
              )}
            </li>
          );
        })}
      </ol>

      {/* Inline animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Breadcrumb;
