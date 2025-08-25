"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Menu, X, Stethoscope, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "Features", path: "/Features" },
    { key: "Solutions", path: "#" },
    { key: "About", path: "/AboutUs" },
    { key: "Contact", path: "#" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 shadow-lg"
          : "bg-transparent dark:bg-transparent"
      }`}
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full flex items-center justify-center shadow-md"
            >
              {/* Medical Icon Logo */}
              <Stethoscope className="h-7 w-7 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-slate-900 dark:text-white select-none">
              Doctor Saath Hai
            </span>
          </Link>

          {/* Desktop Navigation shifted right */}
          <div className="flex items-center space-x-8 ml-auto">
            {navItems.map((item, index) => (
              <Link href={item.path} key={index}>
                <motion.span
                  className="text-slate-700 dark:text-slate-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-base"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(item.key)}
                </motion.span>
              </Link>
            ))}
            
          </div>
        </div>
      </div>

      
    </motion.nav>
  );
};

export default Navbar;