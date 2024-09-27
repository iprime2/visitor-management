import Image from "next/image";

const Error401 = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src="/401.svg" alt="401" width={500} height={500} />
    </div>
  );
};

export default Error401;
