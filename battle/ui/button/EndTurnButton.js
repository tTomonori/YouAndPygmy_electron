class EndTurnButton{
	static init(){
		//ボタン
		this.button=document.createElement("div");
		this.button.id="skillButton";
		this.button.style.position="absolute";
		this.button.style.top=mButtonSize*4+"px";
		this.button.style.left="0";
		this.button.style.width=mButtonSize+"px";
		this.button.style.height=mButtonSize+"px";
		// this.button.style.background="#555";
		this.buttonImage=document.createElement("img");
		this.buttonImage.src="image/ui/turnEndButton.png";
		this.buttonImage.style.position="absolute";
		this.buttonImage.style.top="0";
		this.buttonImage.style.left="0";
		this.buttonImage.style.width="100%";
		this.endImage=document.createElement("img");
		this.endImage.src="image/ui/turnEnd.png";
		this.endImage.style.position="absolute";
		this.endImage.style.top="15%";
		this.endImage.style.left="15%";
		this.endImage.style.height="70%";
		this.button.appendChild(this.buttonImage);
		this.button.appendChild(this.endImage);
		mBattleSecene.appendChild(this.button);

		this.button.onclick=()=>{this.click();};
	}
	//クリックされた時
	static click(){
		// SkillButton.hideSkillList();
		// Feild.resetSelectMasEvent();
		// Turn.endTurn();
	}
	//クリックした時に実行する関数セット
	static setClickFunction(aFunction){
		this.click=()=>{aFunction()}
	}
	//クリックした時に実行する関数リセット
	static resetClickFunction(){
		this.click=()=>{}
	}
}
