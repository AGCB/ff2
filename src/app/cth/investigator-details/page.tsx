import BreadCrumb from "../helpers";

const GenerateCharacter = () => {
  return (
    <div className="border-3 border-b-emerald-700 h-7/10 w-9/10 md:w-7/10 max-w-xlg p-0 m-0">
      <span>GENERATE CHARACTER</span>
    </div>
  );
};

const CTHPage = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen border-10 border-blue-600">
      <BreadCrumb />
      <GenerateCharacter />
    </div>
  );
};

export default CTHPage;
