class MapFeild{
	//マップセット
	static setMap(aMap){
		//カメラセット
		ThreeMap.setCamera({x:400,y:-1200,z:mGroundSize[2]+400},{x:0.95});

		this.encountData=aMap.encount;
		//マップセット
		this.map={};
		let tChipList=aMap.map.chip;
		ThreeMap.createChip(tChipList);
		let tMap=aMap.map.map;
		for(let tZ in tMap){
			tZ=Number(tZ);
			let tFlat=tMap[tZ];
			for(let tY in tFlat){
				tY=Number(tY);
				let tCol=tFlat[tY];
				let tX=0;
				for(let tChipNum of tCol){
					//x座標指定
					if(typeof(tChipNum)!="number"){
						tX=Number(tChipNum.x);
						continue;
					}
					//マスセット
					let tChip=tChipList[tChipNum];
					let tGround=new Ground({x:tX,y:tY,z:tZ},{key:tChipNum,data:tChip});
					if(this.map[tY]==undefined)this.map[tY]={};
					let tMapTemp=this.map[tY];
					if(tMapTemp[tX]==undefined)tMapTemp[tX]=new Array();
					tMapTemp=tMapTemp[tX];
					tMapTemp.push(tGround);
					tX++;
				}
			}
		}
		//マップ移動マスセット
		for(let tNeighbor of aMap.map.neighbor){
			let tChip=tChipList[tNeighbor.chip];
			let tMoveChip={};
			for(let tPropety in tChip){//chipをコピー(元の値を上書きしないように)
				tMoveChip[tPropety]=tChip[tPropety];
			}
			tMoveChip.event=[{event:"moveMap",mapName:tNeighbor.mapName,neighborPosition:tNeighbor.neighborPosition}];
			let tGround=new Ground({x:tNeighbor.x,y:tNeighbor.y,z:tNeighbor.z},{key:tNeighbor.chip,data:tMoveChip});
			if(this.map[tNeighbor.y]==undefined)this.map[tNeighbor.y]={};
			let tMapTemp=this.map[tNeighbor.y];
			if(tMapTemp[tNeighbor.x]==undefined)tMapTemp[tNeighbor.x]=new Array();
			tMapTemp=tMapTemp[tNeighbor.x];
			tMapTemp.push(tGround);
		}
		//creatureをセット

	}
	static getEncountData(){return this.encountData}
	//マスを取得(z,yは一致,zは最も近いマス)
	static getGround(aX,aY,aZ){
		if(this.map[aY]==undefined)return null;
		if(this.map[aY][aX]==undefined)return null;
		let tGrounds=this.map[aY][aX];
		let tNearGround;
		let tMinDistance=100;
		for(let tGround of tGrounds){
			let tPosition=tGround.getPosition();
			let tDistance=Math.abs(tPosition.z-aZ);
			if(tDistance<tMinDistance){
				if(tDistance==0)return tGround;
				tNearGround=tGround;
				tMinDistance=tDistance;
			}
		}
		return tNearGround;
	}
	//指定した座標を3dの座標に変換
	static convertToThreeWarldPosition(aPosition){
		return {x:mGroundSize[0]*aPosition.x,y:-mGroundSize[1]*aPosition.y,z:mGroundSize[2]*(1+aPosition.z)};
	}
	//マップリセット
	static releaseMap(){
		//ground
		let i=0;
		for(let tZ in this.map){
			let tFlat=this.map[tZ];
			for(let tY in tFlat){
				let tCol=tFlat[tY];
				for(let tX in tCol){
					let tGround=tCol[tX];
					tGround.destructor();
				}
			}
		}
		//Creature

	}
	//自キャラを操作可能に
	static enableOperate(){
		KeyMonitor.setInputKeyFunction((aKey)=>{this.inputKey(aKey)});
	}
	//キー入力
	static inputKey(aKey){
		switch (aKey) {
			case "up":
			case "down":
			case "left":
			case "right":
				mMyChara.moveByInput(aKey);
				break;
			case "ok":
				break;
			case "cancel":
				SceneChanger.changeToMenuScene();
				break;
			default:
		}
	}
}
var mMapScene=document.getElementById("mapScene");
var mGroundSize=[80,80,80];
