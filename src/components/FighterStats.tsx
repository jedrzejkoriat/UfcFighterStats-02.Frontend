import FighterModel from "../types/FighterModel";
import WeightClassModel from "../types/WeightClassModel";
import { useEffect, useState } from "react";
import { youtubeConverter } from "../utils/youtubeConverter";
import Flag from "./Items/Flag";

function FighterStats() {


    const [weightClasses, setWeightClasses] = useState<WeightClassModel[]>([]);
    const [selectedWeightClass, setSelectedWeightClass] = useState<WeightClassModel | null>(null);

    const [isLoading, setLoading] = useState<boolean>(true);



    const [fighters, setFighters] = useState<FighterModel[]>([]);
    const [selectedFighter, setSelectedFighter] = useState<FighterModel | null>(null);

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



    return (<>
        {isLoading ?
            (<div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>) :
            (<>
                <>
                    <div className="row text-center">
                        <div className="btn-group  d-flex flex-wrap flex-md-row flex-column" role="group" aria-label="Weight classes">
                            {weightClasses.map((weightClass, index) => (
                                <button key={index} type="button" onClick={() => { setSelectedWeightClass(weightClass); setFighters(weightClass.fighters) }}
                                    className={`btn btn-danger${selectedWeightClass?.weightClass === weightClass.weightClass ? ' active' : ''}`}>{weightClass.weightClass}</button>
                            ))}
                        </div>
                    </div>
                    <div className="row text-center" style={{ paddingTop: '20px' }}>
                        <div className="btn-group-vertical col-md-3" role="group" aria-label="Fighters">
                            {fighters.map((fighter, index) => (
                                <button key={index} type="button" onClick={() => { setSelectedFighter(fighter) }}
                                    className={`btn btn-dark${selectedFighter?.name === fighter.name ? ' active' : ''}`}>{fighter.ranking}. {fighter.name}</button>
                            ))}
                        </div>
                        <div className="row col-md-9">
                            <div className="container col-md-5">
                                {selectedFighter && (
                                    <div className="card mb-2">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h3 className="text-start">{selectedFighter.name}</h3>
                                                </div>
                                                <div className="col-md-4 text-end">
                                                    <Flag country={selectedFighter.country} />
                                                </div>
                                            </div>
                                            <h3 className="text-start"><small className="text-muted">{selectedFighter.nickname || '-'}</small></h3>
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Age:</strong> {selectedFighter.age} | {selectedFighter.birthdate}</p>
                                            <p><strong>Country:</strong> {selectedFighter.country} | {selectedFighter.region}</p>
                                            <p><strong>Association:</strong> {selectedFighter.association}</p>
                                            <p><strong>Height:</strong> {selectedFighter.height} cm</p>
                                            <p><strong>Weight:</strong> {selectedFighter.weight} kg</p>

                                            <h5 className="mt-4">Record</h5>    
                                            <p><strong>Total Wins:</strong> {selectedFighter.wins}
                                                {" "}(<strong>KO:</strong> {selectedFighter.winKo},
                                                {" "}<strong>Sub:</strong> {selectedFighter.winSub},
                                                {" "}<strong>Dec:</strong> {selectedFighter.winDec},
                                                {" "}<strong>Other:</strong> {selectedFighter.winOth})</p>

                                            <p><strong>Total Losses:</strong> {selectedFighter.losses}
                                                {" "}(<strong>KO:</strong> {selectedFighter.lossesKo},
                                                {" "}<strong>Sub:</strong> {selectedFighter.lossesSub},
                                                {" "}<strong>Dec:</strong> {selectedFighter.lossesDec},
                                                {" "}<strong>Other:</strong> {selectedFighter.lossesOth})</p>

                                            <p><strong>No Contest:</strong> {selectedFighter.noContest}</p>
                                        </div>
                                    </div>
                                )}
                                <div id="fighterVideosCarousel" className="carousel slide">
                                    <div className="carousel-inner">
                                        {selectedFighter?.youtubeVideos.map((video, index) => (
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
                                    {selectedFighter && selectedFighter.youtubeVideos.length > 0 && (
                                        <>
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#fighterVideosCarousel"
                                                data-bs-slide="prev"
                                                style={{width:'4%'} }
                                            >
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>

                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#fighterVideosCarousel"
                                                data-bs-slide="next"
                                                style={{ width: '4%' }}
                                            >
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="container overflow-auto col-md-7" style={{ maxHeight: '800px', maxWidth: '540px'}}>
                                {selectedFighter && (
                                    selectedFighter.fightHistory.map((fight, index) => (
                                        <div key={index} className="card mb-2" style={{ width: '100%' }}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <h5 className="card-title text-start">
                                                        <span className={`text-uppercase badge rounded-pill ${fight.result === 'win' ? 'bg-success' :
                                                            fight.result === 'loss' ? 'bg-danger' :
                                                                fight.result === 'draw' ? 'bg-warning text-dark' :
                                                                    'bg-secondary'
                                                            }`}>
                                                            {fight.result}
                                                        </span> {fight.method}</h5>
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
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </>
            </>)}
    </>)
}

export default FighterStats;
