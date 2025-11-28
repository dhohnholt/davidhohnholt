// src/pages/Contact.tsx
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/ui/breadcrumb";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=2000&q=80"; // Replace if desired

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact – David Hohnholt</title>
        <meta
          name="description"
          content="Reach out to collaborate on photography, video production, digital storytelling, and media projects."
        />
      </Helmet>

      {/* OUTER WRAPPER */}
      <div className="min-h-screen bg-black text-white pt-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 mb-6 opacity-70">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
            textColor="text-amber-400"
          />
        </div>

        {/* HERO SECTION */}
        <section className="py-28 bg-gradient-to-b from-black via-black/60 to-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-light tracking-tight text-amber-400 mb-8"
            >
              Let's Talk
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-stone-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              Whether you're planning a portrait session, a school event, a
              sports banner shoot, or a full media production — I’d love to hear
              what you’re dreaming up.
            </motion.p>
          </div>
        </section>

        {/* SMS CTA SECTION */}
        <section className="relative mt-20 w-full px-6 py-24">
          {/* 🎥 Background blur image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${HERO_IMAGE})`,
              filter: "blur(18px) brightness(0.35)",
            }}
          />

          {/* Soft gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />

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

            {/* 📱 TEXT BUTTON */}
            <a
              href={`sms:9155264237?&body=Hi%20David!%20I%20wanted%20to%20ask%20about%20your%20photography%20availability%20for%20my%20event%20on%20___`}
              className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 text-black font-bold text-lg shadow-lg hover:scale-105 transition-transform"
            >
              📱 Text for Availability
            </a>

            <p className="text-stone-500 text-sm py-4 mt-4">
              Works on iPhone & Android — opens your texting app.
            </p>
          </div>
        </section>

        {/* OPTIONAL: Small footer */}
        <div className="py-12 text-center text-stone-600 text-sm opacity-50">
          Or message me on Instagram or LinkedIn anytime.
        </div>
      </div>
    </>
  );
}
