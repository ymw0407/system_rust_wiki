import { Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { Step1Intro } from "./pages/Step1Intro";
import { Step2Setup } from "./pages/Step2Setup";
import { Step3Basics } from "./pages/Step3Basics";
import { Step4Ownership } from "./pages/Step4Ownership";
import { Step5Types } from "./pages/Step5Types";
import { Step6ProjectPlan } from "./pages/Step6ProjectPlan";
import { Step7Generics } from "./pages/Step7Generics";
import { Step8Advanced } from "./pages/Step8Advanced";
import { Step9Project } from "./pages/Step9Project";
import { Step10Wrapup } from "./pages/Step10Wrapup";

const stepPages = [
  Step1Intro,
  Step2Setup,
  Step3Basics,
  Step4Ownership,
  Step5Types,
  Step6ProjectPlan,
  Step7Generics,
  Step8Advanced,
  Step9Project,
  Step10Wrapup,
];

export function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      {stepPages.map((Page, i) => (
        <Route key={i + 1} path={`/step/${i + 1}`} element={<Page />} />
      ))}
    </Routes>
  );
}
