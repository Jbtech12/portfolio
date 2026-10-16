import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import '../index.css';

const BASE_URL = 'https://www.jubriltoheeb70.com';

function Home() {
  return (
    <>
      <Helmet>
        <title>Jubril Toheeb | AI Automation Specialist & GoHighLevel Developer</title>
        <meta name="description" content="Jubril Toheeb builds AI automation and GoHighLevel systems for founders and small businesses: AI lead qualification, n8n and Make workflows, AI agents, and GHL CRM pipelines, so no lead goes cold." />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:title" content="Jubril Toheeb | AI Automation Specialist & GoHighLevel Developer" />
        <meta property="og:description" content="AI lead qualification, n8n and Make automations, AI agents, and GoHighLevel CRM builds for founders and small businesses. Book a free 30-minute automation audit." />
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
