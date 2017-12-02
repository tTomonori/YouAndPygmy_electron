class User{
	static init(){
		this.initAcconpanying();
	}
	//手持ちぴぐみー初期化
	static initAcconpanying(){
		this.acconpanying=new Array();
		let tPygmies=Database.getAcconpanying();
		for(let tPygmyData of tPygmies){
			this.acconpanying.push(new Pygmy(tPygmyData));
		}
	}
	//バトル用のぴぐみーのデータを取得
	static getPygmiesBattleData(aNum){
		let tPygmyDatas=new Array();
		for(let i=0;tPygmyDatas.length<aNum&&i<this.acconpanying.length;i++){
			let tPygmy=this.acconpanying[i];
			if(tPygmy.getCurrentTairyoku()==0)continue;//戦闘不能
			tPygmyDatas.push(tPygmy.getBattleData());
		}
		return tPygmyDatas;
	}
	//手持ちぴぐみーを返す
	static getAcconpanying(){
		return this.acconpanying;
	}
}
