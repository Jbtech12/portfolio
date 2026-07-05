import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  { id: 1, content: "I had a positive experience with Jubril. He was easy to work with and excited to get started on the project. I would consider working with him in the future.", author: "Olawunmi Akintunde", role: "Client",           image: "OA" },
  { id: 2, content: "He delivered good work on this project and I enjoyed working with him. His communication was top-notch, he met all deadlines, and his skills were reasonably strong.", author: "Oluwakemi Bodunde",   role: "Product Manager",  image: "OB" },
  { id: 3, content: "Great experience working with you. He was very quick with delivery and communicated all through the project.", author: "G Weah",             role: "Client",           image: "GW" },
  { id: 4, content: "I am thoroughly impressed with the quality and attention to detail in this project. Jubril demonstrated exceptional skill and dedication, delivering results that exceeded expectations. Communication was clear, and every milestone was met even before time.", author: "Yaqub", role: "Client", image: "Y" },
  { id: 5, content: "Jubril's mastery of Bubble is incredible. He helped us navigate a complex database architecture and turned our messy requirements into a clean, scalable application in record time.", author: "David Chen", role: "Startup Founder",  image: "DC" },
  { id: 6, content: "We hired Jubril to integrate Stripe and OpenAI into our existing Bubble app. He executed perfectly and proactively identified and fixed performance bottlenecks. A true technical partner.", author: "Rachel Green", role: "Product Manager", image: "RG" },
];

const marqueeItems = [...testimonialsData, ...testimonialsData];

const Testimonials = () => {
  const trackRef  = useRef();
  const outerRef  = useRef();
  const tweenRef  = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(outerRef.current, {
        scrollTrigger: { trigger: outerRef.current, start: 'top 85%', once: true },
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
      });

      tweenRef.current = gsap.to(trackRef.current, {
        x: '-50%',
        ease: 'none',
        repeat: -1,
        duration: 38,
      });

      const pauseMarquee  = () => tweenRef.current?.pause();
      const resumeMarquee = () => tweenRef.current?.resume();
      outerRef.current.addEventListener('mouseenter', pauseMarquee);
      outerRef.current.addEventListener('mouseleave', resumeMarquee);

      return () => {
        outerRef.current?.removeEventListener('mouseenter', pauseMarquee);
        outerRef.current?.removeEventListener('mouseleave', resumeMarquee);
      };
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section-testimonials" aria-label="Client testimonials">
      <div className="testimonials-header">
        <h2>What founders say</h2>
      </div>

      <div className="testimonials-marquee-outer" ref={outerRef}>
        <div className="testimonials-track" ref={trackRef}>
          {marqueeItems.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-content">{t.content}</p>
              <div className="testimonial-author-block">
                <div className="testimonial-avatar">{t.image}</div>
                <div className="testimonial-author-info">
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
