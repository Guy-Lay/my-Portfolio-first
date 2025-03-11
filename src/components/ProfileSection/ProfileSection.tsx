import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faDownload } from '@fortawesome/free-solid-svg-icons';
import "./index.css";

const ProfileSection = () => {
    const [typedText, setTypedText] = React.useState('');
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [messageIndex, setMessageIndex] = React.useState(0);
    
    const messages = useMemo(() => [
        "Blockchain & AI Architect, Designer, Game developer",
        "Based in Singapore"
    ], []);

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1500;

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/Ethan Cheong.pdf'; // Adjust this path based on where the file is located in your public folder
        link.download = 'Ethan Cheong CV.pdf'; // Specify the name for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSendEmail = () => {
        window.open('https://t.me/FreshDanWorld', '_blank'); // Open Telegram link in a new tab
    };

    React.useEffect(() => {
        let timer;
        try {
            const currentMessage = messages[messageIndex];

            if (isDeleting) {
                timer = setTimeout(() => {
                    setTypedText(currentMessage.substring(0, typedText.length - 1));
                    if (typedText.length === 0) {
                        setIsDeleting(false);
                        setMessageIndex((messageIndex + 1) % messages.length);
                    }
                }, deletingSpeed);
            } else {
                if (typedText === currentMessage) {
                    timer = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseTime);
                } else {
                    timer = setTimeout(() => {
                        setTypedText(currentMessage.substring(0, typedText.length + 1));
                    }, typingSpeed);
                }
            }
        } catch (error) {
            reportError(error);
        }

        return () => clearTimeout(timer);
    }, [typedText, isDeleting, messageIndex, messages]);


    return (
        <motion.section
            id="profile"
            className="profile-section"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="profile-body">
                <div className="name">
                    Hi I'm <span className="special-name">Ethan Cheong</span>
                </div>
                <p className="mainText">
                    <span className="text-blue-500">{typedText}</span>
                </p>
                <div className="mt-4">
                    <motion.button
                        className="send-mail"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSendEmail}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} /> Send Chat
                    </motion.button>
                    <motion.button
                        className="download-cv"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDownloadCV}
                    >
                        <FontAwesomeIcon icon={faDownload} /> Download CV
                    </motion.button>
                </div>
            </div>
        </motion.section>
    );
};

export default ProfileSection;
