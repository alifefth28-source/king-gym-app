import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export const Reveal = ({ children, width = "fit-content", delay = 0.25 }) => {
  const ref = useRef(null);
  // once: false -> Agar animasi jalan TERUS saat scroll naik/turun
  // amount: 0.2 -> Animasi mulai saat 20% elemen terlihat
  const isInView = useInView(ref, { once: false, amount: 0.2 }); 
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden"); // Reset ke hidden saat di-scroll lewat
    }
  }, [isInView, mainControls]);

  return (
    // PENTING: Hapus overflow: "hidden" agar shadow & scale tidak terpotong
    <div ref={ref} style={{ position: "relative", width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 }, // Posisi awal (sedikit di bawah)
          visible: { opacity: 1, y: 0 }, // Posisi akhir (normal)
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};