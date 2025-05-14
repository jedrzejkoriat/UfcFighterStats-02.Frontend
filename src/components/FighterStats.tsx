import FighterModel from "../types/FighterModel";
import WeightClassModel from "../types/WeightClassModel";
import { useEffect, useState } from "react";




function FighterStats() {

    const [weightClasses, setWeightClasses] = useState<WeightClassModel[]>([]);
    const [selectedWeightClass, setSelectedWeightClass] = useState<WeightClassModel | null>(null);

    const [isLoading, setLoading] = useState<boolean>(true);


    const [fighters, setFighters] = useState<FighterModel[]>([]);
    const [selectedFighter, setSelectedFighter] = useState<FighterModel | null>(null);

    function convertYouTubeUrlToEmbed(url: string): string {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    }

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
                <div>
                    <div className="btn-group me-2" role="group" aria-label="Weight classes">
                        {weightClasses.map((weightClass, index) => (
                            <button key={index} type="button" onClick={() => { setSelectedWeightClass(weightClass); setFighters(weightClass.fighters) }}
                                className={`btn btn-primary${selectedWeightClass?.weightClass === weightClass.weightClass ? ' active' : ''}`}>{weightClass.weightClass}</button>
                        ))}
                    </div>
                    <div className="btn-group-vertical" role="group" aria-label="Fighters">
                        {fighters.map((fighter, index) => (
                            <button key={index} type="button" onClick={() => { setSelectedFighter(fighter) }}
                                className={`btn btn-primary${selectedFighter?.name === fighter.name ? ' active' : ''}`}>{fighter.ranking}. {fighter.name}</button>
                        ))}
                    </div>
                    <div className="container">
                        {selectedFighter && (
                            <div className="card">
                                <div className="card-header">
                                    <h3>{selectedFighter.name} <small className="text-muted">"{selectedFighter.nickname}"</small></h3>
                                </div>
                                <div className="card-body">
                                    <p><strong>Age:</strong> {selectedFighter.age}</p>
                                    <p><strong>Country:</strong> {selectedFighter.country}</p>
                                    <p><strong>Height:</strong> {selectedFighter.height} cm</p>

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
                    </div>
                    <div className="container overflow-auto" style={{ maxHeight: '310px', maxWidth: '540px' }}>
                        {selectedFighter && (
                            selectedFighter.youtubeVideos.map((video, index) => (
                                <div key={index} className="ratio ratio-16x9 my-4" style={{ height: '300px', width: '500px' }}>
                                    <iframe
                                        src={convertYouTubeUrlToEmbed(video)}
                                        title="Youtube video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="container overflow-auto" style={{ maxHeight: '310px', maxWidth: '540px' }}>
                        {selectedFighter && (
                            selectedFighter.fightHistory.map((fight, index) => (
                                <div key={index} className="container text-dark mb-5">
                                    <div className="row">
                                        <div className="col-md-4">
                                            {fight.result}
                                        </div>
                                        <div className="col-md-8">
                                            {fight.opponent}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            {fight.method}
                                        </div>
                                        <div className="col-md-4">
                                            {fight.round}
                                        </div>
                                        <div className="col-md-4">
                                            {fight.time}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            {fight.eventName}
                                        </div>
                                        <div className="col-md-4">
                                            {fight.date}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </>)}
    </>)
}

export default FighterStats;
