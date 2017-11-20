class Chara{
	constructor(aData){
		this.data=aData;
		this.name=aData.name;
		this.race=aData.race;
		this.maxHp=aData.hp;
		this.maxMp=aData.mp;
		this.hp=this.maxHp;
		this.mp=this.maxMp;
		this.atk=aData.atk;
		this.def=aData.def;
		this.mgc=aData.mgc;
		this.spt=aData.spt;
		this.hel=aData.hel;
		this.tec=aData.tec;
		this.spd=aData.spd;
		this.mov=aData.mov;
		this.item=aData.item;
		this.moc=aData.moc;
		this.image=aData.image;
		this.ai=aData.ai;
		//スキルデータを取得して記憶
		this.skill=new Array();
		for(let tSkillName of aData.skill){
			this.skill.push(SkillDictionary.getSkill(tSkillName));
		}

		this.movablePositions={};//移動可能なマス
		this.root=[]//移動経路
		this.prePosition={}//移動前の座標
		this.nextPosition={}//移動後の座標
		this.lastSelectedSkill=null;//選択したスキル
	}
	//データ取得
	getName(){return this.name;}
	getRace(){return this.race;}
	getHp(){return this.hp;}
	getMaxHp(){return this.maxHp;}
	getMp(){return this.mp;}
	getMaxMp(){return this.maxMp;}
	getTikara(){return this.atk;}
	getMamori(){return this.def;}
	getMaryoku(){return this.mgc;}
	getSeisin(){return this.spt;}
	getYuryoku(){return this.hel;}
	getBinsei(){return this.spd;}
	getWaza(){return this.tec;}
	getMove(){return this.mov;}
	getSkill(){return this.skill;}
	getItem(){return this.item;}
	getMoveCost(){return this.moc;}
	getImage(){return this.image;}
	getAi(){return this.ai;}
	getPosition(){return {x:this.x,y:this.y};}
	getMas(){return Feild.getMas(this.x,this.y)}
	//最後に選択したスキル
	getLastSelectedSkill(){
		return this.lastSelectedSkill;
	}
	setLastSelectedSkill(aSkill){
		this.lastSelectedSkill=aSkill;
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
		Feild.getMas(this.x,this.y).out();
		this.x=aX;
		this.y=aY;
		Feild.getMas(aX,aY).on(this);
		//画像の位置セット
		let tThreePosition=Feild.convertToThreeWarldPosition(this.x,this.y);
		this.bodyMesh.position.x=tThreePosition.x;
		this.bodyMesh.position.y=tThreePosition.y;
		this.eyeMesh.position.x=tThreePosition.x;
		this.eyeMesh.position.y=tThreePosition.y;
		this.mouthMesh.position.x=tThreePosition.x;
		this.mouthMesh.position.y=tThreePosition.y;
		for(let tAccessory of this.accessoryMeshs){
			tAccessory.position.x=tThreePosition.x;
			tAccessory.position.y=tThreePosition.y;
		}
	}
	//3dイメージ作成
	makeImage(){
		let tPosition=[mMasSize[0],0,mMasSize[2]*3/2];
		let tThreePosition=Feild.convertToThreeWarldPosition(this.x,this.y);
		this.bodyMesh=ThreeWarld.createChara(tPosition,"image/"+this.image.body+".png");
		this.bodyMesh.position.x=tThreePosition.x;
		this.bodyMesh.position.y=tThreePosition.y;
		this.bodyMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		this.bodyMesh.material.transparent=true;
		this.eyeMesh=ThreeWarld.createChara(tPosition,"image/eye/"+this.image.eye.normal+".png");
		this.eyeMesh.position.x=tThreePosition.x;
		this.eyeMesh.position.y=tThreePosition.y;
		this.eyeMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		this.eyeMesh.material.transparent=true;
		this.mouthMesh=ThreeWarld.createChara(tPosition,"image/mouth/"+this.image.mouth.normal+".png");
		this.mouthMesh.position.x=tThreePosition.x;
		this.mouthMesh.position.y=tThreePosition.y;
		this.mouthMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		this.mouthMesh.material.transparent=true;
		this.accessoryMeshs=new Array();
		for(let tAccessoryPath of this.image.accessory){
			let tAccessory=ThreeWarld.createChara(tPosition,"image/accessory/"+tAccessoryPath.image+".png");
			tAccessory.position.x=tThreePosition.x;
			tAccessory.position.y=tThreePosition.y;
			tAccessory.position.z=mMasSize[2]+mMasSize[2]/3;
			tAccessory.material.transparent=true;

			this.accessoryMeshs.push(tAccessory);
		}

		this.bodyMesh.className="chara";
		this.bodyMesh.class=this;
		//画像変更用
		this.damageEyeImage=document.createElement("img");
		this.damageEyeImage.src="image/eye/"+this.image.eye.damage+".png";
		this.normalEyeImage=document.createElement("img");
		this.normalEyeImage.src="image/eye/"+this.image.eye.normal+".png";
		this.damageMouthImage=document.createElement("img");
		this.damageMouthImage.src="image/mouth/"+this.image.mouth.damage+".png";
		this.normalMouthImage=document.createElement("img");
		this.normalMouthImage.src="image/mouth/"+this.image.mouth.normal+".png";
	}
	//3dイメージに関数実行
	operateMesh(aFunction){
		aFunction(this.bodyMesh.material[3]);
		aFunction(this.eyeMesh.material[3]);
		aFunction(this.mouthMesh.material[3]);
		for(let tMesh of this.accessoryMeshs){
			aFunction(tMesh.material[3]);
		}
	}
	//ダメージを受けた時用の顔画像に変更する
	changeToDamageFace(){
		this.eyeMesh.material[3].map=new THREE.Texture(this.damageEyeImage);
		this.mouthMesh.material[3].map=new THREE.Texture(this.damageMouthImage);
		this.eyeMesh.material[3].map.needsUpdate=true;
		this.mouthMesh.material[3].map.needsUpdate=true;
		this.eyeMesh.material[3].map.minFilter=THREE.LinearFilter;
		this.mouthMesh.material[3].map.minFilter=THREE.LinearFilter;
	}
	//通常時の顔に変更する
	changeToNormalFace(){
		this.eyeMesh.material[3].map=new THREE.Texture(this.normalEyeImage);
		this.mouthMesh.material[3].map=new THREE.Texture(this.normalMouthImage);
		this.eyeMesh.material[3].map.needsUpdate=true;
		this.mouthMesh.material[3].map.needsUpdate=true;
		this.eyeMesh.material[3].map.minFilter=THREE.LinearFilter;
		this.mouthMesh.material[3].map.minFilter=THREE.LinearFilter;
	}
	//指定されたマスへ移動
	move(aMas,aFunction){
		let tPosition=aMas.getPosition();
		let tTarget=Feild.convertToThreeWarldPosition(tPosition.x,tPosition.y);
		ThreeWarld.setMoveAnimation([this.bodyMesh,this.eyeMesh,this.mouthMesh].concat(this.accessoryMeshs),tTarget,300,()=>{aFunction();})
	}
	//ダメージを受ける
	damage(aDamage){
		this.hp-=aDamage;
		if(this.hp<0)this.hp=0;
		console.log(aDamage+"ダメージ");
	}
	//回復する
	heal(aDamage){
		this.hp+=aDamage;
		if(this.hp>this.maxHp)this.hp=this.maxHp;
		console.log(aDamage+"回復");
	}
	//被ダメージアニメ
	damagedAnimate(aCallBack){
		let i=0;
		ThreeWarld.setAnimation(()=>{
			if(i>=56){
				this.operateMesh((aMesh)=>{
					aMesh.opacity=1;
				})
				this.changeToNormalFace();
				return false;
			}
			if(i==0){
				this.changeToDamageFace();
			}
			if(i%14==7){
				this.operateMesh((aMesh)=>{
					aMesh.opacity=0;
				})
			}
			if(i%14==0){
				this.operateMesh((aMesh)=>{
					aMesh.opacity=1;
				})
			}
			i++;
			return true;
		},()=>{aCallBack()})
	}
}