class CancelMoveButton{
	static init(){
		//ボタン
		this.button=document.createElement("div");
		this.button.id="skillButton";
		this.button.style.position="absolute";
		this.button.style.top=mButtonSize*3+"px";
		this.button.style.left="0";
		this.button.style.width=mButtonSize+"px";
		this.button.style.height=mButtonSize+"px";
		this.button.style.background="#3f4";
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
