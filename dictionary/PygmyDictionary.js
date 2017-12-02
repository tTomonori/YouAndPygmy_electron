class PygmyDictionary{
	//ぴぐみーのデータ取得
	static get(aName){
		return $.extend(true, {}, this.dictionary[aName])
	}
	//ステータス計算
	static calcuStatus(aRaceStatus,aLevel){
		let tAllStatus={};
		for(let tStatusName in aRaceStatus){
			let tStatus;
			let tRaceStatus=aRaceStatus[tStatusName];
			switch (tStatusName) {
				case "tairyoku":
					tStatus=Math.floor(tRaceStatus*0.1+(tRaceStatus*0.9*aLevel/100));
					break;
				case "kiryoku":
					tStatus=(aLevel<50)
					?Math.floor(tRaceStatus*0.1+(tRaceStatus*0.9*aLevel/50))
					:tRaceStatus
					break;
				case "tikara":
				case "mamori":
				case "maryoku":
				case "seisin":
				case "yuryoku":
				case "waza":
				case "binsei":
					tStatus=Math.floor(tRaceStatus*0.05+(tRaceStatus*0.95*aLevel/100));
					break;
				case "idou":
					tStatus=tRaceStatus;
					break;
				default:
			}
			tAllStatus[tStatusName]=tStatus;
		}
		return tAllStatus;
	}
}
PygmyDictionary.dictionary={};
