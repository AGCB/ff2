import CONSTS from "@/app/CONSTS";
import vt323 from "@/app/fonts/Vt323";
const ContinueButton: React.FC<{ current: boolean }> = ({ current }) => {
  return (
    <>
      <button
        className={`${vt323.className} min-w-50 text-left text-4xl`}
      >{`${CONSTS.CONTINUE_BUTTON.toUpperCase()} ${
        current ? "👈" : ""
      }`}</button>
    </>
  );
};

export default ContinueButton;
