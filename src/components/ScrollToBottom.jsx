import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToBottom() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  }, [pathname]);

  return null;
}