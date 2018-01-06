class AlartMenu extends Selector{
	constructor(aList,aOption){
		super();
		this.choices=aList;
		this.container=document.createElement("div");
		this.container.classList.add("alartMenu");
		this.container.style.position="absolute";
		if(aOption.top!=undefined)this.container.style.top=aOption.top;
		if(aOption.left!=undefined)this.container.style.left=aOption.left;
		if(aOption.right!=undefined)this.container.style.right=aOption.right;
		if(aOption.bottom!=undefined)this.container.style.bottom=aOption.bottom;
		let tList=new Array();
		for(let i=0;i<aList.length;i++){
			let tChoice=ChoiceBarMaker.make("image/choiceBar/purple/name/name.png",aList[i].name,{height:mScreenSize.height/18+"px"});
			tList.push(tChoice);
			this.container.appendChild(tChoice);
		}
		this.initSelector(tList);
		mAlartScene.appendChild(this.container);
	}
	selectNumber(aNum){
		this.stopSelect();
		this.container.remove();
		this.selectedFunction(this.choices[aNum].key);
	}
	inputKey(aKey){
		switch (aKey) {
			case "up":
				this.pickPreviousChoice();
				break;
			case "down":
				this.pickNextChoice();
				break;
			case "right":
				break;
			case "left":
				break;
			case "ok":
				this.select();
				break;
			case "cancel":
				this.close();
				break;
			default:
		}
	}
	//閉じる
	close(){
		this.stopSelect();
		this.container.remove();
		this.selectedFunction("back");
	}
	pickElement(aNum){
		this.choiceElements[aNum].style.webkitFilter="brightness(120%)";
	}
	releaseElement(aNum){
		this.choiceElements[aNum].style.webkitFilter="brightness(100%)";
	}
	keepElement(aNum){}
	unKeepElement(aNum){}
}
