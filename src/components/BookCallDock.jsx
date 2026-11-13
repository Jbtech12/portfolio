import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './BookCallDock.css';

// A small floating bar pinned to the bottom of every page, so the
// "Book a call" button is always one tap away. It hides itself while the
// booking calendar (#contact) is on screen so it never covers the calendar.
const BookCallDock = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [calendarInView, setCalendarInView] = useState(false);

  useEffect(() => {
    setCalendarInView(false);
    const target = document.getElementById('contact');
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCalendarInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  const goTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // On a case-study page: go home, then Home scrolls to the section.
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <nav
      className={`book-call-dock${calendarInView ? ' is-hidden' : ''}`}
      aria-label="Quick links"
      aria-hidden={calendarInView || undefined}
    >
      <a href="/#projects" className="dock-link" onClick={goTo('projects')} tabIndex={calendarInView ? -1 : undefined}>
        Work
      </a>
      <a href="/#services" className="dock-link dock-link-optional" onClick={goTo('services')} tabIndex={calendarInView ? -1 : undefined}>
        Services
      </a>
      <Link
        to="/about"
        className={`dock-link${pathname === '/about' ? ' is-active' : ''}`}
        aria-current={pathname === '/about' ? 'page' : undefined}
        tabIndex={calendarInView ? -1 : undefined}
      >
        Me
      </Link>
      <span className="dock-divider" aria-hidden="true" />
      <a href="/#contact" className="dock-cta" onClick={goTo('contact')} tabIndex={calendarInView ? -1 : undefined}>
        <span className="dock-cta-dot" aria-hidden="true" />
        Book a call
      </a>
    </nav>
  );
};

export default BookCallDock;
