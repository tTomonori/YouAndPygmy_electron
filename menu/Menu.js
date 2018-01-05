class Menu extends Selector{
	constructor(aList,aChoiceWidth,aSelectedFunction){
		super(true);
		this.choiceWidth=(aChoiceWidth==null)?mScreenSize.width*0.18:aChoiceWidth;//選択肢バーの横幅
		this.allChoiceNum=aList.length;//選択肢の数
		this.selectedFunction=(aKey)=>{aSelectedFunction(aKey)}
		this.container=document.createElement("div");
		this.container.style.position="absolute";
		this.container.style.top="0";
		this.container.style.left="-1px";
		this.container.style.width="0";
		this.container.style.height="100%";
		this.container.style.display="none";
		this.container.style.zPosition="1";
		mMenuScene.appendChild(this.container);
		this.listData=aList;
		//選択肢バー生成
		let tChoices=new Array();
		for(let i=0;i<this.allChoiceNum;i++){
			let tChoice=aList[i];
			let tChoiceBar=this.createChoiceBar(tChoice,i);
			this.container.appendChild(tChoiceBar);
			tChoices.push(tChoiceBar);
		}
		this.initSelector(tChoices,this.container);
	}
	//選択肢のバーを生成
	createChoiceBar(aChoiceData){
		let tChoiceBar=document.createElement("div");
		tChoiceBar.name=aChoiceData.key;
		tChoiceBar.style.position="relative";
		tChoiceBar.style.right=this.choiceWidth*0.9+"px";
		tChoiceBar.style.width=this.choiceWidth*0.9+"px";
		tChoiceBar.style.height=mScreenSize.height*0.08+"px";
		tChoiceBar.style.marginTop=mScreenSize.height*0.03+"px";
		//選択肢画像
		let tBar=document.createElement("img");
		tBar.src="image/choiceBar/red/message/mesframe.png";
		tBar.style.position="absolute";
		tBar.style.height="100%";
		tBar.style.top="0";
		tBar.style.right="0";
		tChoiceBar.appendChild(tBar);
		//選択肢名
		let tLabel=document.createElement("div");
		tLabel.style.position="absolute";
		tLabel.style.height="100%";
		tLabel.style.width="100%";
		tLabel.style.top="0";
		tLabel.style.right="0";
		tLabel.style.fontSize=mScreenSize.height*0.05+"px";
		tLabel.style.pointerEvent="none";
		tLabel.innerHTML="&nbsp"+aChoiceData.name;
		tChoiceBar.appendChild(tLabel);

		return tChoiceBar;
	}
	//キー入力
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
				this.selectedFunction("back");
				break;
			default:
		}
	}
	selectNumber(aNum){
		this.selectedFunction(this.listData[aNum].key);
	}
	pickElement(aNum){
			let tBar=this.choiceElements[aNum];
			tBar.style.webkitFilter="brightness(120%)";
			$(tBar).stop();
			$(tBar).animate({
				right:-this.choiceWidth*0.1+"px"
			},250)
	}
	releaseElement(aNum){
			let tBar=this.choiceElements[aNum];
			this.selectedNum=null;
			tBar.style.webkitFilter="brightness(100%)";
			$(tBar).stop();
			$(tBar).animate({
				right:0
			},250)
	}
	keepElement(aNum){
			let tBar=this.choiceElements[aNum];
			tBar.style.webkitFilter="brightness(100%)";
			$(tBar).stop();
			$(tBar).animate({
				right:-this.choiceWidth*0.1+"px"
			},250)
	}
	unKeepElement(aNum){
			let tBar=this.choiceElements[aNum];
			this.keepedNum=null;
			tBar.style.webkitFilter="brightness(100%)";
			$(tBar).stop();
			$(tBar).animate({
				right:0
			},250)
	}
	//選択肢を表示
	display(){
		this.displayFlag=true;
		this.container.style.display="block";
		return new Promise((res,rej)=>{
			for(let i=0;i<this.allChoiceNum;i++){
				let tChoice=this.choiceElements[i];
				let tEndFunc=(i<this.allChoiceNum-1)?()=>{}:()=>{this.canChoiceFlag=true;res();}
				setTimeout(()=>{
					$(tChoice).animate({
						right:0
					},250,tEndFunc)
				},i*40)
			}
		})
	}
	//選択肢非表示
	hide(){
		if(!this.displayFlag){//このメニューは表示されていない
			return new Promise((res,rej)=>{
				res();
			})
		}
		//メニューが表示されていた場合
		this.displayFlag=false;
		this.canChoiceFlag=false;
		this.release();
		this.unKeep();
		let tLength=this.choiceElements.length;
		return new Promise((res,rej)=>{
			for(let i=0;i<this.allChoiceNum;i++){
				let tChoice=this.choiceElements[i];
				let tEndFunc=(i<this.allChoiceNum-1)?()=>{}:()=>{this.container.style.display="none";res();}
				setTimeout(()=>{
					$(tChoice).stop();
					$(tChoice).animate({
						right:this.choiceWidth+"px"
					},250,tEndFunc)
				},i*40)
			}
		})
	}
}
var mMenuScene=document.getElementById("menuScene");
