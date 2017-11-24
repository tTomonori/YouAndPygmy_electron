class OptionButton{
	static init(){
		//ボタン
		this.button=document.createElement("div");
		this.button.id="skillButton";
		this.button.style.position="absolute";
		this.button.style.top="0";
		this.button.style.left="0";
		this.button.style.width=mButtonSize+"px";
		this.button.style.height=mButtonSize+"px";
		// this.button.style.background="#000";
		this.buttonImage=document.createElement("img");
		this.buttonImage.src="image/ui/optionButton.png";
		this.buttonImage.style.position="absolute";
		this.buttonImage.style.top="0";
		this.buttonImage.style.left="0";
		this.buttonImage.style.width="100%";
		this.optionImage=document.createElement("img");
		this.optionImage.src="image/ui/option.png";
		this.optionImage.style.position="absolute";
		this.optionImage.style.top="15%";
		this.optionImage.style.left="15%";
		this.optionImage.style.height="70%";
		this.button.appendChild(this.buttonImage);
		this.button.appendChild(this.optionImage);
		mBattleSecene.appendChild(this.button);

		this.button.onclick=()=>{this.click();};
	}
	//クリックされた時
	static click(){}
	//クリックした時に実行する関数セット
	static setClickFunction(aFunction){
		this.click=()=>{aFunction()}
	}
	//クリックした時に実行する関数リセット
	static resetClickFunction(){
		this.click=()=>{}
	}
}
