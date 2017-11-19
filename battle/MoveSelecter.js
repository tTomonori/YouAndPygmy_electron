class MoveSelecter{
	//ターンを開始したキャラをセット
	static setTurnChara(aChara){
		this.turnChara=aChara;
		this.prePosition=aChara.getPosition();//ターン開始時の座標
		this.movablePositions=RootSearcher.searchMovable(aChara.getMove(),aChara.getMoveCost(),aChara.getPosition());//移動可能座標取得
	}
	//移動可能なマスを示す
	static displayMoveRange(){
		Feild.displayMoveRange(this.movablePositions);
	}
	//選択したマスへ移動する
	static moveTo(aMas){
		this.nextPosition=aMas.getPosition();//移動先の座標
		//選択したマスへの移動経路取得
		let tRoot=RootSearcher.getRoot(this.movablePositions,this.nextPosition);
		this.root=tRoot;//移動経路記憶
		this.moveWithRoot();
	}
	//指定されたルートに沿って移動
	static moveWithRoot(){
		if(this.root.length==0){//移動終了
			this.turnChara.setPosition(this.nextPosition.x,this.nextPosition.y);
			CharaController.moved();
			return;
		}
		let tNextMas=this.root.shift();
		this.turnChara.move(Feild.getMas(tNextMas.x,tNextMas.y),()=>{this.moveWithRoot();});
	}
	//移動をキャンセルする
	static cancelMove(){
		this.turnChara.setPosition(this.prePosition.x,this.prePosition.y);
	}
}
