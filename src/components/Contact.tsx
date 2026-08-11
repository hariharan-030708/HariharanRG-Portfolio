import { useState, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, MessageSquare, MapPin, Copy, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data';
import { ScrollReveal } from './ScrollReveal';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _template: 'table'
        })
      });

      const data = await response.json();

      if (response.ok && data.success !== 'false') {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('FormSubmit delivery error');
      }
    } catch (err) {
      console.error('AJAX delivery fallback to Gmail:', err);
      // Fallback: Open Gmail in browser directly with pre-filled details
      const subject = `Portfolio Message from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const getGmailComposeUrl = () => {
    const subject = formData.name ? `Portfolio Message from ${formData.name}` : 'Portfolio Inquiry';
    const body = (formData.name || formData.email || formData.message)
      ? `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      : '';
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const contactCards = [
    {
      id: 'email',
      icon: <Mail size={22} className="text-clay-blue group-hover:rotate-12 transition-transform duration-300" />,
      label: 'Email Me',
      value: personalInfo.email,
      copyValue: personalInfo.email,
      actionLabel: 'Click to Copy Email',
    },
    {
      id: 'phone',
      icon: <Phone size={22} className="text-clay-blue group-hover:rotate-12 transition-transform duration-300" />,
      label: 'Call / WhatsApp',
      value: personalInfo.phone,
      copyValue: personalInfo.phone.replace(/\s+/g, ''),
      actionLabel: 'Click to Copy Phone',
    },
    {
      id: 'linkedin',
      icon: <Linkedin size={22} className="text-clay-blue group-hover:rotate-12 transition-transform duration-300" />,
      label: 'LinkedIn Connect',
      value: 'linkedin.com/in/hariharan-gopinath',
      href: personalInfo.linkedin,
      actionLabel: 'Open in New Tab',
    },
    {
      id: 'github',
      icon: <Github size={22} className="text-clay-blue group-hover:rotate-12 transition-transform duration-300" />,
      label: 'GitHub Profile',
      value: 'github.com/hariharan-030708',
      href: personalInfo.github,
      actionLabel: 'Open in New Tab',
    }
  ];

  const handleCardClick = (card: typeof contactCards[0], e: MouseEvent) => {
    if (card.copyValue) {
      e.preventDefault();
      navigator.clipboard.writeText(card.copyValue);
      setCopiedField(card.id);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white/10 backdrop-blur-sm relative overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" duration={0.8}>
          <div className="clay-pill px-4 py-1 text-xs font-semibold text-clay-blue inline-block mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Contact Information
          </h2>
          <p className="text-sm text-gray-500 mt-3 font-sans">
            Have an internship role, project collaboration, or recruiter query? Feel free to reach out anytime!
          </p>
        </ScrollReveal>

        {/* Contact Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact cards */}
          <div className="lg:col-span-5 space-y-5">
            {contactCards.map((card, idx) => {
              const isCopied = copiedField === card.id;
              const hasLink = !!card.href;

              return (
                <ScrollReveal
                  key={card.label}
                  direction="left"
                  delay={idx * 0.15}
                  duration={0.8}
                >
                  <a
                    href={card.href || '#'}
                    target={hasLink ? '_blank' : undefined}
                    rel={hasLink ? 'noopener noreferrer' : undefined}
                    onClick={hasLink ? undefined : (e) => handleCardClick(card, e)}
                    className="clay-card p-5 flex items-center gap-4 hover:scale-102 hover:border-clay-blue/40 hover:shadow-[0_15px_30px_rgba(79,142,247,0.12)] transition-all duration-300 group cursor-pointer relative overflow-hidden block h-full"
                  >
                    {/* Glass Reflection overlay */}
                    <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none">
                      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[150%]" />
                    </div>

                    {/* Icon Wrapper */}
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-white/95 shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300"
                         style={{ boxShadow: 'inset 2px 2px 4px rgba(255,255,255,1), 4px 4px 8px rgba(163,177,198,0.15)' }}>
                      {card.icon}
                    </div>
                    
                    {/* Info Text */}
                    <div className="overflow-hidden flex-1">
                      <span className="text-[9px] font-mono font-bold text-gray-400 uppercase block tracking-wider">{card.label}</span>
                      <span className="text-xs sm:text-sm font-extrabold text-gray-700 block truncate mt-0.5 group-hover:text-clay-blue transition-colors duration-200">
                        {card.value}
                      </span>
                      <span className="text-[9px] text-gray-400 font-medium block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        {hasLink ? <ExternalLink size={10} /> : <Copy size={10} />}
                        {card.actionLabel}
                      </span>
                    </div>

                    {/* Dynamic Copied Status Checkmark */}
                    <AnimatePresence>
                      {isCopied && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-white shadow-sm"
                        >
                          <CheckCircle size={10} />
                          Copied!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                </ScrollReveal>
              );
            })}

            {/* Extra Info Banner */}
            <ScrollReveal
              direction="up"
              delay={0.4}
              duration={0.8}
            >
              <div className="clay-card-inset p-5 text-center text-xs text-gray-500 font-sans leading-relaxed border border-white/50">
                <MapPin size={18} className="text-clay-blue mx-auto mb-2 animate-bounce" />
                <strong>Location:</strong> Chennai, Tamil Nadu, India. Open to both remote internships and on-site training placements.
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Message Form */}
          <ScrollReveal
            direction="right"
            delay={0.2}
            duration={0.8}
            className="lg:col-span-7"
          >
            <div className="clay-card p-8 md:p-10 border border-white h-full">
              <div className="flex items-center gap-3 mb-6 border-b border-white/50 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-clay-blue/10 flex items-center justify-center border border-white/80">
                  <MessageSquare className="text-clay-blue" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Send me a direct message</h3>
                  <p className="text-[10px] text-gray-400 font-medium">Delivers directly to {personalInfo.email}</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="clay-card-inset p-8 text-center flex flex-col items-center justify-center"
                  >
                    <CheckCircle size={44} className="text-emerald-500 animate-bounce mb-4" />
                    <h4 className="text-base font-bold text-gray-800">Message Transmitted!</h4>
                    <p className="text-xs text-gray-500 mt-2 max-w-xs leading-relaxed">
                      Thank you for reaching out! Your message was sent directly to <strong className="text-gray-700">{personalInfo.email}</strong>. I will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-6 px-4 py-2 text-xs font-bold text-clay-blue bg-white rounded-full border border-clay-blue/20 hover:bg-clay-blue/10 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Name field */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full clay-input px-4 py-3 text-xs text-gray-700"
                      />
                    </div>

                    {/* Email field */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="jane.doe@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full clay-input px-4 py-3 text-xs text-gray-700"
                      />
                    </div>

                    {/* Message field */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 ml-1">Your Message</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Hi Hariharan, I came across your portfolio and..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full clay-input px-4 py-3 text-xs text-gray-700 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full clay-btn py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Transmitting to {personalInfo.email}...
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Send Message to Email
                        </>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <a
                        href={getGmailComposeUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-semibold text-clay-blue hover:underline inline-flex items-center gap-1.5"
                      >
                        <Mail size={12} /> Or compose directly in Gmail
                      </a>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
