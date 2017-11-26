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
}
