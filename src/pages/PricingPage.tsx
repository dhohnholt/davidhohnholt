// src/pages/PricingPage.tsx
import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import BookingForm from "@/components/BookingForm";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function PricingPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [modalEventType, setModalEventType] = useState("");
  const [modalSessionTitle, setModalSessionTitle] = useState("");

  const HERO_IMAGE =
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80";

  const openBooking = (eventType: string, sessionTitle: string) => {
    setModalEventType(eventType);
    setModalSessionTitle(sessionTitle);
    setShowBookingModal(true);
  };

  const closeBooking = () => {
    setShowBookingModal(false);
  };

  const Section = ({ title, children }: SectionProps) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="text-2xl font-bold text-amber-400">{title}</h3>
          {open ? (
            <ChevronUp className="text-white" />
          ) : (
            <ChevronDown className="text-white" />
          )}
        </button>

        {open && <div className="mt-4 text-stone-300">{children}</div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pb-20">
      {/* HERO */}
      <div
        className="w-full h-[300px] sm:h-[380px] md:h-[450px] relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            Photography Pricing
          </h1>
          <p className="text-stone-300 text-lg mt-4 max-w-2xl mx-auto drop-shadow">
            Clean, simple pricing — professional results for every milestone.
          </p>
        </div>
      </div>

      {/* BASE RATES */}
      <div className="mt-12 w-full max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg shadow-lg">
        <h2 className="text-3xl font-bold text-amber-400 text-center mb-4">
          Base Rates
        </h2>
        <p className="text-stone-300 text-center mb-6">
          Transparent hourly pricing for shooting and post-production.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-center">
          <div className="bg-black/40 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold">Shooting Time</h3>
            <p className="text-4xl font-extrabold mt-2 text-white">$125/hr</p>
            <p className="text-stone-400 mt-2 text-sm">
              Professional photography at your event or location.
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold">Editing & Processing</h3>
            <p className="text-4xl font-extrabold mt-2 text-white">$200/hr</p>
            <p className="text-stone-400 mt-2 text-sm">
              Most sessions require one hour of editing per hour of shooting.
            </p>
          </div>
        </div>
      </div>

      {/* POPULAR SESSIONS (COLLAPSIBLE CARDS – FULL TEXT + MODAL BUTTONS) */}
      <div className="mt-16 w-full max-w-5xl space-y-12">
        <h2 className="text-4xl font-bold text-center">Popular Sessions</h2>

        {/* SHOOTING ONLY – RAW DELIVERY */}
        <Section title="📸 Shooting Only — RAW + JPG Delivery">
          <p>
            Professional on-site photography using off-camera flash, softboxes,
            and location lighting. No editing or color grading — you receive
            everything exactly as captured.
            <br />
            <strong className="text-white">Typical total: $125–$375</strong>
          </p>

          <h4 className="font-semibold text-white mt-4 mb-1">
            What’s Included:
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Professional camera + lighting setup</li>
            <li>Off-camera flash, softboxes, gels, and modifiers as needed</li>
            <li>High-resolution RAW files (Sony ARW or DNG)</li>
            <li>High-resolution JPGs straight out of camera</li>
            <li>All usable images delivered (50–300+ depending on coverage)</li>
            <li>Fast delivery via Dropbox or your preferred drive</li>
          </ul>

          <h4 className="font-semibold text-white mt-4 mb-1">Turnaround:</h4>
          <p>Same day or next-day file transfer</p>

          <button
            onClick={() =>
              openBooking("shooting-only", "Shooting Only — RAW + JPG Delivery")
            }
            className="inline-block mt-6 px-6 py-3 bg-amber-500 text-black rounded-xl font-bold shadow-lg hover:bg-amber-600"
          >
            Book Shooting Only
          </button>
        </Section>
        {/* QUINCEAÑERAS */}
        <Section title="✨ Quinceañeras">
          <p>
            Full portraits, ceremony coverage, choreographed dances, reception
            storytelling, and family group photos.
            <br />
            <strong className="text-white">Typical total: $500–$1,000</strong>
          </p>

          <h4 className="font-semibold text-white mt-4 mb-1">
            What’s Included:
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Individual portraits of the celebrant</li>
            <li>Family + court portraits</li>
            <li>Ceremony documentation</li>
            <li>Video montage</li>
            <li>Grand entrance + dances + cake + toast</li>
            <li>Candids & detail shots</li>
            <li>Private gallery + full downloads</li>
          </ul>

          <h4 className="font-semibold text-white mt-4 mb-1">Turnaround:</h4>
          <p>7–14 days</p>

          <button
            onClick={() => openBooking("quince", "Quinceañera Full Session")}
            className="inline-block mt-6 px-6 py-3 bg-amber-500 text-black rounded-xl font-bold shadow-lg hover:bg-amber-600"
          >
            Book a Quince Session
          </button>
        </Section>

        {/* QUINCE $500 PACKAGE */}
        <Section title="💃 Quinceañera – $500 Package">
          <p>
            A balanced and budget-friendly package that captures portraits and
            one key part of the celebration — perfect for families who want
            beautiful images without booking full-day coverage.
          </p>

          <h4 className="font-semibold text-white mt-4 mb-1">Includes:</h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>1 Hour – Portrait Session</strong> (quinceañera-focused,
              with optional family/court)
            </li>
            <li>
              <strong>1 Hour – Event Coverage</strong> of your choice: ceremony,
              grand entrance, first dances, cake moment, or candids
            </li>
            <li>80–150 edited, full-resolution images</li>
            <li>Cinematic color grading and skin-tone editing</li>
            <li>Private online gallery with full downloads</li>
            <li>Print & personal-use rights</li>
          </ul>

          <h4 className="font-semibold text-white mt-4 mb-1">Turnaround:</h4>
          <p>7–10 days</p>

          <button
            onClick={() => openBooking("quince", "Quinceañera $500 Package")}
            className="inline-block mt-6 px-6 py-3 bg-amber-500 text-black rounded-xl font-bold shadow-lg hover:bg-amber-600"
          >
            Book This Quince Package
          </button>
        </Section>

        {/* GRADUATION */}
        <Section title="🎓 Graduation">
          <p>
            One-hour portrait session with outfit changes, props, and family
            shots.
            <br />
            <strong className="text-white">Typical total: $250</strong>
          </p>

          <h4 className="font-semibold text-white mt-4 mb-1">
            What’s Included:
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Cap & gown portraits</li>
            <li>Casual outfit portraits</li>
            <li>Family photos</li>
            <li>Detail shots: diploma, stole, ring</li>
            <li>Private online gallery</li>
            <li>All edited images</li>
          </ul>

          <h4 className="font-semibold text-white mt-4 mb-1">Turnaround:</h4>
          <p>72 hours</p>

          <button
            onClick={() =>
              openBooking("graduation", "Graduation Portrait Session")
            }
            className="inline-block mt-6 px-6 py-3 bg-amber-500 text-black rounded-xl font-bold shadow-lg hover:bg-amber-600"
          >
            Book a Graduation Session
          </button>
        </Section>

        {/* PROM */}
        <Section title="💃 Prom Photos">
          <p>
            Individual, couples, and group portraits before the big night.
            <br />
            <strong className="text-white">Typical total: $250–$500</strong>
          </p>

          <h4 className="font-semibold text-white mt-4 mb-1">
            What’s Included:
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Individual portraits</li>
            <li>Couple portraits</li>
            <li>Groups + friends</li>
            <li>Family photos optional</li>
            <li>Private gallery + downloads</li>
          </ul>

          <h4 className="font-semibold text-white mt-4 mb-1">Turnaround:</h4>
          <p>72 hours</p>

          <button
            onClick={() => openBooking("prom", "Prom Portraits")}
            className="inline-block mt-6 px-6 py-3 bg-amber-500 text-black rounded-xl font-bold shadow-lg hover:bg-amber-600"
          >
            Book Prom Photos
          </button>
        </Section>

        {/* PARTIES */}
        <Section title="🎈 Parties">
          <p>
            Storytelling, detail shots, and family portraits for birthdays &
            celebrations.
            <br />
            <strong className="text-white">Typical total: $250–$750</strong>
          </p>

          <h4 className="font-semibold text-white mt-4 mb-1">
            What’s Included:
          </h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Candid storytelling</li>
            <li>Cake cutting</li>
            <li>Family group portraits</li>
            <li>Detail & decoration photos</li>
            <li>Private gallery w/ downloads</li>
          </ul>

          <h4 className="font-semibold text-white mt-4 mb-1">Turnaround:</h4>
          <p>3–5 days</p>

          <button
            onClick={() =>
              openBooking("birthday", "Birthday or Party Coverage")
            }
            className="inline-block mt-6 px-6 py-3 bg-amber-500 text-black rounded-xl font-bold shadow-lg hover:bg-amber-600"
          >
            Book Party Coverage
          </button>
        </Section>
      </div>

      {/* ================================= */}
      {/* 📋 EXPECTATIONS & POLICIES         */}
      {/* ================================= */}
      <div className="mt-20 w-full max-w-4xl space-y-8">
        <Section title="📷 What to Expect the Day Of">
          <ul className="list-disc ml-6 space-y-2">
            <li>Professional posing guidance</li>
            <li>Family/group direction so you don’t manage it</li>
            <li>Quick lighting + location checks</li>
            <li>Unlimited photos taken</li>
            <li>Cinematic color grading</li>
          </ul>
        </Section>

        <Section title="📋 What I Need From You">
          <ul className="list-disc ml-6 space-y-2">
            <li>Location & parking info</li>
            <li>On-site contact number</li>
            <li>Must-have shot list</li>
            <li>Backup indoor spot when needed</li>
          </ul>
        </Section>

        <Section title="🕐 Turnaround Times">
          <ul className="list-disc ml-6 space-y-2">
            <li>Graduation — 72 hours</li>
            <li>Prom — 72 hours</li>
            <li>Parties — 3–5 days</li>
            <li>Quinceañeras — 7–14 days</li>
          </ul>
        </Section>

        <Section title="📦 How Many Photos You Receive">
          <ul className="list-disc ml-6 space-y-2">
            <li>Graduation: 40–80 photos</li>
            <li>Prom: 30–60 photos</li>
            <li>Parties: 75–200 photos</li>
            <li>Quinceañeras: 150–400+ photos</li>
          </ul>
        </Section>

        <Section title="💵 Payment, Deposits & Reschedules">
          <ul className="list-disc ml-6 space-y-2">
            <li>$50 deposit to secure date</li>
            <li>Balance due day-of</li>
            <li>Cash, Zelle, CashApp, Apple Pay accepted</li>
            <li>One free reschedule</li>
            <li>Weather reschedules always free</li>
          </ul>
        </Section>
      </div>

      {/* ================================= */}
      {/* NOT READY TO BOOK? — TEXT OPTION */}
      {/* ================================= */}
      <div className="mt-20 w-full max-w-3xl text-center px-6">
        <h2 className="text-3xl font-bold text-white mb-3">
          Not Ready to Book?
        </h2>
        <p className="text-stone-300 mb-6">
          Have questions, want to check availability, or need more details? Send
          me a quick text — I will get back to you.
        </p>

        <a
          href={`sms:9155264237?&body=Hi%20David!%20I%20wanted%20to%20ask%20about%20your%20photography%20availability%20for%20my%20event%20on%20___`}
          className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 text-black font-bold text-lg shadow-lg hover:scale-105 transition-transform"
        >
          📱 Text for Availability
        </a>

        <p className="text-stone-500 text-sm mt-4">
          Works on iPhone & Android — opens your texting app.
        </p>
      </div>

      {/* ================================= */}
      {/* BOTTOM SHEET BOOKING MODAL        */}
      {/* ================================= */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
          onClick={closeBooking} // tap background to close
        >
          <div
            className="w-full max-w-2xl bg-gradient-to-b from-stone-900 to-black rounded-t-3xl shadow-2xl border-t border-white/10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">
                {modalSessionTitle || "Book an Event"}
              </h2>
              <button
                onClick={closeBooking}
                className="text-stone-300 hover:text-white p-2"
                aria-label="Close booking sheet"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-2 sm:px-4 pb-4">
              <BookingForm
                defaultEventType={modalEventType}
                defaultSessionTitle={modalSessionTitle}
                onSubmitted={closeBooking}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
