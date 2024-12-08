export const generateStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Xable Therapy Services",
    "description": "Specialized therapy services for individuals with special needs in Western GTA",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Ontario",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.5890",
      "longitude": "-79.6441"
    },
    "url": "https://xable.ca",
    "telephone": "",
    "email": "info@xable.ca",
    "medicalSpecialty": [
      "Behavioral Therapy",
      "Developmental Psychology",
      "Special Needs Support"
    ],
    "availableService": [
      {
        "@type": "MedicalTherapy",
        "name": "Individual Therapy",
        "description": "Personalized sessions focused on individual growth and development"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Group Sessions",
        "description": "Safe spaces for social interaction and peer support"
      }
    ]
  };

  return JSON.stringify(structuredData);
};