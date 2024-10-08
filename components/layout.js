import Navbar from "./navbar";
import { Footer } from "./footer";
import { Cormorant_Garamond } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <motion.div key={router.route}>
        <main>
          {children}
          <div className="fixed bottom-5 right-5 w-14 h-14">
            <a href="https://wa.me/8801740062270">
              <img src="/wa.png" />
            </a>
          </div>
        </main>
      </motion.div>

      <Footer />
    </>
  );
}
