"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CTHPage = () => {
  const router = useRouter();
  const [investigators, setInvestigators] = useState([]);

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen border-10 border-blue-600">
      <h1>Investigators</h1>
      {investigators.map((investigator) => (
        <span>PUT INVESTIGATOR DETAILS HERE</span>
      ))}
      {investigators.length < 1 ? (
        <span onClick={() => router.push("cth/investigator-details")}>
          no pcs created yet. please click to create one.
        </span>
      ) : null}
    </div>
  );
};

export default CTHPage;
