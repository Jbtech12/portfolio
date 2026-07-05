import { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTA.css';

const CTAParticles = lazy(() => import('./CTAParticles'));

const CTA = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-container', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        opacity: 0,
        y: 50,
        scale: 0.97,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-cta" id="contact" ref={sectionRef} aria-label="Book a meeting">
      <div className="cta-container">
        <Suspense fallback={null}>
          <CTAParticles />
        </Suspense>

        <div className="cta-header" style={{ position: 'relative', zIndex: 2 }}>
          <h2>Ready to Build?</h2>
          <p>Whether you need a Bubble.io SaaS MVP, AI integration, workflow automation, or a full custom web application — let's talk about your project.</p>
          <div className="availability-badge">
            <span className="status-dot"></span>
            Currently available — book a free 30-minute discovery call below
          </div>
        </div>

        <div className="calendly-wrapper cal-wrapper" style={{ position: 'relative', zIndex: 2 }}>
          <iframe
            src="https://cal.com/jubril-toheeb-rgh9vp/30min"
            style={{ width: '100%', height: '700px', border: 'none' }}
            title="Book a meeting with Jubril"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default CTA;
