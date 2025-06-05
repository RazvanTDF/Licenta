import { useState, useMemo } from "react";
import "../styles/HowItWorks.css";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../translations/translations";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  const steps = useMemo(() => {
  if (!t) return [];
  return [
    {
      id: 1,
      image: "/left_landing.png",
      title: t.step1Title,
      text: t.step1Text
    },
    {
      id: 2,
      image: "/middle_landing.png",
      title: t.step2Title,
      text: t.step2Text
    },
    {
      id: 3,
      image: "/right_landing.png",
      title: t.step3Title,
      text: t.step3Text
    }
  ];
}, [t]);

  const handleClick = (stepId) => {
    setActiveStep(prev => (prev === stepId ? null : stepId));
  };

  return (
    <section id="how-it-works" className="how-it-works">
      <h2 className="fade-in">{t.howItWorksTitle}</h2>
      {activeStep === null ? (
        <div className="steps">
          {steps.map(step => (
            <div
              key={step.id}
              className="step fade-in"
              onClick={() => handleClick(step.id)}
            >
              <img src={step.image} alt={step.title} />
            </div>
          ))}
        </div>
      ) : (
        <div className="active-step swipe-in">
          <img
            src={steps[activeStep - 1].image}
            alt={steps[activeStep - 1].title}
            className="active-image"
            onClick={() => handleClick(activeStep)}
          />
          <div className="step-text fade-in">
            <h3>{steps[activeStep - 1].title}</h3>
            <p>{steps[activeStep - 1].text}</p>
            <button className="close-btn" onClick={() => setActiveStep(null)}>×</button>
          </div>
        </div>
      )}
    </section>
  );
}
