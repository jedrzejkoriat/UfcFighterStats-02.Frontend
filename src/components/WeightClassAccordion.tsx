import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FighterList from "./FighterList";
import WeightClassModel from "../types/WeightClassModel";
import FighterModel from "../types/FighterModel";

type Props = {
  data: WeightClassModel[];
  onSelect: (fighter: FighterModel) => void;
};

function WeightClassAccordion({ data, onSelect }: Props) {
  return (
    <div className="accordion" id="accordionExample">
      {data.map((weightClass, index) => {
        const collapseId = `collapse-${index}`;
        const headingId = `heading-${index}`;

        return (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={headingId}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded="false"
                aria-controls={collapseId}
              >
                {weightClass.weightClass || "Unknown Class"}
              </button>
            </h2>
            <div
              id={collapseId}
              className="accordion-collapse collapse"
              aria-labelledby={headingId}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <FighterList
                  fighters={weightClass.fighters}
                  onSelect={onSelect}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeightClassAccordion;
