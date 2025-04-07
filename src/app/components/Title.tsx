"use client";
import { useRouter } from "next/navigation";
import CONSTS from "../helpers/CONSTS";
import vt323 from "../fonts/Vt323";

const Title: React.FC = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/Sandbox");
  };

  return (
    <div className="h-full flex justify-center items-center text-9xl">
      <h1 onClick={handleClick} className={`${vt323.className} border-8`}>
        {CONSTS.TITLE}
      </h1>
    </div>
  );
};

export default Title;
