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
		this.button.style.background="#555";
		mBattleSecene.appendChild(this.button);

		this.button.onclick=()=>{this.click();};
	}
	static click(){
		SkillButton.hideSkillList();
		Feild.resetSelectMasEvent();
		Turn.endTurn();
	}
}
