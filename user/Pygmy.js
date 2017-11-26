class Pygmy{
	constructor(aData){
		let tRaceData=PygmyDictionary.getData(aData.race);
		this.status=PygmyDictionary.calcuStatus(tRaceData.raceStatus,aData.level);
		this.currentTairyoku=(aData.tairyoku=="max")?this.status.tairyoku:aData.tairyoku;
		this.name=aData.name;
	}
}
