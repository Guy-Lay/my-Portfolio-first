import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane } from 'react-icons/fa';
import "./ContactForm.css"

const ContactForm = () => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleScroll = () => {
        const title = titleRef.current;
        const description = descriptionRef.current;

        if (title && description) {
            const titlePosition = title.getBoundingClientRect().top;
            const descriptionPosition = description.getBoundingClientRect().top;

            if (titlePosition < window.innerHeight) {
                title.classList.add("contactForm__visible");
            }
            if (descriptionPosition < window.innerHeight) {
                description.classList.add("contactForm__visible");
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !message) {
            toast.error('Please fill in all fields.', {
                className: 'toast-custom',
            });
            return;
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_email: 'itazotebo88@gmail.com'
        };

        emailjs.send('service_j5qd7z2', 'Vaveltemplate_y02tmpt', templateParams, 'NQbCknsWgIdayopFt')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setName('');
                setEmail('');
                setMessage('');
                toast.success('Your message has been sent successfully!', {
                    className: 'toast-custom',
                });
            }, (err) => {
                console.error('FAILED...', err);
                toast.error('Failed to send your message. Please try again.', {
                    className: 'toast-custom',
                });
            });
    };

    return (
        <motion.section
            id="contact"
            className="contact-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 ref={titleRef} className="contactForm__title">I'm Available for Questions</h2>
            <div ref={descriptionRef} className="contactForm__description">
                If you have any questions, feedback, or just want to connect, I'd love to hear from you! Your communication is valued and important to me!
            </div>
            <form className="contactForm__form" onSubmit={handleSubmit}>
                <div className="contactForm__formInputs">
                    <div className="contactForm__formInputs--inputs">
                        <label>Name</label>
                        <div className="input-with-icon">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                placeholder="Name"
                                className="contactForm__formInputs--name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="contactForm__formInputs--inputs">
                        <label>Email</label>
                        <div className="input-with-icon">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="contactForm__formInputs--email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="contactForm__formInputs-messageContainer">
                    <div className="input-with-icon textarea-container">
                        <FaComment className="input-icon textarea-icon" />
                        <textarea
                            placeholder="Message"
                            className="contactForm__formInputs--message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="contactForm__formInputs--buttonContainer">
                    <motion.button
                        type="submit"
                        className="contactForm__formInputs--button"
                    >
                        <FaPaperPlane className="button-icon" /> Send Message
                    </motion.button>
                </div>
            </form>
            <ToastContainer />
        </motion.section>
    );
};

export default ContactForm;
