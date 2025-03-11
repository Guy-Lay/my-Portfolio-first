import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./index.css";

const ExperienceTimeline = () => {
    const experiences = [
        {
            role: (
                <div >
                    Machine Learning & AI Architect
                </div >
            ),
            description: `- Designed and implemented machine learning algorithms for data analysis and predictive modeling, and utilized TensorFlow and PyTorch for deep learning models.
                - Contributed to reinforcement learning research for autonomous systems.
                - Developed and maintained React and JavaScript-based applications with a focus on responsive design and functionality.`
        },
        {
            role: (<div >
                Game & Data Strategy Consultant
            </div >),
            description: `- Developed multiplayer online games with immersive gameplay and captivating narratives, utilizing industry-leading game engines and optimizing performance for various platforms.
                - Ensured responsive gameplay and optimized frame rates for a smooth player experience.`
        },
        {
            role: (<div >
                Design & Product Development Manager
            </div >),
            description: `- Designed user interfaces and interactive experiences for web and mobile applications, focusing on user-centered design principles and delivering intuitive and visually appealing solutions.
                - Conducted user research, created wireframes, and developed prototype interactives using industry-standard design tools.
                - Ensured seamless user experiences across different devices and screen sizes through responsive design.`
        },
        {
            role: (<div >
                Blockchain Developer
            </div >),
            description: `- Designed, implemented, and deployed secure smart contracts for blockchain-based applications, ensuring transparency and trust.
                - Developed and deployed decentralized applications (dApps) on Ethereum and other blockchain platforms, leveraging the power of smart contracts for innovative solutions.`
        }
    ];

    const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleScroll = () => {
        experienceRefs.current.forEach((ref) => {
            if (ref) {
                const position = ref.getBoundingClientRect().top;
                if (position < window.innerHeight && position > 0) {
                    ref.classList.add("visible");
                } else {
                    ref.classList.remove("visible");
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <motion.section
            id="experience"
            className="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="experience-title">Professional Experience</h2>
            <div className="experience-description">
                With a proven track record in blockchain, AI, and game development, we deliver impactful results and insights in various fields while taking responsibility for our work and fulfilling our roles.
            </div>
            <div className="experience-timeline">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="mb-6"
                        ref={(el) => { experienceRefs.current[index] = el; }}
                    >
                        <div className="steps-01__number"></div>
                        <h3 className="text-xl-font-bold">
                            {exp.role}
                        </h3>
                        {exp.description.split('\n').map((line, lineIndex) => (
                            <div key={lineIndex}>
                                <p className="text-gray-400">{line}</p>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default ExperienceTimeline;
