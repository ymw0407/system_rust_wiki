import { Link } from "react-router-dom";
import type { StepMeta } from "../data/steps";
import * as s from "./StepCard.css";

export function StepCardList({ steps }: { steps: StepMeta[] }) {
  return (
    <ol className={s.list}>
      {steps.map((step) => (
        <li key={step.step} className={s.card}>
          <Link className={s.cardLink} to={`/step/${step.step}`}>
            {step.title}
          </Link>
          <span className={s.desc}>{step.desc}</span>
          <div className={s.tags}>
            {[...step.tags, step.date].map((t) => (
              <span key={t} className={s.tag}>
                {t}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
