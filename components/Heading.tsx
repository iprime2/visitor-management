import { FC } from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
