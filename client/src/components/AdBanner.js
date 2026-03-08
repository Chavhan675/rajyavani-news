"use client";

export default function AdBanner({ image, link }) {

  return (

    <div className="ad-banner">

      <a href={link} target="_blank">

        <img
          src={image}
          alt="Advertisement"
        />

      </a>

    </div>

  );

}