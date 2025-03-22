import CONSTS from "../CONSTS";
import vt323 from "../fonts/Vt323";

const Title = (
  <div className="h-full flex justify-center items-center text-9xl">
    <h1 className={`${vt323.className} border-8`}>{CONSTS.TITLE}</h1>
  </div>
);

export default Title;
