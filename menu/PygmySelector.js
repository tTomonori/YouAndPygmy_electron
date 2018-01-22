class PygmySelector extends Selector{
	constructor(aOption,aCountSelectorOption){
		super();
		this.container=document.createElement("div");
		this.container.classList.add("pygmySelector");
		this.container.style.position="absolute";
		this.container.style.height=mScreenSize.height*2/5+"px"
		this.pygmyContainer=document.createElement("div");
		this.pygmyContainer.style.position="relative";
		this.pygmyContainer.style.display="inline-block";
		this.width=(aOption.width!=undefined)?aOption.width:mScreenSize.width/2;//単位はpxで指定する(引数にはpxをつけない)
		this.pygmyContainer.style.width=this.width+"px";
		this.pygmyContainer.style.height="100%";
		this.pygmyContainer.style.verticalAlign="top";
		this.container.appendChild(this.pygmyContainer);
		if(aOption.top!=undefined)this.container.style.top=aOption.top;
		if(aOption.left!=undefined)this.container.style.left=aOption.left;
		if(aOption.right!=undefined)this.container.style.right=aOption.right;
		if(aOption.bottom!=undefined)this.container.style.bottom=aOption.bottom;
		this.displayData=(aOption.displayData!=undefined)?aOption.displayData:["image"];
		if(aOption.append!=false)mAlartScene.appendChild(this.container);
		this.selectorContents=new Array();
		for(let i=0;i<mMaxAcconpanyingNum;i++){
			let tBar=BarMaker.makeWinterBar(this.displayData.length-1,{trans:true});
			tBar.bar.style.height="95%"
			this.selectorContents.push(tBar.content);
			this.pygmyContainer.appendChild(tBar.bar);
		}
		this.resetPygmies();
		//CountSelector
		this.countSelector=null;
		if(aCountSelectorOption==undefined)return;
		this.countSelector=new CountSelector(aCountSelectorOption.list,aCountSelectorOption.option);
		let tCountElement=this.countSelector.getElement();
		tCountElement.style.display="inline-block";
		tCountElement.style.position="relative";
		if(aCountSelectorOption.position=="left")this.container.insertBefore(tCountElement,this.container.firstChild)
	}
	getElement(){
		return this.container;
	}
	//表示更新
	resetPygmies(){
		let tTempPick=this.pickNum;//更新前に選択していたぴぐみーの番号
		let tPygmyTagWidth=this.width/5-2;
		this.pygmies=User.getAcconpanying();
		let tPygmyTags=new Array();
		for(let i=0;i<mMaxAcconpanyingNum;i++){
			let tPygmyTag=document.createElement("div");
			tPygmyTag=this.selectorContents[i];
			tPygmyTag.textContent="";
			if(this.pygmies.length<=i)continue;
			let tPygmy=this.pygmies[i];
			for(let tDataName of this.displayData){
				switch (tDataName) {
					case "image"://ぴぐみー画像
						let tPygmyImage=tPygmy.getImageTag();
						tPygmyImage.style.width="100%";
						tPygmyTag.appendChild(tPygmyImage);
						break;
					case "name"://名前
						let tNameLabel=document.createElement("div");
						tNameLabel.textContent=tPygmy.getName();
						tNameLabel.style.fontSize=tPygmyTagWidth/7+"px";
						tPygmyTag.appendChild(tNameLabel);
						break;
					case "race"://種族
						let tRaceLabel=document.createElement("div");
						tRaceLabel.textContent="種族:"+tPygmy.getRaceName();
						tRaceLabel.style.fontSize=tPygmyTagWidth/10+"px";
						tPygmyTag.appendChild(tRaceLabel);
						break;
					case "level"://レベル
						let tLevelLabel=document.createElement("div");
						tLevelLabel.innerHTML="Lv.&nbsp"+tPygmy.getLevel();
						tLevelLabel.style.fontSize=tPygmyTagWidth/7+"px";
						tPygmyTag.appendChild(tLevelLabel);
						break;
					case "closeness"://親密度

						break;
					case "experience"://経験値
						let tExperience=document.createElement("div");
						tExperience.innerHTML="けいけんち<br>"+tPygmy.getCurrentExperience()+"/"+tPygmy.getNextExperience();
						tExperience.style.fontSize=tPygmyTagWidth/10+"px";
						tPygmyTag.appendChild(tExperience);
						let tExperienceGage=tPygmy.getExperienceGage("92%",tPygmyTagWidth/12+"px");
						tExperienceGage.style.marginLeft="auto";
						tExperienceGage.style.marginRight="auto";
						tPygmyTag.appendChild(tExperienceGage);
						break;
					case "tairyoku"://たいりょく
						let tTairyoku=document.createElement("div");
						tTairyoku.innerHTML="たいりょく<br>"+tPygmy.getCurrentTairyoku()+"/"+tPygmy.getStatus().tairyoku;
						tTairyoku.style.fontSize=tPygmyTagWidth/10+"px";
						tPygmyTag.appendChild(tTairyoku);
						let tTairyokuGage=tPygmy.getTairyokuGage("92%",tPygmyTagWidth/12+"px");
						tTairyokuGage.style.marginLeft="auto";
						tTairyokuGage.style.marginRight="auto";
						tPygmyTag.appendChild(tTairyokuGage);
						break;
					case "item"://持ち物
						let tItemName=tPygmy.getItem();
						tItemName=(tItemName.possess!=0)?ItemDictionary.get(tItemName.name).name+"　x"+tItemName.possess:"なし";
						let tItemBar=ChoiceBarMaker.make("image/choiceBar/green/name/name.png",tItemName,{width:"90%"});
						tItemBar.style.marginLeft="5%";
						tPygmyTag.appendChild(tItemBar);
						break;
					case "accessory"://アクセサリ
						let tAccessoryName=tPygmy.getAccessory();
						tAccessoryName=(tAccessoryName!="")?ItemDictionary.get(tAccessoryName).name:"なし";
						let tAccessoryBar=ChoiceBarMaker.make("image/choiceBar/yellow/name/name.png",tAccessoryName,{width:"90%"});
						tAccessoryBar.style.marginLeft="5%";
						tPygmyTag.appendChild(tAccessoryBar);
					break;
					case "":

						break;
					default:
				}
			}
			tPygmyTags.push(tPygmyTag);
		}
		this.initSelector(tPygmyTags);
		this.startSelect();
		if(tTempPick!=null&&tTempPick!=undefined)this.pick(tTempPick);//更新前に選択していたぴぐみーを選択し直す
	}
	//キー入力
	inputKey(aKey){
		switch (aKey) {
			case "up":
				if(this.countSelector!=null)this.countSelector.inputKey(aKey);
				break;
			case "down":
				if(this.countSelector!=null)this.countSelector.inputKey(aKey);
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
		if(this.countSelector!=null){
			this.selectedFunction({pygmy:this.pygmies[aNum],count:this.countSelector.getKey()});
		}
		else this.selectedFunction(this.pygmies[aNum]);
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
		if(this.countSelector!=null)this.countSelector.close();
	}
}
