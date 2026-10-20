"use client";

import { useState } from "react";

const groups = [
  {
    name: "General",
    questions: [
      { question: "What can I find at New Welcome Plywood?", answer: "Plywood, panels, hardware and kitchen items. Open a product for available details." },
      { question: "How can I ask about a product?", answer: "Add it to your order list and enquire on WhatsApp." },
    ],
  },
  {
    name: "Products",
    questions: [
      { question: "How do I find a design or product code?", answer: "Search the catalogue by name or code, then open the product page." },
      { question: "Can I enquire about more than one product?", answer: "Yes. Add items, set quantities, and send one WhatsApp enquiry." },
    ],
  },
  {
    name: "Pricing",
    questions: [
      { question: "Why do some products show ‘Price on enquiry’?", answer: "A price is not listed. Ask us for current pricing." },
      { question: "How do I check sizes, finishes or availability?", answer: "Open the product page for listed details. Enquire about anything not shown." },
    ],
  },
  {
    name: "Ordering",
    questions: [
      { question: "How does the WhatsApp order list work?", answer: "Add items, set quantities, then choose Continue on WhatsApp. Your message includes product names and links." },
      { question: "Can I change quantities before sending?", answer: "Yes. Use the quantity controls in your order list." },
    ],
  },
];

export default function FAQSection() {
  const [groupIndex, setGroupIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const selectGroup = (index) => { setGroupIndex(index); setOpenIndex(0); };

  return <section className="faq-section section-wrap" id="faq" aria-labelledby="faq-title">
    <div className="faq-heading"><div><span className="eyebrow">GOOD TO KNOW</span><h2 id="faq-title">Frequently Asked Questions</h2></div></div>
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
