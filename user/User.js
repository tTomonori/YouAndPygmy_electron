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
	static getItemList(aCategory){
		switch (aCategory) {
			case "consum":return this.getConsum();
			case "important":return this.getImportant();
			case "fragment":return this.getFragment();
			case "accessory":return this.getAccessory();
			default:
			throw new Error("アイテムのカテゴリが不正 カテゴリ名:"+aCategory);
		}
	}
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
	//指定したアイテムの所持数を返す
	static getItemNum(aItemName,aCategory){
		let tItemList=this.getItemList(aCategory);
		for(let tItem of tItemList){
			if(tItem.name==aItemName)return tItem.possess;
		}
		return 0;
	}
	//持っているアイテムを増やす
	static receiveItem(aItemName,aNum,aCategory){
		let tItemList=this.getItemList(aCategory);
		for(let tItem of tItemList){
			if(tItem.name==aItemName){
				//入手したアイテムをすでに一つ以上所持していた
				tItem.possess+=aNum;
				return;
			}
		}
		//入手したアイテムを一つも持っていなかった
		tItemList.push({name:aItemName,possess:aNum});
	}
	//持っているアイテムを減らす
	static takeOutItem(aItemName,aNum,aCategory){
		let tItemList=this.getItemList(aCategory);
		for(let i=0;i<tItemList.length;i++){
			let tItem=tItemList[i];
			if(tItem.name==aItemName){
				//指定したアイテムを一つ以上所持していた
				tItem.possess-=aNum;
				if(0<tItem.possess)return;
				//アイテムの個数が0以下になった
				tItemList.splice(i,1);
				return;
			}
		}
		//指定したアイテムを一つも持っていなかった
		return;
	}
}
