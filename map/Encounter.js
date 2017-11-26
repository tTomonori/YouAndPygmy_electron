class Encounter{
	static init(){
		this.initEncountCount();
	}
	//エンカウントするまでの歩数を設定
	static initEncountCount(){
		this.encountCount=5+Math.floor(Math.random()*1)
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
			// let tEncountData=this.getRandomEncountBattleData(aNum);
			// let tUserPygmies=User.getPygmiesBattleData(tEncountData.userPygmyNum);
			// let tEnemies=new Array();
			// for(let tEnemyData of tEncountData.enemies){
      //
			// }
			prepareBattle();//決め打ちのデータ使用(仮)
			SceneChanger.changeToBattleScene().then(()=>{
				res();
			})
		})
	}
	//ランダムエンカウントした時のフィールド情報を決定
	static getRandomEncountBattleData(aNum){
		let tEncountData=Map.getEncountData();
		return tEncountData[aNum];

	}
}
