import Navbar from "./navbar";
import Footer from "./footer";
import { Cormorant_Garamond } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
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

      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ y: -100, filter: "blur(50px)" }}
          animate={{ filter: "blur(0px)", y: 0 }}
          exit={{ filter: "blur(50px)", y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <main>{children}</main>
        </motion.div>
      </AnimatePresence>
      {/* <Footer /> */}
    </>
  );
}
