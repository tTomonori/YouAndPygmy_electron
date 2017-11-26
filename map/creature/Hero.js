class Hero extends Creature{
	constructor(aPosition){
		super(aPosition,"chara");
		//カメラセット
		let tPosition=MapFeild.convertToThreeWarldPosition({x:this.x,y:this.y,z:this.z});
		tPosition.y-=mGroundSize[1]*6;
		tPosition.z+=mGroundSize[2]*4;
		ThreeMap.setCamera(tPosition,{x:0.95});
		//移動時にカメラを追従させる
		this.cameraPosition=ThreeMap.camera.position;
		this.preMoveMesh=this.moveMesh;
		this.moveMesh=(aDelta,aDirection,aNum)=>{
			this.preMoveMesh(aDelta,aDirection,aNum);
			let tGoalPosition={x:this.cameraPosition.x+aDelta.x,y:this.cameraPosition.y+aDelta.y,z:this.cameraPosition.z+aDelta.z};
			let tDelta={x:aDelta.x/mMoveFrame,y:aDelta.y/mMoveFrame,z:aDelta.z/mMoveFrame};
			return new Promise((res,rej)=>{
				let i=0;
				this.changeImage(aDirection,aNum);
				ThreeMap.setAnimation(()=>{
					if(i==mMoveFrame){
						this.changeImage(aDirection,1);
						this.cameraPosition.x=tGoalPosition.x;
						this.cameraPosition.y=tGoalPosition.y;
						this.cameraPosition.z=tGoalPosition.z;
						return false;
					}
					this.cameraPosition.x+=tDelta.x;
					this.cameraPosition.y+=tDelta.y;
					this.cameraPosition.z+=tDelta.z;
					i++;
					return true;
				},()=>{res()})
			})
		}
	}
	//キー長押し移動
	confirmKeyAndMove(){
		let tDirection=KeyMonitor.getPushingCrossKeys();
		if(tDirection.length==0)return;
		this.moveByInput(tDirection[0]);//すぐに移動関数を呼ぶ
	}
	//ユーザのキー入力による移動
	moveByInput(aDirection){
		this.move(aDirection).then((aFlag)=>{
			if(!aFlag)return;//移動できなかった
			//マスのイベント処理
			let tEvent=this.ground.getEvent();
			if(tEvent!=null){
				//イベント実行
				Event.runEvents(tEvent).then(()=>{
					//キー長押し移動
					this.confirmKeyAndMove();
				})
			}
			else{
				//キー長押し移動
				this.confirmKeyAndMove();
			}
		})
	}
}
