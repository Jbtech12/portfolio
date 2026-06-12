import { useState, useEffect, useRef } from 'react';
import './FAQ.css';

const faqsData = [
  {
    question: "Why nocode instead of traditional code?",
    answer: "Nocode allows us to build and iterate 5x faster than traditional code, meaning you get to market quicker and validation is cheaper. Modern nocode tools like Bubble and Webflow are extremely robust, scalable, and secure, suitable for most startup MVPs and even enterprise tools."
  },
  {
    question: "How long does a typical project take?",
    answer: "It depends on scope, but a standard SaaS MVP in Bubble typically takes 4-8 weeks. A high-end Webflow marketing site usually takes 2-4 weeks. We focus on speed without compromising on the premium feel."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes. Getting to launch is just the beginning. I offer ongoing retainer packages for continuous iteration, feature additions, and scaling support as your user base grows."
  },
  {
    question: "What platforms do you specialize in?",
    answer: "I specialize primarily in Bubble for complex web app logic, Webflow and Framer for high-conversion marketing sites and landing pages, and Make/Zapier for backend automations."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef();

  useEffect(() => {
    const targets = sectionRef.current.querySelectorAll('.faq-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('faq-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="section-faq" ref={sectionRef}>
      <div className="faq-header faq-reveal">
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="faq-list">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item faq-reveal ${openIndex === index ? 'open' : ''}`}
            style={{ transitionDelay: `${index * 0.08}s` }}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer-wrapper">
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
