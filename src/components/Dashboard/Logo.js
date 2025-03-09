import Image from "next/image";

const Logo = () => {
  return (
    <Image
      width={150}
      height={0}
      alt="logo"
      src="/logo/logo.png"
      style={{ width: "150px", height: "auto" }}
    />
  );
};

export default Logo;
