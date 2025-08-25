'use client';
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [t] = useTranslation();
  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex items-center">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-green-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-500/5 blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="text-center"
        >
          {/* Innovation Badge */}
          <motion.div
            variants={item}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 dark:from-blue-500/10 dark:to-green-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-purple-700 dark:text-purple-400 font-medium text-sm">
                {t("Revolutionizing Healthcare, One Prescription at a Time")}
              </span>
            </div>
          </motion.div>

          {/* Catchy Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
          >
            {t("Instantly Generate Accurate Prescriptions")}
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-green-600 bg-clip-text text-transparent">
              {t("Safe, Smart & Hassle-Free")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {t("Empower your healthcare journey with AI-powered prescriptions including precise medicine dosages and instructions. Trusted by doctors. Loved by patients.")}
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/SymptomPage">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-500 to-green-600 hover:from-blue-700 hover:via-purple-600 hover:to-green-700 shadow-lg shadow-blue-500/30 dark:shadow-blue-900/30 w-full sm:w-auto flex items-center gap-2"
                >
                  <FileText className="h-5 w-5" />
                  {t("Generate Prescription")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/Features" passHref>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors w-full sm:w-auto backdrop-blur-sm"
                >
                  {t("Explore Features")}
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Visual Mockup (Optional) */}
          <motion.div
            variants={item}
            className="mt-12 flex justify-center"
          >
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-6 flex flex-col items-center max-w-md mx-auto">
              <FileText className="h-10 w-10 text-blue-600 mb-2" />
              <p className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                {t("Sample Prescription")}
              </p>
              <ul className="text-left text-sm text-slate-700 dark:text-slate-200">
                <li>
                  <span className="font-bold">{t("Possible Condition:")}</span> Diabetes
                </li>
                <li>
                  <span className="font-bold">{t("Medicine:")}</span> Metformin
                </li>
                <li>
                  <span className="font-bold">{t("Dosage:")}</span> 500mg
                </li>
                <li>
                  <span className="font-bold">{t("Price:")}</span> ₹10
                </li>
                
              </ul>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: t("Prescriptions Generated"), value: "20K+" },
              { label: t("Medicine Database Accuracy"), value: "99.2%" },
              { label: t("Satisfied Users"), value: "10K+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-4 backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 rounded-xl border border-slate-200/50 dark:border-slate-700/50"
              >
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat?.value}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {stat?.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;