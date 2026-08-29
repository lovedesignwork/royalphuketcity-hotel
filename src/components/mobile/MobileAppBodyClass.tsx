"use client";

import { useEffect } from "react";

export default function MobileAppBodyClass() {
  useEffect(() => {
    document.body.classList.add("mobile-app-body");
    return () => {
      document.body.classList.remove("mobile-app-body");
    };
  }, []);

  return null;
}
