
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const images = ["/herobg.jpg", "/hero2.jpg", "/hero3.jpg", "/hero4.jpg", "/hero5.jpg"];
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main>

      {/* HERO SLIDESHOW */}
      <section className="relative h-[80vh] overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0">
  {images.map((img, i) => (
    <div
      key={i}
      className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
        i === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
      }`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ))}
</div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-6">
          <div>
            <h1 className="text-5xl font-bold">
              Professional Cleaning & Facilities Management
            </h1>

            <p className="mt-6 text-lg max-w-xl mx-auto">
              Trusted residential and commercial cleaning services for homes,
              offices, and facilities.
            </p>

            <Link href="/contact">
              <button className="mt-6 bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700">
                Request a Quote
              </button>
            </Link>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
        >
          →
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 w-full flex justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === index ? "bg-green-500" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>


      {/* SERVICES */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-8"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="shadow-lg p-8 rounded-xl text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Office Cleaning</h3>
            <p className="text-gray-600">
              Daily or scheduled cleaning services for offices, businesses,
              and commercial workspaces.
            </p>
          </div>

          <div className="shadow-lg p-8 rounded-xl text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Residential Cleaning</h3>
            <p className="text-gray-600">
              Professional home cleaning designed to keep your living space
              spotless and comfortable.
            </p>
          </div>

          <div className="shadow-lg p-8 rounded-xl text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-3">Facility Management</h3>
            <p className="text-gray-600">
              Comprehensive facility maintenance solutions for buildings and
              property managers.
            </p>
          </div>

        </div>

      </motion.section>

      {/* OUR WORK */}
     <motion.section
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="py-20 px-8 bg-gradient-to-b from-slate-900 to-black"
>
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Work
        </h2>

        <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000 }}
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="max-w-6xl mx-auto"
>
  <SwiperSlide>
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3">
      <img src="/clean1.jpg" className="rounded-lg" />
     
    </div>
  </SwiperSlide>

  <SwiperSlide>
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3">
      <img src="/clean2.jpg" className="rounded-lg" />
      
    </div>
  </SwiperSlide>

  <SwiperSlide>
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3">
      <img src="/clean3.jpg" className="rounded-lg" />
      
    </div>
  </SwiperSlide>
</Swiper>

      </motion.section>


      {/* WHY CHOOSE US */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-8"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose GreenLine
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h3 className="font-semibold text-lg">Experienced Professionals</h3>
            <p className="text-gray-600 mt-2">
              Our trained team delivers consistent high-quality cleaning
              services.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Eco Friendly Products</h3>
            <p className="text-gray-600 mt-2">
              We use safe, environmentally responsible cleaning products.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Reliable Service</h3>
            <p className="text-gray-600 mt-2">
              On-time service and dependable cleaning schedules you can trust.
            </p>
          </div>

        </div>

      </motion.section>


      {/* TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-8"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          <div className="p-6 shadow rounded-lg">
            <p className="text-gray-600">
              "Green Line transformed our office environment. The team is
              reliable and very professional."
            </p>
            <p className="mt-4 font-semibold">– Office Manager</p>
          </div>

          <div className="p-6 shadow rounded-lg">
            <p className="text-gray-600">
              "Excellent residential cleaning service. Our home has never
              looked better."
            </p>
            <p className="mt-4 font-semibold">– Homeowner</p>
          </div>

        </div>

      </motion.section>

      {/* CALL TO ACTION */}
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
Email: greenlinefacilities@gmail.com
</p>
<p className="mb-6">
Phone: +44 7344 294706
        </p>

        <Link href="/contact">
          <button className="mt-6 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold">
            Get Free Quote
          </button>
        </Link>
      </section>

      

    </main>
  );
}