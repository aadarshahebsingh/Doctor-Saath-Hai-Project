"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Brain, Video, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

const features = [
  {
    image: "/images/banner.jpg",
    icon: <Brain className="h-10 w-10 text-blue-600 drop-shadow-md" />,
    title: "PharmaSahayak",
    description: [
      "Find affordable alternatives to costly medicines.",
      "Explore same generic name with more options.",
      "Quick and reliable results at your fingertips.",
    ],
    route: "/PharmaSahayak",
    buttonText: "Explore PharmaSahayak",
  },
  {
    image: "/images/doctorDost.png",
    icon: <Video className="h-10 w-10 text-green-600 drop-shadow-md" />,
    title: "DoctorDost",
    description: [
      "AI-powered symptom checker for instant insights.",
      "Locate trusted doctors near your area.",
      "Accurate, fast, and user-friendly diagnosis.",
    ],
    route: "/SymptomPage",
    buttonText: "Try DoctorDost",
  },
  {
    image: "/images/prescrSaathi.png",
    icon: <MessageSquare className="h-10 w-10 text-purple-600 drop-shadow-md" />,
    title: "PrescriptoSaathi",
    description: [
      "Upload prescriptions and get instant medicine lists.",
      "Easy access to dosage details and alternatives.",
      "Private, secure, and lightning fast.",
    ],
    route: "/PrescriptoSaathi",
    buttonText: "Generate Prescription",
  },
];


const FeaturesCarousel = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative py-24 px-6 sm:px-10 lg:px-16">
      {/* Glow background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-green-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-5 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30"
          >
            <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">
              {t("Feature Subtitle")}
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5 text-slate-900 dark:text-white drop-shadow-md">
            {t("Doctor Saath Hai features")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
            {t("List of Services we provide")}
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            loop={true}
            speed={2500}
            spaceBetween={40}
            slidesPerView={1}
            className="w-full"
          >
            {features.map((feature, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  // Blue-green shadow below
                  className="flex flex-col md:flex-row items-center bg-white/90 dark:bg-slate-800/90 border border-slate-200/40 dark:border-slate-700/40 rounded-2xl shadow-[0_8px_32px_rgba(59,130,246,0.30),0_2px_8px_rgba(16,185,129,0.13)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.20),0_4px_16px_rgba(16,185,129,0.20)] transition-shadow overflow-hidden min-h-[26rem]"
                >
                  {/* Left Side: Image */}
                  <div className="w-full md:w-2/5 h-72 md:h-[26rem] flex items-center justify-center relative bg-transparent">
                    <div className="w-4/5 h-4/5 flex items-center justify-center">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="object-cover w-full h-full rounded-xl shadow-[0_8px_32px_rgba(59,130,246,0.30),0_2px_8px_rgba(16,185,129,0.17)] border border-slate-200 dark:border-slate-700"
                        style={{ maxWidth: '80%', maxHeight: '80%' }}
                      />
                    </div>
                    <div className="absolute top-5 left-5 bg-white/70 dark:bg-slate-900/70 p-3 rounded-full shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                  {/* Right Side: Text */}
                  <div className="w-full md:w-3/5 p-10 flex flex-col justify-center">
                    <h3 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <ul className="mb-8 space-y-3">
                      {feature.description.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-3 text-blue-500">•</span>
                          <span className="text-slate-700 dark:text-slate-300 text-lg">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link href={feature.route}>
                      <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-lg"
                      >
                        {t("Explore")}
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
        </div>
      </div>
    </div>
  );
};

export default FeaturesCarousel;