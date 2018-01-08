class Encounter{
	static init(){
		this.initEncountCount();
	}
	//エンカウントするまでの歩数を設定
	static initEncountCount(){
		this.encountCount=5+Math.floor(Math.random()*5)
	}
	//ランダムエンカウントするか判定
	static countRandomEncount(aNum){
		return new Promise((res,rej)=>{
			this.encountCount--;
			if(this.encountCount<=0){
				//エンカウント
				this.initEncountCount();
				this.randomEncount(aNum).then(()=>{res()})
			}
			else{
				res();
				return;
			}
		})
	}
	//ランダムエンカウントした
	static randomEncount(aNum){
		return new Promise((res,rej)=>{
			let tEncountData=this.getRandomEncountBattleData(aNum);//バトルデータ
			let tUserPygmies=User.getPygmiesBattleData(tEncountData.userPygmyNum);//ユーザのぴぐみー
			let tEnemies=new Array();
			for(let tEnemyData of tEncountData.enemies){//敵のデータ
				let tData={};
				let tRaceData=PygmyDictionary.get(tEnemyData.race);
				tData.name=tRaceData.race;
				tData.race=tRaceData.race;
				tData.level=tEnemyData.level;
				if(tEnemyData.status=="default"){//種族値とレベルからステータスを決定
					tData.status=PygmyDictionary.calcuStatus(tRaceData.raceStatus,tEnemyData.level);
					tData.status.currentTairyoku=tData.status.tairyoku;
					tData.ai=tRaceData.ai;
				}
				tData.skill=tEnemyData.skill;
				tData.item=(tEnemyData.item==undefined)?[]:tEnemyData.item;
				tData.moc=tRaceData.moveCost;
				tData.image=tRaceData.image;
				tData.image.accessory=[];
				tEnemies.push(tData);
			}
			Battle.init(tUserPygmies,tEnemies,tEncountData.feildData);
			SceneChanger.changeToBattleScene().then((tResult)=>{
				//キャラ情報更新
				User.applyPygmies(tResult.pygmy)
				res();
			})
		})
	}
	//ランダムエンカウントした時のフィールド情報を決定
	static getRandomEncountBattleData(aNum){
		let tEncountData=MapFeild.getEncountData();
		return tEncountData[aNum];
	}
}
