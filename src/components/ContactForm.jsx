import React, { useState } from 'react';
import { Send, MessageCircle, PhoneCall, CheckCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Precious Gemstone Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format full WhatsApp inquiry
    const whatsappMessage = `*New Customer Enquiry from Website*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'Not provided'}\n` +
      `*Interest:* ${formData.interest}\n` +
      `*Message:* ${formData.message || 'No additional details'}\n\n` +
      `_Sent from Pilly Venkateshuloo Gems & Jewellers Website_`;

    const encodedMsg = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsAppNumber}?text=${encodedMsg}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 shadow-lg text-[#1C1B1A]">
      <div className="mb-6">
        <h3 className="font-serif-luxury text-2xl font-bold text-[#3B101C]">
          Send Us an Enquiry
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mt-1">
          Have a question about our gemstone collections or custom 916 gold jewellery? Fill in your details below.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h4 className="font-serif-luxury text-xl font-bold text-[#3B101C]">Enquiry Sent to WhatsApp</h4>
          <p className="text-xs text-gray-700">
            Thank you, {formData.name}. We have forwarded your request directly to our store team. 
            You can also call us directly at <a href={STORE_DETAILS.phones[0].link} className="font-bold text-[#3B101C] underline">{STORE_DETAILS.phones[0].number}</a>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs font-semibold text-[#3B101C] hover:underline"
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Pilly"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Phone / Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. user@example.com"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                What are you interested in?
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
              >
                <option value="Precious Gemstone Consultation">Precious Gemstone Consultation</option>
                <option value="916 BIS Gold Jewellery Customisation">916 BIS Gold Jewellery Customisation</option>
                <option value="92.5 Sterling Silver Collection">92.5 Sterling Silver Collection</option>
                <option value="Beads, Pearls & Corals">Beads, Pearls & Corals</option>
                <option value="Gold or Silver Exchange">Gold or Silver Exchange</option>
                <option value="Store Visit & Appointment">Store Visit & Appointment</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Your Message or Specific Requirements
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe what you are looking for..."
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C] resize-none"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4 text-[#DFBA6A]" /> Enquire via WhatsApp
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
