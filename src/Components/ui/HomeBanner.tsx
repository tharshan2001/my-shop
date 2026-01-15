import React from "react";

const HomeBanner = () => {
  return (
    <div className="flex flex-col items-start p-5 pt-1">
      {/* Heading uses Geist (font-sans) */}
      <h1 className="text-3xl">
        Explore
      </h1>

      {/* Subtitle uses Imprima (body font) */}
      <p className="text-gray-400 text-l mt-1 font-body">
        Best trendy collection!
      </p>
    </div>
  );
};

export default HomeBanner;
