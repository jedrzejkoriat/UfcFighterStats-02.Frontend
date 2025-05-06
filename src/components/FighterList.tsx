import FighterModel from "../types/FighterModel";

type Props = {
  fighters: FighterModel[];
  onSelect: (fighter: FighterModel) => void;
};

function FighterList({ fighters, onSelect }: Props) {
  return (
    <ul className="list-group">
      {fighters.map((fighter, index) => (
        <li className="list-group-item" key={index}>
          <button className="btn btn-link" onClick={() => onSelect(fighter)}>
            <strong>{fighter.ranking}.</strong> {fighter.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default FighterList;
