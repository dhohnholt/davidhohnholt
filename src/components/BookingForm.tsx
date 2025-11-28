import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Send,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function EventBookingForm({
  defaultEventType = "",
  onSubmitted = () => {},
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    eventType: defaultEventType,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventDate: "",
    eventTime: "",
    location: "",
    baseRate: 125,
    hoursBooked: 1,
    notes: "",
  });

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Auto-generate session title (not shown to client)
      const sessionTitle = `${formData.eventType} — ${formData.eventDate}`;

      const { error } = await supabase.from("bookings").insert({
        event_type: formData.eventType,
        session_title: sessionTitle,
        client_name: formData.clientName,
        client_email: formData.clientEmail,
        client_phone: formData.clientPhone,
        event_date: formData.eventDate,
        event_time: formData.eventTime,
        location: formData.location,
        base_rate: Number(formData.baseRate),
        hours_booked: Number(formData.hoursBooked),
        notes: formData.notes,
        payment_status: "pending",
        slug: null,
        preview_gallery_url: null,
        download_gallery_url: null,
      });

      if (error) throw error;

      setSubmitted(true);
      onSubmitted();
    } catch (err) {
      console.error(err);
      alert("Error submitting booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // SUCCESS STATE
  // ----------------------------------------------------
  if (submitted) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-amber-400 mb-4">
          Booking Received!
        </h2>

        <p className="text-stone-300 max-w-md mx-auto">
          Thank you! Your booking has been received. I’ll contact you soon to
          confirm the details.
        </p>

        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 bg-amber-600 text-black px-6 py-3 rounded-xl font-semibold hover:bg-amber-500 transition shadow-xl"
        >
          Book Another Event
        </button>
      </div>
    );
  }

  // ----------------------------------------------------
  // FORM UI
  // ----------------------------------------------------
  return (
    <div className="px-4 py-12">
      <div className="max-w-3xl mx-auto bg-black/50 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-2xl">
        {/* FORM TITLE */}
        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow mb-2">
          Book an Event
        </h2>
        <p className="text-center text-stone-400 mb-10 tracking-wide">
          Quince • Graduation • Prom • Family • Birthday • Corporate
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EVENT TYPE */}
          <div>
            <label className="block mb-2 font-medium text-stone-300">
              Event Type *
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
            >
              <option value="">Select Event</option>
              <option value="quince">Quinceañera</option>
              <option value="graduation">Graduation</option>
              <option value="prom">Prom</option>
              <option value="birthday">Birthday</option>
              <option value="family">Family Session</option>
              <option value="corporate">Corporate Event</option>
              <option value="shooting-only">
                Shooting Only (RAW Delivery)
              </option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* CLIENT CONTACT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium text-stone-300">
                Client Name *
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium text-stone-300">
                Phone *
              </label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label className="block mb-2 font-medium text-stone-300">
                Email *
              </label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
              />
            </div>
          </div>

          {/* DATE & TIME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-stone-300">
                <Calendar className="inline w-4 h-4 mr-1" />
                Event Date *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-stone-300">
                <Clock className="inline w-4 h-4 mr-1" />
                Event Time *
              </label>
              <input
                type="time"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleChange}
                required
                className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
              />
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block mb-2 font-medium text-stone-300">
              <MapPin className="inline w-4 h-4 mr-1" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Park, venue, school, home, etc."
              className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
            />
          </div>

          {/* RATE + HOURS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-stone-300">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Hourly Rate
              </label>
              <select
                name="baseRate"
                value={formData.baseRate}
                onChange={handleChange}
                className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
              >
                <option value={125}>Shooting Only — $125/hr</option>
                <option value={200}>Shooting + Editing — $200/hr</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium text-stone-300">
                Hours Booked
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                name="hoursBooked"
                value={formData.hoursBooked}
                onChange={handleChange}
                className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
              />
            </div>
          </div>

          {/* NOTES */}
          <div>
            <label className="block mb-2 font-medium text-stone-300">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Any special details we should know?"
              className="w-full bg-black/40 text-white px-4 py-3 rounded-xl border border-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40 outline-none"
            />
          </div>

          {/* TOTAL */}
          <div className="text-center text-lg font-semibold text-amber-400 mt-4 tracking-wide">
            Estimated Total: $
            {(Number(formData.baseRate) * Number(formData.hoursBooked)).toFixed(
              2
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" /> Submit Booking Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
