class MapFeild{
	//マップセット
	static setMap(aMap){
		ThreeMap.init();
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
			let tGround=new Ground({x:tNeighbor.x,y:tNeighbor.y,z:tNeighbor.z},{key:tNeighbor.chip,data:tChipList[tNeighbor.chip]});
			if(this.map[tNeighbor.y]==undefined)this.map[tNeighbor.y]={};
			let tMapTemp=this.map[tNeighbor.y];
			if(tMapTemp[tNeighbor.x]==undefined)tMapTemp[tNeighbor.x]=new Array();
			tMapTemp=tMapTemp[tNeighbor.x];
			tMapTemp.push(tGround);
		}
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
}
var mMapScene=document.getElementById("mapScene");
var mGroundSize=[80,80,80];
