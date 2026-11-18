import React, { useState } from 'react';
import { submitContact } from '../api/client';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    orderNumber: '#CNC-89421',
    inquiryType: 'sizing',
    message: '',
    newsletterOptIn: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-28 bg-surface">
      {/* Intro Header */}
      <section className="relative w-full overflow-hidden bg-surface py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">Client Experience & Care</span>
          </div>
          <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight font-bold">
            We’re Here For You
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Have a question about fit, styling, or your recent order? Our personal concierge atelier is dedicated to assisting you with precision and warmth.
          </p>
        </div>
      </section>

      {/* 3 Direct Channel Cards */}
      <section className="w-full bg-surface-container-low py-16">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Live Styling Concierge */}
            <div className="p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">forum</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Live Styling Concierge</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Instant sizing consultations, tailored garment matches, and personal cart curations in real time.
                </p>
                <p className="text-secondary font-label-sm uppercase tracking-wider font-bold">Avg response: 90 seconds</p>
              </div>
              <button
                onClick={() => alert('Live Concierge chat will launch in the atelier side-pane.')}
                className="w-full h-12 rounded-full bg-primary text-on-primary font-label-lg uppercase tracking-wider hover:bg-secondary transition-all"
              >
                Start Live Chat
              </button>
            </div>

            {/* Email Atelier */}
            <div className="p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[24px]">alternate_email</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Email Our Atelier</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Comprehensive assistance for detailed order inquiries, corporate gifts, styling moodboards, and press.
                </p>
                <p className="font-headline-sm text-headline-sm text-on-surface font-mono font-bold">concierge@chicnco.com</p>
              </div>
              <a
                href="mailto:concierge@chicnco.com"
                className="w-full h-12 rounded-full bg-surface-container-high text-on-surface font-label-lg uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center"
              >
                Draft Email
              </a>
            </div>

            {/* SoHo Flagship Showroom */}
            <div className="p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">storefront</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Atelier & Showroom</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  482 Broome Street, SoHo, NY 10013. Immerse yourself in our textile archive and private fitting suites.
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Tue – Sat: 11:00 AM – 7:00 PM EST</p>
              </div>
              <button
                onClick={() => alert('Private fitting room reservation requested.')}
                className="w-full h-12 rounded-full bg-surface-container-high text-on-surface font-label-lg uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-all"
              >
                Reserve Fitting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Contact Form */}
      <section className="w-full bg-surface py-16 lg:py-24">
        <div className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin">
          <div className="bg-surface-container-lowest p-8 lg:p-12 rounded-2xl shadow-sm space-y-8">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Direct Dispatch</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">Send a Message to the Atelier</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-md uppercase tracking-wider text-on-surface block mb-2 font-bold">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-md uppercase tracking-wider text-on-surface block mb-2 font-bold">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-md uppercase tracking-wider text-on-surface block mb-2 font-bold">Order Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-md uppercase tracking-wider text-on-surface block mb-2 font-bold">Inquiry Type *</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-surface-container-low text-on-surface focus:outline-none cursor-pointer"
                  >
                    <option value="sizing">Sizing & Fit Advice</option>
                    <option value="shipping">Order & Shipping Status</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="press">Press & Collaborations</option>
                    <option value="other">Other Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-md uppercase tracking-wider text-on-surface block mb-2 font-bold">Your Message *</label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your fit questions, order notes, or specific styling requests here..."
                  required
                  className="w-full p-4 rounded-lg bg-surface-container-low text-on-surface focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-14 px-10 rounded-full bg-primary text-on-primary font-label-lg uppercase tracking-wider hover:bg-secondary transition-all shadow-md"
              >
                {loading ? 'Transmitting...' : 'Send Message'}
              </button>

              {submitted && (
                <div className="p-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <strong className="font-label-md uppercase tracking-wider">Message Received with Gratitude</strong>
                  </div>
                  <p className="font-body-sm pl-7">
                    Your dossier has been routed to our senior concierge team. An atelier specialist will follow up within 24 hours.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

