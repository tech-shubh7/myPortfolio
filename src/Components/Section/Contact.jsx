import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";

function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          full_message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`min-h-screen py-24 px-4 sm:px-6 relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#9A9590]/40 text-xs font-mono tracking-wider mb-4">
            <span className="text-[#FF6B6B]/50">import</span> &#123; conversation &#125; <span className="text-[#FF6B6B]/50">from</span> <span className="text-[#F6B93B]/50">&quot;you&quot;</span><span className="text-[#9A9590]/30">;</span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8E3] mb-4">
            Get in Touch<span className="text-[#2ECC71]">.</span>
          </h2>
          <div className="w-12 h-0.5 mx-auto rounded-full bg-gradient-to-r from-[#2ECC71] to-[#FF6B6B]" />
          <p className="mt-6 text-[#9A9590] max-w-md mx-auto">
            Got an idea, a question, or just wanna talk code? I&apos;m all ears.
          </p>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-[#9A9590] uppercase tracking-wider mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3 text-[#EDE8E3] text-sm placeholder:text-[#9A9590]/50 focus:outline-none focus:border-[#FF6B6B]/50 focus:shadow-[0_0_20px_rgba(255,107,107,0.06)] transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs text-[#9A9590] uppercase tracking-wider mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3 text-[#EDE8E3] text-sm placeholder:text-[#9A9590]/50 focus:outline-none focus:border-[#FF6B6B]/50 focus:shadow-[0_0_20px_rgba(255,107,107,0.06)] transition-all duration-300"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#9A9590] uppercase tracking-wider mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3 text-[#EDE8E3] text-sm placeholder:text-[#9A9590]/50 focus:outline-none focus:border-[#FF6B6B]/50 focus:shadow-[0_0_20px_rgba(255,107,107,0.06)] transition-all duration-300 resize-none"
              placeholder="Tell me about your project or idea..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-[#FF6B6B] to-[#F6B93B] text-[#0C0C0C] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,107,107,0.2)] disabled:opacity-50 disabled:translate-y-0"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Message Sent!"
              : status === "error"
              ? "Failed — Try again"
              : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="text-center text-[#2ECC71] text-sm animate-fade-scale">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
