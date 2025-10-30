import { useState, useEffect, useRef } from "react";
import { VariableFontDisplay } from "@kol/ui";
import FoundrySection from "./components/FoundrySection";

const VariableFontSection = () => {
  const [weight, setWeight] = useState(400);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('italic');
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isAnimating) return;

    let direction = 1;
    let currentWeight = weight;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const delta = now - lastTime;

      if (delta > 16) {
        // ~60fps throttle
        currentWeight += direction * 2;

        if (currentWeight >= 900) {
          currentWeight = 900;
          direction = -1;
        } else if (currentWeight <= 300) {
          currentWeight = 300;
          direction = 1;
        }

        setWeight(currentWeight);
        lastTime = now;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  const handleSliderChange = (value) => {
    setIsAnimating(false);
    setWeight(value);
  };

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
        />

        <VariableFontDisplay
          text="Variable"
          weight={weight}
          onWeightChange={handleSliderChange}
          minWeight={300}
          maxWeight={900}
          isAnimating={isAnimating}
          onToggleAnimation={() => setIsAnimating(!isAnimating)}
          fontStyle={selectedStyle === 'italic' ? 'italic' : 'normal'}
        />
      </div>
    </section>
  );
};

export default VariableFontSection;
