import FighterModel from "../types/FighterModel";
import WeightClassModel from "../types/WeightClassModel";
import { useEffect, useState } from "react";
import { youtubeConverter } from "../utils/youtubeConverter";
import Flag from "./Items/Flag";

function FighterStats() {
    const [weightClasses, setWeightClasses] = useState<WeightClassModel[]>([]);
    const [selectedWeightClass, setSelectedWeightClass] = useState<WeightClassModel | null>(null);

    const [fighters, setFighters] = useState<FighterModel[]>([]);
    const [selectedFighter, setSelectedFighter] = useState<FighterModel | null>(null);

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFighters = async () => {
            try {
                const response = await fetch('/api/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const fetchedData: WeightClassModel[] = await response.json();
                setWeightClasses(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFighters();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <>
                    {/* Weight class dropdown */}
                    <div className="row" style={{ paddingTop: '2rem' }}>
                        <div className="dropdown mb-3 col-6">
                            <button
                                className="btn btn-dark dropdown-toggle w-100"
                                type="button"
                                id="dropdownWeightClass"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedWeightClass ? selectedWeightClass.weightClass : "Weight Class"}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="dropdownWeightClass">
                                {weightClasses.map((weightClass, index) => (
                                    <li key={index}>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => {
                                                setSelectedWeightClass(weightClass);
                                                setFighters(weightClass.fighters);
                                                setSelectedFighter(null);
                                            }}
                                        >
                                            {weightClass.weightClass}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Fighters dropdown */}
                        {fighters.length > 0 && (
                            <div className="dropdown mb-3 col-6">
                                <button
                                    className="btn btn-dark dropdown-toggle w-100"
                                    type="button"
                                    id="dropdownFighters"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {selectedFighter ? selectedFighter.name : "Fighter"}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark w-100" aria-labelledby="dropdownFighters">
                                    {fighters.map((fighter, index) => (
                                        <li key={index}>
                                            <button
                                                className={`dropdown-item${selectedFighter?.name === fighter.name ? ' active' : ''}`}
                                                onClick={() => setSelectedFighter(fighter)}
                                            >
                                                {fighter.ranking}. {fighter.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Fighter details + carousel + fight history */}
                    <div className="row g-3">
                        {selectedFighter && (
                            <div className="col-4">
                                <div className="col-12">
                                    <div className="card card-dark mb-2">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h3 className="text-start">{selectedFighter.name}</h3>
                                                </div>
                                                <div className="col-md-4 text-end">
                                                    <Flag country={selectedFighter.country} />
                                                </div>
                                            </div>
                                            <h3 className="text-start">
                                                <small className="text-secondary">{selectedFighter.nickname || '-'}</small>
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Age:</strong> {selectedFighter.age} | {selectedFighter.birthdate}</p>
                                            <p><strong>Country:</strong> {selectedFighter.country} | {selectedFighter.region}</p>
                                            <p><strong>Association:</strong> {selectedFighter.association}</p>
                                            <p><strong>Height:</strong> {selectedFighter.height} cm</p>
                                            <p><strong>Weight:</strong> {selectedFighter.weight} kg</p>

                                            <h5 className="mt-4">Record</h5>
                                            <p>
                                                <strong>Total Wins:</strong> {selectedFighter.wins} (
                                                <strong>KO:</strong> {selectedFighter.winKo},
                                                <strong>Sub:</strong> {selectedFighter.winSub},
                                                <strong>Dec:</strong> {selectedFighter.winDec},
                                                <strong>Other:</strong> {selectedFighter.winOth})
                                            </p>
                                            <p>
                                                <strong>Total Losses:</strong> {selectedFighter.losses} (
                                                <strong>KO:</strong> {selectedFighter.lossesKo},
                                                <strong>Sub:</strong> {selectedFighter.lossesSub},
                                                <strong>Dec:</strong> {selectedFighter.lossesDec},
                                                <strong>Other:</strong> {selectedFighter.lossesOth})
                                            </p>
                                            <p><strong>No Contest:</strong> {selectedFighter.noContest}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    {/* Youtube carousel */}
                                    {selectedFighter && selectedFighter.youtubeVideos.length > 0 && (
                                        <div className="col-12">
                                            <div id="fighterVideosCarousel" className="carousel slide">
                                                <div className="carousel-inner">
                                                    {selectedFighter.youtubeVideos.map((video, index) => (
                                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                            <div className="ratio ratio-16x9">
                                                                <iframe
                                                                    src={youtubeConverter(video)}
                                                                    title={`Youtube video ${index + 1}`}
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                ></iframe>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#fighterVideosCarousel" data-bs-slide="prev" style={{ width: '4%' }}>
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#fighterVideosCarousel" data-bs-slide="next" style={{ width: '4%' }}>
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="col-8">

                            {/* Fight history */}
                            {selectedFighter && (
                                <div className="col-12 scroll-dark" style={{ maxHeight: '763px', width: '100%' }}>
                                    {selectedFighter.fightHistory.map((fight, index) => (
                                        <div key={index} className="card card-dark mb-2">
                                            <div className="card-body">
                                                <div className="row">
                                                    <h5 className="card-title text-start">
                                                        <span className={`text-uppercase badge rounded-pill ${fight.result === 'win' ? 'bg-success' :
                                                            fight.result === 'loss' ? 'bg-danger' :
                                                                fight.result === 'draw' ? 'bg-warning text-dark' :
                                                                    'bg-secondary'
                                                            }`}>
                                                            {fight.result}
                                                        </span> {fight.method}
                                                    </h5>
                                                </div>
                                                <div className="row">
                                                    <h6 className="card-subtitle text-start col-md-6">{fight.opponent}</h6>
                                                    <h6 className="card-subtitle mb-3 text-end col-md-6">R{fight.round}({fight.time})</h6>
                                                </div>
                                                <div className="row">
                                                    <p className="card-text text-start col-md-9">{fight.eventName}</p>
                                                    <p className="card-text text-end col-md-3">{fight.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default FighterStats;
