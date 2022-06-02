import React from "react";

const InfoCard = ({ infoData }) => {
  const { img, title, description, bgColor } = infoData;

  return (
    <div
      className={`card lg:card-side bg-base-100 shadow-xl lg:px-8 lg:py-0 py-8 ${bgColor}`}
    >
      <figure>
        <img src={img} alt="title" />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
