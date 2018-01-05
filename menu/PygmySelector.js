class PygmySelector extends Selector{
	constructor(aOption){
		super();
		this.container=document.createElement("div");
		this.container.style.position="fixed";
		if(aOption.top!=undefined)this.container.style.top=aOption.top;
		if(aOption.left!=undefined)this.container.style.left=aOption.left;
		if(aOption.right!=undefined)this.container.style.right=aOption.right;
		if(aOption.bottom!=undefined)this.container.style.bottom=aOption.bottom;
		mMenuScene.appendChild(this.container);
		this.resetPygmies();
	}
	//表示更新
	resetPygmies(){
		this.container.textContent="";
		this.pygmies=User.getAcconpanying();
		let tPygmyTags=new Array();
		for(let tPygmy of this.pygmies){
			let tPygmyTag=document.createElement("div");
			tPygmyTag.style.display="inline-block";
			tPygmyTag.style.border="solid 1px rgba(0,0,0,0)";
			let tPygmyImage=tPygmy.getImageTag();
			tPygmyImage.style.width=mScreenSize.width/10+"px";
			tPygmyTag.appendChild(tPygmyImage);

			tPygmyTags.push(tPygmyTag);
			this.container.appendChild(tPygmyTag);
		}
		this.initSelector(tPygmyTags);
	}
	//キー入力
	inputKey(aKey){
		switch (aKey) {
			case "up":
				break;
			case "down":
				break;
			case "right":
				this.pickNextChoice();
				break;
			case "left":
				this.pickPreviousChoice();
				break;
			case "ok":
				this.select();
				break;
			case "cancel":
				this.close();
				this.selectedFunction("back");
				break;
			default:
		}
	}
	selectNumber(aNum){
		this.selectedFunction(this.pygmies[aNum]);
	}
	pickElement(aNum){
		this.choiceElements[aNum].style.border="solid 1px #f00";
	}
	releaseElement(aNum){
		this.choiceElements[aNum].style.border="solid 1px rgba(0,0,0,0)";
	}
	//閉じる
	close(){
		this.container.remove();
	}
}
