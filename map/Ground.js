class Ground{
	constructor(aPosition,aChip){
		this.x=aPosition.x;
		this.y=aPosition.y;
		this.z=aPosition.z;
		this.position=aPosition;
		this.chip=aChip.data;
		this.box=ThreeMap.createGround(aChip.key);
		//groundの位置調整
		this.box.position.x=mGroundSize[0]*this.x;
		this.box.position.y=-mGroundSize[1]*this.y;
		this.box.position.z=mGroundSize[2]*this.z;
		if(aChip.data.height!=undefined)this.box.position.z+=mGroundSize[2]/2;//坂道用のz軸調整
		//下の座標にブロック追加
		this.underGround=new Array();
		if(this.chip.under!=undefined){
			let tLength=this.chip.under.length;
			for(let i=0;i<tLength;i++){
				let tKey=this.chip.under[i];
				let tBlock=ThreeMap.createGround(tKey);
				tBlock.position.x=this.box.position.x;
				tBlock.position.y=this.box.position.y;
				tBlock.position.z=this.box.position.z-mGroundSize[2];
				this.underGround.push(tBlock);
			}
		}
		//このマスにいるキャラ
		this.onChara=null;
	}
	getPosition(){return this.position}
	getOnChara(){return this.onChara}
	canOn(){return this.chip.canOn}
	//指定した方向の高さを返す
	getHeight(aDirection){
		if(this.chip.height==undefined)return this.z;
		return this.z+this.chip.height[aDirection]/2;
	}
	//このマスにキャラが乗った
	on(aCreature){
		this.onChara=aCreature;
	}
	//このマスからキャラが移動した
	out(){
		this.onChara=null;
	}
}
