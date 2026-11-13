import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './Hero.css';
import jubrilImg from '../assets/jubril.jpeg';

const HeroOrb = lazy(() => import('./HeroOrb'));

const Hero = () => {
  const [showSocials, setShowSocials] = useState(false);
  const [showOrb, setShowOrb] = useState(false);

  const authorRef  = useRef();
  const badgeRef   = useRef();
  const h1Ref      = useRef();
  const subtitleRef = useRef();
  const ctaRef     = useRef();
  const imageRef   = useRef();
  const socialsRef = useRef();

  useEffect(() => {
    const heroEls = [
      authorRef.current,
      badgeRef.current,
      h1Ref.current,
      subtitleRef.current,
      ...(ctaRef.current ? Array.from(ctaRef.current.children) : []),
      imageRef.current,
    ].filter(Boolean);

    // If the visitor prefers reduced motion, skip the entrance entirely —
    // the content is fully visible from CSS defaults — and just mount the orb.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowOrb(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.15,
        // Mount the WebGL orb only once the entrance animation has finished.
        // Building its geometry/shaders on the main thread while the GSAP
        // timeline is in flight starves requestAnimationFrame — on slower
        // mobile devices that froze the tweens mid-flight and left the whole
        // hero stuck at opacity: 0 ("hero doesn't show on mobile").
        onComplete: () => setShowOrb(true),
      });
      tl.from(authorRef.current, {
          opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        })
        .from(badgeRef.current, {
          opacity: 0, y: 20, scale: 0.8, duration: 0.5, ease: 'back.out(1.7)',
        }, '-=0.4')
        .from(h1Ref.current, {
          opacity: 0, y: 55, duration: 0.9, ease: 'power4.out',
        }, '-=0.3')
        .from(subtitleRef.current, {
          opacity: 0, y: 30, duration: 0.65, ease: 'power3.out',
        }, '-=0.5')
        .from(ctaRef.current.children, {
          opacity: 0, y: 25, stagger: 0.14, duration: 0.5, ease: 'power3.out',
        }, '-=0.4')
        .from(imageRef.current, {
          opacity: 0, scale: 0.88, duration: 1.0, ease: 'power3.out',
        }, 0.2);
    });

    // Safety net: the timeline's `from` tweens set every element to opacity 0
    // immediately, then animate back to visible. If requestAnimationFrame is
    // starved or the timeline is interrupted before it runs, the hero would
    // stay invisible. This guarantees the content is shown regardless.
    const safety = setTimeout(() => {
      gsap.set(heroEls, { clearProps: 'opacity,transform,scale' });
      setShowOrb(true);
    }, 3500);

    return () => {
      ctx.revert();
      clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (!showSocials) return;
    const onPointer = (e) => {
      if (!socialsRef.current?.contains(e.target)) setShowSocials(false);
    };
    const onKey = (e) => e.key === 'Escape' && setShowSocials(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [showSocials]);

  return (
    <>
      <div className="hero-container full-width-hero">
        <div className="hero-content-wrapper">
          <div className="hero-text-side">

            <div className="author-header" ref={authorRef}>
              <div className="author-header-group">
                <img src={jubrilImg} alt="Jubril Toheeb Temidayo Profile" className="author-thumbnail" />
                <div className="logo d-flex-align">
                  <strong>Jubril Toheeb Temidayo</strong>
                </div>
              </div>
            </div>

            <div className="pill-badge mb-2" ref={badgeRef}>
              <span className="pill-dot"></span>
              AVAILABLE FOR PROJECTS //
            </div>

            <h1 ref={h1Ref}>
              I build web apps, AI solutions<br />
              <span className="text-muted">&amp; business automations.</span>
            </h1>

            <div className="hero-about-text" ref={subtitleRef}>
              <p>
                No-Code Developer, AI Solutions Developer and Automation Specialist. I help startups,
                entrepreneurs and businesses turn ideas into working products with <strong>Bubble.io</strong>,
                {' '}<strong>AI</strong> and <strong>automation</strong>, backed by 3+ years of Bubble.io
                development, backend systems and API integrations.
              </p>
              <Link to="/about" className="read-more-btn mt-1">
                More about me <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="hero-cta-group" style={{ position: 'relative' }} ref={ctaRef}>
              <a href="https://cal.com/jubril-toheeb-rgh9vp/30min" className="btn btn-primary" target="_blank" rel="noreferrer">
                Book a free call
                <span className="btn-icon">→</span>
              </a>
              <div className="social-trigger" ref={socialsRef}>
              <button
                className="btn btn-secondary"
                onClick={() => setShowSocials(!showSocials)}
                aria-expanded={showSocials}
                aria-haspopup="true"
              >
                Send me a message
                <span className="btn-icon">→</span>
              </button>

              {showSocials && (
                <div className="social-popup-menu">
                  <a href="https://www.linkedin.com/in/jubril-t-97b0551ba" className="social-link" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
                  </a>
                  <a href="https://x.com/jubreal21" className="social-link" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg> X (Twitter)
                  </a>
                  <a href="https://www.instagram.com/jubreal_21" className="social-link" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram
                  </a>
                  <a href="https://www.tiktok.com/@jubreal21" className="social-link" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg> TikTok
                  </a>
                  <a href="https://wa.me/2348168454414" className="social-link" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> WhatsApp
                  </a>
                  <a href="mailto:jubriltoheeb70@gmail.com" className="social-link" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Email
                  </a>
                </div>
              )}
              </div>
            </div>

          </div>

          <div className="hero-image-side" ref={imageRef}>
            <div className="hero-canvas-wrapper">
              {showOrb && (
                <Suspense fallback={null}>
                  <HeroOrb />
                </Suspense>
              )}
            </div>
            <img src={jubrilImg} alt="Jubril Toheeb Temidayo — No-Code Developer, AI Solutions Developer and Automation Specialist" className="hero-portrait" width="480" height="560" />
          </div>
        </div>
      </div>

    </>
  );
};

export default Hero;
