import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cal, { getCalApi } from '@calcom/embed-react';
import { trackLeadCreated } from '../lib/trackLead';
import './CTA.css';

const CTAParticles = lazy(() => import('./CTAParticles'));

const CAL_NAMESPACE = 'discovery-call';
const CAL_LINK = 'jubril-toheeb-rgh9vp/30min';

const CTA = () => {
  const sectionRef = useRef();
  const calWrapperRef = useRef();
  const [showCalendar, setShowCalendar] = useState(false);

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

  useEffect(() => {
    // The Cal.com booking page autofocuses an element on load, which makes
    // the browser auto-scroll this page down to reveal it inside the
    // iframe — visitors landed on a blank-looking page that immediately
    // jumped to the bottom. Only mount the iframe once this section is
    // actually near the viewport, by which point the "scroll into view"
    // is a no-op instead of hijacking the initial page load.
    const el = calWrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCalendar(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Count a lead only when Cal.com confirms a booking was created —
    // not when the calendar is opened, a slot is clicked or booking fails.
    if (!showCalendar) return;
    let cal;
    let cancelled = false;
    const onBookingSuccess = (e) => {
      const booking = e.detail?.data ?? {};
      trackLeadCreated(booking.uid ?? `${booking.eventTypeId}-${booking.startTime}`);
    };
    getCalApi({ namespace: CAL_NAMESPACE })
      .then((api) => {
        if (cancelled) return;
        cal = api;
        cal('on', { action: 'bookingSuccessfulV2', callback: onBookingSuccess });
      })
      .catch((err) => console.warn('[lead tracking] Cal.com embed unavailable:', err));
    return () => {
      cancelled = true;
      cal?.('off', { action: 'bookingSuccessfulV2', callback: onBookingSuccess });
    };
  }, [showCalendar]);

  return (
    <section className="section-cta" id="contact" ref={sectionRef} aria-label="Book a meeting">
      <div className="cta-container">
        <Suspense fallback={null}>
          <CTAParticles />
        </Suspense>

        <div className="cta-header" style={{ position: 'relative', zIndex: 2 }}>
          <h2>Let's Build Something Great</h2>
          <p>Have an idea for a SaaS product? Need a custom web application? Want to integrate AI into your business or automate repetitive operations? Let's discuss your project and how technology can help your business work smarter. Let's Build. Automate. Innovate.</p>
          <div className="availability-badge">
            <span className="status-dot"></span>
            Currently available — book a free 30-minute discovery call below
          </div>
        </div>

        <div className="calendly-wrapper cal-wrapper" ref={calWrapperRef} style={{ position: 'relative', zIndex: 2 }}>
          {showCalendar && (
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              style={{ width: '100%', height: '700px', overflow: 'auto' }}
              config={{ layout: 'month_view' }}
              title="Book a meeting with Jubril"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
