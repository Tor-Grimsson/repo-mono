// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useEffect, useRef, useState } from 'react';

const TextPressureNew = ({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  // This font is just an example, you should not use it in commercial projects.
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',

  minFontSize = 24,
  maxFontSize = null, // Optional max font size cap
  returnToDefault = true // true: animate back to defaults, false: settle into frozen state
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  const currentValuesRef = useRef([]); // Track current font variation values per character
  const velocityRef = useRef([]); // Track velocity for settling animation
  const chars = text.split('');

  const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = e => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };
    const handleMouseEnter = () => {
      setIsHovering(true);
    };
    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Use container events instead of window events
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const { left, top, width, height } = container.getBoundingClientRect();
    mouseRef.current.x = left + width / 2;
    mouseRef.current.y = top + height / 2;
    cursorRef.current.x = mouseRef.current.x;
    cursorRef.current.y = mouseRef.current.y;

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const setSize = () => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);
    if (maxFontSize) {
      newFontSize = Math.min(newFontSize, maxFontSize);
    }

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  };

  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
    // eslint-disable-next-line
  }, [scale, text]);

  useEffect(() => {
    let rafId;

    // Default values for font variations
    const defaults = {
      wdth: 100,
      wght: 400,
      ital: 0,
      alpha: 1
    };

    const animate = () => {
      if (isHovering) {
        // Active interaction mode
        mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
        mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

        if (titleRef.current && containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const maxDist = containerRect.width / 2;

          spansRef.current.forEach((span, i) => {
            if (!span) return;

            const rect = span.getBoundingClientRect();
            const charCenter = {
              x: rect.x + rect.width / 2,
              y: rect.y + rect.height / 2
            };

            const d = dist(mouseRef.current, charCenter);

            const getAttr = (distance, minVal, maxVal) => {
              const val = maxVal - Math.abs((maxVal * distance) / maxDist);
              return Math.max(minVal, val + minVal);
            };

            const wdth = width ? Math.floor(getAttr(d, 5, 150)) : 100;
            const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
            const italVal = italic ? getAttr(d, 0, 1) : 0;
            const alphaVal = alpha ? getAttr(d, 0, 1) : 1;

            // Calculate velocity (change from previous frame) for settling animation
            const prev = currentValuesRef.current[i];
            if (prev && !returnToDefault) {
              // Only track velocity if using freeze mode
              velocityRef.current[i] = {
                wdth: wdth - prev.wdth,
                wght: wght - prev.wght,
                ital: italVal - prev.ital,
                alpha: alphaVal - prev.alpha
              };
            }

            // Store current values
            currentValuesRef.current[i] = { wdth, wght, ital: italVal, alpha: alphaVal };

            span.style.opacity = alphaVal;
            span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal.toFixed(2)}`;
          });
        }
      } else {
        // Not hovering - either return to defaults or settle into frozen state
        // First apply inertia/momentum from any existing velocity
        let allSettled = true;

        spansRef.current.forEach((span, i) => {
          if (!span) return;

          const current = currentValuesRef.current[i] || { ...defaults };

          // Initialize velocity if not exists
          if (!velocityRef.current[i]) {
            velocityRef.current[i] = { wdth: 0, wght: 0, ital: 0, alpha: 0 };
          }

          const velocity = velocityRef.current[i];

          if (returnToDefault) {
            // Option A: Smooth coast to default with gentle pull (like throwing with friction)
            const springStrength = 0.05; // Very gentle pull towards default (not bouncy)
            const damping = 0.88; // Smooth friction (like sliding on a surface)

            // Calculate force pulling towards defaults
            velocity.wdth += (defaults.wdth - current.wdth) * springStrength;
            velocity.wght += (defaults.wght - current.wght) * springStrength;
            velocity.ital += (defaults.ital - current.ital) * springStrength;
            velocity.alpha += (defaults.alpha - current.alpha) * springStrength;

            // Apply damping to velocity (friction/air resistance)
            velocity.wdth *= damping;
            velocity.wght *= damping;
            velocity.ital *= damping;
            velocity.alpha *= damping;

            // Apply velocity to position
            const newWdth = current.wdth + velocity.wdth;
            const newWght = current.wght + velocity.wght;
            const newItal = current.ital + velocity.ital;
            const newAlpha = current.alpha + velocity.alpha;

            // Check if settled (both position and velocity are near zero)
            if (Math.abs(newWdth - defaults.wdth) > 0.5 ||
                Math.abs(newWght - defaults.wght) > 0.5 ||
                Math.abs(velocity.wdth) > 0.1 ||
                Math.abs(velocity.wght) > 0.1) {
              allSettled = false;
            }

            currentValuesRef.current[i] = {
              wdth: newWdth,
              wght: newWght,
              ital: newItal,
              alpha: newAlpha
            };

            span.style.opacity = newAlpha;
            span.style.fontVariationSettings = `'wght' ${Math.round(newWght)}, 'wdth' ${Math.round(newWdth)}, 'ital' ${newItal.toFixed(2)}`;
          } else {
            // Option B: Settle into frozen state with damping (gradual slowdown)
            const damping = 0.75; // Damping factor (0.75 = 25% slowdown per frame)

            // Apply damping to velocity
            velocity.wdth *= damping;
            velocity.wght *= damping;
            velocity.ital *= damping;
            velocity.alpha *= damping;

            // Apply velocity to current values
            const newWdth = current.wdth + velocity.wdth;
            const newWght = current.wght + velocity.wght;
            const newItal = current.ital + velocity.ital;
            const newAlpha = current.alpha + velocity.alpha;

            // Check if still moving (velocity above threshold)
            if (Math.abs(velocity.wdth) > 0.01 ||
                Math.abs(velocity.wght) > 0.01 ||
                Math.abs(velocity.ital) > 0.0001 ||
                Math.abs(velocity.alpha) > 0.0001) {
              allSettled = false;
            }

            currentValuesRef.current[i] = {
              wdth: newWdth,
              wght: newWght,
              ital: newItal,
              alpha: newAlpha
            };

            span.style.opacity = newAlpha;
            span.style.fontVariationSettings = `'wght' ${Math.round(newWght)}, 'wdth' ${Math.round(newWdth)}, 'ital' ${newItal.toFixed(2)}`;
          }
        });

        // Stop animation when fully settled
        if (allSettled) {
          cancelAnimationFrame(rafId);
          return;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, chars.length, isHovering]);

  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : ''].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => (spansRef.current[i] = el)}
            data-char={char}
            style={{
              display: 'inline-block',
              color: stroke ? undefined : textColor
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressureNew;
