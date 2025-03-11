import React, { useEffect, useRef, useState, useCallback } from "react";
import "./index.css";
import { motion } from "framer-motion";

const Education = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null); // Ref for the section
    const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [isHCIVisible, setIsHCIVisible] = useState(false);
    const [isNTUVisible, setIsNTUVisible] = useState(false);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        // Check if the user is scrolling down
        if (currentScrollY > lastScrollY) {
            // Check if the section is in view
            if (sectionRef.current) {
                const position = sectionRef.current.getBoundingClientRect().top;
                if (position < window.innerHeight && position > 0) {
                    setIsVisible(true);
                    setTimeout(() => setIsDescriptionVisible(true), 300); // Show description after 300ms
                    setTimeout(() => setIsHCIVisible(true), 700); // Show HCI after 600ms
                    setTimeout(() => setIsNTUVisible(true), 1100); // Show NTU after 900ms// Show text when scrolling down and section is in view
                } else {
                    setIsVisible(false);
                    setIsDescriptionVisible(false);
                    setIsHCIVisible(false);
                    setIsNTUVisible(false);// Hide text when section is out of view
                }
            }
        } else {
            // User is scrolling up
            setIsVisible(true);
            setIsDescriptionVisible(true); // Show description when scrolling up
            setIsHCIVisible(true); // Show HCI when scrolling up
            setIsNTUVisible(true);  // Show text when scrolling up
        }

        // Update last scroll position
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <section className="education-section" ref={sectionRef}>
            <motion.h2
                className={`education-title ${isVisible ? 'slide-in' : 'slide-out'}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
                transition={{ duration: 0.2 }}
            >
                Education & Training
            </motion.h2>
            <motion.div
                className={`education-description ${isDescriptionVisible ? 'slide-in' : 'slide-out'}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: isDescriptionVisible ? 1 : 0, x: isDescriptionVisible ? 0 : 100 }}
                transition={{ duration: 0.4 }}
            >
                Expand your knowledge and skills with these educational experiences.
            </motion.div>
            <motion.div className={`education-text ${isHCIVisible ? 'slide-in' : 'slide-out'}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: isHCIVisible ? 1 : 0, x: isHCIVisible ? 0 : 100 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.1 }}>
                <p className="education-text-title">Hwa Chong Institution (HCI)</p>
                <p className="education-text-subtitle">2011-2016</p>
            </motion.div>
            <motion.div className={`education-text ${isNTUVisible ? 'slide-in' : 'slide-out'}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: isNTUVisible ? 1 : 0, x: isNTUVisible ? 0 : 100 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.1 }}>
                <p className="education-text-title">Nanyang Technological University (NTU)</p>
                <p className="education-text-subtitle">2017-2021</p>
            </motion.div>

        </section>
    );
};

export default Education;