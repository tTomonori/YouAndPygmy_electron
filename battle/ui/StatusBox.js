class StatusBox{
	static init(){
		this.accessoryNum=2;//アクセサリの最大数
		this.infoBoxSize={width:mScreenSize.width/2-2,height:(mScreenSize.width/2-2)/4}
		//ターン中のキャラ用
		this.turnCharaBox=this.createInfoBox();
		this.turnCharaBox.style.position="absolute";
		this.turnCharaBox.style.left="0";
		this.turnCharaBox.style.bottom="0";
		mBattleSecene.appendChild(this.turnCharaBox);
		this.turnCharaInfo=this.createCharaBox();
		this.turnCharaBox.appendChild(this.turnCharaInfo);
		//選択した キャラ,アイテム,スキル用
		this.selectedBox=this.createInfoBox();
		this.selectedBox.style.position="absolute";
		this.selectedBox.style.right="0";
		this.selectedBox.style.bottom="0";
		mBattleSecene.appendChild(this.selectedBox);
		this.selectedCharaInfo=this.createCharaBox();
		this.selectedCharaInfo.style.display="none";
		this.selectedBox.appendChild(this.selectedCharaInfo);
		this.selectedItemInfo=this.createItemBox();
		this.selectedItemInfo.style.display="none";
		this.selectedBox.appendChild(this.selectedItemInfo);
		this.selectedSkillInfo=this.createSkillBox();
		this.selectedSkillInfo.style.display="none";
		this.selectedBox.appendChild(this.selectedSkillInfo);
	}
	//情報を表示するためのbox作成
	static createInfoBox(){
		let tBox=document.createElement("div");
		tBox.style.width=this.infoBoxSize.width+"px";
		tBox.style.height=this.infoBoxSize.height+"px";
		tBox.style.background="#665511";
		tBox.style.border="solid 2px #443300";
		return tBox;
	}
	//キャラ用の情報box作成
	static createCharaBox(){
		let tBox=document.createElement("div");
		tBox.style.position="absolute";
		tBox.style.left="0";
		tBox.style.top="0";
		tBox.style.width="100%";
		tBox.style.height="100%";
		tBox.style.color="#fff";
		tBox.style.fontSize=this.infoBoxSize.width/4/9+"px";
		//画像
		let tImageContainer=document.createElement("div");
		tImageContainer.classList.add("imageContainer");
		tImageContainer.style.position="absolute";
		tImageContainer.style.letf="0";
		tImageContainer.style.top="0";
		tImageContainer.style.width=this.infoBoxSize.height+"px";
		tImageContainer.style.height=this.infoBoxSize.height+"px";
		tImageContainer.style.background="#eeeeff";
		tImageContainer.style.border="solid 1px #000";
		tImageContainer.style.overflow="hidden";
		tBox.appendChild(tImageContainer);
		//体画像
		let tBody=document.createElement("img");
		tBody.classList.add("bodyImage");
		tBody.style.position="absolute";
		tBody.style.width="100%";
		tBody.style.left="0";
		tBody.style.top="0";
		tBody.style.width=tImageContainer.width;
		tImageContainer.appendChild(tBody);
		//目画像
		let tEye=document.createElement("img");
		tEye.classList.add("eyeImage");
		tEye.style.position="absolute";
		tEye.style.width="100%";
		tEye.style.left="0";
		tEye.style.top="0";
		tEye.style.width=tImageContainer.width;
		tImageContainer.appendChild(tEye);
		//口画像
		let tMouth=document.createElement("img");
		tMouth.classList.add("mouthImage");
		tMouth.style.position="absolute";
		tMouth.style.width="100%";
		tMouth.style.left="0";
		tMouth.style.top="0";
		tMouth.style.width=tImageContainer.width;
		tImageContainer.appendChild(tMouth);
		//アクセサリ画像
		for(let i=0;i<this.accessoryNum;i++){
			let tAccessory=document.createElement("img");
			tAccessory.classList.add("accessory"+i+"Image");
			tAccessory.style.position="absolute";
			tAccessory.style.width="100%";
			tAccessory.style.left="0";
			tAccessory.style.top="0";
			tAccessory.style.width=tImageContainer.width;
			tImageContainer.appendChild(tAccessory);
		}
		//ステータス
		//名前,種族
		let tNameBox=document.createElement("div");
		tNameBox.classList.add("nameBox")
		tNameBox.style.position="absolute";
		tNameBox.style.top="0";
		tNameBox.style.left=this.infoBoxSize.width/4+"px";
		tNameBox.style.height=this.infoBoxSize.height/3+"px";
		let tName=document.createElement("span");
		tNameBox.appendChild(tName);
		tNameBox.appendChild(document.createElement("br"));
		let tRace=document.createElement("span");
		tNameBox.appendChild(tRace);
		tBox.appendChild(tNameBox);

		let tCreateGageBox=(aStatusName)=>{//ゲージ生成
			let tGageBox=document.createElement("div");
			tGageBox.style.position="absolute";
			tGageBox.style.left=this.infoBoxSize.height+"px"
			tGageBox.style.width=this.infoBoxSize.width/4+"px";
			tGageBox.style.height=this.infoBoxSize.height/3+"px";
			//ステータス名
			let tValues=document.createElement("div");
			let tName=document.createElement("span");
			tName.textContent=aStatusName+"　";
			tValues.appendChild(tName);
			//値
			let tNow=document.createElement("span");
			tValues.appendChild(tNow);
			let tSlash=document.createElement("span");
			tSlash.textContent="　/　"
			tValues.appendChild(tSlash);
			let tMax=document.createElement("span");
			tValues.appendChild(tMax);
			tGageBox.appendChild(tValues);
			//ゲージ
			let tGageMerter=document.createElement("div");
			tGageMerter.style.width="100%";
			tGageMerter.style.height=this.infoBoxSize.height/14+"px";
			tGageMerter.style.background="#f00";
			let tGage=document.createElement("div");
			tGage.classList.add("gage");
			tGage.style.height="100%";
			tGage.style.background="#00f";
			tGageMerter.appendChild(tGage);
			tGageBox.appendChild(tGageMerter);
			return tGageBox;
		}
		//ゲージありのステータスセット
		let tTairyoku=tCreateGageBox("体");
		tTairyoku.style.top=this.infoBoxSize.height/3+"px";
		tBox.appendChild(tTairyoku);
		let tKiryoku=tCreateGageBox("気");
		tKiryoku.style.bottom="0";
		tBox.appendChild(tKiryoku);

		let tCreateValueBox=(aStatusName,aPosition)=>{//ゲージ以外のステータス欄生成
			let tStatusBox=document.createElement("div");
			tStatusBox.style.position="absolute";
			tStatusBox.style.right=(aPosition=="left")?this.infoBoxSize.width/4+"px":"0";
			tStatusBox.style.width=this.infoBoxSize.width/4+"px";
			tStatusBox.style.height=this.infoBoxSize.height/4+"px";
			let tName=document.createElement("span");
			tName.textContent=aStatusName+"　";
			tStatusBox.appendChild(tName);
			let tValue=document.createElement("span");
			tStatusBox.appendChild(tValue);
			return tStatusBox;
		}
		//ゲージなしスのテータスセット
		let tTikara=tCreateValueBox("力","left");
		tTikara.style.top="0";
		tBox.appendChild(tTikara);
		let tMamori=tCreateValueBox("守","right");
		tMamori.style.top="0";
		tBox.appendChild(tMamori);
		let tMaryoku=tCreateValueBox("魔","left");
		tMaryoku.style.top=this.infoBoxSize.height/4+"px";
		tBox.appendChild(tMaryoku);
		let tSeisin=tCreateValueBox("精","right");
		tSeisin.style.top=this.infoBoxSize.height/4+"px";
		tBox.appendChild(tSeisin);
		let tYuryoku=tCreateValueBox("癒","left");
		tYuryoku.style.top=this.infoBoxSize.height/2+"px";
		tBox.appendChild(tYuryoku);
		let tWaza=tCreateValueBox("技","right");
		tWaza.style.top=this.infoBoxSize.height/2+"px";
		tBox.appendChild(tWaza);
		let tBinsei=tCreateValueBox("敏","left");
		tBinsei.style.bottom="0";
		tBox.appendChild(tBinsei);
		let tMove=tCreateValueBox("歩","right");
		tMove.style.bottom="0";
		tBox.appendChild(tMove);


		return tBox;
	}
	//アイテム用の情報box作成
	static createItemBox(){
		let tBox=document.createElement("div");
		return tBox;
	}
	//スキル用の情報box作成
	static createSkillBox(){
		let tBox=document.createElement("div");
		return tBox;
	}
	//ターン中のキャラの情報セット
	static setTurnCharaInfo(aChara){
		this.setCharaInfo(aChara,this.turnCharaInfo);
	}
	//選択したキャラの情報セット
	static setSelectedCharaInfo(aChara){
		this.selectedCharaInfo.style.display="block";
		this.selectedItemInfo.style.display="none";
		this.selectedSkillInfo.style.display="none";
		this.setCharaInfo(aChara,this.selectedCharaInfo);
	}
	//スキルの情報セット
	static setSelectedSkillInfo(aSkill){
		this.selectedCharaInfo.style.display="none";
		this.selectedItemInfo.style.display="none";
		this.selectedSkillInfo.style.display="block";
		this.setSkillInfo(aSkill,this.selectedSkillInfo);
	}
	//アイテムの情報セット
	static setSelectedItemInfo(aItem){
		this.selectedCharaInfo.style.display="none";
		this.selectedItemInfo.style.display="block";
		this.selectedSkillInfo.style.display="none";
		this.setItemInfo(aItem,this.selectedItemInfo);
	}
	//キャラ情報セット
	static setCharaInfo(aChara,aTag){
		let tImage=aChara.getImage();
		//画像セット
		let tImageContainer=aTag.children[0];
		tImageContainer.children[0].src="image/"+tImage.body+".png";
		tImageContainer.children[1].src="image/eye/"+tImage.eye.normal+".png";
		tImageContainer.children[2].src="image/mouth/"+tImage.mouth.normal+".png";
		for(let i=0;i<this.accessoryNum;i++){
			if(i>=tImage.accessory.length)tImageContainer.children[3+i].src="";
			else tImageContainer.children[3+i].src="image/accessory/"+tImage.accessory[i].image+".png";
		}
		//名前,種族
		let tNameContainer=aTag.children[1];
		let tName=aChara.getName();
		let tRace=aChara.getRace();
		tNameContainer.children[0].textContent=tName;
		tNameContainer.children[2].textContent=(tName==tRace)?"":"("+tRace+")";

		//たいりょく
		let tGageContainer=aTag.children[2];
		let tNowValue=aChara.getHp();
		let tMaxValue=aChara.getMaxHp();
		tGageContainer.children[0].children[1].textContent=tNowValue;
		tGageContainer.children[0].children[3].textContent=tMaxValue;
		tGageContainer.children[1].firstChild.style.width=tNowValue/tMaxValue*100+"%";
		//きりょく
		tGageContainer=aTag.children[3];
		tNowValue=aChara.getMp();
		tMaxValue=aChara.getMaxMp();
		tGageContainer.children[0].children[1].textContent=tNowValue;
		tGageContainer.children[0].children[3].textContent=tMaxValue;
		tGageContainer.children[1].firstChild.style.width=tNowValue/tMaxValue*100+"%";
		//ちから
		let tValueContainer=aTag.children[4];
		tValueContainer.children[1].textContent=aChara.getTikara();
		//まもり
		tValueContainer=aTag.children[5];
		tValueContainer.children[1].textContent=aChara.getMamori();
		//まりょく
		tValueContainer=aTag.children[6];
		tValueContainer.children[1].textContent=aChara.getMaryoku();
		//せいしん
		tValueContainer=aTag.children[7];
		tValueContainer.children[1].textContent=aChara.getSeisin();
		//ゆりょく
		tValueContainer=aTag.children[8];
		tValueContainer.children[1].textContent=aChara.getYuryoku();
		//わざ
		tValueContainer=aTag.children[9];
		tValueContainer.children[1].textContent=aChara.getWaza();
		//びんせい
		tValueContainer=aTag.children[10];
		tValueContainer.children[1].textContent=aChara.getBinsei();
		//いどう
		tValueContainer=aTag.children[11];
		tValueContainer.children[1].textContent=aChara.getMove();
	}
	//スキル情報セット
	static setSkillInfo(aSkill,aTag){
	}
	//アイテム情報セット
	static setItemInfo(aItem,aTag){
	}
}
