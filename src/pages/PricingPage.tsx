// src/pages/PricingPage.tsx
import React from "react";

type PackageProps = {
  title: string;
  price: string;
  subtitle?: string;
  features: string[];
  image: string;
};

function PackageCard({
  title,
  price,
  subtitle,
  features,
  image,
}: PackageProps) {
  return (
    <div className="bg-stone-100 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row my-10">
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-serif font-bold mb-2">{title}</h2>
        <div className="w-10 h-[2px] bg-stone-400 mb-4"></div>
        <p className="text-xl tracking-widest mb-4">${price}</p>
        {subtitle && <p className="text-stone-700 mb-6 text-sm">{subtitle}</p>}
        <ul className="space-y-2 text-stone-700 text-sm leading-relaxed">
          {features.map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
      </div>

      <div className="flex-1">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-stone-900 px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold font-serif text-center mb-16">
        Photography Packages
      </h1>

      {/* Mini Session */}
      <PackageCard
        title="Mini Session"
        price="225"
        subtitle="Family | Maternity | Couples"
        features={[
          "20-minute session",
          "5 edited digital images",
          "Immediate family only",
          "Weekdays only (Mon–Fri)",
          "Print release",
          "*Option to purchase additional images",
        ]}
        image="https://lightroom.adobe.com/v2c/spaces/e9bf36b81dca44d5bfca925a79ed68ef/assets/354a1ecd9bc4428cae668f40d8bf1b92/revisions/ca0ab17fa1c51dda0cdab6b943fc2d1a/renditions/c7e93cde04936dbcedef33eda9ca1840"
      />

      {/* Full Session */}
      <PackageCard
        title="Full Session"
        price="400"
        subtitle="Family | Maternity | Couples"
        features={[
          "1 hour session",
          "15 edited digital images",
          "Immediate family only",
          "Online gallery delivery",
          "Print release",
          "*Option to purchase additional images",
        ]}
        image="https://lightroom.adobe.com/v2c/spaces/9fcee568d6544f4ea84d621c57d2474b/assets/35d3581f81864ce88876400688488bfd/revisions/19b056cec748abf752b342d4b7330536/renditions/52de1a94ed55e2dc72659c1bdafb8ee5"
      />

      {/* Sports Team */}
      <PackageCard
        title="Sports Team Portraits"
        price="30 per player"
        subtitle="Posters | Individual Portraits | Team Photo"
        features={[
          "1 custom sports poster per player",
          "5 edited digital images per player",
          "Team photo included",
          "Online gallery delivery",
          "Print release",
          "*Minimum 8 players recommended",
        ]}
        image="https://lightroom.adobe.com/v2c/spaces/bfca3f6ad4404448a766beee986ebd6f/assets/0d339a39a06a4abdad40946059c8354c/revisions/cd6943f4219549df914838ce03d31c62/renditions/36918bb81ecd91e1399194341651004b"
      />

      {/* Graduation */}
      <PackageCard
        title="Senior & Graduation Portraits"
        price="400"
        subtitle="Senior & Graduation Portraits"
        features={[
          "1 hour session",
          "multiple outfits",
          "15 edited digital images",
          "Online gallery delivery",
          "Print release",
          "*Option to purchase additional images and prints at time of gallery delivery",
        ]}
        image="https://lightroom.adobe.com/v2c/spaces/9fcee568d6544f4ea84d621c57d2474b/assets/c0c4578756af41e8963e7fcd7d6aa04c/revisions/9a9e051a3763451a86c612d37bbcd722/renditions/cd3a722a1a9ed298a1c657acf80283c1"
      />

      {/* Branding */}
      <PackageCard
        title="Branding & Headshots"
        price="300"
        subtitle="Business | Social Media | Commercial"
        features={[
          "45-minute session",
          "12 edited digital images",
          "2–3 outfit changes",
          "Online gallery delivery",
          "Commercial-use license",
          "*Additional graphics available upon request",
        ]}
        image="https://YOUR-IMAGE-URL"
      />
    </div>
  );
}
