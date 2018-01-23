class StatusBoard{
	static init(){
		let tBoard=BarMaker.makeWinterBar(6);
		tBoard.image.style.webkitFilter="hue-rotate(40deg)";
		this.window=tBoard.tag;
		this.window.style.position="absolute";
		this.window.id="StatusBoard";
		this.board=tBoard.content;
		this.board.style.position="absolute";
		this.board.style.float="left";
		this.window.style.display="none";
		this.window.style.width="100%";
		//ボード内dom作成
		//画像
		this.imageBox=document.createElement("div");
		this.imageBox.style.width="20%";
		this.imageBox.style.height="100%";
		this.imageBox.style.display="inline-block";
		this.board.appendChild(this.imageBox);

		//画像以外のデータ
		this.dataBox=document.createElement("div");
		this.dataBox.style.width="80%";
		this.dataBox.style.height="100%";
		this.dataBox.style.display="inline-block";
		this.dataBox.style.verticalAlign="top";
		this.board.appendChild(this.dataBox);
		//データのヘッダ
		this.dataHead=document.createElement("div");
		this.dataHead.style.width="100%";
		this.dataHead.style.height="25%";
		this.dataBox.appendChild(this.dataHead);
		//名前
		this.nameBox=document.createElement("div");
		this.nameBox.style.width="20%";
		this.nameBox.style.height="100%";
		this.nameBox.style.display="inline-block";
		this.dataHead.appendChild(this.nameBox);
		//体力ゲージ
		this.tairyokuBox=document.createElement("div");
		this.tairyokuBox.style.width="20%";
		this.tairyokuBox.style.height="100%";
		this.tairyokuBox.style.display="inline-block";
		this.dataHead.appendChild(this.tairyokuBox);
		//経験値ゲージ
		this.experienceBox=document.createElement("div");
		this.experienceBox.style.width="20%";
		this.experienceBox.style.height="100%";
		this.experienceBox.style.display="inline-block";
		this.dataHead.appendChild(this.experienceBox);
		//アイテム
		this.itemBox=document.createElement("div");
		this.itemBox.style.width="15%";
		this.itemBox.style.height="100%";
		this.itemBox.style.display="inline-block";
		this.dataHead.appendChild(this.itemBox);
		//アクセサリ
		this.accessoryBox=document.createElement("div");
		this.accessoryBox.style.width="15%";
		this.accessoryBox.style.height="100%";
		this.accessoryBox.style.display="inline-block";
		this.dataHead.appendChild(this.accessoryBox);

		//データのフット
		this.dataFoot=document.createElement("div");
		this.dataFoot.style.width="100%";
		this.dataFoot.style.height="75%";
		this.dataBox.appendChild(this.dataFoot);
		//ステータス
		this.statusBox=document.createElement("div");
		this.statusBox.style.width="33%";
		this.statusBox.style.height="100%";
		this.statusBox.style.display="inline-block";
		this.statusBox.style.verticalAlign="top";
		this.dataFoot.appendChild(this.statusBox);
		//スキル
		this.skillBox=document.createElement("div");
		this.skillBox.style.width="35%";
		this.skillBox.style.height="100%";
		this.skillBox.style.display="inline-block";
		this.skillBox.style.verticalAlign="top";
		this.dataFoot.appendChild(this.skillBox);
		//移動力
		this.moveBox=document.createElement("div");
		this.moveBox.style.width="30%";
		this.moveBox.style.height="100%";
		this.moveBox.style.display="inline-block";
		this.moveBox.style.verticalAlign="top";
		this.dataFoot.appendChild(this.moveBox);

		mAlartScene.appendChild(this.window);
	}
	//情報セット
	static setPygmyData(aPygmy,aOption){
		//最後に表示したデータ記憶
		this.pygmy=aPygmy;
		this.option=aOption;
		//オプション反映
		if(aOption.top!=undefined)this.window.style.top=aOption.top;
		if(aOption.bottom!=undefined)this.window.style.bottom=aOption.bottom;
		if(aOption.right!=undefined)this.window.style.right=aOption.right;
		if(aOption.left!=undefined)this.window.style.left=aOption.left;
		//データ更新
		this.renewImage();
		this.renewName();
		this.renewTairyokuGage();
		this.renewExperienceGage();
		this.renewItem();
		this.renewAccessory();
		this.renewStatus();
		this.renewskill();
		this.renewMove();
	}
	//画像更新
	static renewImage(){
		this.imageBox.textContent="";
		let tImage=this.pygmy.getImageTag();
		tImage.style.width="100%";
		this.imageBox.appendChild(tImage);
	}
	//名前,種族など更新
	static renewName(){
		this.nameBox.textContent="";
		//名前
		let tName=document.createElement("div");
		tName.textContent=this.pygmy.getName();
		this.nameBox.appendChild(tName);
		//種族
		let tRace=document.createElement("div");
		tRace.textContent="種族:"+this.pygmy.getRaceName();
		this.nameBox.appendChild(tRace);
		//レベル
		let tLevel=document.createElement("div");
		tLevel.textContent="Lv."+this.pygmy.getLevel();
		this.nameBox.appendChild(tLevel);
	}
	//体力ゲージ更新
	static renewTairyokuGage(){
		this.tairyokuBox.textContent="";
		let tTairyoku=document.createElement("div");
		tTairyoku.textContent="たいりょく:"+this.pygmy.getCurrentTairyoku()+"/"+this.pygmy.getStatus().tairyoku;
		this.tairyokuBox.appendChild(tTairyoku);
		let tTairyokuGage=this.pygmy.getTairyokuGage("90%",mScreenSize.height/50+"px");
		this.tairyokuBox.appendChild(tTairyokuGage);
	}
	//経験値ゲージ更新
	static renewExperienceGage(){
		this.experienceBox.textContent="";
		let tExperience=document.createElement("div");
		tExperience.textContent="経験値:"+this.pygmy.getCurrentExperience()+"/"+this.pygmy.getNextExperience();
		this.experienceBox.appendChild(tExperience);
		let tExperienceGage=this.pygmy.getExperienceGage("90%",mScreenSize.height/50+"px");
		this.experienceBox.appendChild(tExperienceGage);
	}
	//持ち物更新
	static renewItem(){
		this.itemBox.textContent="";
		let tItem=this.pygmy.getItem();
		let tItemBar=ChoiceBarMaker.make("image/choiceBar/green/name/name.png",(tItem.possess==0)?"なし":ItemDictionary.get(tItem.name).name+"　x"+tItem.possess,{width:"95%"});
		this.itemBox.appendChild(tItemBar);
	}
	//アクセサリ更新
	static renewAccessory(){
		this.accessoryBox.textContent="";
		let tAccessory=this.pygmy.getAccessory();
		let tAccessoryBar=ChoiceBarMaker.make("image/choiceBar/yellow/name/name.png",(tAccessory=="")?"なし":ItemDictionary.get(tAccessory).name,{width:"95%"});
		this.accessoryBox.appendChild(tAccessoryBar);
	}
	//ステータス更新
	static renewStatus(){
		this.statusBox.textContent="";
		//アクセサリデータ取得
		let tAccessory=this.pygmy.getAccessory();
		if(tAccessory!="")tAccessory=ItemDictionary.get(tAccessory);
		//データ更新
		let tStatusButton=document.createElement("div");
		tStatusButton.textContent=(this.correction)?"補正込み":"補正抜き";
		tStatusButton.onclick=()=>{this.correction=(!this.correction);this.renewStatus();}
		this.statusBox.appendChild(tStatusButton);
		let tStatusTable=document.createElement("table");
		this.statusBox.appendChild(tStatusTable);
		let tStatus=this.pygmy.getStatus();
		let tStatusList=[{name:"たいりょく",property:"tairyoku"},{name:"きりょく",property:"kiryoku"},
			{name:"ちから",property:"tikara"},{name:"まりょく",property:"maryoku"},
			{name:"まもり",property:"mamori"},{name:"せいしん",property:"seisin"},
			{name:"わざ",property:"waza"},{name:"ゆりょく",property:"yuryoku"},
			{name:"びんせい",property:"binsei"},];
		let tInner="";
		for(let i=0;i<tStatusList.length;i++){
			let tAccessoryStatus=(tAccessory==""||tAccessory.status[tStatusList[i].property]==undefined)?0:tAccessory.status[tStatusList[i].property];
			let tCorrectionColor;//補正値の文字の色
			let tCorrectionLabel;//補正値("+"を文字列として含む)
			if(tAccessoryStatus<0){
				tCorrectionColor="#00f";
				tCorrectionLabel=tAccessoryStatus;
			}
			else if(tAccessoryStatus==0){
				tCorrectionColor="#000";
				tCorrectionLabel="+"+tAccessoryStatus;
			}
			else if(tAccessoryStatus>0){
				tCorrectionColor="#f00";
				tCorrectionLabel="+"+tAccessoryStatus;
			}
			//ステータス表示
			if(i%2==0)tInner+="<tr>";
			tInner+="<td>"+tStatusList[i].name+"</td><td>:</td>";//ステータス名
			if(this.correction)tInner+="<td style='color:"+tCorrectionColor+"'>"+(tStatus[tStatusList[i].property]+tAccessoryStatus)+"</td>";//補正込み
			else tInner+="<td>"+tStatus[tStatusList[i].property]+"</td>";//補正抜き
			tInner+="<td style='color:"+tCorrectionColor+"'>("+tCorrectionLabel+")</td>";//補正値
			if(i%2==1)tInner+="</tr>";
		}
		tStatusTable.innerHTML=tInner;
	}
	//スキル更新
	static renewskill(){
		this.skillBox.textContent="";
		//セットスキル
		let tSetBar=BarMaker.makeWinterBar(1,{trans:true});
		tSetBar.tag.style.maxWidth="50%";
		tSetBar.tag.style.maxHeight="105%";
		tSetBar.tag.style.width="100%";
		this.skillBox.appendChild(tSetBar.tag);
		let tSkillList=this.pygmy.getSettingSkill();
		for(let i=0;i<4;i++){
			let tSkillKey=tSkillList[i];
			let tSkill,tSkillName;
			if(tSkillKey!=""){
				tSkill=SkillDictionary.get(tSkillKey);
				tSkillName=tSkill.name;
			}
			if(i<2){
				let tBar=ChoiceBarMaker.make("image/choiceBar/yellow/name/name.png",tSkillName,{width:"100%"});
				tSetBar.content.appendChild(tBar);
			}
			else if(i==2){
				let tBar=ChoiceBarMaker.make("image/choiceBar/yellow/name/name.png",tSkillName,{width:"100%"});
				if(tSkillKey=="")tBar.style.webkitFilter="brightness(70%)";
				tSetBar.content.appendChild(tBar);
			}
			else{
				let tBar=ChoiceBarMaker.make("image/choiceBar/red/name/name.png",tSkill,{width:"100%"});
				tSetBar.content.appendChild(tBar);
			}
		}
		//習得スキル
		let tMasterBar=BarMaker.makeWinterBar(1,{trans:true});
		tMasterBar.tag.style.maxWidth="50%";
		tMasterBar.tag.style.maxHeight="105%";
		tMasterBar.tag.style.width="100%";
		this.skillBox.appendChild(tMasterBar.tag);
		for(let tSkillKey of this.pygmy.getMasteredSkill()){
			let tSkillName,tBarImage;
			if(tSkillKey==""){//スキルがセットされていない
				tSkillName="";
				tBarImage="image/choiceBar/yellow/name/name.png";
			}
			else{//スキルがセットされている
				let tSkill=SkillDictionary.get(tSkillKey);
				tSkillName=tSkill.name;
				tBarImage=(tSkill.passive)?"image/choiceBar/red/name/name.png":"image/choiceBar/yellow/name/name.png";
			}
			let tBar=ChoiceBarMaker.make(tBarImage,tSkillName,{width:"100%"});
			tMasterBar.content.appendChild(tBar);
		}
	}
	//移動力更新
	static renewMove(){
		this.moveBox.textContent="";
	}
	//データ変更可能にする
	static edit(){

	}
	//表示する
	static display(){
		this.window.style.display="block";
	}
	//非表示にする
	static close(){
		this.window.style.display="none";
	}
}
//最後に表示したデータ
StatusBoard.pygmy=null;
StatusBoard.option=null;
StatusBoard.correction=false;
StatusBoard.init();
