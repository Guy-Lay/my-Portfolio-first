import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import "./index.css";

const ProfessionalSummary = () => {
  const fullText = useMemo(() => [
    "- Passionate about creating cutting-edge solutions that leverage the power of blockchain, immersive game experiences, and intelligent AI systems.",
    "- Strong technical background combined with an eye for design, ensuring seamless user experiences and efficient system performance.",
    "- In-depth knowledge of UX design development, focusing on accurate requirements analysis and data analysis, user-centered design, and visual hierarchy to effectively implement ideas and meet user needs."
  ], []);

  const summaryTitle = "Professional Profile Summary";
  const [displayedText, setDisplayedText] = useState<string[]>(Array(fullText.length).fill(""));
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingTitle, setIsTypingTitle] = useState(true);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const startTyping = useCallback(() => {
    setDisplayedText(Array(fullText.length).fill(""));
    setDisplayedTitle("");
    setCurrentLine(0);
    setCurrentCharIndex(0);
    setIsTypingTitle(true);
  }, [fullText.length]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTyping();
        }
      });
    });

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [startTyping]);

  useEffect(() => {
    if (isTypingTitle) {
      const typingInterval = setInterval(() => {
        if (currentCharIndex < summaryTitle.length) {
          setDisplayedTitle((prev) => prev + summaryTitle[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          clearInterval(typingInterval);
          setIsTypingTitle(false);
          setCurrentLine(0);
          setCurrentCharIndex(0);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    } else if (currentLine < fullText.length) {
      const line = fullText[currentLine];
      const typingInterval = setInterval(() => {
        if (currentCharIndex < line.length) {
          setDisplayedText((prev) => {
            const newText = [...prev];
            newText[currentLine] = line.slice(0, currentCharIndex + 1);
            return newText;
          });
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
            setCurrentCharIndex(0);
          }, 1000);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [currentLine, currentCharIndex, fullText, isTypingTitle]);

  return (
    <section className="container-section" ref={sectionRef}>
      <h2 className="summary-title">{displayedTitle}</h2>
      <ul className="summary-text">
        {displayedText.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </section>
  );
};

export default ProfessionalSummary;
