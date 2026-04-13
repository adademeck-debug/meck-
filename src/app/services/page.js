"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBroom, FaHome, FaBuilding } from "react-icons/fa";
import Link from "next/link";

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
  };

  const faqs = [
    {
      question: "Do you provide cleaning services across all areas?",
      answer:
        "We provide residential and commercial cleaning including office cleaning, deep cleaning, and facility management tailored to your needs.",
    },
    {
      question: "Are your cleaning products eco-friendly?",
      answer:
        "Yes, we use eco-friendly, safe, and effective cleaning solutions.",
    },
    {
      question: "Are your cleaners trained and insured?",
      answer:
        "All our staff are fully trained, vetted, and insured.",
    },
    {
      question: "How do you price your services?",
      answer:
        "Pricing depends on your needs. Contact us for a custom quote.",
    },
  ];

  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="py-24 text-center px-6 bg-green-700 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Premium Cleaning Services
        </h1>

        <p className="max-w-2xl mx-auto text-lg">
          Green Line Facilities Limited provides professional cleaning and facilities management services across the UK.

We work with residential clients, commercial businesses, property managers, and landlords to deliver reliable and high-quality cleaning solutions.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/contact">
            <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
              Get a Quote
            </button>
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-8 max-w-6xl mx-auto">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-3 gap-10"
        >

          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-xl shadow-xl text-center border"
          >
            <FaBuilding className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">
              commercial Cleaning
            </h3>
            <p className="text-gray-600 mt-2">
              •	Office cleaning
              </p>
              <p className="text-gray-600 mt-2">
	            •	Commercial building cleaning
              </p>
              <p className="text-gray-600 mt-2">
	            •	Workspace sanitation
              </p>
              <p className="text-gray-600 mt-2">
	            •	Shared area cleaning
            </p>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-xl shadow-xl text-center border"
          >
            <FaHome className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">
              Residential Cleaning
            </h3>
            <p className="text-gray-600 mt-2">
              </p>
              •	Regular home cleaning
              <p className="text-gray-600 mt-2">
	            •	Deep cleaning
              </p>
              <p className="text-gray-600 mt-2">
	            •	End of tenancy cleaning
              </p>
              <p className="text-gray-600 mt-2">
	            •	Airbnb & short-let cleaning
            </p>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-xl shadow-xl text-center border"
          >
            <FaBroom className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">
              Facilities Management
            </h3>
            <p className="text-gray-600 mt-2">
              Our facilities support services help maintain clean, organised, and well-managed environments for businesses and residential properties.
            </p>
          </motion.div>

        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg bg-white shadow-md"
            >

              <button
                onClick={() => toggle(index)}
                className="w-full text-left p-5 flex justify-between items-center font-semibold text-gray-900"
              >
                {faq.question}
                <span className="text-xl text-green-600">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-700">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-green-700 text-white">

        <h2 className="text-4xl font-bold mb-4">
          Get in Touch
        </h2>

        <p className="mb-6">
          If you would like to discuss your cleaning or facilities management requirements, please contact us.
          </p>
         <p className="mb-6">
Green Line Facilities Limited Cleaning & Facilities Management
</p>
<p className="mb-6">
Email: info@greenlinefaciliities.co.uk
</p>
<p className="mb-6">
Phone: +44 7344 294706
        </p>

        <Link href="/contact">
          <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition">
            Request a Quote
          </button>
        </Link>

      </section>

    </div>
  );
}