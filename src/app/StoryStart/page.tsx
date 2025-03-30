import CONSTS from "../CONSTS";
import vt323 from "../fonts/Vt323";
export default function StoryStart() {
  return (
    <div
      className={`${vt323.className} flex justify-center items-center w-full h-screen`}
    >
      <div className="text-center text-1xl border-8 w-72 ">
        {CONSTS.STORY_START}
      </div>
    </div>
  );
}
