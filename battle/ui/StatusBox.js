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
	//スキル用の情報box作成
	static createSkillBox(){
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
		//スキル画像
		let tSkill=document.createElement("img");
		tSkill.classList.add("skillImage");
		tSkill.style.position="absolute";
		tSkill.style.width="100%";
		tSkill.style.left="0";
		tSkill.style.top="0";
		tSkill.style.width=tImageContainer.width;
		tImageContainer.appendChild(tSkill);
		//スキル名
		let tNameBox=document.createElement("div");
		tNameBox.classList.add("nameBox")
		tNameBox.style.position="absolute";
		tNameBox.style.top="0";
		tNameBox.style.left=this.infoBoxSize.width/4+"px";
		tNameBox.style.height=this.infoBoxSize.height/3+"px";
		tBox.appendChild(tNameBox);
		// //属性
		// let tAttribute=document.createElement("div");
		// tAttribute.style.position="absolute";
		// tAttribute.style.top=this.infoBoxSize.height/3+"px";
		// tAttribute.style.left=this.infoBoxSize.width/4+"px";
		// tAttribute.style.height=this.infoBoxSize.height/3+"px";
		// let tAttributeLabel=document.createElement("span");
		// tAttributeLabel.textContent="属性　";
		// tAttribute.appendChild(tAttributeLabel);
		// let tAttributeValue=document.createElement("span");
		// tAttribute.appendChild(tAttributeValue);
		// tBox.appendChild(tAttribute);
		//属性,消費きりょく
		let tAttributeAndWillpower=document.createElement("div");
		tAttributeAndWillpower.style.position="absolute";
		tAttributeAndWillpower.style.bottom=this.infoBoxSize.height/3+"px";
		tAttributeAndWillpower.style.left=this.infoBoxSize.width/4+"px";
		tAttributeAndWillpower.style.height=this.infoBoxSize.height/3+"px";
		tAttributeAndWillpower.style.width=this.infoBoxSize.width/4+"px";
		//属性
		let tAttribute=document.createElement("span");
		tAttribute.style.position="absolute";
		tAttribute.style.top="0";
		tAttribute.style.left="0";
		tAttribute.style.height="100%";
		tAttribute.style.width=this.infoBoxSize.width/8+"px";
		let tAttributeLabel=document.createElement("span");
		tAttributeLabel.textContent="属性";
		tAttribute.appendChild(tAttributeLabel);
		tAttribute.appendChild(document.createElement("br"));
		let tAttributeValue=document.createElement("span");
		tAttribute.appendChild(tAttributeValue);
		tAttributeAndWillpower.appendChild(tAttribute);
		//きりょく
		let tWillpower=document.createElement("span");
		tWillpower.style.position="absolute";
		tWillpower.style.top="0";
		tWillpower.style.right="0";
		tWillpower.style.height="100%";
		tWillpower.style.width=this.infoBoxSize.width/8+"px";
		let tWillpowerLabel=document.createElement("span");
		tWillpowerLabel.textContent="きりょく";
		tWillpower.appendChild(tWillpowerLabel);
		tWillpower.appendChild(document.createElement("br"));
		let tWillpowerValue=document.createElement("span");
		tWillpower.appendChild(tWillpowerValue);
		tAttributeAndWillpower.appendChild(tWillpower);
		tBox.appendChild(tAttributeAndWillpower);
		//威力,命中
		let tPowerAndAccuracy=document.createElement("div");
		tPowerAndAccuracy.style.position="absolute";
		tPowerAndAccuracy.style.bottom="0";
		tPowerAndAccuracy.style.left=this.infoBoxSize.width/4+"px";
		tPowerAndAccuracy.style.height=this.infoBoxSize.height/3+"px";
		tPowerAndAccuracy.style.width=this.infoBoxSize.width/4+"px";
		//威力
		let tPower=document.createElement("span");
		tPower.style.position="absolute";
		tPower.style.top="0";
		tPower.style.left="0";
		tPower.style.height="100%";
		tPower.style.width=this.infoBoxSize.width/8+"px";
		let tPowerLabel=document.createElement("span");
		tPowerLabel.textContent="威力";
		tPower.appendChild(tPowerLabel);
		tPower.appendChild(document.createElement("br"));
		let tPowerValue=document.createElement("span");
		tPower.appendChild(tPowerValue);
		tPowerAndAccuracy.appendChild(tPower);
		//命中
		let tAccuracy=document.createElement("span");
		tAccuracy.style.position="absolute";
		tAccuracy.style.top="0";
		tAccuracy.style.right="0";
		tAccuracy.style.height="100%";
		tAccuracy.style.width=this.infoBoxSize.width/8+"px";
		let tAccuracyLabel=document.createElement("span");
		tAccuracyLabel.textContent="命中";
		tAccuracy.appendChild(tAccuracyLabel);
		tAccuracy.appendChild(document.createElement("br"));
		let tAccuracyValue=document.createElement("span");
		tAccuracy.appendChild(tAccuracyValue);
		tPowerAndAccuracy.appendChild(tAccuracy);
		tBox.appendChild(tPowerAndAccuracy);

		let tCreateRangeBox=((aName,aPosition)=>{//攻撃範囲情報表示欄生成
			let tRangeBox=document.createElement("div");
			tRangeBox.style.position="absolute";
			tRangeBox.style.right=(aPosition=="left")?this.infoBoxSize.width/4+"px":"0";
			tRangeBox.style.width=this.infoBoxSize.width/4+"px";
			tRangeBox.style.height=this.infoBoxSize.height/2+"px";
			let tName=document.createElement("span");
			tName.textContent=aName;
			tRangeBox.appendChild(tName);
			tRangeBox.appendChild(document.createElement("br"));
			let tValue=document.createElement("span");
			tRangeBox.appendChild(tValue);
			return tRangeBox;
		})
		//範囲
		let tRange=tCreateRangeBox("範囲","left");
		tRange.style.top="0";
		tBox.appendChild(tRange);
		//巻き込み範囲
		let tInvolve=tCreateRangeBox("巻き込み","right");
		tInvolve.style.top="0";
		tBox.appendChild(tInvolve);
		//物体貫通
		let tObject=tCreateRangeBox("障害物貫通","left");
		tObject.style.bottom="0";
		tBox.appendChild(tObject);
		// 反撃
		let tCounter=tCreateRangeBox("反撃","right");
		tCounter.style.bottom="0";
		tBox.appendChild(tCounter);

		return tBox;
	}
	//アイテム用の情報box作成
	static createItemBox(){
		// let tBox=document.createElement("div");
		// return tBox;
		return this.createSkillBox();
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
		let tNowValue=aChara.getTairyoku();
		let tMaxValue=aChara.getMaxTairyoku();
		tGageContainer.children[0].children[1].textContent=tNowValue;
		tGageContainer.children[0].children[3].textContent=tMaxValue;
		tGageContainer.children[1].firstChild.style.width=tNowValue/tMaxValue*100+"%";
		//きりょく
		tGageContainer=aTag.children[3];
		tNowValue=aChara.getKiryoku();
		tMaxValue=aChara.getMaxKiryoku();
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
		//画像セット
		aTag.children[0].firstChild.src="";
		//スキル名
		aTag.children[1].textContent=aSkill.name;
		//属性
		switch (aSkill.attribute) {
			case "physics":
				aTag.children[2].children[0].children[2].textContent="物理";
				break;
			case "magic":
				aTag.children[2].children[0].children[2].textContent="魔法";
				break;
			case "heal":
				aTag.children[2].children[0].children[2].textContent="回復";
				break;
			default:
		}
		//消費気力
		aTag.children[2].children[1].children[2].textContent=(aSkill.mp==undefined)?"---":aSkill.mp;
		//威力
		switch (aSkill.magnification) {
			case "addition"://加算
				aTag.children[3].children[0].children[2].textContent=(aSkill.power<0)?aSkill.power:"+"+aSkill.power;
				break;
			case "multiplication"://乗算
				aTag.children[3].children[0].children[2].textContent=aSkill.power*100+"%";
				break;
			case "fixed"://固定
				aTag.children[3].children[0].children[2].textContent="固定"+aSkill.power;
				break;
			default:
		}
		//命中
		aTag.children[3].children[1].children[2].textContent=aSkill.accuracy+"%";
		//範囲
		aTag.children[4].children[2].textContent="";
		for(let i=0;i<aSkill.range.length;i++){
			let tRange=aSkill.range[i];
			if(i>0)aTag.children[4].children[2].textContent+=",";
			switch (tRange.range) {
				case "circumference":
					aTag.children[4].children[2].textContent+="射程"+tRange.value;
					break;
				case "straight":
					aTag.children[4].children[2].textContent+="直線"+tRange.value;
					break;
				case "my":
					aTag.children[4].children[2].textContent+="自分";
					break;
				default:
			}
		}
		//巻き込み範囲
		switch (aSkill.involve.involve) {
			case "none":
				aTag.children[5].children[2].textContent="---";
				break;
			case "circumference":
				aTag.children[5].children[2].textContent="周囲距離"+aSkill.involve.value;
				break;
			case "through":
				aTag.children[5].children[2].textContent="直線貫通";
				break;
			default:
		}
		//障害物貫通
		aTag.children[6].children[2].textContent=(aSkill.object)?"可":"不可";
		//反撃
		aTag.children[7].children[2].textContent=(aSkill.counter)?"可":"---";
	}
	//アイテム情報セット
	static setItemInfo(aItem,aTag){
		this.setSkillInfo(aItem,aTag);
	}
}
