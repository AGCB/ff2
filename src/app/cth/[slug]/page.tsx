import { notFound } from "next/navigation";

const stepMap: Record<string, string> = {
  "generate-characteristics": "Generate Characteristics",
  "determine-occupation": "Determine Occupation",
  "decide-skills": "Decide Skills and Allocate Points",
  "create-backstory": "Create Backstory",
  "equip-investigator": "Equip Investigator",
};

type Params = {
  slug: string;
};

const renderInvestigatorCreationPage = (
  label: string
): React.ReactElement | undefined => {
  let output;
  switch (label) {
    case "Generate Characteristics":
      output = <span>23423432</span>;
      break;
    default:
      break;
  }

  return output;
};

export default function StepPage({ params }: { params: Params }) {
  const label = stepMap[params.slug];

  if (!label) {
    notFound(); // Show 404 if slug isn't in the list
  }

  return <div>{renderInvestigatorCreationPage(label)}</div>;
}
