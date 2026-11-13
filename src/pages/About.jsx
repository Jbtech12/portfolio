import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CTA from '../components/CTA';
import jubrilImg from '../assets/jubril.jpeg';
import '../index.css';
import './About.css';

const BASE_URL = 'https://www.jubriltoheeb70.com';

const facts = [
  { value: '3+ years', label: 'building with Bubble.io' },
  { value: '12', label: 'case studies in this portfolio' },
  { value: 'CS', label: 'background in Computer Science' },
];

const whatIBuild = [
  { title: 'No-Code & SaaS Development', text: 'Custom web apps, SaaS products and MVPs, built mainly in Bubble.io.' },
  { title: 'AI-Powered Applications', text: 'AI features that do real work: content, screening, assistants and audits.' },
  { title: 'Business Process Automation', text: 'n8n, Make and Zapier workflows that remove repetitive manual tasks.' },
  { title: 'GoHighLevel & CRM Solutions', text: 'Pipelines, workflows, templates and dashboards set up the right way.' },
  { title: 'Backend & API Integrations', text: 'Databases, Xano and Supabase backends, and third-party APIs connected cleanly.' },
  { title: 'Payments & Subscriptions', text: 'Stripe checkouts, plans, upgrades, invoices and payment recovery.' },
  { title: 'UI/UX & Product Development', text: 'Clear, responsive interfaces designed around how people actually use them.' },
];

const reasons = [
  'Business-focused problem solving',
  'End-to-end application development',
  'Strong Bubble.io development experience',
  'Practical AI and automation integrations',
  'Backend and API integration expertise',
  'Scalable database and application architecture',
  'Commitment to quality and functionality',
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jubril-t-97b0551ba' },
  { label: 'X (Twitter)', href: 'https://x.com/jubreal21' },
  { label: 'Instagram', href: 'https://www.instagram.com/jubreal_21' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@jubreal21' },
  { label: 'WhatsApp', href: 'https://wa.me/2348168454414' },
  { label: 'Email', href: 'mailto:jubriltoheeb70@gmail.com' },
];

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Jubril Toheeb | No-Code Developer, AI Solutions & Automation Specialist</title>
        <meta name="description" content="Jubril Toheeb is a No-Code Developer, AI Solutions Developer and Automation Specialist with a Computer Science background, building web apps, SaaS, AI tools and business automations." />
        <link rel="canonical" href={`${BASE_URL}/about`} />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:title" content="About Jubril Toheeb" />
        <meta property="og:description" content="Web apps, AI solutions and business automations for startups and businesses. Book a free 30-minute discovery call." />
      </Helmet>

      <a href="#main-content" className="skip-nav-link">Skip to main content</a>

      <div className="app-wrapper">
        <main id="main-content" className="container about-page">
          <Link to="/" className="about-back">← Back home</Link>

          <header className="about-intro">
            <div className="about-intro-text">
              <div className="about-badge"><span className="about-badge-dot" aria-hidden="true" />Available for projects</div>
              <p className="about-name">Jubril Toheeb Temidayo</p>
              <h1>
                I build web apps, AI solutions<br />
                <span className="text-muted">&amp; business automations.</span>
              </h1>
              <p className="about-lead">
                No-Code Developer, AI Solutions Developer and Automation Specialist. I help startups,
                entrepreneurs and businesses turn ideas into working products with <strong>Bubble.io</strong>,
                {' '}<strong>AI</strong> and <strong>automation</strong>, backed by 3+ years of Bubble.io
                development, backend systems and API integrations.
              </p>
            </div>
            <img
              src={jubrilImg}
              alt="Portrait of Jubril Toheeb Temidayo"
              className="about-portrait"
              width="420"
              height="500"
            />
          </header>

          <ul className="about-facts" aria-label="Quick facts">
            {facts.map((f) => (
              <li key={f.label}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>

          <section className="about-block" aria-labelledby="about-me">
            <h2 id="about-me">About me</h2>
            <div className="about-prose">
              <p>
                I'm Jubril Toheeb, a No-Code Developer and Automation Specialist with a background in Computer Science.
                I build custom web applications, SaaS platforms, AI-powered solutions and automated business systems.
              </p>
              <p>
                My work goes beyond visual app building. I handle backend technologies, database architecture,
                API integrations, payments, authentication and workflow automation to deliver complete digital products.
              </p>
              <p>
                My approach is simple: <strong>understand the problem, design the right solution and build technology
                that delivers real value.</strong>
              </p>
            </div>
          </section>

          <section className="about-block" aria-labelledby="what-i-build">
            <h2 id="what-i-build">What I build</h2>
            <div className="about-build-grid">
              {whatIBuild.map((item) => (
                <div className="about-build-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="about-block" aria-labelledby="why-me">
            <h2 id="why-me">Why work with me</h2>
            <ul className="about-reasons">
              {reasons.map((r) => (
                <li key={r}>
                  <span className="about-check" aria-hidden="true">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <section className="about-block" aria-labelledby="find-me">
            <h2 id="find-me">Find me online</h2>
            <ul className="about-socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">{s.label} <span aria-hidden="true">↗</span></a>
                </li>
              ))}
            </ul>
            <p className="about-work-link">
              Want to see what I've shipped? <Link to="/" state={{ scrollTo: 'projects' }}>Browse my featured work →</Link>
            </p>
          </section>

          <CTA />
        </main>
      </div>
    </>
  );
}

export default About;
