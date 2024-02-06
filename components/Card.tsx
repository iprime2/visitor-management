import React, { FC } from "react";

type CardPropType = {
  title: string;
  description: number;
};
const Card: FC<CardPropType> = ({ title, description }) => {
  return (
    <div className="flex flex-col w-[220px] h-[90px] py-2 px-4 gap-4 border-2 shadow-lg rounded-md">
      <p className="font-normal">{title}</p>
      <p className="flex items-end justify-end text-green-800">{description}</p>
    </div>
  );
};

export default Card;
