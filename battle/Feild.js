class Feild{
	static init(aFeildData){
		mFeildSize={x:aFeildData.feild[0].length,y:aFeildData.feild.length};
		this.feild=new Array();
		for(let i=0;i<mFeildSize.y;i++){
			let tMasList=aFeildData.feild[i];
			let tLine=new Array();
			this.feild.push(tLine);
			for(let j=0;j<mFeildSize.x;j++){
				let tMasNum=tMasList[j];
				tLine.push(new Mas(j,i,aFeildData.masData[tMasNum]));
			}
		}
	}
	//全てのマスを取得
	static getAllMas(){return this.feild}
	//指定した座標のマスを取得
	static getMas(aX,aY){
		if(aX<0)return null;
		if(aY<0)return null;
		if(this.feild.length<=aY)return null;
		if(this.feild[aY].length<=aX)return null;
		return this.feild[aY][aX];
	}
	//指定した座標を3dの座標に変換
	static convertToThreeFeildPosition(aX,aY){
		return {x:mMasSize[0]*aX,y:-mMasSize[1]*aY};
	}
	//リスト内の座標のマスに関数実行
	static operationMas(aPositionList,aFunction){
		for(let tPosition of aPositionList){
			aFunction(this.getMas(tPosition.x,tPosition.y));
		}
	}
	//移動可能マス表示
	static displayMoveRange(aRange){
		for(let tPosition of aRange){
			let tMas=this.getMas(tPosition.x,tPosition.y);
			tMas.changeToMovable();
		}
	}
	//攻撃可能マス表示
	static displaySkillAttackRange(aRange){
		for(let tPosition of aRange){
			let tMas=this.getMas(tPosition.x,tPosition.y);
			tMas.changeToAttackable();
		}
	}
	//回復可能マス表示
	static displaySkillHealRange(aRange){
		for(let tPosition of aRange){
			let tMas=this.getMas(tPosition.x,tPosition.y);
			tMas.changeToHealable();
		}
	}
	//マス選択イベントリセット
	static resetSelectMasEvent(){
		ThreeFeild.resetMouseMoveFunctions();
		for(let tMasList of this.feild){
			for(let tMas of tMasList){
				tMas.resetSelectEvent();
			}
		}
	}
}
var mFeildSize={x:0,y:0};
