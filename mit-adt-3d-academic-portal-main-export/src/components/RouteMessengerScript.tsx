"use client";

import { useEffect } from "react";

export default function RouteMessengerScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js";
    script.setAttribute("data-target-origin", "*");
    script.setAttribute("data-message-type", "ROUTE_CHANGE");
    script.setAttribute("data-include-search-params", "true");
    script.setAttribute("data-only-in-iframe", "true");
    script.setAttribute("data-debug", "true");
    script.setAttribute(
      "data-custom-data",
      '{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
    );
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      const existingScript = document.querySelector(
        'script[src*="route-messenger.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}

