import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./index.css";
// Import icons
import {
    SiSolidity,
    SiBinance,
    SiWeb3Dotjs,
    SiEthereum,
    SiGit,
    SiJavascript,
    SiPython,
    SiSharp,
    SiCplusplus,
    SiRust,
    SiTensorflow,
    SiScikitlearn,
    SiFigma,
    SiAdobexd
} from 'react-icons/si';
import {
    FaNetworkWired,
    FaRocket,
    FaProjectDiagram,
    FaTasks,
    FaMobile,
    FaSitemap,
    FaChartLine,
    FaBrain,
    FaDatabase
} from 'react-icons/fa';

// Create an icon mapping object
const skillIcons: Record<string, React.ReactNode> = {
    // Blockchain
    "Solidity": <SiSolidity />,
    "Binance Smart Chain": <SiBinance />,
    "Web3": <SiWeb3Dotjs />,
    "Hardhat": <SiEthereum />,
    "Truffle": <SiGit />,

    // Programming Languages
    "JavaScript": <SiJavascript />,
    "Python": <SiPython />,
    "C#": <SiSharp />,
    "C++": <SiCplusplus />,
    "Rust": <SiRust />,

    // Game Development
    "Multiplayer Networking": <FaNetworkWired />,
    "Game Optimization": <FaRocket />,

    // Management & Design
    "Product Management": <FaTasks />,
    "Project Management": <FaProjectDiagram />,
    "Figma": <SiFigma />,
    "Adobe XD": <SiAdobexd />,
    "Responsive Design": <FaMobile />,
    "UML": <FaSitemap />,

    // Data Science & ML
    "Data Analytics": <FaChartLine />,
    "TensorFlow": <SiTensorflow />,
    "scikit-learn": <SiScikitlearn />,
    "Reinforcement Learning": <FaBrain />,
    "Data Modeling": <FaDatabase />
};

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null); // Ref for the section
    const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
    const skillCategories = [
        {
            category: "Programming Languages",
            skills: [
                "JavaScript",
                "Python",
                "C#",
                "C++",
                "Rust"
            ]
        },
        {
            category: "Data Science & Machine Learning",
            skills: [
                "Data Analytics",
                "TensorFlow",
                "scikit-learn",
                "Reinforcement Learning",
                "Data Modeling"
            ]
        },
        {
            category: "Blockchain & Web Development",
            skills: [
                "Solidity",
                "Binance Smart Chain",
                "Web3",
                "Hardhat",
                "Truffle"
            ]
        },
        {
            category: "Game Development",
            skills: [
                "Multiplayer Networking",
                "Game Optimization"
            ]
        },
        {
            category: "Design & Project Management",
            skills: [
                "Product Management",
                "Project Management",
                "Figma",
                "Adobe XD",
                "Responsive Design",
                "UML"
            ]
        }
    ];
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Check if the section is in view
        if (sectionRef.current) {
            const position = sectionRef.current.getBoundingClientRect().top;
            if (position < window.innerHeight && position > 0) {
                setIsVisible(true); // Show text when section is in view
            } else {
                setIsVisible(false); // Hide text when section is out of view
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
        <motion.section
            className="skills-section"

        >
            <motion.div
                className="skills-section-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }} // Fade in/out based on visibility
                transition={{ duration: 0.5 }}
                ref={sectionRef}
            >
                <h2 className="skills-title">Skills & Proficiencies</h2>
                <motion.div
                    className="skills-description"
                    initial={{ y: -50, opacity: 0 }} // Start above and invisible
                    animate={{ y: isVisible ? 0 : -50, opacity: isVisible ? 1 : 0 }} // Slide down and fade in
                    transition={{ duration: 0.5 }}
                >
                    Core competencies vital for thriving and excelling in diverse professional environments.
                </motion.div>

            </motion.div>
            {skillCategories.map((category, index) => (
                <div key={index} className="skills-mb-6">
                    <motion.h3
                        className="skills-mb-6-title"
                        initial={{ opacity: 0, y: -20 }} // Start above and invisible
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }} // Slide down and fade in
                        transition={{ duration: 0.5, delay: index * 0.3 }}
                        ref={sectionRef}// Delay based on index
                    >
                        {category.category}
                    </motion.h3>
                    <div className="skills-mb-6-skills-grid">
                        {category.skills.map((skill, skillIndex) => (
                            <motion.button
                                key={skillIndex}
                                className="skills-mb-6-skill-button"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.5, delay: index * 0.3 + (skillIndex + 1) * 0.1 }}
                            >
                                {skillIcons[skill]} <span className="skill-text">{skill}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            ))}
        </motion.section>
    );
};

export default Skills;
