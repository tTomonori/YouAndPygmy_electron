class SkillButton{
	static init(){
		//ボタン
		this.button=document.createElement("div");
		this.button.id="skillButton";
		this.button.style.position="absolute";
		this.button.style.top=mButtonSize+"px";
		this.button.style.left="0";
		this.button.style.width=mButtonSize+"px";
		this.button.style.height=mButtonSize+"px";
		// this.button.style.background="#f33";
		this.buttonImage=document.createElement("img");
		this.buttonImage.src="image/ui/skillButton.png";
		this.buttonImage.style.position="absolute";
		this.buttonImage.style.top="0";
		this.buttonImage.style.left="0";
		this.buttonImage.style.width="100%";
		this.skillImage=document.createElement("img");
		this.skillImage.src="image/ui/skill.png";
		this.skillImage.style.position="absolute";
		this.skillImage.style.top="15%";
		this.skillImage.style.left="15%";
		this.skillImage.style.width="70%";
		this.button.appendChild(this.buttonImage);
		this.button.appendChild(this.skillImage);
		mBattleSecene.appendChild(this.button);
		this.button.onclick=()=>{this.click();}
		//スキルリスト
		this.skillList=document.createElement("div");
		this.skillList.id="skillList";
		this.skillList.style.position="absolute";
		this.skillList.style.top=mButtonSize+"px";
		this.skillList.style.left=mButtonSize+"px";
		this.skillList.style.width=mScreenSize.width/4+"px";
		this.skillList.style.background="#00d6c3";
		this.skillList.style.borderRadius="10px";
		this.skillList.style.color="#fff";
		this.skillList.style.display="none";
		mBattleSecene.appendChild(this.skillList);
		this.skills=new Array();
		this.skillNum=3;//スキルの最大数
		for(let i=0;i<this.skillNum;i++){
			let tSkillTag=document.createElement("div");
			tSkillTag.style.width="94%";
			tSkillTag.style.height=mScreenSize.width/20+"px";
			tSkillTag.style.marginLeft="3%";
			tSkillTag.style.marginTop="7px";
			tSkillTag.style.background="#1b11dd";
			tSkillTag.style.borderRadius="7px";
			this.skillList.appendChild(tSkillTag);
			this.skills.push(tSkillTag);
		}
		let tMarginBox=document.createElement("div");
		tMarginBox.style.marginBottom="7px";
		this.skillList.appendChild(tMarginBox);
		this.skills.push(tMarginBox);

		//ボタンのクリックが有効かどうか
		this.activeButtonFlag=false;
	}
	//クリックされた時
	static click(){}
	//リストをクリックする
	static clickList(aNum){
		//ボタンのクリックが無効になっていたら実行しない
		if(!this.activeButtonFlag)return;
		this.skills[aNum].click();
	}
	//クリックした時に実行する関数セット
	static setClickFunction(aFunction){
		this.click=()=>{aFunction()}
		this.activeButtonFlag=true;
	}
	//クリックした時に実行する関数リセット
	static resetClickFunction(){
		this.activeButtonFlag=false;
		this.click=()=>{}
	}
	//スキルリストセット
	static setSkillList(aSkillList){
		for(let i=0;i<this.skillNum;i++){
			let tSkillTag=this.skills[i];
			if(i>=aSkillList.length){
				tSkillTag.style.display="none";
				tSkillTag.onclick=()=>{}
				continue;
			}
			let tSkill=aSkillList[i];
			tSkillTag.textContent=tSkill.name;
			tSkillTag.onclick=()=>{CharaController.selectedSkill(tSkill)};
			tSkillTag.style.display="block";
		}
	}
	//スキルリストを表示していたらture
	static isDisplayed(){
		return this.skillList.style.display=="block";
	}
	//スキルを表示
	static displaySkill(aSkillList){
		this.skillList.style.display="block";
	}
	//スキルリスト非表示
	static hideSkillList(){
		this.skillList.style.display="none";
	}
}
