"use client";

export const dynamic = "force-dynamic";

import { useState, useRef } from "react";
import QuoteCalculator from "../../components/QuoteCalculator";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    message: "",
    size: null,
    bedrooms: null,
    bathrooms: null,
    extras: {},
    price: null,
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef();

  const sizeLabel = {
    1: "Small",
    2: "Medium",
    3: "Large",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fillFormFromQuote = (quoteData) => {
    setForm((prev) => ({
      ...prev,
      size: quoteData.size,
      bedrooms: quoteData.bedrooms,
      bathrooms: quoteData.bathrooms,
      extras: quoteData.extras,
      price: quoteData.price,
    }));

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const validate = () => {
    if (!form.firstName || !form.lastName)
      return "Please enter your full name";

    if (!form.email.match(/^\S+@\S+\.\S+$/))
      return "Please enter a valid email";

    if (!form.phone) return "Phone number is required";
    if (!form.service) return "Please select a service";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    const payload = {
      ...form,
      name: `${form.firstName} ${form.lastName}`,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-50 px-6 md:px-12 lg:px-20 py-12">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Get a Free Quote
        </h1>
        <p className="text-gray-600 mt-2">
          Fast, simple and hassle-free booking
        </p>
      </div>

      {/* QUOTE CALCULATOR */}
      <div className="w-full max-w-6xl mx-auto">
        <QuoteCalculator onBook={fillFormFromQuote} />
      </div>

      {/* FORM */}
      <div ref={formRef} className="mt-16 w-full">
        {success ? (
          <p className="text-green-600 text-center text-lg font-medium">
            ✅ Thank you! We'll contact you soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-5xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg space-y-6"
          >
            {/* ERROR */}
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg border border-red-300">
                {error}
              </div>
            )}

            {/* FULL NAME */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-900">
                Full Name
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* GRID SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EMAIL */}
              <div>
                <label className="block text-lg font-semibold mb-2 text-gray-900">
                  Email Address
                </label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-lg font-semibold mb-2 text-gray-900">
                  Phone
                </label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-900">
                Address
              </label>

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-400 p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* SERVICE */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-900">
                Type of Cleaning Service
              </label>

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full border border-gray-400 p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select Service</option>
                <option>Residential Cleaning</option>
                <option>Deep Cleaning</option>
                <option>Move-In / Move-Out</option>
              </select>
            </div>

            {/* QUOTE DETAILS */}
            {form.price && (
              <div className="p-5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900">
                <p className="font-semibold mb-2 text-lg">
                  Quote Details
                </p>
                <p>Property Size: {sizeLabel[form.size]}</p>
                <p>Bedrooms: {form.bedrooms}</p>
                <p>Bathrooms: {form.bathrooms}</p>

                <p>
                  Extras:{" "}
                  {Object.keys(form.extras || {}).filter(
                    (key) => form.extras[key]
                  ).length > 0
                    ? Object.keys(form.extras)
                        .filter((key) => form.extras[key])
                        .join(", ")
                    : "None"}
                </p>

                <p className="font-bold mt-2 text-blue-700">
                  Estimated Price: £{form.price}
                </p>
              </div>
            )}

            {/* MESSAGE */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-900">
                Additional Instructions
              </label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="w-full border border-gray-400 p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg text-lg font-medium transition w-full"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}