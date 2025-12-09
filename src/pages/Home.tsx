// src/pages/Home.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePortfolio } from "@/hooks/usePortfolio";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { items } = usePortfolio();
  const previewItems = items.slice(0, 3);

  return (
    <div className="bg-black text-white">
      {/* -------------------------------------------------- */}
      {/* HERO SECTION — cinematic overlay + parallax        */}
      {/* -------------------------------------------------- */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://lightroom.adobe.com/v2c/spaces/6e291e8f988a4aeb8d11ecc918577626/assets/81eaa4307d1a4d818bc09e54573b409f/revisions/737460fa0d8c46e79a3a969403ea40fb/renditions/c473c6475fb8d0c0efb03279caaaff92')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-white max-w-3xl px-6"
        >
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4 drop-shadow-lg">
            Moments Built to Last
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-8">
            Portraits, sports, and events — photographed with intention, crafted
            with care.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/booking#booking-form"
              className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
            >
              Book a Session
            </Link>
            <Link
              to="/portfolio"
              className="px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-md font-medium hover:bg-white/20 transition"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Soft fade transition */}
      <div className="h-20 bg-gradient-to-b from-black to-[#0c0c0c]" />

      {/* ================================================== */}
      {/* BASE RATES — cinematic, matching PricingPage        */}
      {/* ================================================== */}
      <section className="w-full max-w-5xl mx-auto px-6 mt-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-xl backdrop-blur-lg">
          <h2 className="text-4xl font-extrabold text-amber-400 text-center">
            Base Rates
          </h2>

          <p className="text-stone-300 text-center mt-3 mb-10">
            Transparent hourly pricing for shooting and post-production.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Shooting */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center flex flex-col">
              <h3 className="text-xl font-semibold text-white">
                Shooting Time
              </h3>
              <p className="text-5xl font-extrabold text-white mt-3">$125/hr</p>
              <p className="text-stone-400 mt-3 text-sm leading-relaxed flex-grow">
                Professional photography at your event or location.
              </p>
              <Link
                to="/booking#booking-form"
                className="mt-6 inline-block bg-amber-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Book Now
              </Link>
            </div>

            {/* Editing */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-8 text-center flex flex-col">
              <h3 className="text-xl font-semibold text-white">
                Editing & Processing
              </h3>
              <p className="text-5xl font-extrabold text-white mt-3">$200/hr</p>
              <p className="text-stone-400 mt-3 text-sm leading-relaxed flex-grow">
                Most sessions require one hour of editing per hour of shooting.
              </p>
              <Link
                to="/booking#booking-form"
                className="mt-6 inline-block bg-amber-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Soft fade */}
      <div className="h-32 bg-gradient-to-b from-[#0c0c0c] to-black/95" />

      {/* ================================================== */}
      {/* WHAT I OFFER — synced to Pricing Page offerings     */}
      {/* ================================================== */}
      {/* Full-width background band */}
      <div className="relative w-full py-24 overflow-hidden">
        {/* 🔮 Full-width blurred background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-30"
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/9FL77KrM/karina-pics-129.png')",
          }}
        />

        {/* Dark wash for contrast */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Actual section content */}
        <section className="relative z-10 w-full max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-amber-400 mb-12">
            What I Offer
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Shooting Only – Book Now */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition flex flex-col">
              <h3 className="text-2xl font-semibold text-amber-400 mb-2">
                Shooting Only — RAW + JPG
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed flex-grow">
                Clean lighting, crisp compositions, and fast file transfer for
                clients who want their own editing workflow.
              </p>
              <Link
                to="/booking#booking-form"
                className="mt-6 inline-block bg-amber-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Book Now
              </Link>
            </div>

            {/* Quinceañeras */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition flex flex-col">
              <h3 className="text-2xl font-semibold text-amber-400 mb-2">
                Quinceañeras
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed flex-grow">
                Complete storytelling: portraits, ceremony, dances, reception,
                details, and candid moments.
              </p>
              <Link
                to="/booking#booking-form"
                className="mt-6 inline-block bg-amber-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Book Now
              </Link>
            </div>

            {/* Graduation */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition flex flex-col">
              <h3 className="text-2xl font-semibold text-amber-400 mb-2">
                Graduation Sessions
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed flex-grow">
                One-hour sessions with cap & gown, props, multiple outfits, and
                fast delivery.
              </p>
              <Link
                to="/booking#booking-form"
                className="mt-6 inline-block bg-amber-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Book Now
              </Link>
            </div>

            {/* Prom */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition flex flex-col">
              <h3 className="text-2xl font-semibold text-amber-400 mb-2">
                Prom Portraits
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed flex-grow">
                Couples, groups, individuals, beautifully lit before the big
                night.
              </p>
              <Link
                to="/booking#booking-form"
                className="mt-6 inline-block bg-amber-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Book Now
              </Link>
            </div>

            {/* Parties */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition flex flex-col">
              <h3 className="text-2xl font-semibold text-amber-400 mb-2">
                Parties & Events
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed flex-grow">
                Birthdays, milestones, celebrations — candid storytelling +
                beautiful details.
              </p>
              <Link
                to="/booking#booking-form"
                className="mt-6 inline-block bg-amber-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Book Now
              </Link>
            </div>

            {/* Sports */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition flex flex-col">
              <h3 className="text-2xl font-semibold text-amber-400 mb-2">
                Team & Individual Sports
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed flex-grow">
                Banners, dramatic portraits, and fast workflow for leagues and
                schools.
              </p>

              <Link
                to="/booking#booking-form"
                className="mt-6 inline-block bg-amber-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-amber-600 transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Soft transition */}
      <div className="py-24 bg-[#0f0f0f] mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-center mb-12"
          >
            Recent Work
          </motion.h2>

          {previewItems.length === 0 ? (
            <p className="text-center text-gray-400">No portfolio items yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {previewItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl shadow-md"
                >
                  <div
                    className="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${item.featured_images?.[0] || "/placeholder.jpg"})`,
                    }}
                  />
                  <div className="p-4 bg-black/60 backdrop-blur-md">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-400">
                      {item.category || "Photography"}
                    </p>
                  </div>

                  <Link
                    to={`/portfolio/${item.id}`}
                    className="absolute inset-0"
                  />
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Link
              to="/portfolio"
              className="flex items-center gap-2 text-lg font-medium text-amber-400 hover:underline"
            >
              View Full Portfolio <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* FINAL CALL TO ACTION                               */}
      {/* -------------------------------------------------- */}
      <div className="py-24 bg-black text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-6"
        >
          Let’s Create Something Unforgettable
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mt-8"
        >
          <Link
            to="/booking#booking-form"
            className="px-6 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
          >
            Book a Session
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-md font-medium hover:bg-white/20 transition"
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
