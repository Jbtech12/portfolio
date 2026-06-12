import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Premium SVG Icons ───────────────────────────────── */

const BubbleIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Main bubble */}
    <circle cx="15" cy="21" r="11" fill="white" fillOpacity="0.92"/>
    {/* Shine specular */}
    <circle cx="11.5" cy="16.5" r="2.5" fill="white"/>
    <circle cx="10.5" cy="15" r="1.1" fill="white"/>
    {/* Mid bubble */}
    <circle cx="27" cy="13" r="7" fill="white" fillOpacity="0.58"/>
    <circle cx="25" cy="11" r="1.5" fill="white" fillOpacity="0.85"/>
    {/* Small accent bubble */}
    <circle cx="28" cy="27" r="4" fill="white" fillOpacity="0.32"/>
    <circle cx="27.2" cy="26" r="0.9" fill="white" fillOpacity="0.7"/>
  </svg>
);

const XanoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Server rack — three layers */}
    <rect x="4" y="5" width="28" height="7" rx="3" fill="white" fillOpacity="0.92"/>
    <rect x="4" y="14.5" width="28" height="7" rx="3" fill="white" fillOpacity="0.62"/>
    <rect x="4" y="24" width="28" height="6" rx="3" fill="white" fillOpacity="0.35"/>
    {/* LED indicators */}
    <circle cx="28.5" cy="8.5"  r="2.2" fill="#fda085"/>
    <circle cx="24"   cy="8.5"  r="1.4" fill="white" fillOpacity="0.55"/>
    <circle cx="28.5" cy="18"   r="2.2" fill="#fda085" fillOpacity="0.75"/>
    <circle cx="24"   cy="18"   r="1.4" fill="white" fillOpacity="0.4"/>
    {/* Drive slots */}
    <rect x="6.5" y="9.5" width="10" height="1.5" rx="0.75" fill="white" fillOpacity="0.35"/>
    <rect x="6.5" y="19"  width="10" height="1.5" rx="0.75" fill="white" fillOpacity="0.25"/>
  </svg>
);

const ZapierIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Bold lightning bolt */}
    <path d="M21 3L9 21h11l-5 12L29 15H18l3-12z" fill="white" fillOpacity="0.95"/>
    {/* Glow highlight on bolt */}
    <path d="M20 5L10 21h9l-4 9L27 16H18l2-11z" fill="white" fillOpacity="0.2"/>
    {/* Small trailing sparks */}
    <circle cx="5"  cy="13" r="2"   fill="white" fillOpacity="0.45"/>
    <circle cx="31" cy="23" r="2"   fill="white" fillOpacity="0.45"/>
    <circle cx="4"  cy="22" r="1.2" fill="white" fillOpacity="0.25"/>
    <circle cx="32" cy="14" r="1.2" fill="white" fillOpacity="0.25"/>
  </svg>
);

/* Real n8n logo — Simple Icons (viewBox 0 0 24 24) */
const N8nIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632"/>
  </svg>
);

const AIIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Neural network nodes */}
    <circle cx="18" cy="10" r="3.5" fill="white" fillOpacity="0.95"/>
    <circle cx="9"  cy="19" r="3"   fill="white" fillOpacity="0.85"/>
    <circle cx="27" cy="19" r="3"   fill="white" fillOpacity="0.85"/>
    <circle cx="12" cy="29" r="2.5" fill="white" fillOpacity="0.7"/>
    <circle cx="24" cy="29" r="2.5" fill="white" fillOpacity="0.7"/>
    {/* Synaptic connections */}
    <line x1="15" y1="13" x2="11"  y2="16.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="21" y1="13" x2="25"  y2="16.5" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="11" y1="22" x2="13"  y2="27"   stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="25" y1="22" x2="23"  y2="27"   stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="15" y1="29" x2="21"  y2="29"   stroke="white" strokeOpacity="0.3" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Sparkle star top-right */}
    <path d="M28 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="white" fillOpacity="0.85"/>
    {/* Tiny sparkle */}
    <path d="M5 7l0.6 1.8L7.4 9l-1.8 0.6L5 11.4 4.4 9.6 2.6 9l1.8-.6z" fill="white" fillOpacity="0.45"/>
  </svg>
);

const OrbitIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Planet */}
    <circle cx="18" cy="20" r="7" fill="white" fillOpacity="0.92"/>
    {/* Shine on planet */}
    <circle cx="15.5" cy="17" r="2.2" fill="white" fillOpacity="0.55"/>
    <circle cx="14.5" cy="16" r="1" fill="white"/>
    {/* Orbital ring */}
    <ellipse cx="18" cy="20" rx="15" ry="6" stroke="white" strokeOpacity="0.5" strokeWidth="1.8" fill="none"/>
    {/* Satellite on orbit */}
    <circle cx="3.5" cy="20" r="2.5" fill="white" fillOpacity="0.8"/>
    {/* Upward escape vector */}
    <line x1="18" y1="13" x2="18" y2="5" stroke="white" strokeOpacity="0.45" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M14.5 7.5L18 4L21.5 7.5" stroke="white" strokeOpacity="0.45" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const MobileIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    {/* Phone body */}
    <rect x="10" y="2" width="16" height="32" rx="4" fill="white" fillOpacity="0.92"/>
    {/* Screen */}
    <rect x="12.5" y="6" width="11" height="20" rx="2" fill="white" fillOpacity="0.18"/>
    {/* App grid on screen */}
    <rect x="13.5" y="8"    width="3.5" height="3.5" rx="1" fill="white" fillOpacity="0.55"/>
    <rect x="19"   cy="8"    width="3.5" height="3.5" rx="1" fill="white" fillOpacity="0.55"/>
    <rect x="13.5" y="13.5"  width="3.5" height="3.5" rx="1" fill="white" fillOpacity="0.55"/>
    <rect x="19"   y="13.5"  width="3.5" height="3.5" rx="1" fill="white" fillOpacity="0.55"/>
    {/* Floating UI card above phone */}
    <rect x="20" y="1" width="13" height="8" rx="2.5" fill="white" fillOpacity="0.4"/>
    <rect x="22" y="3" width="7" height="1.2" rx="0.6" fill="white" fillOpacity="0.7"/>
    <rect x="22" y="5.5" width="5" height="1" rx="0.5" fill="white" fillOpacity="0.5"/>
    {/* Home bar */}
    <rect x="15" y="29" width="6" height="1.5" rx="0.75" fill="white" fillOpacity="0.4"/>
    {/* Notch */}
    <rect x="16" y="3.5" width="4" height="1.2" rx="0.6" fill="white" fillOpacity="0.35"/>
  </svg>
);

/* Real Stripe "S" logo — Simple Icons (viewBox 0 0 24 24) */
const StripeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
  </svg>
);

/* GoHighLevel — stylised HL funnel / CRM mark */
const GoHighLevelIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    {/* Wide top bar (filter/funnel entry) */}
    <path d="M2 7h28L22.5 15H9.5L2 7z" fill="white" fillOpacity="0.92"/>
    {/* Mid funnel body */}
    <rect x="9.5" y="15" width="13" height="7" rx="2" fill="white" fillOpacity="0.65"/>
    {/* Narrow output spout */}
    <rect x="13" y="22" width="6" height="4" rx="1.5" fill="white" fillOpacity="0.45"/>
    {/* Three "lead" dots on top bar */}
    <circle cx="8"  cy="10" r="1.6" fill="white" fillOpacity="0.55"/>
    <circle cx="16" cy="10" r="1.6" fill="white" fillOpacity="0.55"/>
    <circle cx="24" cy="10" r="1.6" fill="white" fillOpacity="0.55"/>
    {/* Rocket exhaust hint below spout */}
    <path d="M14.5 26 Q16 29 17.5 26" stroke="white" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
  </svg>
);

/* ─── Service data ────────────────────────────────────── */

const servicesData = [
  {
    id: 'bubble',
    title: 'Bubble.io',
    desc: 'Full-stack web applications built for scale without writing code.',
    Icon: BubbleIcon,
    logoUrl: '/logos/bubble.svg',
    bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    glow: 'rgba(79,70,229,0.35)',
  },
  {
    id: 'xano',
    title: 'Xano',
    desc: 'Robust, secure, and scalable backend architecture and APIs.',
    Icon: XanoIcon,
    logoUrl: '/logos/xano.svg',
    bg: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    glow: 'rgba(245,158,11,0.35)',
  },
  {
    id: 'zapier',
    title: 'Zapier',
    desc: 'Automating business workflows across thousands of apps effortlessly.',
    Icon: ZapierIcon,
    logoUrl: '/logos/zapier.svg',
    bg: 'linear-gradient(135deg, #ff6b35 0%, #f7c59f 100%)',
    glow: 'rgba(255,107,53,0.35)',
  },
  {
    id: 'n8n',
    title: 'n8n',
    desc: 'Advanced, custom workflow automation and data routing.',
    Icon: N8nIcon,
    logoUrl: '/logos/n8n.svg',
    bg: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
    glow: 'rgba(14,165,233,0.35)',
  },
  {
    id: 'claude',
    title: 'AI Vibe Coding',
    desc: 'Integrating powerful LLMs and AI features using Claude Code.',
    Icon: AIIcon,
    logoUrl: '/logos/claude.svg',
    bg: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    glow: 'rgba(139,92,246,0.35)',
  },
  {
    id: 'antigravity',
    title: 'Anti Gravity',
    desc: 'Elevating digital experiences with specialized nocode physics.',
    Icon: OrbitIcon,
    logoUrl: '/logos/antigravity.png',
    logoSquare: true,
    bg: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    glow: 'rgba(16,185,129,0.35)',
  },
  {
    id: 'make',
    title: 'Make',
    desc: 'Visual automation platform for building complex multi-step workflows without limits.',
    Icon: MobileIcon,
    logoUrl: '/logos/make.svg',
    bg: 'linear-gradient(135deg, #6D00CC 0%, #E90CF9 100%)',
    glow: 'rgba(109,0,204,0.38)',
  },
  {
    id: 'stripe',
    title: 'Stripe',
    desc: 'Seamless payment processing, subscription billing, and financial integrations.',
    Icon: StripeIcon,
    logoUrl: '/logos/stripe.svg',
    bg: 'linear-gradient(135deg, #635bff 0%, #0a2540 100%)',
    glow: 'rgba(99,91,255,0.40)',
  },
  {
    id: 'gohighlevel',
    title: 'GoHighLevel',
    desc: 'All-in-one CRM, marketing automation, pipelines, and sales funnel platform.',
    Icon: GoHighLevelIcon,
    logoUrl: '/logos/gohighlevel.png',
    bg: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
    glow: 'rgba(249,115,22,0.38)',
  },
];

/* ─── Component ───────────────────────────────────────── */

const Services = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
      });
      const cards = sectionRef.current.querySelectorAll('.service-card');
      gsap.from(cards, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        opacity: 0, y: 60, scale: 0.92,
        stagger: { amount: 0.5, from: 'start' },
        duration: 0.75, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 16, rotateX: -y * 16,
      transformPerspective: 900, scale: 1.03,
      duration: 0.4, ease: 'power2.out', overwrite: 'auto',
    });
  };

  const onMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.65, ease: 'elastic.out(1,0.5)', overwrite: 'auto',
    });
  };

  return (
    <section className="section-services" ref={sectionRef}>
      <div className="services-header">
        <div className="pill-badge pill-dark">// SERVICES //</div>
        <div className="services-title-row">
          <h2>My Arsenal</h2>
          <p className="services-desc">
            I build nocode solutions on strategy, execute with speed and refine them with skill using the best platforms available.
          </p>
        </div>
      </div>

      <div className="services-grid">
        {servicesData.map(({ id, title, desc, Icon, bg, glow, logoUrl, logoSquare }) => (
          <div
            className="service-card"
            key={id}
            style={{ '--brand-glow': glow }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Background decoration layers */}
            <span className="card-orb"           aria-hidden="true" />
            <span className="card-orb-secondary" aria-hidden="true" />
            <span className="card-grid"          aria-hidden="true" />
            <span className="card-shine"         aria-hidden="true" />
            <span className="card-top-stripe"    aria-hidden="true" style={{ background: bg }} />

            {/* Logo strip (real brand) or gradient icon (custom) */}
            {logoUrl ? (
              <div className="service-logo-strip">
                <img
                  src={logoUrl}
                  alt={title}
                  className={`service-brand-logo${logoSquare ? ' logo-sq' : ''}`}
                />
              </div>
            ) : (
              <div className="service-icon" style={{ background: bg, '--icon-glow': glow }}>
                <Icon />
              </div>
            )}

            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
