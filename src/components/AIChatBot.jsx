import React, { useState, useRef, useEffect } from 'react';
import './AIChatBot.css';
import jubrilImg from '../assets/jubril.jpeg';

const services = ['Full-Stack + Bubble', 'UI/UX Design', 'Bubble Dev', 'Other'];
const budgets = ['< $1k', '$1k - $3k', '$3k - $5k', '$5k+'];

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  
  // Form State
  const [selectedService, setSelectedService] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [ideaBrief, setIdeaBrief] = useState('');

  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSocialsPopup, setShowSocialsPopup] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatStarted) {
      scrollToBottom();
    }
  }, [messages, isTyping, isChatStarted, showSocialsPopup]);

  const handleStartChat = async (e) => {
    e.preventDefault();
    if (!selectedService || !selectedBudget) return; 
    
    setIsChatStarted(true);
    setIsTyping(true);

    const initialContext = `Target Service: ${selectedService} \nEstimated Budget: ${selectedBudget} \nProject Brief: ${ideaBrief || 'None provided'}`;
    
    const userMsg = { role: 'user', text: initialContext };
    setMessages([userMsg]);

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'ai', text: "Hi! My AI core isn't fully active right now (missing API Key), but I got your brief! You can reach out to me directly below." }]);
      setIsTyping(false);
      setTimeout(() => setShowSocialsPopup(true), 1500);
      return;
    }

    try {
      const apiMessages = [
        { role: 'system', content: "You are representing Jubril Toheeb Temidayo, an expert Bubble Developer and Vibe Coder. A potential client just submitted a project brief. Acknowledge their brief professionally, express excitement about their idea/budget, and mention that Jubril will be the one to personally discuss this further. Keep it concise (2-3 sentences max). Don't ask followup questions." },
        { role: 'user', content: initialContext }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: apiMessages,
          max_tokens: 150
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error?.message || 'API Error');

      setMessages(prev => [...prev, { role: 'ai', text: data.choices[0].message.content }]);
    } catch (error) {
      console.error('OpenAI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: "Thanks for sharing those details! We'd love to talk to you directly." }]);
    } finally {
      setIsTyping(false);
      setTimeout(() => setShowSocialsPopup(true), 1000);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = { role: 'user', text: inputVal.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);
    setShowSocialsPopup(false); 

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'ai', text: 'API Key missing.' }]);
      setIsTyping(false);
      return;
    }

    try {
      const apiMessages = [
        { role: 'system', content: "You are an AI assistant for Jubril, a No-code Bubble developer and Vibe Coder. Be extremely helpful and concise." },
        ...messages.map(m => ({
          role: m.role === 'ai' ? 'assistant' : 'user',
          content: m.text
        })),
        { role: 'user', content: userMsg.text }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: apiMessages, max_tokens: 150 })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message);

      setMessages(prev => [...prev, { role: 'ai', text: data.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to the network.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getWhatsAppLink = () => {
    let text = "Hi Jubril! 👋";
    if (selectedService || selectedBudget) {
      text += `\n\nI just found your portfolio and I'm interested in your ${selectedService || 'development'} services.`;
      if (selectedBudget) text += `\nMy estimated budget is ${selectedBudget}.`;
      if (ideaBrief) text += `\n\nHere is a quick brief of my idea:\n${ideaBrief}`;
    }
    return `https://wa.me/2348168454414?text=${encodeURIComponent(text)}`;
  };

  const getEmailLink = () => {
    const subject = `Project Inquiry: ${selectedService || 'Development'}`;
    let body = "Hi Jubril,\n\n";
    if (selectedService || selectedBudget) {
      body += `I'm interested in ${selectedService || 'your services'}`;
      if (selectedBudget) body += ` with an estimated budget of ${selectedBudget}.`;
      body += "\n\n";
      if (ideaBrief) body += `Here is a quick brief of my idea:\n${ideaBrief}\n\n`;
    }
    body += "Looking forward to speaking with you!";
    return `mailto:jubriltoheeb70@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="ai-chat-container">
      {isOpen && (
        <div className="ai-chat-window">
          {/* Custom Form Header */}
          <div className="ai-chat-header-profile">
            <div className="ai-header-info">
              <div className="ai-avatar-wrapper">
                <img src={jubrilImg} alt="Jubril" className="ai-profile-pic" />
                <span className="ai-status-circle"></span>
              </div>
              <div className="ai-profile-texts">
                <h3>Jubril T.</h3>
                <p>Typically replies in minutes</p>
              </div>
            </div>
            <button className="ai-chat-close-wg" onClick={toggleChat}>&times;</button>
          </div>
          
          {/* Form View via Screenshot reference */}
          {!isChatStarted ? (
            <div className="ai-lead-form">
              <div className="ai-form-section">
                <label id="service-label">What service are you looking for?</label>
                <div className="ai-pill-grid" role="group" aria-labelledby="service-label">
                  {services.map(s => (
                    <button 
                      key={s} 
                      type="button"
                      className={`ai-pill ${selectedService === s ? 'active' : ''}`}
                      onClick={() => setSelectedService(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ai-form-section mt-15">
                <label id="budget-label">What is your estimated budget?</label>
                <div className="ai-pill-grid" role="group" aria-labelledby="budget-label">
                  {budgets.map(b => (
                    <button 
                      key={b} 
                      type="button"
                      className={`ai-pill ${selectedBudget === b ? 'active' : ''}`}
                      onClick={() => setSelectedBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ai-form-section mt-15 mb-20">
                <div className="ai-label-split">
                  <label htmlFor="idea-brief">Tell me about your idea</label>
                  <span>Optional</span>
                </div>
                <textarea
                  id="idea-brief"
                  className="ai-form-textarea"
                  placeholder="A brief overview..."
                  value={ideaBrief}
                  onChange={(e) => setIdeaBrief(e.target.value)}
                  rows={3}
                ></textarea>
              </div>

              <div className="ai-form-footer">
                <button 
                  className="ai-start-btn" 
                  onClick={handleStartChat}
                  disabled={!selectedService || !selectedBudget}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Start Chat
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Chat View */}
              <div className="ai-chat-messages fade-in">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`ai-message-row ${msg.role}`}>
                    <div className="ai-message-bubble">
                      {/* Preserve formatting of user brief */}
                      {msg.role === 'user' && msg.text.includes('\n') 
                        ? msg.text.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)
                        : msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="ai-message-row ai">
                    <div className="ai-message-bubble typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
                
                {showSocialsPopup && !isTyping && (
                  <div className="ai-message-row ai slide-up-social">
                    <div className="ai-socials-card">
                      <div className="social-card-header">
                        <h4>Contact me directly! 👇</h4>
                        <p>I am a Bubble developer and Vibe Coder.</p>
                      </div>
                      <div className="social-buttons-grid">
                        <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="s-btn w-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px'}}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> WhatsApp</a>
                        <a href={getEmailLink()} className="s-btn e-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px'}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Email</a>
                        <a href="https://www.linkedin.com/in/jubril-t-97b0551ba" target="_blank" rel="noreferrer" className="s-btn l-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px'}}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn</a>
                        <a href="https://x.com/jubreal21" target="_blank" rel="noreferrer" className="s-btn x-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px'}}><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg> X (Twitter)</a>
                        <a href="https://www.instagram.com/jubreal_21" target="_blank" rel="noreferrer" className="s-btn i-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px'}}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> Instagram</a>
                        <a href="https://www.tiktok.com/@jubreal21" target="_blank" rel="noreferrer" className="s-btn t-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px'}}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg> TikTok</a>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} style={{ float:"left", clear: "both" }} />
              </div>

              <form className="ai-chat-input-area" onSubmit={handleSend} aria-label="Chat input">
                <input
                  type="text"
                  id="chat-input"
                  aria-label="Type a message"
                  placeholder="Type a message..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
                <button type="submit" className="ai-send-btn" disabled={!inputVal.trim()}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Floating Widget Button */}
      {!isOpen && (
        <button className="ai-chat-toggle-btn green-glow" onClick={toggleChat} aria-label="Open AI Chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIChatBot;
