// src/pages/BookingPage.tsx
import { Helmet } from "react-helmet-async";
import BookingForm from "@/components/BookingForm"; // ✅ FIXED IMPORT
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function BookingPage() {
  const HERO_IMAGE =
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80";

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <Helmet>
        <title>Book a Session – David Hohnholt</title>
        <meta
          name="description"
          content="Book your photography session with David Hohnholt — Quinceañeras, graduation, prom, parties, sports portraits, and more."
        />
      </Helmet>

      {/* -------------------------------------------------- */}
      {/* HERO                                                */}
      {/* -------------------------------------------------- */}
      <div
        className="relative h-[300px] sm:h-[380px] md:h-[450px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>

        <div className="relative z-10 text-center px-4 drop-shadow">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-wide"
          >
            Book a Session
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-stone-300 text-lg mt-4 max-w-2xl mx-auto"
          >
            Quinceañeras • Graduation • Prom • Portraits • Events • Sports T&I
          </motion.p>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* BOOKING INTRO                                       */}
      {/* -------------------------------------------------- */}
      <div className="max-w-4xl mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-amber-400">
            Simple. Clear. Stress-Free.
          </h2>
          <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Booking a photography session shouldn’t feel complicated. Whether
            you're celebrating a milestone, capturing a special event, or
            planning something unforgettable — this form gets everything
            started.
          </p>
        </motion.div>
      </div>

      {/* -------------------------------------------------- */}
      {/* ALT CONTACT OPTION + BOOKING BACKGROUND            */}
      {/* -------------------------------------------------- */}
      <div className="relative mt-20 w-full px-6 py-24">
        {/* 🔥 BACKGROUND — blurred + darkened hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            filter: "blur(18px) brightness(0.35)",
          }}
        ></div>

        {/* Soft gradient edges for a cinematic fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90"></div>

        {/* CONTENT OVERLAY */}
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Prefer to Text Instead?
          </h2>

          <p className="text-stone-300 mb-6 max-w-lg mx-auto">
            Have questions, want to check availability, or not sure which
            session fits your event? Send a quick text and I’ll reply
            personally.
          </p>

          {/* TEXT BUTTON */}
          <a
            href={`sms:9155264237?&body=Hi%20David!%20I%20wanted%20to%20ask%20about%20your%20photography%20availability%20for%20my%20event%20on%20___`}
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 text-black font-bold text-lg shadow-lg hover:scale-105 transition-transform"
          >
            📱 Text for Availability
          </a>

          <p className="text-stone-500 text-sm py-4 mt-4">
            Works on iPhone & Android — opens your texting app.
          </p>

          {/* -------------------------------------------------- */}
          {/* BOOKING FORM — now living inside the hero blur      */}
          {/* -------------------------------------------------- */}
          <div className="mt-12 max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="
          bg-black/50 
          backdrop-blur-xl 
          border border-white/10 
          rounded-3xl 
          shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)]
          p-8"
            >
              <BookingForm />
            </motion.div>
          </div>

          {/* FOOTER LINK */}
          <div className="mt-12">
            <Link
              to="/pricing"
              className="text-amber-400 font-semibold hover:underline"
            >
              View Pricing & Packages →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
