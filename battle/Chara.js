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

		this.movablePositions={};//移動可能なマス
		this.root=[]//移動経路
		this.prePosition={}//移動前の座標
		this.nextPosition={}//移動後の座標
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
	//キャラの初期位置セット
	initPosition(aX,aY){
		this.x=aX;
		this.y=aY;
		let tMas=Feild.getMas(aX,aY);
		tMas.on(this);
		this.makeImage();
	}
	//キャラの移動後の座標セット
	setPosition(aX,aY){
		Feild.getMas(this.prePosition.x,this.prePosition.y).out();
		this.x=aX;
		this.y=aY;
		Feild.getMas(aX,aY).on(this);
	}
	//3dイメージ作成
	makeImage(){
		let tThreePosition=Feild.convertToThreeWarldPosition(this.x,this.y);
		this.bodyMesh=ThreeWarld.createChara([mMasSize[0],0,mMasSize[2]*3/2],"image/"+this.image.body+".png");
		this.bodyMesh.position.x=tThreePosition.x;
		this.bodyMesh.position.y=tThreePosition.y;
		this.bodyMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		this.eyeMesh=ThreeWarld.createChara([mMasSize[0],0,mMasSize[2]*3/2],"image/eye/"+this.image.eye.normal+".png");
		this.eyeMesh.position.x=tThreePosition.x;
		this.eyeMesh.position.y=tThreePosition.y;
		this.eyeMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		this.mouthMesh=ThreeWarld.createChara([mMasSize[0],0,mMasSize[2]*3/2],"image/mouth/"+this.image.mouth.normal+".png");
		this.mouthMesh.position.x=tThreePosition.x;
		this.mouthMesh.position.y=tThreePosition.y;
		this.mouthMesh.position.z=mMasSize[2]+mMasSize[2]/3;

		this.bodyMesh.className="chara";
		this.bodyMesh.class=this;
	}
	//ターン開始
	startTurn(){
		this.prePosition={x:this.x,y:this.y};
		this.movablePositions=RootSearcher.searchMovable(this);
		//移動可能マスを変色
		for(let tPosition of this.movablePositions){
			let tMas=Feild.getMas(tPosition.x,tPosition.y);
			tMas.changeToMovable();
		}
	}
	//移動先のマスが選択された
	moveToSelectedMas(aMas){
		ThreeWarld.resetInterval();
		//移動可能マスを変色
		for(let tPosition of this.movablePositions){
			let tMas=Feild.getMas(tPosition.x,tPosition.y);
			tMas.resetMouseEvent();
			tMas.resetCover();
		}
		//選択したマスへの移動経路取得
		let tRoot=RootSearcher.getRoot(this.movablePositions,aMas.getPosition());
		this.root=tRoot
		this.nextPosition=this.root[this.root.length-1];
		this.moveWithRoot();
	}
	//指定されたルートに沿って移動
	moveWithRoot(){
		if(this.root.length==0){//移動終了
			console.log("move end");
			this.setPosition(this.nextPosition.x,this.nextPosition.y);
			Turn.endTurn();
			return;
		}
		let tNextMas=this.root.shift();
		this.move(Feild.getMas(tNextMas.x,tNextMas.y));
	}
	//指定されたマスへ移動
	move(aMas){
		let tPosition=aMas.getPosition();
		let tTarget=Feild.convertToThreeWarldPosition(tPosition.x,tPosition.y);
		ThreeWarld.setMoveAnimation([this.bodyMesh,this.eyeMesh,this.mouthMesh],tTarget,300,()=>{this.moveWithRoot()})
	}
}
