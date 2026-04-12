"use client";

import { useState } from "react";

export default function QuoteCalculator({ onBook }) {
  const [size, setSize] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [extras, setExtras] = useState({
    oven: false,
    fridge: false,
    windows: false,
  });

  const basePrices = {
    1: 50,
    2: 70,
    3: 90,
  };

  const extraPrices = {
    oven: 15,
    fridge: 10,
    windows: 20,
  };

  const calculatePrice = () => {
    let price = basePrices[size];
    price += bedrooms * 10;
    price += bathrooms * 8;

    Object.keys(extras).forEach((key) => {
      if (extras[key]) price += extraPrices[key];
    });

    return price;
  };

  const toggleExtra = (key) => {
    setExtras((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const Stepper = ({ value, setValue }) => (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => value > 1 && setValue(value - 1)}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
      >
        −
      </button>
      <div className="px-6 py-2 text-lg font-semibold">{value}</div>
      <button
        type="button"
        onClick={() => setValue(value + 1)}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
      >
        +
      </button>
    </div>
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Instant Quote
      </h2>

      {/* PROPERTY SIZE */}
      <div className="mb-10">
        <p className="text-lg font-semibold mb-4 text-gray-900">
          Property Size
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Small", value: 1 },
            { label: "Medium", value: 2 },
            { label: "Large", value: 3 },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setSize(item.value)}
              className={`p-5 rounded-xl border text-left transition ${
                size === item.value
                  ? "border-blue-600 bg-blue-50 shadow-md"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <p className="font-semibold text-gray-900">
                {item.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ROOMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <p className="font-semibold mb-3 text-gray-900">
            Bedrooms
          </p>
          <Stepper value={bedrooms} setValue={setBedrooms} />
        </div>

        <div>
          <p className="font-semibold mb-3 text-gray-900">
            Bathrooms
          </p>
          <Stepper value={bathrooms} setValue={setBathrooms} />
        </div>
      </div>

      {/* EXTRAS */}
      <div className="mb-10">
        <p className="text-lg font-semibold mb-4 text-gray-900">
          Extras
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(extras).map((key) => (
            <div
              key={key}
              onClick={() => toggleExtra(key)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                extras[key]
                  ? "border-blue-600 bg-blue-50 shadow"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <p className="text-gray-900 capitalize font-medium">
                {key}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          onBook({
            size,
            bedrooms,
            bathrooms,
            extras,
            //price: calculatePrice(), // still calculated here
          })
        }
        className="w-full bg-green-900 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-medium transition"
      >
        Continue Booking →
      </button>
    </div>
  );
}