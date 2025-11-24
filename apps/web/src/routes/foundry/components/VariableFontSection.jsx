import { useState, useEffect, useRef } from "react";
import { VariableFontDisplay } from "@kol/ui";
import FoundrySection from "./FoundrySection";

const VariableFontSection = ({
  fontFamily = 'TGMalromur',
  badgeText = 'Málrómur Aa',
  text = 'Variable',
  minWeight = 300,
  maxWeight = 900,
  showDropdown = true
}) => {
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

        if (currentWeight >= maxWeight) {
          currentWeight = maxWeight;
          direction = -1;
        } else if (currentWeight <= minWeight) {
          currentWeight = minWeight;
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
  }, [isAnimating, minWeight, maxWeight]);

  const handleSliderChange = (value) => {
    setIsAnimating(false);
    setWeight(value);
  };

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          showDropdown={showDropdown}
          badgeText={badgeText}
        />

        <VariableFontDisplay
          text={text}
          weight={weight}
          onWeightChange={handleSliderChange}
          minWeight={minWeight}
          maxWeight={maxWeight}
          isAnimating={isAnimating}
          onToggleAnimation={() => setIsAnimating(!isAnimating)}
          fontStyle={selectedStyle === 'italic' ? 'italic' : 'normal'}
          fontFamily={fontFamily}
        />
      </div>
    </section>
  );
};

export default VariableFontSection;
