// React
import React from "react";
// Images
import fluoride from "./../../assets/images/fluoride.png";
import cavity from "./../../assets/images/cavity.png";
import whitening from "./../../assets/images/whitening.png";
// Components
import HomeServicesCard from "./HomeServicesCard";
const HomeServices = () => {
  const servicesInfo = [
    {
      img: fluoride,
      title: "Fluoride Treatment",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      img: cavity,
      title: "Cavity Filling",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      img: whitening,
      title: "Teeth Whitening",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
  ];

  return (
    <section className="mt-32 md:px-16 px-5">
      <div className="text-center">
        <h3 className="font-bold uppercase text-secondary">Our Services</h3>
        <h1 className="text-3xl text-accent">Services We Provide</h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-16">
        {servicesInfo.map((serviceInfo, i) => (
          <HomeServicesCard key={i} serviceInfo={serviceInfo} />
        ))}
      </div>
    </section>
  );
};

export default HomeServices;
