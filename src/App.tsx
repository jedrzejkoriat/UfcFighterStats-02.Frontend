import "./App.css";
import { useEffect, useState } from "react";
import WeightClassAccordion from "./components/WeightClassAccordion";
import WeightClassModel from "./types/WeightClassModel";

function App() {
  const [data, setData] = useState<WeightClassModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((json: WeightClassModel[]) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error while fetching data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <p className="mainHeader">UFC FIGHTER STATISTICS</p>
      <div className="row">
        <div className="col-md-3">
          <WeightClassAccordion data={data} />
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-5"></div>
      </div>
    </>
  );
}

export default App;
