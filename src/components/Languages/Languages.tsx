import React, { useEffect, useRef, useState } from "react";
import "./languages.css"; // Ensure this path is correct
import { motion } from "framer-motion";
import { FaLanguage } from 'react-icons/fa';

const Languages = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null); // Ref for the section
    const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
    const [languageVisibility, setLanguageVisibility] = useState([false, false]); // Track visibility of language items

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Check if the section is in view
        if (sectionRef.current) {
            const position = sectionRef.current.getBoundingClientRect().top;
            if (position < window.innerHeight && position > 0) {
                setIsVisible(true); // Show section when in view
                // Show language items in order
                setLanguageVisibility([true, false]); // Show first language
                setTimeout(() => setLanguageVisibility([true, true]), 300); // Show second language after 300ms
            } else {
                setIsVisible(false); // Hide section when out of view
                setLanguageVisibility([false, false]); // Hide language items
            }
        }

        // Update last scroll position
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]); // Dependency array includes lastScrollY

    return (
        <motion.section className="language-section" ref={sectionRef}>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -20 }} // Start above and invisible
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }} // Slide down and fade in
                transition={{ duration: 0.5 }}
            >
                <FaLanguage className="section-icon" /> Languages & Fluency
            </motion.h2>
            <motion.div
                className="section-description"
                initial={{ opacity: 0, y: -20 }} // Start above and invisible
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }} // Slide down and fade in
                transition={{ duration: 0.5 }}
            >
                Skilled in multiple languages, enabling effective communication and collaboration across diverse environments.
            </motion.div>
            <div className="language-list">
                <motion.div
                    className={`language-item ${languageVisibility[0] ? 'slide-in' : 'slide-out'}`}
                    initial={{ opacity: 0, x: 100 }} // Start from the right
                    animate={{ opacity: languageVisibility[0] ? 1 : 0, x: languageVisibility[0] ? 0 : 100 }} // Slide in
                    transition={{ duration: 0.5, delay: 0.3 }} // Delay for the first item
                >
                    <div className="language-name">English</div>
                    <div className="language-fluency">Native</div>
                </motion.div>
                <motion.div
                    className={`language-item ${languageVisibility[1] ? 'slide-in' : 'slide-out'}`}
                    initial={{ opacity: 0, x: 100 }} // Start from the right
                    animate={{ opacity: languageVisibility[1] ? 1 : 0, x: languageVisibility[1] ? 0 : 100 }} // Slide in
                    transition={{ duration: 0.5, delay: 0.6 }} // Delay for the second item
                    whileHover={{ scale: 1.05, y: -5 }}
                >
                    <div className="language-name"> Chinese</div>
                    <div className="language-fluency">Fluent</div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Languages;