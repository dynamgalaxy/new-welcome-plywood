"use client";

import { useState } from "react";

const groups = [
  {
    name: "General",
    questions: [
      { question: "What can I find at New Welcome Plywood?", answer: "Explore the catalogue for plywood, panels, hardware and kitchen items. Each product page shows the information currently available for that item." },
      { question: "How can I ask about a product?", answer: "Open a product page or add items to your order list, then send your enquiry to our team on WhatsApp." },
    ],
  },
  {
    name: "Products",
    questions: [
      { question: "Where can I see product details?", answer: "Select any product in the catalogue to view its page. If a detail you need is missing, include the product in your WhatsApp enquiry and ask our team." },
      { question: "Can I enquire about more than one product?", answer: "Yes. Add products to your order list, adjust their quantities, and send the full selection together on WhatsApp." },
    ],
  },
  {
    name: "Pricing",
    questions: [
      { question: "Why do some products show ‘Price on enquiry’?", answer: "A price has not been provided for those catalogue items. Our team can confirm current pricing when you send your enquiry." },
      { question: "How do I confirm availability?", answer: "Send the product names and quantities through the order list. Our team will confirm availability with you directly." },
    ],
  },
  {
    name: "Ordering",
    questions: [
      { question: "How does the WhatsApp order list work?", answer: "Add the products you want, set a quantity for each, then choose Continue on WhatsApp. Your message will include your selected items and product links." },
      { question: "Can I change quantities before sending?", answer: "Yes. Open your order list and use the quantity controls before continuing to WhatsApp." },
    ],
  },
];

export default function FAQSection() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const selectGroup = (index) => { setGroupIndex(index); setOpenIndex(0); };

  return <section className="faq-section section-wrap" id="faq" aria-labelledby="faq-title">
    <div className="faq-heading"><div><span className="eyebrow">GOOD TO KNOW</span><h2 id="faq-title">Frequently Asked Questions</h2><p>Find the details you need before sending your enquiry.</p></div><span className="faq-mark" aria-hidden="true">?</span></div>
    <div className="faq-layout">
      <div className="faq-tabs" role="group" aria-label="FAQ topics">{groups.map((group, index) => <button key={group.name} type="button" aria-pressed={groupIndex === index} className={groupIndex === index ? "is-active" : ""} onClick={() => selectGroup(index)}>{group.name}<span aria-hidden="true">↗</span></button>)}</div>
      <div className="faq-questions" key={groupIndex}>
        {groups[groupIndex].questions.map((item, index) => <div className={`faq-item ${openIndex === index ? "is-open" : ""}`} key={item.question}>
          <h3><button type="button" aria-expanded={openIndex === index} aria-controls={`faq-answer-${groupIndex}-${index}`} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>{item.question}<span aria-hidden="true">+</span></button></h3>
          <div className="faq-answer" id={`faq-answer-${groupIndex}-${index}`} aria-hidden={openIndex !== index}><div><p>{item.answer}</p></div></div>
        </div>)}
      </div>
    </div>
  </section>;
}
