class Chara{
	constructor(aData){
		this.data=aData;
		this.name=aData.name;
		this.race=aData.race;
		this.hp=aData.hp;
		this.mp=aData.mp;
		this.atk=aData.atk;
		this.def=aData.def;
		this.mgc=aData.mgc;
		this.spt=aData.spt;
		this.spd=aData.spd;
		this.mov=aData.mov;
		this.item=aData.item;
		this.moc=aData.moc;
		this.image=aData.image;
	}
	getBinsei(){
		return this.spd;
	}
	getMove(){
		return this.mov;
	}
	getMoveCost(){
		return this.moc;
	}
	getPosition(){
		return {x:this.x,y:this.y};
	}
	//キャラがいる座標セット
	setPosition(aX,aY){
		this.x=aX;
		this.y=aY;
		let tMas=Feild.getMas(aX,aY);
		tMas.on(this);
		this.makeImage();
	}
	//3dイメージ作成
	makeImage(){
		this.bodyMesh=ThreeWarld.createChara([mMasSize[0],0,mMasSize[2]*3/2],"image/"+this.image.body+".png");
		this.bodyMesh.position.x=mMasSize[0]*this.x;
		this.bodyMesh.position.y=-mMasSize[1]*this.y;
		this.bodyMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		this.eyeMesh=ThreeWarld.createChara([mMasSize[0],0,mMasSize[2]*3/2],"image/eye/"+this.image.eye.normal+".png");
		this.eyeMesh.position.x=mMasSize[0]*this.x;
		this.eyeMesh.position.y=-mMasSize[1]*this.y;
		this.eyeMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		this.mouthMesh=ThreeWarld.createChara([mMasSize[0],0,mMasSize[2]*3/2],"image/mouth/"+this.image.mouth.normal+".png");
		this.mouthMesh.position.x=mMasSize[0]*this.x;
		this.mouthMesh.position.y=-mMasSize[1]*this.y;
		this.mouthMesh.position.z=mMasSize[2]+mMasSize[2]/3;

		this.bodyMesh.className="chara";
		this.bodyMesh.class=this;
	}
	//ターン開始
	startTurn(){
		let tMovable=RootSearcher.searchMovable(this);
		//移動可能マスを変色
		for(let tPosition of tMovable){
			let tMas=Feild.getMas(tPosition.x,tPosition.y);
			tMas.changeToMovable();
		}
	}
	//移動先のマスが選択された
	moveToSelectedMas(aMas){

	}
}
