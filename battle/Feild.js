class Feild{
	static init(aFeildData){
		this.feild=new Array();
		for(let i=0;i<aFeildData.feild.length;i++){
			let tMasList=aFeildData.feild[i];
			let tLine=new Array();
			this.feild.push(tLine);
			for(let j=0;j<tMasList.length;j++){
				let tMasNum=tMasList[j];
				tLine.push(new Mas(j,i,aFeildData.masData[tMasNum]));
			}
		}
	}
	//指定した座標のマスを取得
	static getMas(aX,aY){
		if(aX<0)return null;
		if(aY<0)return null;
		if(this.feild.length<=aY)return null;
		if(this.feild[aY].length<=aX)return null;
		return this.feild[aY][aX];
	}
}
