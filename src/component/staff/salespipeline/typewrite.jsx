import React, { useEffect, useState } from "react";

const TypeWriter = ({
    texts = [],
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetween = 1500,
    className = "",
}) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!texts.length) return;

        const currentText = texts[textIndex];
        let timeout;

        if (!isDeleting) {
            // Typing
            if (displayText.length < currentText.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                }, typingSpeed);
            } else {
                // Pause before deleting
                timeout = setTimeout(() => setIsDeleting(true), delayBetween);
            }
        } else {
            // Deleting
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, displayText.length - 1));
                }, deletingSpeed);
            } else {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

export default TypeWriter;