class Pygmy{
	constructor(aData){
		this.name=aData.name;
		this.raceData=PygmyDictionary.getData(aData.race);
		this.level=aData.level;
		this.status=PygmyDictionary.calcuStatus(this.raceData.raceStatus,this.level);
		this.currentTairyoku=(aData.tairyoku=="max")?this.status.tairyoku:aData.tairyoku;
		this.skills=aData.skill;
		this.item=aData.item;
		this.accessory=aData.accessory;
		this.closeness=aData.closeness;
	}
	getCurrentTairyoku(){return this.currentTairyoku}
	//バトル用のデータ取得
	getBattleData(){
		let tData={
			name:this.name,
			race:this.raceData.race,
			level:this.level,
			status:this.status,
			skill:this.skills,
			item:this.item,
			moc:this.raceData.moveCost,
			image:this.raceData.image,
			ai:"user",
		}
		tData.status.currentTairyoku=this.currentTairyoku;//現在のたいりょく
		//アクセサリ情報付与
		tData.image.accessory=[];
		return tData;
	}
}
