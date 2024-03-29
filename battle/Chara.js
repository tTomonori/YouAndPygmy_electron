class Chara{
	constructor(aData,aTeam){
		this.data=aData;
		this.name=aData.name;
		this.race=aData.race;
		this.maxTairyoku=aData.status.tairyoku;
		this.maxKiryoku=aData.status.kiryoku;
		this.tairyoku=aData.status.currentTairyoku;
		this.kiryoku=this.maxKiryoku;
		this.tikara=aData.status.tikara;
		this.mamori=aData.status.mamori;
		this.maryoku=aData.status.maryoku;
		this.seisin=aData.status.seisin;
		this.yuryoku=aData.status.yuryoku;
		this.waza=aData.status.waza;
		this.binsei=aData.status.binsei;
		this.idou=aData.status.idou;
		this.item=aData.item;
		this.moc=aData.moc;
		this.image=aData.image;
		this.ai=aData.ai;
		//チーム
		this.team=aTeam
		//スキルデータを取得して記憶
		this.skill=new Array();
		for(let tSkillName of aData.skill){
			this.skill.push(SkillDictionary.get(tSkillName));
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
	getTairyoku(){return this.tairyoku;}
	getMaxTairyoku(){return this.maxTairyoku;}
	getKiryoku(){return this.kiryoku;}
	getMaxKiryoku(){return this.maxKiryoku;}
	getTikara(){return this.tikara;}
	getMamori(){return this.mamori;}
	getMaryoku(){return this.maryoku;}
	getSeisin(){return this.seisin;}
	getYuryoku(){return this.yuryoku;}
	getBinsei(){return this.binsei;}
	getWaza(){return this.waza;}
	getMove(){return this.idou;}
	getSkill(){return this.skill;}
	getItem(){return this.item;}
	getMoveCost(){return this.moc;}
	getImage(){return this.image;}
	getAi(){return this.ai;}
	getPosition(){return {x:this.x,y:this.y};}
	getMas(){return Feild.getMas(this.x,this.y)}
	getTeam(){return this.team;}
	getAcconpanyingNumber(){return this.data.acconpanyingNumber}//ユーザの手持ちの何番目か
	//戦闘不能判定
	isDown(){return (this.tairyoku<=0)}
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
		// let tMas=Feild.getMas(aX,aY);
		// tMas.on(this);
		this.makeImage();
		this.setPosition(aX,aY);
	}
	//キャラの移動後の座標セット
	setPosition(aX,aY){
		Feild.getMas(this.x,this.y).out();
		this.x=aX;
		this.y=aY;
		Feild.getMas(aX,aY).on(this);
		//画像の位置セット
		let tThreePosition=Feild.convertToThreeFeildPosition(this.x,this.y);
		this.bodyMesh.position.x=tThreePosition.x;
		this.bodyMesh.position.y=tThreePosition.y;
		this.bodyMesh.renderOrder=this.y+0.3;
		this.eyeMesh.position.x=tThreePosition.x;
		this.eyeMesh.position.y=tThreePosition.y;
		this.eyeMesh.renderOrder=this.y+0.31;
		this.mouthMesh.position.x=tThreePosition.x;
		this.mouthMesh.position.y=tThreePosition.y;
		this.mouthMesh.renderOrder=this.y+0.31;
		for(let tAccessory of this.accessoryMeshs){
			tAccessory.position.x=tThreePosition.x;
			tAccessory.position.y=tThreePosition.y;
			tAccessory.renderOrder=this.y+0.32;
		}
		this.shadowMesh.position.x=tThreePosition.x;
		this.shadowMesh.position.y=tThreePosition.y;
		this.shadowMesh.renderOrder=this.y+0.1;
	}
	//3dイメージ作成
	makeImage(){
		let tPosition=[mMasSize[0],0,mMasSize[2]*3/2];
		let tThreePosition=Feild.convertToThreeFeildPosition(this.x,this.y);
		//体
		this.bodyMesh=ThreeFeild.createChara(tPosition,ImagePathMaker.getBodyPath(this.image.body));
		this.bodyMesh.position.x=tThreePosition.x;
		this.bodyMesh.position.y=tThreePosition.y;
		this.bodyMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		// this.bodyMesh.material[3].depthTest=false;
		this.bodyMesh.material.transparent=true;
		//目
		this.eyeMesh=ThreeFeild.createChara(tPosition,ImagePathMaker.getEyePath(this.image.eye.normal));
		this.eyeMesh.position.x=tThreePosition.x;
		this.eyeMesh.position.y=tThreePosition.y;
		this.eyeMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		// this.eyeMesh.material[3].depthTest=false;
		this.eyeMesh.material.transparent=true;
		//口
		this.mouthMesh=ThreeFeild.createChara(tPosition,ImagePathMaker.getMouthPath(this.image.mouth.normal));
		this.mouthMesh.position.x=tThreePosition.x;
		this.mouthMesh.position.y=tThreePosition.y;
		this.mouthMesh.position.z=mMasSize[2]+mMasSize[2]/3;
		// this.mouthMesh.material[3].depthTest=false;
		this.mouthMesh.material.transparent=true;
		//アクセサリ
		this.accessoryMeshs=new Array();
		for(let tAccessoryPath of this.image.accessory){
			let tAccessory=ThreeFeild.createChara(tPosition,ImagePathMaker.getAccessoryPath(tAccessoryPath.image));
			tAccessory.position.x=tThreePosition.x;
			tAccessory.position.y=tThreePosition.y;
			tAccessory.position.z=mMasSize[2]+mMasSize[2]/3;
			// tAccessory.material[3].depthTest=false;
			tAccessory.material.transparent=true;

			this.accessoryMeshs.push(tAccessory);
		}
		//影(チーム判別用)
		this.shadowMesh=ThreeFeild.createCylinder(mMasSize[0]/6,1);
		this.shadowMesh.position.x=tThreePosition.x;
		this.shadowMesh.position.y=tThreePosition.y;
		this.shadowMesh.rotation.x=Math.PI/2;
		this.shadowMesh.position.z=mMasSize[2]/2+1;
		this.shadowMesh.renderOrder=-1;
		this.shadowMesh.material.transparent=true;
		this.shadowMesh.material.opacity=0.8;
		this.shadowMesh.material.color=mTeamColor[this.team];
		//メッシュにインスタンスを付与する
		this.bodyMesh.className="chara";
		this.bodyMesh.class=this;
		//画像変更用
		this.damageEyeImage=document.createElement("img");
		this.damageEyeImage.src=ImagePathMaker.getEyePath(this.image.eye.damage);
		this.damageEyeImage=new THREE.Texture(this.damageEyeImage);
		this.damageEyeImage.needsUpdate=true;
		this.damageEyeImage.minFilter=THREE.LinearFilter;
		this.normalEyeImage=document.createElement("img");
		this.normalEyeImage.src=ImagePathMaker.getEyePath(this.image.eye.normal);
		this.normalEyeImage=new THREE.Texture(this.normalEyeImage);
		this.normalEyeImage.needsUpdate=true;
		this.normalEyeImage.minFilter=THREE.LinearFilter;
		this.damageMouthImage=document.createElement("img");
		this.damageMouthImage.src=ImagePathMaker.getMouthPath(this.image.mouth.damage);
		this.damageMouthImage=new THREE.Texture(this.damageMouthImage);
		this.damageMouthImage.needsUpdate=true;
		this.damageMouthImage.minFilter=THREE.LinearFilter;
		this.normalMouthImage=document.createElement("img");
		this.normalMouthImage.src=ImagePathMaker.getMouthPath(this.image.mouth.normal);
		this.normalMouthImage=new THREE.Texture(this.normalMouthImage);
		this.normalMouthImage.needsUpdate=true;
		this.normalMouthImage.minFilter=THREE.LinearFilter;
	}
	//3dイメージに関数実行
	operateMaterials(aFunction){
		aFunction(this.bodyMesh.material[3]);
		aFunction(this.eyeMesh.material[3]);
		aFunction(this.mouthMesh.material[3]);
		for(let tMesh of this.accessoryMeshs){
			aFunction(tMesh.material[3]);
		}
		// aFunction(this.shadowMesh.material);
	}
	operateMeshs(aFunction){
		aFunction(this.bodyMesh);
		aFunction(this.eyeMesh);
		aFunction(this.mouthMesh);
		for(let tMesh of this.accessoryMeshs){
			aFunction(tMesh);
		}
		// aFunction(this.shadowMesh);
	}
	//ダメージを受けた時用の顔画像に変更する
	changeToDamageFace(){
		this.eyeMesh.material[3].map=this.damageEyeImage;
		this.mouthMesh.material[3].map=this.damageMouthImage;
	}
	//通常時の顔に変更する
	changeToNormalFace(){
		this.eyeMesh.material[3].map=this.normalEyeImage;
		this.mouthMesh.material[3].map=this.normalMouthImage;
	}
	//指定されたマスへ移動
	move(aMas,aFunction){
		let tPosition=aMas.getPosition();
		let tTarget=Feild.convertToThreeFeildPosition(tPosition.x,tPosition.y);
		ThreeFeild.setMoveAnimation([this.bodyMesh,this.eyeMesh,this.mouthMesh,this.shadowMesh].concat(this.accessoryMeshs),tTarget,300,()=>{aFunction();})
	}
	//気力を消費する
	useKiryoku(aMp){
		this.kiryoku-=aMp;
	}
	//アイテムを使用した
	useItem(aItemName){
		// for(let i=0;i<this.item.length;i++){
		// 	let tItem=this.item[i];
		// 	if(tItem.name!=aItemName)continue;
		// 	tItem.possess--;
		// 	//アイテムがなくなった
		// 	if(tItem.possess<=0)this.item.splice(i,1);
		// }
		this.item.possess-=1;
	}
	//文字を表示
	displayText(aText,aColor,aAnimation,aLength){
		let tTextlength=(aLength==undefined)?String(aText).length:aLength;
		let tSize=mMasSize[0]/3;
		let tText=ThreeFeild.createTextObject(aText,tSize);
		let tPosition=this.bodyMesh.position;
		tText.position.x=tPosition.x-(tTextlength/2*tSize);
		tText.position.y=tPosition.y-5;
		tText.material.color=aColor;
		tText.renderOrder=this.bodyMesh.renderOrder+0.1;
		switch (aAnimation) {
			case "rise":
				tText.position.z=mMasSize[2]*1.5;
				return new Promise((res,rej)=>{
					let i=0;
					ThreeFeild.setAnimation(()=>{
						if(i>60){
							ThreeFeild.deleteObject(tText);
							return false;
						}
						tText.position.z+=0.6;
						i++;
						return true;
					},()=>{res();})
				})
				break;
			case "bound":
				let tZ=mMasSize[2]*1.5;
				let tAmplitude=mMasSize[0]/3;
				let tP=Math.PI/70;
				return new Promise((res,rej)=>{
					let i=0;
					ThreeFeild.setAnimation(()=>{
						if(i>66){
							ThreeFeild.deleteObject(tText);
							return false;
						}
						tText.position.z=tZ+tAmplitude*Math.sin(tP*i);
						i+=1.2;
						return true;
					},()=>{res();})
				})
				break;
			default:

		}
	}
	//ダメージを受ける
	damage(aDamage){
		this.tairyoku-=aDamage;
		if(this.tairyoku<0)this.tairyoku=0;
		// console.log(aDamage+"ダメージ");
		this.displayText(aDamage,{r:1,g:0,b:0},"bound");
	}
	//回復する
	heal(aDamage){
		this.tairyoku+=aDamage;
		if(this.tairyoku>this.maxTairyoku)this.tairyoku=this.maxTairyoku;
		// console.log(aDamage+"回復");
		this.displayText(aDamage,{r:0,g:1,b:0.2},"rise");
	}
	//スキル回避
	avoid(){
		// console.log("スキル回避");
		this.displayText("Miss",{r:0.3,g:0.3,b:0.3},"rise",2.6);
	}
	//被ダメージアニメ
	damagedAnimate(){
		this.changeToDamageFace();
		let i=0;
		return new Promise((res,rej)=>{
			ThreeFeild.setAnimation(()=>{
				if(i>55){
					//アニメ終了
					this.operateMaterials((aMesh)=>{
						aMesh.opacity=1;
					})
					this.changeToNormalFace();
					return false;
				}
				if(i%14==7){this.operateMaterials((aMaterial)=>{aMaterial.opacity=0;})}
				else if(i%14==0){this.operateMaterials((aMaterial)=>{aMaterial.opacity=1;})}
				i++;
				return true;
			},()=>{res();})
		})
	}
	//戦闘不能アニメ,戦闘不能処理
	down(){
		this.changeToDamageFace();
		this.shadowMesh.material.opacity=0;
		return new Promise((res,rej)=>{
			let i=0;
			ThreeFeild.setAnimation(()=>{
				if(i>50){
					//アニメーション終了
					this.deleteChara();
					return false;
				}
				this.operateMeshs((aMesh)=>{
					aMesh.position.z-=1;
					aMesh.material[3].opacity-=0.02;
				})
				i++;
				return true;
			},()=>{res();})
		})
	}
	//キャラをフィールドから消す
	deleteChara(){
		//3dイメージを削除
		this.operateMeshs((aMesh)=>{ThreeFeild.deleteObject(aMesh);})
		ThreeFeild.deleteObject(this.shadowMesh);
		this.normalEyeImage.dispose();
		this.damageEyeImage.dispose();
		this.normalMouthImage.dispose();
		this.damageMouthImage.dispose();
		//今いるマスから削除
		this.getMas().out();
		Battle.deleteChara(this);
	}
}

const mTeamColor={
	ally:{r:0,g:0,b:0.4},
	enemy:{r:0.4,g:0,b:0}
}
