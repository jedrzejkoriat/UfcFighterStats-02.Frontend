import "./App.css";
import { useEffect, useState } from "react";
import WeightClassAccordion from "./components/WeightClassAccordion";
import WeightClassModel from "./types/WeightClassModel";
import FighterModel from "./types/FighterModel";

function App() {
  const [data, setData] = useState<WeightClassModel[]>([]);
  const [selectedFighter, setSelectedFighter] = useState<FighterModel>();

  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((json: WeightClassModel[]) => {
        setData(json);
      })
      .catch((err) => {
        console.error("Error while fetching data:", err);
      });
  }, []);

  return (
    <>
      <p className="mainHeader">UFC FIGHTER STATISTICS</p>
      <div className="row">
        <div className="col-md-3">
          <WeightClassAccordion data={data} onSelect={setSelectedFighter} />
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-5"></div>
      </div>
    </>
  );
}

export default App;
