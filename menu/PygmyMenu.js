class PygmyMenu extends MenuBoard{
	//キー入力関数セット
	static setKey(){
		KeyMonitor.setKeyFunction(mOkKeyCode,()=>{this.menu.select()})
		KeyMonitor.setKeyFunction(mCancelKeyCode,()=>{this.close()})
		KeyMonitor.setCrossKeyFunction((aDirection)=>{
			switch (aDirection) {
				case "up":
					this.menu.pickPreviousChoice();
					break;
				case "down":
					this.menu.pickNextChoice();
					break;
				default:
			}
		})
		KeyMonitor.startMonitor();
	}
	//ボード初期化
	static initBoard(){
		this.board.textContent="";
		let tPygmies=User.getAcconpanying();
		let tHeight=this.boardHeight*0.05;
		let tFontSize=this.boardHeight*0.03;
		let tBoxWidth=this.boardWidth/5-this.boardWidth*0.02;
		let tBoxHeight=this.boardHeight-this.boardHeight*0.02;
		for(let tPygmy of tPygmies){
			let tBox=document.createElement("div");
			tBox.style.display="inline-block"
			tBox.style.color="#eee";
			tBox.style.width=tBoxWidth+"px";
			tBox.style.height=tBoxHeight+"px";
			tBox.style.marginTop=this.boardHeight*0.01+"px";
			tBox.style.marginLeft=this.boardWidth*0.01+"px";
			//画像
			let tImage=tPygmy.getImageTag();
			tImage.style.width="100%";
			tBox.appendChild(tImage);
			//名前
			let tName=document.createElement("div");
			tName.innerHTML=tPygmy.getName();
			tName.style.height=tHeight+"px";
			tName.style.fontSize=tFontSize+"px";
			tBox.appendChild(tName);
			//種族
			let tRace=document.createElement("div");
			tRace.innerHTML="("+tPygmy.getRaceName()+")";
			tRace.style.height=tHeight+"px";
			tRace.style.fontSize=tFontSize+"px";
			tBox.appendChild(tRace);
			this.board.appendChild(tBox);
			//レベル
			let tLevel=document.createElement("div");
			tLevel.innerHTML="Lv.&nbsp"+tPygmy.getLevel();
			tLevel.style.height=tHeight+"px";
			tLevel.style.fontSize=tFontSize+"px";
			tBox.appendChild(tLevel);
			//たいりょく
			let tTairyokuLabel=document.createElement("div");
			tTairyokuLabel.innerHTML="たいりょく:";
			tTairyokuLabel.style.height=tHeight+"px";
			tTairyokuLabel.style.fontSize=tFontSize+"px";
			tBox.appendChild(tTairyokuLabel);
			let tTairyokuValue=document.createElement("div");
			tTairyokuValue.innerHTML=tPygmy.getCurrentTairyoku()+"　/　"+tPygmy.getStatus().tairyoku;
			tTairyokuValue.style.height=tHeight+"px";
			tTairyokuValue.style.fontSize=tFontSize+"px";
			tBox.appendChild(tTairyokuValue);
			//たいりょくゲージ
			let tTairyokuGage=tPygmy.getTairyokuGage(tBoxWidth,tHeight/2);
			tBox.appendChild(tTairyokuGage);
			//経験値
			let tExperienceLabel=document.createElement("div");
			tExperienceLabel.innerHTML="けいけんち:";
			tExperienceLabel.style.height=tHeight+"px";
			tExperienceLabel.style.fontSize=tFontSize+"px";
			tBox.appendChild(tExperienceLabel);
			let tExperienceValue=document.createElement("div");
			tExperienceValue.innerHTML=tPygmy.getCurrentExperience()+"　/　"+tPygmy.getNextExperience();
			tExperienceValue.style.height=tHeight+"px";
			tExperienceValue.style.fontSize=tFontSize+"px";
			tBox.appendChild(tExperienceValue);
			//経験値ゲージ
			let tExperienceGage=tPygmy.getExperienceGage(tBoxWidth,tHeight/2);
			tBox.appendChild(tExperienceGage);
			//持ち物
			let tBelongingsTag=document.createElement("div");
			tBelongingsTag.style.position="relative";
			tBelongingsTag.style.width=tBoxWidth+"px";
			tBelongingsTag.style.fontSize=tFontSize*0.9+"px";
			tBelongingsTag.style.color="#000";
			let tBelongingsFrame=document.createElement("img");
			tBelongingsFrame.src="image/choiceBar/green/name/name.png";
			tBelongingsFrame.style.width="100%";
			tBelongingsTag.appendChild(tBelongingsFrame);
			let tBelongingsLabel=document.createElement("div");
			let tBelongings=tPygmy.getItems();
			tBelongingsLabel.innerHTML=(tBelongings.length==0)?"なし":tBelongings[0].data.name+"　x"+tBelongings[0].number;
			tBelongingsLabel.style.position="absolute";
			tBelongingsLabel.style.top="0";
			tBelongingsLabel.style.left=tBoxWidth*0.05+"px";
			tBelongingsLabel.style.height=tHeight+"px";
			tBelongingsLabel.style.fontSize=tFontSize+"px";
			tBelongingsTag.appendChild(tBelongingsLabel);
			tBox.appendChild(tBelongingsTag);
			//アクセサリ
			//持ち物
			let tAccessoryTag=document.createElement("div");
			tAccessoryTag.style.position="relative";
			tAccessoryTag.style.width=tBoxWidth+"px";
			tAccessoryTag.style.fontSize=tFontSize*0.9+"px";
			tAccessoryTag.style.color="#000";
			let tAccessoryFrame=document.createElement("img");
			tAccessoryFrame.src="image/choiceBar/yellow/name/name.png";
			tAccessoryFrame.style.width="100%";
			tAccessoryTag.appendChild(tAccessoryFrame);
			let tAccessoryLabel=document.createElement("div");
			let tAccessories=tPygmy.getAccessories();
			tAccessoryLabel.innerHTML=(tAccessories.length==0)?"なし":tAccessories[0].name;
			tAccessoryLabel.style.position="absolute";
			tAccessoryLabel.style.top="0";
			tAccessoryLabel.style.left=tBoxWidth*0.05+"px";
			tAccessoryLabel.style.height=tHeight+"px";
			tAccessoryLabel.style.fontSize=tFontSize+"px";
			tAccessoryTag.appendChild(tAccessoryLabel);
			tBox.appendChild(tAccessoryTag);
		}
	}
	//選択肢が選択された
	static select(aKey){
		KeyMonitor.stopMonitor();
		this.menu.hide().then(()=>{
			if(aKey=="back")this.close();
		})
	}
}
//選択肢
PygmyMenu.init([
	{name:"もどる",key:"back"},
])
