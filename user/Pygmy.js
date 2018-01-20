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
	getItem(){return this.item}
	getAccessory(){return this.accessory.status}
	getLooksAccessory(){return this.accessory.looks}
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
			status:$.extend(true, {}, this.status),
			skill:[],
			passive:[],
			item:this.item,
			moc:this.raceData.moveCost,
			image:this.raceData.image,
			ai:"user",
		}
		tData.status.currentTairyoku=this.currentTairyoku;//現在のたいりょく
		//スキル
		for(let tSkillName of this.skills.set){
			if(tSkillName=="")continue;
			let tSkillData=SkillDictionary.get(tSkillName);
			if(!tSkillData.passive)tData.skill.push(tSkillName);//通常のスキル
			else tData.passive.push(tSkillName);//パッシブスキル
		}

		//アクセサリ情報付与
		//見た目
		if(this.accessory.looks!=""||this.accessory.statu!=""){
			let tAccessory=(this.accessory.looks!="")?ItemDictionary.get(this.accessory.looks):ItemDictionary.get(this.accessory.status);
			tData.image.accessory=[tAccessory];
		}
		//ステータス補正
		if(this.accessory.status!=""){
			let tAccessory=ItemDictionary.get(this.accessory.status);
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
		if(this.accessory.looks!=""||this.accessory.status!=""){
			let tAccessory=(this.accessory.looks!="")?ItemDictionary.get(this.accessory.looks):ItemDictionary.get(this.accessory.status);
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
		this.item={possess:0};
		return tItem;
	}
	//アイテムを持たせる
	haveItem(aItemName,aNum){
		this.item=({name:aItemName,possess:aNum});
	}
	//アクセサリを外す
	takeOfAccessory(){
		let tAccessory=this.accessory.status;
		this.accessory.status="";
		return tAccessory;
	}
	//アクセサリを装備する
	equipAccessory(aAccessory){
		this.accessory.status=aAccessory;
	}
	//見た目アクセサリを外す
	dressDown(){
		let tAccessory=this.accessory.looks;
		this.accessory.looks="";
		return tAccessory;
	}
	//見た目アクセサリを装備
	dressUp(aAccessory){
		this.accessory.looks=aAccessory;
	}
	//たいりょくを回復する
	heal(aValue){
		this.currentTairyoku+=aValue;
		if(this.status.tairyoku<this.currentTairyoku)this.currentTairyoku=this.status.tairyoku;
	}
}
