import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import './Hero.css';
import jubrilImg from '../assets/jubril.jpeg';

const HeroOrb = lazy(() => import('./HeroOrb'));

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const authorRef  = useRef();
  const badgeRef   = useRef();
  const h1Ref      = useRef();
  const subtitleRef = useRef();
  const ctaRef     = useRef();
  const imageRef   = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
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
    return () => ctx.revert();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
              Building a startup is hard.<br />
              Building the right product <span className="text-muted">doesn't have to be.</span>
            </h1>

            <div className="hero-about-text" ref={subtitleRef}>
              <p>
                I help entrepreneurs and early-stage startups turn ideas into scalable web apps
                and MVPs — using <strong>Bubble.io</strong>, AI integrations, and workflow automation
                — without wasting months or burning investor money.
              </p>
              <button className="read-more-btn mt-1" onClick={toggleModal} aria-label="Read more about what I do">
                Read More <span aria-hidden="true">+</span>
              </button>
            </div>

            <div className="hero-cta-group" style={{ position: 'relative' }} ref={ctaRef}>
              <button
                className="btn btn-primary"
                onClick={() => setShowSocials(!showSocials)}
              >
                Send me a message
                <span className="btn-icon">→</span>
              </button>
              <a href="#projects" className="btn btn-secondary">
                View my work
                <span className="btn-icon">→</span>
              </a>

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

          <div className="hero-image-side" ref={imageRef}>
            <div className="hero-canvas-wrapper">
              <Suspense fallback={null}>
                <HeroOrb />
              </Suspense>
            </div>
            <img src={jubrilImg} alt="Jubril Toheeb Temidayo — Bubble.io Developer and No-Code Expert" className="hero-portrait" width="480" height="560" />
          </div>
        </div>
      </div>

      <div
        className={`about-modal-overlay ${isModalOpen ? 'active' : ''}`}
        onClick={toggleModal}
        aria-hidden={!isModalOpen}
      >
        <div
          className="about-modal-content"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button className="close-modal-btn" onClick={toggleModal} aria-label="Close about modal">&times;</button>

          <h2 className="modal-title" id="modal-title">What I bring to the table</h2>

          <div className="modal-moved-content">
            <p className="mt-1">Most founders struggle with:</p>
            <ul className="hero-bullet-list" style={{ color: 'var(--text-main)', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Turning their idea into a working product</li>
              <li>Choosing the right tech stack</li>
              <li>Building systems that won't break when users grow</li>
              <li>Integrating payments, AI, and automation tools</li>
            </ul>
            <p className="mt-1"><strong>That's where I come in.</strong></p>
            <p>I design and build clean, scalable, and investor-ready applications with:</p>
          </div>

          <ul className="hero-check-list modal-check-list mt-1">
            <li>✅ MVP & SaaS development in Bubble</li>
            <li>✅ Smart database & workflow architecture</li>
            <li>✅ Stripe payments, subscriptions & invoicing</li>
            <li>✅ OpenAI & AI feature integrations</li>
            <li>✅ n8n, Zapier & Make automation systems</li>
            <li>✅ Third-party API integrations</li>
            <li>✅ Performance optimization & scalability setup</li>
            <li>✅ Version control & security audits</li>
          </ul>

          <p className="mt-1">
            I don't just "build apps." I help founders avoid costly rebuilds by designing systems correctly from day one.
          </p>
          <div className="modal-highlight-box mt-1">
            <p className="highlight-text">
              If you're looking for a technical partner who understands both product thinking and execution, let's talk.
            </p>
            <p className="mt-1">📩 Send me a message with your idea. I'll tell you the best way to build it.</p>
          </div>

          <a href="#contact" className="btn btn-primary mt-2" onClick={toggleModal} style={{ width: '100%', justifyContent: 'center' }}>
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero;
