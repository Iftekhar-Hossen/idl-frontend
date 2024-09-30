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
        <main>{children}</main>
      </motion.div>
      <Footer />
    </>
  );
}
