import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Process from '../components/Process';
import TechStack from '../components/TechStack';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import '../index.css';

const BASE_URL = 'https://www.jubriltoheeb70.com';

function Home() {
  const location = useLocation();

  // Arriving from a case study via the "Work" / "Book a call" dock.
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;
    const frame = requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
    return () => cancelAnimationFrame(frame);
  }, [location.state]);

  return (
    <>
      <Helmet>
        <title>Jubril Toheeb | No-Code Developer, AI Solutions & Automation Specialist</title>
        <meta name="description" content="Jubril Toheeb builds web applications, SaaS platforms, AI-powered solutions and business automations with Bubble.io, Xano, Supabase, OpenAI, n8n, Make and GoHighLevel." />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:title" content="Jubril Toheeb | No-Code Developer, AI Solutions & Automation Specialist" />
        <meta property="og:description" content="Custom web apps, SaaS, AI-powered applications, GoHighLevel CRMs and business automation for startups and businesses. Book a free 30-minute discovery call." />
      </Helmet>

      <a href="#main-content" className="skip-nav-link">Skip to main content</a>

      <div className="app-wrapper">
        <main id="main-content" className="container">
          <Hero />

          <section id="projects" aria-labelledby="projects-heading" style={{ marginTop: '8rem', scrollMarginTop: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 id="projects-heading" style={{ fontSize: '2.5rem', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>Featured Work</h2>
              <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
                Real products I’ve built for founders and businesses: web apps, AI tools, CRMs and automations.
              </p>
            </div>
            <Projects />
          </section>

          <Services />
          <TechStack />
          <Testimonials />
          <Process />
          <FAQ />
          <CTA />
        </main>
      </div>
    </>
  );
}

export default Home;
