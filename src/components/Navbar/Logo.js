import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      width="0"
      height="0"
      className="w-[500px] h-auto z-50"
      alt="logo"
      src="/logo/hermitage_logo.svg"
    />
  );
};
