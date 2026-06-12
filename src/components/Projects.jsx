import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const U = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=82&auto=format&fit=crop`;

const projectData = [
  { id: 1, title: 'Alliance Travel',      type: 'Online Booking Platform', bg: `linear-gradient(160deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.72) 100%), url("${U('1504150558240-0b4fd8946624')}") center/cover no-repeat`,    gridArea: 'p1' },
  { id: 2, title: 'NBA Player Props',     type: 'Sports Analytics',        bg: `linear-gradient(160deg, rgba(15,23,42,0.18) 0%, rgba(15,23,42,0.75) 100%), url("${U('1577471488278-16eec37ffcc2')}") center/cover no-repeat`,     gridArea: 'p2' },
  { id: 3, title: 'UloSpaces',            type: 'Rental Platform',         bg: `linear-gradient(160deg, rgba(15,23,42,0.22) 0%, rgba(15,23,42,0.70) 100%), url("${U('1642976975710-1d8890dbf5ab')}") center/cover no-repeat`,     gridArea: 'p3' },
  { id: 4, title: 'Dr Golly',             type: 'Educational Platform',    bg: `linear-gradient(160deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.68) 100%), url("${U('1517554558809-9b4971b38f39')}") center/cover no-repeat`,     gridArea: 'p4' },
  { id: 5, title: 'AI-Powered Hiring',    type: 'Recruiting Platform',     bg: `linear-gradient(160deg, rgba(15,23,42,0.28) 0%, rgba(15,23,42,0.78) 100%), url("${U('1694903089438-bf28d4697d9a')}") center/cover no-repeat`,     gridArea: 'p5' },
  { id: 6, title: 'Stripe Subscriptions', type: 'Billing System',          bg: `linear-gradient(160deg, rgba(15,23,42,0.20) 0%, rgba(15,23,42,0.72) 100%), url("${U('1563013544-824ae1b704d3')}") center/cover no-repeat`,        gridArea: 'p6' },
  { id: 7, title: 'Supermarket POS',      type: 'Point of Sale System',    bg: `linear-gradient(160deg, rgba(15,23,42,0.20) 0%, rgba(15,23,42,0.72) 100%), url("${U('1752057118708-cb96baf7ef45')}") center/cover no-repeat`,     gridArea: 'p7' },
];

const Projects = () => {
  const gridRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.project-card');
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          once: true,
        },
        opacity: 0,
        y: 70,
        scale: 0.94,
        stagger: { amount: 0.55, from: 'start' },
        duration: 0.85,
        ease: 'power3.out',
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const onMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.12;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.12;
    gsap.to(card, { x, y, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  };

  const onMouseLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)', overwrite: 'auto' });
  };

  return (
    <div className="projects-grid" ref={gridRef}>
      {projectData.map((project) => (
        <Link
          to={`/case-study/${project.id}`}
          key={project.id}
          className={`project-card ${project.gridArea}`}
          style={{ background: project.bg, textDecoration: 'none' }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div className="project-content">
            <h3 style={{ color: 'white' }}>{project.title}</h3>
            <p style={{ color: 'white', opacity: 0.8 }}>{project.type}</p>
          </div>
          <div className="project-hover-overlay">
            <span>View Case Study</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Projects;
