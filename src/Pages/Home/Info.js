// React
import React from "react";
// Images
import clock from "./../../assets/icons/clock.svg";
import marker from "./../../assets/icons/marker.svg";
import phone from "./../../assets/icons/phone.svg";
// Components
import InfoCard from "./InfoCard";
const Info = () => {
  const infoData = [
    {
      img: clock,
      title: "Opening Hours",
      description: "Lorem Ipsum is simply dummy text of the pri",
      bgColor: "bg-gradient-to-r from-secondary to-primary",
    },
    {
      img: marker,
      title: "Visit our location",
      description: "Brooklyn, NY 10036, United States",
      bgColor: "bg-accent",
    },
    {
      img: phone,
      title: "Contact us now",
      description: "+000 123 456789",
      bgColor: "bg-gradient-to-r from-secondary to-primary",
    },
  ];
  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-8 md:px-16 px-5   lg:mt-0 mt-20">
      {infoData.map((info, i) => (
        <InfoCard key={i} infoData={info} />
      ))}
    </section>
  );
};

export default Info;
