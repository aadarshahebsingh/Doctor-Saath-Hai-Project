"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);
import Footer from "./Footer";

const cardRoutes = [
  "/PharmaSahayak", // PharmaSahayak
  "/SymptomPage", // DoctorDost
  "/PrescriptoSaathi", // PrescriptoSaathi
];

const cardsData = [
  {
    title: "PharmaSahayak",
    points: [
      "Find affordable alternatives to costly medicines.",
      "Explore same generic name with more options.",
      "Quick and reliable results at your fingertips.",
    ],
    img: "/images/banner.jpg",
  },
  {
    title: "DoctorDost",
    points: [
      "AI-powered symptom checker for instant insights.",
      "Locate trusted doctors near your area.",
      "Accurate, fast, and user-friendly diagnosis.",
    ],
    img: "/images/doctorDost.png",
  },
  {
    title: "PrescriptoSaathi",
    points: [
      "Upload prescriptions and get instant medicine lists.",
      "Easy access to dosage details and alternatives.",
      "Private, secure, and lightning fast.",
    ],
    img: "/images/prescrSaathi.png",
  },
];

export default function Feature() {
  const [t] = useTranslation();

  // ✅ Replace useEffect with useGSAP + ScrollTrigger
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".card").forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 1.05 },
        {
          scale: 0.95,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // when card enters viewport
            end: "bottom 60%", // when it passes
            scrub: true, // smooth scrolling effect
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="bg-transparent text-white min-h-[400vh] font-sans relative flex flex-col">
        {/* Background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-green-500/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-purple-500/5 blur-2xl"></div>
        </div>

        {/* Spacer so content isn't hidden behind navbar */}
        <div className="pt-24" />
        <div className="text-3xl font-bold text-center text-white mb-10">
  <motion.h4
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="
    text-4xl sm:text-5xl lg:text-7xl font-bold text-center
    bg-gradient-to-r from-blue-400 via-blue-500 to-green-400
    bg-clip-text text-transparent
  "
>
  {t("Features")}
</motion.h4>

<p className="mt-4 text-center text-lg text-gray-300 max-w-2xl mx-auto">
  Explore the powerful features we’ve built to make your experience smoother, faster, and more enjoyable.
</p>
<br />

</div>

        {/* Cards */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="card sticky top-[15%] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 min-h-[22rem] md:min-h-[30rem] mb-12 md:mb-16 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-2xl border-2 border-transparent 
        [background-clip:padding-box,border-box] [background-origin:border-box] 
        bg-[linear-gradient(rgba(20,20,20,0.9),rgba(20,20,20,0.9)),linear-gradient(135deg,#2563eb,#06b6d4,#10b981)] 
        transition-all duration-500"
            >
              {/* Text Section */}
              <div className="flex-1 basis-1/2 text-center md:text-left">
                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-300 mb-3 leading-tight"
                >
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                    {t(card.title)}
                  </span>
                </motion.h2>

                {/* Subtitle / description */}
                {card.points && (
                  <p className="text-base sm:text-lg text-gray-200 mb-5">
                    {t(card.points)}
                  </p>
                )}

                {/* Checkpoints list */}
                <ul className="space-y-3 mb-6">
                  {card.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-base sm:text-lg text-white"
                    >
                      <FaCheckCircle className="text-teal-400 text-lg" />
                      <span>{t(point)}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <a
                  href={cardRoutes[idx]}
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
                >
                  Learn More
                </a>
              </div>

              {/* Image Section */}
              <div className="flex-1 basis-1/2 flex justify-center items-center">
                <img
                  src={card.img}
                  alt={card.title}
                  className="rounded-lg max-w-full sm:max-w-md w-full h-auto object-cover 
            shadow-lg
            drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]    /* white glow */
            drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]    /* bright blue */
          "
                />
              </div>
            </div>
          ))}
        </div>

        {/* Spacer before footer */}
        <div className="pb-18" />

        {/* Footer */}
        <Footer/>
      </div>
    </>
  );
}
