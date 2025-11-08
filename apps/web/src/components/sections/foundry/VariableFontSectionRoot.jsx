import { useState, useEffect, useRef } from "react";
import { VariableFontDisplay } from "@kol/ui";
import FoundrySection from "./components/FoundrySection";

const VariableFontSectionRoot = () => {
  const [weight, setWeight] = useState(400);
  const [width, setWidth] = useState(250);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isAnimating) return;

    let weightDirection = 1;
    let widthDirection = 1;
    let currentWeight = weight;
    let currentWidth = width;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const delta = now - lastTime;

      if (delta > 16) {
        // ~60fps throttle
        currentWeight += weightDirection * 2;
        currentWidth += widthDirection * 1;

        if (currentWeight >= 900) {
          currentWeight = 900;
          weightDirection = -1;
        } else if (currentWeight <= 100) {
          currentWeight = 100;
          weightDirection = 1;
        }

        if (currentWidth >= 400) {
          currentWidth = 400;
          widthDirection = -1;
        } else if (currentWidth <= 100) {
          currentWidth = 100;
          widthDirection = 1;
        }

        setWeight(currentWeight);
        setWidth(currentWidth);
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

  const handleWeightChange = (value) => {
    setIsAnimating(false);
    setWeight(value);
  };

  const handleWidthChange = (value) => {
    setIsAnimating(false);
    setWidth(value);
  };

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        <FoundrySection
          variant="badge"
          badgeText="Rót Aa"
          showDropdown={false}
        />

        <VariableFontDisplay
          text="Rót"
          weight={weight}
          onWeightChange={handleWeightChange}
          minWeight={100}
          maxWeight={900}
          width={width}
          onWidthChange={handleWidthChange}
          minWidth={100}
          maxWidth={400}
          isAnimating={isAnimating}
          onToggleAnimation={() => setIsAnimating(!isAnimating)}
          fontStyle="normal"
          fontFamily="TGRoot"
        />
      </div>
    </section>
  );
};

export default VariableFontSectionRoot;
