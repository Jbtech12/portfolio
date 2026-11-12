import './TechStack.css';

const stackGroups = [
  { title: 'No-Code & Low-Code', items: ['Bubble.io', 'Webflow', 'Framer', 'Lovable'] },
  { title: 'Frontend', items: ['Next.js', 'React', 'JavaScript', 'HTML', 'CSS'] },
  { title: 'Backend & Databases', items: ['Xano', 'Supabase', 'PostgreSQL', 'Convex'] },
  { title: 'AI Integrations', items: ['OpenAI API', 'Claude API', 'Vapi AI', 'ElevenLabs', 'LangChain'] },
  { title: 'Automation', items: ['n8n', 'Make.com', 'Zapier', 'GoHighLevel'] },
  { title: 'APIs & Payments', items: ['REST APIs', 'Stripe', 'Webhooks', 'Postman', 'Bubble API Connector'] },
  { title: 'UI/UX Design', items: ['Figma', 'Bubble responsive editor'] },
  { title: 'Deployment & Hosting', items: ['Vercel', 'Supabase', 'Webflow Hosting'] },
];

const TechStack = () => (
  <section className="section-stack" id="stack" aria-label="Technology stack">
    <div className="stack-header">
      <div className="pill-badge pill-dark">// TECH STACK //</div>
      <h2>Tools I Work With</h2>
    </div>
    <div className="stack-grid">
      {stackGroups.map(({ title, items }) => (
        <div className="stack-group" key={title}>
          <h3>{title}</h3>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default TechStack;
