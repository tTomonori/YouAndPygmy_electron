class User{
	static init(){
		this.initAcconpanying();
		this.initItem();
	}
	//手持ちぴぐみー初期化
	static initAcconpanying(){
		this.acconpanying=new Array();
		let tPygmies=Database.getAcconpanying();
		for(let tPygmyData of tPygmies){
			this.acconpanying.push(new Pygmy(tPygmyData));
		}
	}
	//持ち物初期化
	static initItem(){
		this.item=Database.getItem();
	}
	//持ち物取得
	static getConsum(){return this.item.consum}
	static getImportant(){return this.item.important}
	static getFragment(){return this.item.fragment}
	static getAccessory(){return this.item.accessory}
	//バトル用のぴぐみーのデータを取得
	static getPygmiesBattleData(aNum){
		let tPygmyDatas=new Array();
		for(let i=0;tPygmyDatas.length<aNum&&i<this.acconpanying.length;i++){
			let tPygmy=this.acconpanying[i];
			if(tPygmy.getCurrentTairyoku()==0)continue;//戦闘不能
			let tBattleData=tPygmy.getBattleData();
			tBattleData.acconpanyingNumber=i;
			tPygmyDatas.push(tBattleData);
		}
		return tPygmyDatas;
	}
	//手持ちぴぐみーを返す
	static getAcconpanying(){
		return this.acconpanying;
	}
	//バトル後にぴぐみー情報更新
	static applyPygmies(aPygmyData){
		for(let tPygmyData of aPygmyData){
			let tPygmy=this.acconpanying[tPygmyData.acconpanyingNumber];
			tPygmy.setCurrentTairyoku(tPygmyData.tairyoku);
			tPygmy.setItem(tPygmyData.item);
		}
	}
}
