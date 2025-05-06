import FightModel from "./FightModel";

type FighterModel = {
    ranking: number | null,
    name: string | null,
    nickname: string | null,
    country: string | null,
    age: number | null,
    height: number | null,
    wins: number | null,
    winKo: number | null,
    winSub: number | null,
    winDec: number | null,
    winOth: number | null,
    losses: number | null,
    lossesKo: number | null,
    lossesSub: number | null,
    lossesDec: number | null,
    lossesOth: number | null,
    noContest: number | null,
    fightHistory: FightModel[],
    youtubeVideos: string[]
};

export default FighterModel;