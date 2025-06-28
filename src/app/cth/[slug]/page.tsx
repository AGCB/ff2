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

const renderGenerateCharacteristicsPage = () => {
  return (
    <div>
      <span>renderGenerateCharacteristicsPage</span>
    </div>
  );
};

const renderDetermineOccupationPage = () => {
  return (
    <div>
      <span>renderGenerateCharacteristicsPage</span>
    </div>
  );
};

const renderCreateBackstoryPage = () => {
  return (
    <div>
      <span>renderCreateBackstoryPage</span>
    </div>
  );
};

const renderDecideSkillsAndAllocatePointsPage = () => {
  return (
    <div>
      <span>renderDecideSkillsAndAllocatePointsPage</span>
    </div>
  );
};

const renderInvestigatorCreationPage = (
  label: string
): React.ReactElement | undefined => {
  let output;
  switch (label) {
    case "Generate Characteristics":
      output = renderGenerateCharacteristicsPage();
      break;
    case "Determine Occupation":
      output = renderDetermineOccupationPage();
      break;
    case "Decide Skills and Allocate Points":
      output = renderDecideSkillsAndAllocatePointsPage();
      break;
    case "Create Backstory":
      output = renderCreateBackstoryPage();
      break;
    case "Equip Investigator":
      output = renderCreateBackstoryPage();
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
