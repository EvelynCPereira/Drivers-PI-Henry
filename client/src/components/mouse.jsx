import React, { useRef, useEffect } from "react";
import "./mouse.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = cursorRef.current;
      if (cursor) {
        const cursorWidth = cursor.offsetWidth;
        const cursorHeight = cursor.offsetHeight;
        cursor.style.left = `${e.clientX - cursorWidth / 2}px`;
        cursor.style.top = `${e.clientY - cursorHeight / 2}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef}></div>;
};

export default CustomCursor;
