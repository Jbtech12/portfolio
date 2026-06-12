import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CTA from '../components/CTA';
import './CaseStudy.css';

gsap.registerPlugin(ScrollTrigger);

const projectData = {
  1: {
    title: 'Alliance Travel',
    type: 'Online Booking Platform',
    role: 'Nocode Developer',
    timeline: 'Ongoing',
    techStack: 'Bubble.io, Third-party APIs',
    overview: 'A reliable and scalable online booking platform built for a smooth, high-performance user experience.',
    challenge: 'The team needed to build a reliable and scalable online booking platform while coordinating across multiple functions. Key challenges included structuring efficient database workflows, integrating third-party APIs seamlessly, and ensuring a smooth, high-performance user experience across devices. Maintaining clean, scalable logic in a production environment was also critical for long-term sustainability.',
    solution: 'I collaborated within a cross-functional team to design and develop the platform using Bubble.io. I led the implementation of core features, structured scalable database workflows, and integrated third-party APIs to extend functionality. Emphasis was placed on clean architecture, maintainability, and responsive design to ensure optimal performance across all devices.',
    results: [
      'Delivered a fully functional and scalable online booking platform',
      'Improved system performance through optimized workflows and clean logic',
      'Enabled seamless third-party integrations for enhanced functionality',
      'Ensured a responsive, user-friendly experience across devices',
      'Established a maintainable foundation for future feature expansion',
    ],
    bgImage: '/picture 1.png',
    gallery: ['/picture 1.png', '/picture 2.png', '/picture 3.png'],
    video: '/Alliance travel video.mov',
  },
  2: {
    title: 'NBA Player Props',
    type: 'Sports Analytics Platform',
    role: 'Bubble.io Expert',
    timeline: 'Completed',
    techStack: 'Bubble.io, Sports Data API, Chart.js',
    overview: 'A dynamic, real-time advanced sports analytics platform built entirely in a no-code environment.',
    challenge: 'Sports data is often complex, fragmented, and difficult for users to interpret quickly—especially when analyzing player performance trends, hit rates, and team defensive patterns. The challenge was to create a dynamic, real-time analytics experience within a no-code environment without relying on traditional backend infrastructure.',
    solution: 'I built an advanced sports analytics platform entirely in Bubble.io, leveraging custom states, grouped data searches, and efficient frontend logic. The system integrates a Sports Data API for real-time stats, while Chart.js powers interactive visualizations. Key capabilities include dynamic daisy-chain filtering, real-time chart updates, automated hit rate calculations, and aggregated team defensive stats.',
    results: [
      'Delivered a real-time, interactive sports analytics dashboard in a no-code environment',
      'Enabled users to analyze player performance trends and hit rates instantly',
      'Simplified complex sports data into intuitive, visual insights',
      'Achieved seamless filtering and updates without page reloads',
      'Demonstrated the power of Bubble.io for data-intensive applications',
    ],
    bgImage: '/NBA 1.png',
    gallery: ['/NBA 1.png', '/NBA 2.png'],
    video: '/case study 2.mov',
  },
  3: {
    title: 'UloSpaces',
    type: 'Rental Platform',
    role: 'Nocode Developer',
    timeline: 'Completed',
    techStack: 'Nocode Tools',
    overview: 'An all-in-one rental platform tailored for the Nigerian market, streamlining housing and flatmate searches.',
    challenge: 'Finding affordable housing in Lagos is difficult for budget-conscious renters. The market is fragmented with limited transparency, unreliable listings, and few options for shared accommodations or compatible flatmates. Renters needed a centralized, trustworthy platform to simplify their search.',
    solution: 'I developed UloSpaces, consolidating multiple rental options—solo apartments, shared spaces, and flatmate matching—into a single, user-friendly experience. Built with accessibility and efficiency in mind, the platform allows users to browse listings, compare options, and find compatible living arrangements. Designed to be scalable, intuitive, and responsive.',
    results: [
      'Simplified the rental search process for budget-conscious users in Lagos',
      'Centralized diverse housing options into one accessible platform',
      'Enabled users to find both accommodation and compatible flatmates',
      'Improved transparency and accessibility in the rental market',
      'Established a scalable foundation for expanding services across Nigeria',
    ],
    bgImage: '/ulospace 1.png',
    gallery: ['/ulospace 1.png', '/ulospace 2.png'],
    video: '/ulospaces.co.mp4',
  },
  4: {
    title: 'Dr Golly',
    type: 'Educational Platform',
    role: 'Nocode Developer',
    timeline: 'Completed',
    techStack: 'Bubble, Stripe, Brevo',
    overview: 'A modern platform delivering expert advice, courses, and practical resources in one seamless experience.',
    challenge: 'Access to reliable, expert-backed guidance on parenting and personal development is often fragmented. Many families struggle to find practical, easy-to-understand resources. There was a need for a centralized, accessible platform that delivers structured learning and actionable tools in a supportive and engaging way.',
    solution: 'I helped develop Dr Golly, a modern web-based platform delivering expert advice, courses, and practical resources. The platform provides on-demand video programs, toolkits, and evidence-based strategies focused on parenting, relationships, mental health, and life skills. Built with an intuitive, responsive interface for cross-device access.',
    results: [
      'Delivered a centralized platform for parenting and life skills education',
      'Made expert knowledge accessible through on-demand, easy-to-follow content',
      'Empowered users with practical tools for real-life application',
      'Enabled flexible, cross-device learning for busy families',
      'Created a supportive experience that promotes healthier relationships and personal growth',
    ],
    bgImage: '/dr_golly_4.png',
    gallery: ['/dr_golly_1.png', '/dr_golly_2.png', '/dr_golly_3.png'],
    video: '',
  },
  5: {
    title: 'AI-Powered Hiring',
    type: 'Recruiting Platform',
    role: 'Nocode Developer',
    timeline: 'Completed',
    techStack: 'Bubble, OpenAI, Jobsearch API',
    overview: 'A modern, AI-enhanced job platform designed to streamline the entire recruitment lifecycle.',
    challenge: 'The hiring process is time-consuming, inefficient, and fragmented across multiple tools. Recruiters struggle with writing job descriptions, screening candidates, and managing applicants, while job seekers lack personalized feedback. There was a need for a unified, intelligent platform that simplifies hiring while enhancing decision-making with AI.',
    solution: 'I built a modern AI-enhanced job platform using Bubble, designed to streamline the entire recruitment lifecycle. The platform leverages AI to generate job descriptions, analyze resumes, and provide actionable feedback. Key features include automated candidate shortlisting, interview scheduling, recruiter dashboards, and a full applicant tracking system.',
    results: [
      'Streamlined the end-to-end hiring process in a single platform',
      'Reduced manual effort with AI-powered job descriptions and candidate screening',
      'Improved candidate experience through personalized resume feedback',
      'Enabled recruiters to manage applicants efficiently with integrated dashboards',
      'Delivered a scalable, responsive solution built entirely with no-code technology',
    ],
    bgImage: '/landing job.png',
    gallery: ['/job page.png', '/landing job.png'],
    video: '/Job Platform.mp4',
  },
  6: {
    title: 'Stripe Subscriptions',
    type: 'Billing System',
    role: 'Nocode Developer',
    timeline: 'Completed',
    techStack: 'Bubble, Stripe API',
    overview: 'A seamless subscription system integrated with Stripe for accurate billing, upgrades, and structured workflows.',
    challenge: 'Managing subscriptions is complex, especially when handling plan upgrades, cancellations, and invoice tracking in a no-code environment. The challenge was to build a seamless system that integrates with Stripe while ensuring accurate billing, smooth UX, and reliable workflow automation.',
    solution: 'I implemented a full subscription management system using Stripe integrated within Bubble. This includes creating and managing subscriptions, enabling plan upgrades, cancellations, and dynamic invoice retrieval. The system uses Stripe APIs with structured backend workflows to ensure accurate billing logic, proper subscription state handling, and synchronization between Stripe and the app database.',
    results: [
      'Successfully implemented end-to-end subscription management with Stripe',
      'Enabled users to upgrade, downgrade, and cancel plans seamlessly',
      'Automated invoice retrieval and billing processes',
      'Improved reliability and accuracy of subscription workflows',
      'Delivered a scalable billing system within a no-code Bubble environment',
    ],
    bgImage: '/stripe_4.png',
    gallery: ['/stripe_1.png', '/stripe_2.png', '/stripe_3.png'],
    video: '',
  },
  7: {
    title: 'Supermarket POS',
    type: 'Point of Sale System',
    role: 'Full-stack Developer',
    timeline: 'Completed',
    techStack: 'React, Vite, Supabase',
    overview: 'A comprehensive, dual-interface point-of-sale system tailored for busy retail environments.',
    challenge: 'Supermarkets require lightning-fast, reliable POS systems for high customer throughput. Legacy systems are clunky, lack real-time sync between register and back office, and provide poor UX. Store managers need a modern way to track sales, manage inventory, and oversee staff without interrupting active checkout transactions.',
    solution: 'I developed a full-stack web application with two distinct, role-based interfaces: a Cashier POS Interface for rapid checkout, and an Admin Dashboard for management oversight. Built with React (Vite) and Supabase for real-time data, seamless authentication, and strict role-based access control.',
    results: [
      'Drastically reduced cashier learning curve and transaction times',
      'Administrators gained real-time visibility into stock levels and sales trends',
      'Strict role-based access ensures security for cashiers and full control for owners',
    ],
    bgImage: '/pos_dashboard.png',
    gallery: ['/pos_dashboard.png', '/pos_cashier.png', '/pos_inventory.png'],
    video: '',
  },
};

/* ── Small helpers ── */
const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#0066FF" fillOpacity="0.1"/>
    <path d="M6.5 11.5l3 3 6-7" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Component ── */
const CaseStudy = () => {
  const { id } = useParams();
  const project = projectData[id];
  const [lightboxImg, setLightboxImg] = useState(null);

  const progressRef  = useRef();
  const backRef      = useRef();
  const titleRef     = useRef();
  const subtitleRef  = useRef();
  const metaRef      = useRef();
  const bannerWrapRef = useRef();
  const bannerRef    = useRef();
  const galleryRef   = useRef();
  const challengeRef = useRef();
  const solutionRef  = useRef();
  const resultsRef   = useRef();

  /* ── Scroll progress bar ── */
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  /* ── GSAP animations ── */
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      /* Page entry sequence */
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(backRef.current,     { opacity: 0, x: -30, duration: 0.5, ease: 'power3.out' })
        .from(titleRef.current,    { opacity: 0, y: 50,  duration: 0.8, ease: 'power4.out' }, '-=0.2')
        .from(subtitleRef.current, { opacity: 0, y: 30,  duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .from(metaRef.current.children, { opacity: 0, y: 30, stagger: 0.1, duration: 0.55, ease: 'power3.out' }, '-=0.4')
        .from(bannerWrapRef.current, { opacity: 0, scale: 0.96, duration: 0.8, ease: 'power3.out' }, '-=0.3');

      /* Parallax hero banner */
      gsap.to(bannerRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: bannerWrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      /* Gallery stagger */
      if (galleryRef.current) {
        const imgs = galleryRef.current.querySelectorAll('.cs-gallery-img');
        gsap.from(imgs, {
          scrollTrigger: { trigger: galleryRef.current, start: 'top 82%', once: true },
          opacity: 0, y: 50, scale: 0.94,
          stagger: 0.12, duration: 0.7, ease: 'power3.out',
        });
      }

      /* Challenge & Solution slide in */
      [challengeRef, solutionRef].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.from(ref.current, {
          scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
          opacity: 0, x: i === 0 ? -50 : 50,
          duration: 0.75, ease: 'power3.out',
        });
      });

      /* Results stagger */
      if (resultsRef.current) {
        const items = resultsRef.current.querySelectorAll('.cs-result-item');
        gsap.from(items, {
          scrollTrigger: { trigger: resultsRef.current, start: 'top 82%', once: true },
          opacity: 0, x: -30,
          stagger: 0.1, duration: 0.6, ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, [id]);

  if (!project) {
    return (
      <div style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <h2>Project Not Found</h2>
        <Link to="/" className="btn btn-secondary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
          Return Home
        </Link>
      </div>
    );
  }

  /* Prev / next */
  const allIds      = Object.keys(projectData).map(Number);
  const currentIdx  = allIds.indexOf(parseInt(id));
  const prevId      = allIds[currentIdx - 1];
  const nextId      = allIds[currentIdx + 1];
  const prevProject = prevId != null ? projectData[prevId] : null;
  const nextProject = nextId != null ? projectData[nextId] : null;

  const techPills = project.techStack.split(',').map(t => t.trim());

  return (
    <div className="case-study-page">
      {/* Reading progress */}
      <div className="cs-progress-track">
        <div className="cs-progress-bar" ref={progressRef} />
      </div>

      <div className="cs-container">
        {/* Back */}
        <Link to="/" className="cs-back-btn" ref={backRef}>
          <span className="cs-back-icon">←</span>
          BACK TO PROJECTS
        </Link>

        {/* Header */}
        <header className="cs-header">
          <div className="cs-type-badge">{project.type}</div>
          <h1 className="cs-title" ref={titleRef}>{project.title}</h1>
          <p className="cs-subtitle" ref={subtitleRef}>{project.overview}</p>
          <div className="cs-tech-row">
            {techPills.map(t => (
              <span key={t} className="cs-tech-pill">{t}</span>
            ))}
          </div>
        </header>

        {/* Meta cards */}
        <div className="cs-meta-cards" ref={metaRef}>
          <div className="cs-card">
            <div className="cs-card-label">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: 6 }}>
                <circle cx="7" cy="7" r="6" stroke="#0066FF" strokeWidth="1.5"/>
                <path d="M7 4v3.5l2 1.5" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              TIMELINE
            </div>
            <div className="cs-card-val">{project.timeline}</div>
          </div>
          <div className="cs-card">
            <div className="cs-card-label">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: 6 }}>
                <rect x="1" y="3" width="12" height="9" rx="2" stroke="#0066FF" strokeWidth="1.5"/>
                <path d="M1 6h12" stroke="#0066FF" strokeWidth="1.5"/>
                <circle cx="4" cy="9" r="1" fill="#0066FF"/>
              </svg>
              ROLE
            </div>
            <div className="cs-card-val">{project.role}</div>
          </div>
          <div className="cs-card cs-card-accent">
            <div className="cs-card-label">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: 6 }}>
                <path d="M7 1l1.8 3.6L13 5.4l-3 2.9.7 4.1L7 10.4 3.3 12.4l.7-4.1L1 5.4l4.2-.8z" stroke="white" strokeWidth="1.3" fill="none"/>
              </svg>
              STACK
            </div>
            <div className="cs-card-val cs-card-val-light">{project.techStack}</div>
          </div>
        </div>

        {/* Hero banner — parallax */}
        <div className="cs-hero-wrap" ref={bannerWrapRef}>
          <div
            className="cs-hero-img"
            ref={bannerRef}
            style={{ backgroundImage: `url("${project.bgImage}")` }}
          />
          <div className="cs-hero-overlay">
            <div className="cs-hero-stats">
              <div className="cs-hero-stat">
                <span className="cs-hero-stat-label">Role</span>
                <span className="cs-hero-stat-val">{project.role}</span>
              </div>
              <div className="cs-hero-stat-divider" />
              <div className="cs-hero-stat">
                <span className="cs-hero-stat-label">Status</span>
                <span className="cs-hero-stat-val">{project.timeline}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <section className="cs-gallery-section" ref={galleryRef}>
          <div className="cs-section-eyebrow">// GALLERY</div>
          <h3 className="cs-section-heading">Project Screenshots</h3>
          <div className={`cs-gallery-grid cs-gallery-${project.gallery.length}`}>
            {project.gallery.map((src, i) => (
              <div
                key={i}
                className="cs-gallery-img"
                onClick={() => setLightboxImg(src)}
              >
                <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
                <div className="cs-gallery-zoom">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3h5M3 3v5M17 3h-5M17 3v5M3 17h5M3 17v-5M17 17h-5M17 17v-5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video */}
        {project.video && (
          <section className="cs-video-section">
            <div className="cs-section-eyebrow">// DEMO</div>
            <h3 className="cs-section-heading">Project Walkthrough</h3>
            <div className="cs-video-container">
              <video controls className="cs-video-player" src={project.video}>
                Your browser does not support video.
              </video>
            </div>
          </section>
        )}

        {/* Challenge + Solution */}
        <section className="cs-story-section">
          <div className="cs-story-panel cs-challenge" ref={challengeRef}>
            <div className="cs-story-number">01</div>
            <div className="cs-section-eyebrow cs-eyebrow-light">// THE CHALLENGE</div>
            <h2>What needed solving</h2>
            <p>{project.challenge}</p>
          </div>
          <div className="cs-story-panel cs-solution" ref={solutionRef}>
            <div className="cs-story-number">02</div>
            <div className="cs-section-eyebrow">// THE SOLUTION</div>
            <h2>How I built it</h2>
            <p>{project.solution}</p>
          </div>
        </section>

        {/* Results */}
        <section className="cs-results-section" ref={resultsRef}>
          <div className="cs-section-eyebrow">// OUTCOMES</div>
          <h2 className="cs-results-heading">The Results</h2>
          <div className="cs-results-grid">
            {project.results.map((result, i) => (
              <div key={i} className="cs-result-item">
                <CheckIcon />
                <span>{result}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Prev / Next navigation */}
        {(prevProject || nextProject) && (
          <nav className="cs-project-nav">
            {prevProject ? (
              <Link to={`/case-study/${prevId}`} className="cs-nav-card cs-nav-prev">
                <span className="cs-nav-dir">← Previous</span>
                <span className="cs-nav-title">{prevProject.title}</span>
                <span className="cs-nav-type">{prevProject.type}</span>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link to={`/case-study/${nextId}`} className="cs-nav-card cs-nav-next">
                <span className="cs-nav-dir">Next →</span>
                <span className="cs-nav-title">{nextProject.title}</span>
                <span className="cs-nav-type">{nextProject.type}</span>
              </Link>
            ) : <div />}
          </nav>
        )}
      </div>

      <CTA />

      {/* Lightbox */}
      {lightboxImg && (
        <div className="cs-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="cs-lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
          <img
            src={lightboxImg}
            alt="Full view"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default CaseStudy;
