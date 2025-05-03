import "./App.css";
import WeightClassAccordion from "./components/WeightClassAccordion";

function App() {
  return (
    <>
      <p className="mainHeader">UFC FIGHTER STATISTICS</p>
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-2">
          <WeightClassAccordion />
        </div>
        <div className="col-md-2">
          <WeightClassAccordion />
        </div>
        <div className="col-md-2">
          <WeightClassAccordion />
        </div>
        <div className="col-md-2">
          <WeightClassAccordion />
        </div>
        <div className="col-md-2">
          <WeightClassAccordion />
        </div>
      </div>
    </>
  );
}

export default App;
