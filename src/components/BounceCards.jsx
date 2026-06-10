import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 500,
  containerHeight = 250,
  animationDelay = 0.5,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(8deg) translate(-175px)',
    'rotate(3deg) translate(-85px)',
    'rotate(-4deg) translate(5px)',
    'rotate(-9deg) translate(95px)',
    'rotate(5deg) translate(185px)',
    'rotate(-6deg) translate(275px)'
  ],
  enableHover = true,
  onCardClick,
  activeIndex = null,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = transformStr => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    if (transformStr === 'none') return 'rotate(0deg)';
    return `${transformStr} rotate(0deg)`;
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      return baseTransform.replace(translateRegex, `translate(${currentX + offsetX}px)`);
    }
    return baseTransform === 'none'
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = hoveredIdx => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const base = transformStyles[i] || 'none';
      if (i === hoveredIdx) {
        gsap.to(target, { transform: getNoRotationTransform(base), duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        gsap.to(target, {
          transform: getPushedTransform(base, offsetX),
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay: Math.abs(hoveredIdx - i) * 0.05,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, { transform: transformStyles[i] || 'none', duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{ position: 'relative', width: containerWidth, height: containerHeight }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx} ${activeIndex === idx ? 'card-active' : ''}`}
          style={{ transform: transformStyles[idx] ?? 'none' }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
          onClick={() => onCardClick && onCardClick(idx)}
        >
          {/* Custom content slot */}
          {typeof src === 'string' && src.startsWith('http') ? (
            <img className="image" src={src} alt={`card-${idx}`} />
          ) : (
            src /* JSX node */
          )}
          {/* Active ring */}
          {activeIndex === idx && <div className="card-active-ring" />}
        </div>
      ))}
    </div>
  );
}
