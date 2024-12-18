import Link from "next/link";
import { LogoMain } from "../shared/Icons";

const Logo = ({className}) => {
  return (
    <>
      <Link href="/">
        <LogoMain className={className} />
      </Link>
    </>
  );
};

export default Logo;
