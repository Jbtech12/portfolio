import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import '../index.css';

function Home() {
  return (
    <div className="app-wrapper">
      <main className="container">
        <Hero />

        <div id="projects" style={{ marginTop: '8rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', letterSpacing: '-0.03em', textAlign: 'center' }}>Featured Work</h2>
          <Projects />
        </div>

        <Services />
        <Testimonials />
        <Process />
        <FAQ />
        <CTA />
      </main>
    </div>
  );
}

export default Home;
