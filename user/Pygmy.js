class Pygmy{
	constructor(aData){
		this.name=aData.name;
		this.raceData=PygmyDictionary.get(aData.race);
		this.level=aData.level;
		this.status=PygmyDictionary.calcuStatus(this.raceData.raceStatus,this.level);
		this.currentTairyoku=(aData.tairyoku=="max")?this.status.tairyoku:aData.tairyoku;
		this.skills=aData.skill;
		this.item=aData.item;
		this.accessory=aData.accessory;
		this.closeness=aData.closeness;
	}
	getName(){return this.name}
	getRaceName(){return this.raceData.race}
	getLevel(){return this.level}
	getStatus(){return this.status}
	getCurrentExperience(){return 70}
	getNextExperience(){return 100}
	getCurrentTairyoku(){return this.currentTairyoku}
	getItems(){
		let tItems=new Array();
		for(let tItemData of this.item){
			tItems.push({data:ItemDictionary.get(tItemData.name),possess:tItemData.possess})
		}
		return tItems;
	}
	getAccessories(){
		let tAccessories=new Array();
		for(let tAccessoryName of this.accessory){
			tAccessories.push(AccessoryDictionary.get(tAccessoryName));
		}
		return tAccessories;
	}
	setCurrentTairyoku(aTairyoku){this.currentTairyoku=aTairyoku}
	setItem(aItem){this.item=aItem}
	//体力ゲージ取得
	getTairyokuGage(aWidth,aHeight){return Gage.createGage({width:aWidth,height:aHeight},{max:this.status.tairyoku,current:this.currentTairyoku},"tairyoku")}
	//気力ゲージ取得
	getKiryokuGage(aWidth,aHeight){return Gage.createGage({width:aWidth,height:aHeight},{max:0,current:0},"kiryoku")}
	//経験値ゲージ取得
	getExperienceGage(aWidth,aHeight){return Gage.createGage({width:aWidth,height:aHeight},{max:100,current:70},"experience")}
	//バトル用のデータ取得
	getBattleData(){
		let tData={
			name:this.name,
			race:this.raceData.race,
			level:this.level,
			status:this.status,
			skill:this.skills,
			item:this.item,
			moc:this.raceData.moveCost,
			image:this.raceData.image,
			ai:"user",
		}
		tData.status.currentTairyoku=this.currentTairyoku;//現在のたいりょく
		//アクセサリ情報付与
		tData.image.accessory=new Array();
		for(let tAccessoryName of this.accessory){
			let tAccessory=AccessoryDictionary.get(tAccessoryName);
			tData.image.accessory.push(tAccessory);
			//ステータス補正
			for(let tStatus in tAccessory.status){
				tData.status[tStatus]+=tAccessory.status[tStatus];
				if(tStatus=="tairyoku")tData.status.currentTairyoku+=tAccessory.status[tStatus];//体力補正なら現在体力に補正をかける
			}
		}
		return tData;
	}
	//ぴぐみーの画像タグを返す
	getImageTag(){
		let tTag=document.createElement("div");
		tTag.style.position="relative";
		//体
		let tBodyImage=document.createElement("img");
		tBodyImage.src=ImagePathMaker.getBodyPath(this.raceData.image.body);
		// tBodyImage.style.position="absolute";
		// tBodyImage.style.top="0";
		// tBodyImage.style.left="0";
		tBodyImage.style.width="100%";
		tTag.appendChild(tBodyImage);
		//目
		let tEyeImage=document.createElement("img");
		tEyeImage.src=ImagePathMaker.getEyePath(this.raceData.image.eye.normal);
		tEyeImage.style.position="absolute";
		tEyeImage.style.top="0";
		tEyeImage.style.left="0";
		tEyeImage.style.width="100%";
		tTag.appendChild(tEyeImage);
		//口
		let tMouthImage=document.createElement("img");
		tMouthImage.src=ImagePathMaker.getMouthPath(this.raceData.image.mouth.normal);
		tMouthImage.style.position="absolute";
		tMouthImage.style.top="0";
		tMouthImage.style.left="0";
		tMouthImage.style.width="100%";
		tTag.appendChild(tMouthImage);
		//アクセサリ
		for(let tAccessoryName of this.accessory){
			let tAccessory=AccessoryDictionary.get(tAccessoryName);
			let tAccessoryImage=document.createElement("img");
			tAccessoryImage.src=ImagePathMaker.getAccessoryPath(tAccessory.image);
			tAccessoryImage.style.position="absolute";
			tAccessoryImage.style.top="0";
			tAccessoryImage.style.left="0";
			tAccessoryImage.style.width="100%";
			tTag.appendChild(tAccessoryImage);
		}
		return tTag;
	}
	//アイテムを預かる
	receiveItem(){
		let tItem=this.item;
		this.item=[];
		return tItem;
	}
	//アイテムを持たせる
	haveItem(aItemName,aNum){
		this.item.push({name:aItemName,possess:aNum});
	}
	//たいりょくを回復する
	heal(aValue){
		this.currentTairyoku+=aValue;
		if(this.status.tairyoku<this.currentTairyoku)this.currentTairyoku=this.status.tairyoku;
	}
}
