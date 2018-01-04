class Menu{
	constructor(aList,aChoiceWidth,aSelectedFunction){
		this.choiceWidth=(aChoiceWidth==null)?mScreenSize.width*0.18:aChoiceWidth;//選択肢バーの横幅
		this.canChoiceFlag=false;//選択可能かどうか
		this.selectedNum=null;//選択中の選択肢の番号
		this.keepedNum=null;//選択維持中の選択肢の番号
		this.allChoiceNum=aList.length;//選択肢の数
		this.displayFlag=false;//このメニューが表示されているかどうか
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
		this.choices=new Array();
		for(let i=0;i<this.allChoiceNum;i++){
			let tChoice=aList[i];
			let tChoiceBar=this.createChoiceBar(tChoice,i);
			this.container.appendChild(tChoiceBar);
			this.choices.push(tChoiceBar);
		}
	}
	//選択肢のバーを生成
	createChoiceBar(aChoiceData,aNum){
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
		//マウスオーバー時関数
		tChoiceBar.onmouseover=()=>{
			this.releaseChoice();
			this.pickChoice(aNum);
		}
		tChoiceBar.onmouseout=()=>{
			this.releaseChoice(aNum);
		}
		tChoiceBar.onclick=()=>{
			this.select();
		}
		return tChoiceBar;
	}
	//選択肢を選択(決定はまだ)
	pickChoice(aNum){
		if(!this.canChoiceFlag)return;//選択不可能なタイミング
		if(this.keepedNum==aNum)return;//選択維持中の選択し
		this.selectedNum=aNum;
		let tBar=this.choices[aNum];
		tBar.style.webkitFilter="brightness(120%)";
		$(tBar).stop();
		$(tBar).animate({
			right:-this.choiceWidth*0.1+"px"
		},250)
	}
	//選択肢の選択を解除
	releaseChoice(){
		if(this.selectedNum==null)return;//何もpickされていない
		let tBar=this.choices[this.selectedNum];
		this.selectedNum=null;
		tBar.style.webkitFilter="brightness(100%)";
		$(tBar).stop();
		$(tBar).animate({
			right:0
		},250)
	}
	//次の選択肢を選択
	pickNextChoice(){
		if(this.selectedNum==null){
			if(this.keepedNum==0)this.pickChoice(1);
			else this.pickChoice(0);
		}
		else{
			let tNextNum=(this.selectedNum+1)%this.allChoiceNum;
			if(this.keepedNum==tNextNum)tNextNum=(tNextNum+1)%this.allChoiceNum;
			this.releaseChoice(this.selectedNum);
			this.pickChoice(tNextNum);
		}
	}
	//一つ前の選択肢を選択
	pickPreviousChoice(){
		if(this.selectedNum==null){
			if(this.keepedNum==this.allChoiceNum-1)this.pickChoice(this.allChoiceNum-2);
			else this.pickChoice(this.allChoiceNum-1);
		}
		else{
			let tNextNum=(this.selectedNum+this.allChoiceNum-1)%this.allChoiceNum;
			if(this.keepedNum==tNextNum)tNextNum=(tNextNum+this.allChoiceNum-1)%this.allChoiceNum;
			this.releaseChoice(this.selectedNum);
			this.pickChoice(tNextNum);
		}
	}
	//選択中の選択肢の選択解除
	release(){
		this.releaseChoice(this.selectedNum);
		this.selectedNum=null;
	}
	//選択肢決定
	select(){
		if(this.selectedNum==null)return;
		this.unKeep();
		this.keep();
		this.selectedFunction(this.listData[this.keepedNum].key);
	}
	//選択中の選択肢が選択された状態をキープ
	keep(){
		if(this.selectedNum==null)return;
		this.keepedNum=this.selectedNum;
		this.selectedNum=null;
		let tBar=this.choices[this.keepedNum];
		tBar.style.webkitFilter="brightness(100%)";
		$(tBar).stop();
		$(tBar).animate({
			right:-this.choiceWidth*0.1+"px"
		},250)
	}
	//選択維持中の選択肢をリセット
	unKeep(){
		if(this.keepedNum==null)return;
		let tBar=this.choices[this.keepedNum];
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
				let tChoice=this.choices[i];
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
		this.releaseChoice();
		this.unKeep();
		let tLength=this.choices.length;
		return new Promise((res,rej)=>{
			for(let i=0;i<this.allChoiceNum;i++){
				let tChoice=this.choices[i];
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
