class Creature{
	constructor(aPosition,aImage){
		this.x=aPosition.x;
		this.y=aPosition.y;
		this.z=aPosition.z;
		//キャラのイメージ用意
		//画像用意
		this.imageSize={width:48,height:48};
		//キャンバス
		this.canvas=document.createElement("canvas");
		this.canvas.width=this.imageSize.width;
		this.canvas.height=this.imageSize.height;
		this.imageContext=this.canvas.getContext("2d");
		//img
		this.charaImage={};
		this.charaChip=new Image();
		this.charaChip.src="image/creature/"+aImage+".png";
		//マテリアル
		let tMaterial=new THREE.Texture(this.canvas);
		tMaterial.needsUpdate=true;
		tMaterial.minFilter=THREE.LinearFilter;
		//メッシュ用意
		this.mesh=ThreeMap.createChara([mGroundSize[0],0,mGroundSize[1]],tMaterial);
		this.mesh.position.x=mGroundSize[0]*this.x;
		this.mesh.position.y=-mGroundSize[1]*this.y;
		this.mesh.position.z=mGroundSize[2]*(1+this.z);
		this.charaChip.onload=()=>{
			//画像読み込み完了
			//初期画像セット
			this.mesh.material[3].map=tMaterial;
			this.changeImage("down",1);
			this.direction="down";
		}
		//マスにキャラを載せる
		this.ground=MapFeild.getGround(this.x,this.y,this.z);
		this.ground.on(this);
		//移動中フラグ
		this.moveFlag=false;
	}
	//キャラの画像を変更する
	changeImage(aDirection,aNum){
		let tDirections={down:0,left:1,right:2,up:3};
		this.imageContext.beginPath();
		this.imageContext.clearRect(0,0,this.imageSize.width,this.imageSize.height);
		this.imageContext.drawImage(this.charaChip,aNum*this.imageSize.width,tDirections[aDirection]*this.imageSize.height,
			this.imageSize.width,this.imageSize.height,0,0,this.imageSize.width,this.imageSize.height);
		this.imageContext.closePath();
		this.mesh.material[3].map.needsUpdate=true;
	}
	//マス移動
	move(aDirection){
		return new Promise((res,rej)=>{
			if(this.moveFlag){
				res(false);
				return;
			}
			//キャラの向き変更
			this.changeImage(aDirection,1);
			this.direction=aDirection;
			//移動可能か確認
			let tNextGround=this.getMovableGround(aDirection);
			if(tNextGround==null){//移動不可
				res(false);
				return;
			}
			this.moveFlag=true;//移動フラグセット
			//マスに自信をセット
			this.ground.out();
			tNextGround.on(this);
			//移動先座標計算
			let tPrePosition=this.ground.getPosition();
			let tNextPosition=tNextGround.getPosition();
			let tEdgeHeight=this.ground.getHeight(aDirection);
			let tEdgeThreePosition=MapFeild.convertToThreeWarldPosition({
				x:(tPrePosition.x+tNextPosition.x)/2,
				y:(tPrePosition.y+tNextPosition.y)/2,
				z:tEdgeHeight
			});
			let tPreThreePosition=MapFeild.convertToThreeWarldPosition(tPrePosition);
			let tNextThreePosition=MapFeild.convertToThreeWarldPosition(tNextPosition);
			//位置を再設定
			this.ground=tNextGround;
			this.x=tNextPosition.x;
			this.y=tNextPosition.y;
			this.z=tNextPosition.z;
			this.moveMesh({//マスの縁へ
				x:tEdgeThreePosition.x-tPreThreePosition.x,
				y:tEdgeThreePosition.y-tPreThreePosition.y,
				z:tEdgeThreePosition.z-tPreThreePosition.z
			},aDirection,0).then(()=>{
				this.moveMesh({//移動先のマスへ
					x:tNextThreePosition.x-tEdgeThreePosition.x,
					y:tNextThreePosition.y-tEdgeThreePosition.y,
					z:tNextThreePosition.z-tEdgeThreePosition.z
				},aDirection,2).then(()=>{this.moveFlag=false;res(true);})//移動フラグリセット
			})
		})
	}
	//指定した方向の移動可能なgroundを取得(移動可能なマスがなければnull)
	getMovableGround(aDirection){
		let tX=this.x;
		let tY=this.y;
		let tZ=this.z;
		let tHereDirection;
		switch (aDirection) {
			case "down":tY+=1;tHereDirection="up";break;
			case "left":tX-=1;tHereDirection="right";break;
			case "right":tX+=1;tHereDirection="left";break;
			case "up":tY-=1;tHereDirection="down";break;
			default:
		}
		let tGround=MapFeild.getGround(tX,tY,tZ);
		//groundなし
		if(tGround==null)return null;
		//通過不可能なマス
		if(!tGround.canOn())return null;
		//他のキャラがいる
		if(tGround.getOnChara()!=null)return null;
		//高さが合わない
		if(tGround.getHeight(tHereDirection)!=this.ground.getHeight(aDirection))return null;
		return tGround;
	}
	//キャラのmeshを移動
	moveMesh(aDelta,aDirection,aNum){
		let tGoalPosition={x:this.mesh.position.x+aDelta.x,y:this.mesh.position.y+aDelta.y,z:this.mesh.position.z+aDelta.z};
		let tDelta={x:aDelta.x/mMoveFrame,y:aDelta.y/mMoveFrame,z:aDelta.z/mMoveFrame};
		return new Promise((res,rej)=>{
			let i=0;
			this.changeImage(aDirection,aNum);
			ThreeMap.setAnimation(()=>{
				if(i==mMoveFrame){
					this.changeImage(aDirection,1);
					this.mesh.position.x=tGoalPosition.x;
					this.mesh.position.y=tGoalPosition.y;
					this.mesh.position.z=tGoalPosition.z;
					return false;
				}
				this.mesh.position.x+=tDelta.x;
				this.mesh.position.y+=tDelta.y;
				this.mesh.position.z+=tDelta.z;
				i++;
				return true;
			},()=>{res()})
		})
	}
}
var mMoveFrame=10;
