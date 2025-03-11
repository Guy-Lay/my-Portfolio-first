import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import ContactForm from "../ContactForm/ContactForm";
import ProfileSection from "../ProfileSection/ProfileSection";
import Skills from "../Skills/Skills";
import ProfessionalSummary from "../ProfessionalSummary/ProfessionalSummary";
import ExperienceTimeline from "../ExperienceTimeline/ExperienceTimeline";
import Education from "../Education/Education";
import Languages from "../Languages/Languages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTools, faBriefcase, faGraduationCap, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import UserInfo from "./../../components/ContactForm/UserInfo";
import Footer from "../Footer/Footer";
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const contactFormRef = useRef<HTMLDivElement | null>(null);
    const profileSectionRef = useRef<HTMLDivElement | null>(null);
    const profileSummaryRef = useRef<HTMLDivElement | null>(null);
    const experienceSectionRef = useRef<HTMLDivElement | null>(null);
    const educationSectionRef = useRef<HTMLDivElement | null>(null);
    const skillsSectionRef = useRef<HTMLDivElement | null>(null);
    const languagesSectionRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = () => {
        if (window.scrollY > 50) { // Adjust the scroll threshold as needed
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleHomeClick = () => {
        window.location.reload();
    };

    const handleProfileClick = () => {
        profileSummaryRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSkillsClick = () => {
        skillsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const handleExperience = () => {
        experienceSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const handleEducation = () => {
        educationSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const handleContactClick = () => {
        contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top smoothly
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container--large">

                    <div className="Image">
                        <img src="/image/icon_!.png" alt="Profile" className="nav-02__logo_img" />
                    </div>
                    <button className="hamburger-menu" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
                        <div>
                            <button className="button" onClick={handleHomeClick}>
                                <FontAwesomeIcon icon={faHome} /> Home
                            </button>
                        </div>
                        <div>
                            <button className="button" onClick={handleProfileClick}>
                                <FontAwesomeIcon icon={faUser} /> Profile
                            </button>
                        </div>
                        <div>
                            <button className="button" onClick={handleSkillsClick}>
                                <FontAwesomeIcon icon={faTools} /> Skills
                            </button>
                        </div>
                        <div>
                            <button className="button" onClick={handleExperience}>
                                <FontAwesomeIcon icon={faBriefcase} /> Experience
                            </button>
                        </div>
                        <div>
                            <button className="button" onClick={handleEducation}>
                                <FontAwesomeIcon icon={faGraduationCap} /> Education
                            </button>
                        </div>
                        <div className="button-panel">
                            <button className="button--white-bg" onClick={handleContactClick}>
                                <FontAwesomeIcon icon={faEnvelope} /> Contact me
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="main-content">

                <div className="profileSectionRef" ref={profileSectionRef}>
                    <ProfileSection />
                </div>
                <div className="profileSummaryRef" ref={profileSummaryRef}>
                    <ProfessionalSummary />
                </div>
                <div className="experienceSectionRef" ref={experienceSectionRef}>
                    <ExperienceTimeline />
                </div>
                <div className="educationSectionRef" ref={educationSectionRef}>
                    <img className="educationSectionRef-img" src="/image/university.png" alt="Profile" />
                    <Education />
                </div>
                <div className="skillsSectionRef" ref={skillsSectionRef}>
                    <img className="skillsSectionRef-img" src="/image/cdb8abd2-433f-42d5-9b12-557f2a1d014b.png" alt="Profile" />
                    <Skills />
                </div>
                <div className="languagesSectionRef" ref={languagesSectionRef}>
                    <Languages />
                </div>
                <div className="contactFormRef" ref={contactFormRef}>
                    <ContactForm />
                    <UserInfo />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
            <button className="scroll-to-top" onClick={scrollToTop}>
                ↑ Top
            </button>
        </>
    );
};

export default Navbar;
