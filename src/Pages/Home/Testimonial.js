// React
import React from "react";
// Images
import quot from "./../../assets/icons/quote.svg";
import people1 from "./../../assets/images/people1.png";
import people2 from "./../../assets/images/people2.png";
import people3 from "./../../assets/images/people3.png";
// Components
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const testInfos = [
    {
      name: "Winson Harry",
      img: people1,
      address: "California",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
    {
      name: "Winson Harry",
      img: people2,
      address: "California",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
    {
      name: "Winson Harry",
      img: people3,
      address: "California",
      description:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
  ];
  return (
    <section className="md:px-16 px-5 mt-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-secondary">Testimonial</h3>
          <h1 className="text-3xl text-accent">What Our Patients Says</h1>
        </div>
        <div>
          <img className="md:w-36 w-32" src={quot} alt="quot" />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-8 mt-6">
        {testInfos.map((info, i) => (
          <TestimonialCard key={i} info={info} />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
