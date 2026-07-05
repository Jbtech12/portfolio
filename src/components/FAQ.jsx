import { useState, useEffect, useRef } from 'react';
import './FAQ.css';

const faqsData = [
  {
    question: "Why no-code instead of traditional code?",
    answer: "No-code allows us to build and iterate 5x faster than traditional code, meaning you get to market quicker and validation is cheaper. Modern no-code tools like Bubble.io are extremely robust, scalable, and secure — suitable for most startup MVPs and even enterprise tools."
  },
  {
    question: "How long does a typical Bubble.io project take?",
    answer: "A standard SaaS MVP in Bubble.io typically takes 4–8 weeks. Simpler automation or integration projects using Make, n8n, or GoHighLevel can be completed in 1–2 weeks. We focus on speed without compromising on quality."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes. Getting to launch is just the beginning. I offer ongoing retainer packages for continuous iteration, feature additions, and scaling support as your user base grows."
  },
  {
    question: "What platforms do you specialise in?",
    answer: "I specialise primarily in Bubble.io for complex web app logic and SaaS MVPs, Xano for scalable backend APIs, Make.com and n8n for workflow automation, GoHighLevel for CRM and marketing automation, and Stripe for payment and subscription billing."
  },
  {
    question: "Can you integrate AI features into my application?",
    answer: "Absolutely. I integrate OpenAI, Claude, and other LLM APIs into Bubble.io and custom web apps — covering AI chat, automated content generation, intelligent document processing, resume analysis, and more."
  },
  {
    question: "Do you work with clients outside Nigeria?",
    answer: "Yes — I work with clients globally. Most projects are handled fully remotely with weekly video calls, async updates, and shared project management tools."
  },
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
    <section className="section-faq" ref={sectionRef} aria-label="Frequently Asked Questions">
      <div className="faq-header faq-reveal">
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="faq-list">
        {faqsData.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;
          return (
            <div
              key={index}
              className={`faq-item faq-reveal ${isOpen ? 'open' : ''}`}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div
                id={answerId}
                className="faq-answer-wrapper"
                role="region"
                aria-label={faq.question}
              >
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
