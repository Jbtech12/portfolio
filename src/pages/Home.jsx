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
        <title>Jubril Toheeb | Bubble.io Developer & No-Code Automation Expert</title>
        <meta name="description" content="Jubril Toheeb is a Bubble.io developer and no-code automation expert helping startups build scalable web apps, SaaS MVPs, AI integrations, and workflow automation with Make, n8n, and GoHighLevel." />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:title" content="Jubril Toheeb | Bubble.io Developer & No-Code Automation Expert" />
        <meta property="og:description" content="Jubril builds scalable web apps, SaaS MVPs, and AI automation systems using Bubble.io, Make, n8n, GoHighLevel, and Stripe. Available for freelance projects." />
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
