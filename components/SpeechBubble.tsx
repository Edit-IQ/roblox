import React, { useState, useEffect } from 'react';

interface SpeechBubbleProps {
  text: string;
  theme?: string;
  type?: 'speech' | 'thought';
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ 
  text, 
  theme = 'dark',
  type = 'thought'
}) => {
  const messages = text.split('\n');
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const currentMessage = messages[messageIndex];

  useEffect(() => {
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < currentMessage.length) {
        setDisplayedText(currentMessage.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (!isDeleting && currentIndex === currentMessage.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(currentMessage.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setMessageIndex((messageIndex + 1) % messages.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, currentMessage, messageIndex, messages.length]);

  return (
    <>
      <div className={`bubble ${type} bubble-animate`}>
        {displayedText}
        <span className="cursor">|</span>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bouncePopup {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px) rotate(-15deg);
          }
          50% {
            transform: scale(1.05) translateY(-5px) rotate(3deg);
          }
          70% {
            transform: scale(0.95) translateY(0) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
          }
        }

        .bubble-animate {
          animation: bouncePopup 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        .bubble {
          position: relative;
          width: auto;
          min-width: 280px;
          max-width: 500px;
          text-align: center;
          line-height: 1.5em;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 3px solid #0EA5E9;
          border-radius: 25px;
          font-family: 'Comic Sans MS', 'Comic Sans', cursive;
          padding: 18px 32px;
          font-size: 16px;
          color: #1e293b;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 8px 32px rgba(14, 165, 233, 0.3), 
                      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        .bubble.thought {
          border-radius: 200px;
          padding: 22px 40px;
          background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
        }

        .cursor {
          display: inline-block;
          animation: blink 1s infinite;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .bubble.speech {
          width: 300px;
        }

        .bubble:before,
        .bubble:after {
          content: ' ';
          position: absolute;
        }

        .bubble.speech:before {
          left: 30px;
          bottom: -50px;
          width: 0;
          height: 0;
          border: 25px solid;
          border-color: #333 transparent transparent #333;
        }

        .bubble.speech:after {
          left: 38px;
          bottom: -30px;
          width: 0;
          height: 0;
          border: 15px solid;
          border-color: #fff transparent transparent #fff;
        }

        .bubble.thought:before,
        .bubble.thought:after {
          right: auto;
          left: 60px;
          bottom: -28px;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
          border: 3px solid #0EA5E9;
          border-radius: 28px;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
        }

        .bubble.thought:after {
          width: 16px;
          height: 16px;
          right: auto;
          left: 40px;
          bottom: -48px;
          border-radius: 18px;
        }

        @media (max-width: 640px) {
          .bubble {
            min-width: 200px;
            max-width: 340px;
            font-size: 11px;
            padding: 12px 20px;
            border-width: 2px;
            white-space: nowrap;
            line-height: 1.4em;
          }

          .bubble.thought {
            padding: 16px 24px;
          }

          .bubble.thought:before,
          .bubble.thought:after {
            width: 16px;
            height: 16px;
            border-width: 2px;
            bottom: -18px;
            left: 45px;
          }

          .bubble.thought:after {
            width: 10px;
            height: 10px;
            bottom: -28px;
            left: 32px;
          }
        }
      `}} />
    </>
  );
};
