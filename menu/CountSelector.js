class CountSelector{
	constructor(aList,aOption){
		this.list=aList;
		this.listLength=this.list.length;
		let tOption=(aOption!=undefined)?aOption:{};
		this.loop=(tOption.loop!=undefined)?tOption.loop:false;//選択肢をループさせるか
		this.selectingNum=(tOption.firstSelect!=undefined)?tOption.firstSelect:0;//初期状態で選択している選択肢の番号
		this.container=document.createElement("div");
		this.container.classList.add("countSelector");
		this.container.style.position="absolute";
		this.container.style.textAlign="center";
		this.container.style.width=mScreenSize.width/4+"px";
		if(tOption.top!=undefined)this.container.style.top=tOption.top;
		if(tOption.left!=undefined)this.container.style.left=tOption.left;
		if(tOption.right!=undefined)this.container.style.right=tOption.right;
		if(tOption.bottom!=undefined)this.container.style.bottom=tOption.bottom;
		this.label=ChoiceBarMaker.make("image/choiceBar/purple/name/name.png",this.list[this.selectingNum].name,{width:"100%"})
		this.upButton=document.createElement("img");
		this.upButton.src="image/ui/arowButton.png";
		this.upButton.style.width="30%";
		this.upButton.onclick=()=>{this.inputKey("up")}
		this.downButton=document.createElement("img");
		this.downButton.src="image/ui/arowButton.png";
		this.downButton.style.width="30%";
		this.downButton.onclick=()=>{this.inputKey("down")}
		this.downButton.style.transform="rotateX(180deg)";
		this.container.appendChild(this.upButton);
		this.container.appendChild(this.label);
		this.container.appendChild(this.downButton);
		mAlartScene.appendChild(this.container);
	}
	//タグを取得
	getElement(){
		return this.container;
	}
	//キー入力
	inputKey(aKey){
		switch (aKey) {
			case "up":
				this.selectingNum+=1;
				if(this.selectingNum==this.listLength){
					if(this.loop){//選択肢をループさせる
						this.selectingNum=0;
					}
					else{
						this.selectingNum-=1;
					}
				}
				break;
			case "down":
				this.selectingNum-=1;
				if(this.selectingNum==-1){
					if(this.loop){//選択肢をループさせる
						this.selectingNum=this.listLength-1;
					}
					else{
						this.selectingNum+=1;
					}
				}
				break;
			default:
		}
		this.updateLabel();
	}
	//選択肢の表示を更新
	updateLabel(){
		ChoiceBarMaker.changeText(this.label,this.list[this.selectingNum].name);
	}
	//選択しているkeyを取得
	getKey(){
		return this.list[this.selectingNum].key;
	}
	//閉じる
	close(){
		this.container.remove();
	}
}
