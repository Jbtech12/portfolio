import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

const processSteps = [
  { number: '01', title: 'Discovery & Strategy', desc: 'We dive deep into your business goals, target audience, and feature requirements to map out the perfect nocode architecture.' },
  { number: '02', title: 'Design & UX',           desc: 'Creating high-fidelity, premium designs in Figma that focus on conversion and provide an unmatched user experience.' },
  { number: '03', title: 'Agile Development',     desc: 'Rapid implementation using tools like Bubble or Webflow. You get weekly updates and testable versions throughout.' },
  { number: '04', title: 'Launch & Iterate',      desc: 'Rigorous testing, followed by a smooth launch. We monitor performance and make data-driven tweaks to maximize ROI.' },
];

const Process = () => {
  const sectionRef  = useRef();
  const lineRef     = useRef();
  const stepRefs    = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.process-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );

      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        gsap.from(step, {
          scrollTrigger: { trigger: step, start: 'top 82%', once: true },
          opacity: 0,
          y: 50,
          scale: 0.93,
          duration: 0.72,
          delay: i * 0.08,
          ease: 'power3.out',
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-process" ref={sectionRef} aria-label="My process">
      <div className="process-header">
        <h2>How I Work</h2>
        <p className="process-subtitle">
          A streamlined, risk-free process designed to take your idea to a live, converting product in record time.
        </p>
      </div>

      <div className="process-timeline-wrapper">
        <div className="process-line-track">
          <div className="process-line-fill" ref={lineRef}></div>
        </div>

        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="process-step"
              ref={(el) => (stepRefs.current[index] = el)}
            >
              <div className="step-dot"></div>
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
