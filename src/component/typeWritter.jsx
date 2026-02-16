import React, { useEffect, useState } from "react";

const Typewriter = ({
  phrases = [
    "E=Establishment",
    "I=Implement",
    "M=Management system",
    "C=Control the activities",
    "T=Training Employment",
    "A=Attain objectives/targets"
  ],
  speed = 150,
  loop = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false); // Track if deleting

  const currentPhrase = phrases[phraseIndex];

  useEffect(() => {
    let timeout;

    if (!deleting && charIndex < currentPhrase.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (!deleting && charIndex === currentPhrase.length) {
      // Pause before deleting
      timeout = setTimeout(() => setDeleting(true), 1000);
    } else if (deleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      }, speed / 2);
    } else if (deleting && charIndex === 0) {
      // Move to next phrase
      setDeleting(false);
      setPhraseIndex((phraseIndex + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, currentPhrase, phraseIndex, phrases, speed]);

  // Split first letter and rest for styling
  const firstLetter = displayedText.charAt(0);
  const restText = displayedText.slice(1);

  return (
    <span
      className="lg:text-4xl md:text-5xl text-2xl md:mt-14 font-extrabold  tracking-widest border-r-2 border-white pr-1"
      style={{ fontFamily: "'Arial Narrow', Arial, sans-serif" }}
    >
      <span className="text-white">{firstLetter}</span>
      <span className="text-white">{restText}</span>
    </span>
  );
};

export default Typewriter;
