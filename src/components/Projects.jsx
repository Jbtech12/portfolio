import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';
import { PROJECT_ORDER } from '../data/projectOrder';

// media.kind:
//   'screen' – a wide app screenshot, framed on a tinted panel
//   'cover'  – an already-composed mockup that fills the panel
//   'phones' – mobile screenshots shown side by side
const projectData = [
  {
    id: 8,
    title: 'Automation Guardian',
    type: 'AI SaaS · GoHighLevel Marketplace',
    blurb: <>A SaaS that audits every GoHighLevel workflow, scores its health and explains each issue in plain English. <strong>It audited a 125-workflow account in under a second.</strong></>,
    tags: ['Next.js', 'OpenAI', 'HighLevel API'],
    media: { kind: 'screen', src: '/work/automation-guardian.webp' },
    tint: '#6366f1',
    featured: true,
  },
  {
    id: 10,
    title: 'Insurance CRM Rebuild',
    type: 'GoHighLevel CRM & Partner Payouts',
    blurb: <>Rebuilt an insurance advisory firm’s CRM in GoHighLevel: three pipelines, 96 bilingual email templates and <strong>automatic partner payout tracking that replaced their Excel sheet</strong>.</>,
    tags: ['GoHighLevel', 'JavaScript', 'REST APIs'],
    media: { kind: 'screen', src: '/work/insurance-crm.webp' },
    tint: '#0ea5e9',
    featured: true,
  },
  {
    id: 12,
    title: 'ZeroHold Cross-Docking',
    type: 'Logistics, Warehouse & Payment Automation',
    blurb: <>Connected Bubble, Jotform, n8n, Airtable and Stripe into <strong>one booking-to-payment flow</strong> for a cross-docking warehouse, with final bills captured automatically.</>,
    tags: ['Bubble.io', 'n8n', 'Stripe', 'Airtable'],
    media: { kind: 'screen', src: '/work/zerohold.webp' },
    tint: '#f59e0b',
    featured: true,
  },
  {
    id: 9,
    title: 'DailyWins',
    type: 'Mobile Habit Tracker App',
    blurb: <>A habit tracker for iOS and Android with one-tap check-ins, streaks and honest stats, <strong>shipped from a single TypeScript codebase</strong>.</>,
    tags: ['Expo', 'React Native', 'Convex'],
    media: { kind: 'phones', srcs: ['/work/dailywins-1.webp', '/work/dailywins-2.webp', '/work/dailywins-3.webp'] },
    tint: '#22c55e',
    featured: true,
  },
  {
    id: 1,
    title: 'Alliance Travel',
    type: 'Online Booking Platform',
    blurb: <>A scalable travel booking platform with <strong>third-party integrations</strong> and a fast, responsive booking flow.</>,
    tags: ['Bubble.io', 'Third-party APIs'],
    media: { kind: 'screen', src: '/work/alliance-travel.webp' },
    tint: '#14b8a6',
  },
  {
    id: 3,
    title: 'UloSpaces',
    type: 'Rental Platform',
    blurb: <>A rental platform for Lagos where people find <strong>a home and a compatible flatmate</strong> in one place.</>,
    tags: ['No-code'],
    media: { kind: 'screen', src: '/work/ulospaces.webp' },
    tint: '#f97316',
  },
  {
    id: 11,
    title: 'FDARegistry Portal',
    type: 'Compliance Management Platform',
    blurb: <>A multi-tenant compliance portal for companies, facilities and documents, with <strong>role-based access and built-in billing</strong>.</>,
    tags: ['Bubble.io', 'Xano'],
    media: { kind: 'screen', src: '/work/fdaregistry.webp' },
    tint: '#3b82f6',
  },
  {
    id: 5,
    title: 'AI-Powered Hiring',
    type: 'Recruiting Platform',
    blurb: <>A job platform that uses AI to <strong>write job descriptions and screen candidates</strong>, plus personal resume feedback.</>,
    tags: ['Bubble.io', 'OpenAI'],
    media: { kind: 'screen', src: '/work/ai-hiring.webp' },
    tint: '#8b5cf6',
  },
  {
    id: 2,
    title: 'NBA Player Props',
    type: 'Sports Analytics',
    blurb: <>A real-time analytics dashboard that shows <strong>player trends and hit rates instantly</strong>, built entirely in Bubble.io.</>,
    tags: ['Bubble.io', 'Chart.js'],
    media: { kind: 'screen', src: '/work/nba-props.webp' },
    tint: '#ef4444',
  },
  {
    id: 4,
    title: 'Dr Golly',
    type: 'Educational Platform',
    blurb: <>An education platform bringing <strong>expert courses and practical resources</strong> for families into one place.</>,
    tags: ['Bubble.io', 'Stripe', 'Brevo'],
    media: { kind: 'cover', src: '/work/dr-golly.webp' },
    tint: '#84cc16',
  },
  {
    id: 6,
    title: 'Stripe Subscriptions',
    type: 'Billing System',
    blurb: <>A Stripe billing system where users <strong>upgrade, downgrade and cancel plans themselves</strong>, with invoices handled automatically.</>,
    tags: ['Bubble.io', 'Stripe'],
    media: { kind: 'cover', src: '/work/stripe.webp' },
    tint: '#635bff',
  },
  {
    id: 7,
    title: 'Supermarket POS',
    type: 'Point of Sale System',
    blurb: <>A point-of-sale system with <strong>a fast cashier screen</strong> and a real-time stock and sales dashboard for owners.</>,
    tags: ['React', 'Supabase'],
    media: { kind: 'cover', src: '/work/pos.webp' },
    tint: '#10b981',
  },
];

const orderedProjects = PROJECT_ORDER.map((id) => projectData.find((p) => p.id === id));

const ProjectMedia = ({ media, title, eager }) => {
  const loading = eager ? 'eager' : 'lazy';
  if (media.kind === 'phones') {
    return (
      <div className="pc-phones">
        {media.srcs.map((src, i) => (
          <img key={src} src={src} alt={`${title} app screen ${i + 1}`} loading={loading} decoding="async" />
        ))}
      </div>
    );
  }
  return (
    <img
      className={media.kind === 'cover' ? 'pc-cover' : 'pc-screen'}
      src={media.src}
      alt={`${title} screenshot`}
      loading={loading}
      decoding="async"
    />
  );
};

const Projects = () => {
  const gridRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="projects-grid" ref={gridRef}>
      {orderedProjects.map((project, i) => (
        <Link
          to={`/case-study/${project.id}`}
          key={project.id}
          className={`project-card${project.featured ? ' is-featured' : ''}`}
          style={{ '--tint': project.tint }}
        >
          <div className="pc-text">
            <div className="pc-heading">
              <h3>{project.title}</h3>
              <span className="pc-type">{project.type}</span>
            </div>
            <p className="pc-blurb">{project.blurb}</p>
          </div>

          <div className={`pc-media pc-media-${project.media.kind}`}>
            <ProjectMedia media={project.media} title={project.title} eager={i === 0} />
          </div>

          <div className="pc-footer">
            <ul className="pc-tags" aria-label="Built with">
              {project.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <span className="pc-link">View case study <span aria-hidden="true">→</span></span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Projects;
