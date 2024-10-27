import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Preloader() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Hide loader on initial page load
    const hideInitialLoader = () => {
      setLoading(false);
      setTimeout(() => setShowLoader(false), 700);
    };

    // Hide loader once the initial content is loaded
    if (document.readyState === "complete") {
      hideInitialLoader();
    } else {
      window.addEventListener("load", hideInitialLoader);
      return () => window.removeEventListener("load", hideInitialLoader);
    }
  }, []); // Empty dependency array for initial load only

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true);
        setShowLoader(true);
      }
    };

    const handleComplete = (url) => {
      if (url === router.asPath) {
        setLoading(false);
        setTimeout(() => setShowLoader(false), 700); // Delay removal to allow fade-out
      }
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (!showLoader) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999999] flex h-screen w-full items-center justify-center bg-primary transition-opacity duration-700 ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      <img src="/loader.png" alt="Loading..." />
    </div>
  );
}
