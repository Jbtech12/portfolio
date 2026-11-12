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

          <section id="projects" aria-label="Featured Work" style={{ marginTop: '8rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', letterSpacing: '-0.03em', textAlign: 'center' }}>Featured Work</h2>
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
