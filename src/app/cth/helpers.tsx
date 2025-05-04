"use client";
import React from "react";
import { useRouter } from "next/navigation";

const styles = {
  li: "text-sm h-[50px] w-1/5 border-2 border-green-500 break-all",
};

const steps = [
  { label: "generate characteristics", slug: "generate-characteristics" },
  { label: "determine occupation", slug: "determine-occupation" },
  { label: "decide skills and allocate points", slug: "decide-skills" },
  { label: "create backstory", slug: "create-backstory" },
  { label: "equip investigator", slug: "equip-investigator" },
] as const;

type Step = (typeof steps)[number];

const Crumb = ({ step }: { step: Step }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/cth/${step.slug}`);
  };

  return (
    <li onClick={handleClick} className={styles.li}>
      {step.label}
    </li>
  );
};

const BreadCrumb = () => {
  return (
    <div className="flex justify-center items-center p-0 m-0 h-20 w-8/10 md:w-5/10">
      <ul className="flex justify-center w-9/10">
        {steps.map((step, i) => (
          <Crumb key={i} step={step} />
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumb;
