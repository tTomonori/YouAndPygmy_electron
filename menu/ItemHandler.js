class ItemHandler{
	constructor(aItem,aCategory){
		let tChoiceList=new Array();
		this.item=aItem;
		this.itemData;
		switch (aCategory) {
			case "consum"://消費アイテム
				this.itemData=ItemDictionary.get(aItem.name);
				if(this.itemData.use)tChoiceList.push({name:"使う",key:"use"});
				if(this.itemData.have)tChoiceList.push({name:"持たせる",key:"have"});
				tChoiceList.push({name:"やめる",key:"back"});
				break;
			default:
		}

		this.alartMenu=new AlartMenu(tChoiceList,{right:mScreenSize.width/20+"px",top:mScreenSize.height/3+"px"});
		this.alartMenu.setSelectedFunction((aKey)=>{this.selectedAction(aKey)})
		this.selectingList=this.alartMenu;
		this.alartMenu.startSelect();
	}
	//処理実行,終わったらresを返す
	operate(){
		return new Promise((res,rej)=>{
			this.endFunction=()=>{res()}
			KeyMonitor.setInputKeyFunction((aKey)=>{this.inputKey(aKey)});
		})
	}
	//キー入力
	inputKey(aKey){
		this.selectingList.inputKey(aKey);
	}
	//アイテムをどうするか決定した
	selectedAction(aAction){
		let tList;
		switch (aAction) {
			case "use"://使う
				let tEffects=this.itemData.use;
				tList=new Array();
				//アイテムの効果によってリストを設定
				for(let tEffect of tEffects){
					if(tEffect.effect=="heal"){//回復
						if(tEffect.target=="all"){//全体回復
							tList.push({name:"１つ使う",key:"one"});
							tList.push({name:"１人全回復",key:"targetFull"});
							tList.push({name:"全員全回復",key:"allFull"});
						}
						else{//単体回復
							tList.push({name:"１つ使う",key:"one"});
							tList.push({name:"全回復",key:"full"});
						}
					}
				}
				if(tList.length==0)tList.push({name:"１つ使う",key:"one"});
				this.pygmySelector=new PygmySelector({bottom:mScreenSize.height/10+"px",left:mScreenSize.width/4+"px"},
																							{list:tList,position:"left",option:{loop:true}});
				this.pygmySelector.setSelectedFunction((aData)=>{this.useItem(aData)})
				this.selectingList=this.pygmySelector;
				this.pygmySelector.startSelect();
				break;
			case "have"://持たせる
				tList=new Array();
				//同時に所持できる最大数によってリストを設定
				for(let i=1;i<=this.itemData.have;i++)tList.push({name:i,key:i});
				this.pygmySelector=new PygmySelector({bottom:mScreenSize.height/10+"px",left:mScreenSize.width/4+"px"},
																							{list:tList,position:"left",option:{loop:false}});
				this.pygmySelector.setSelectedFunction((aData)=>{this.toHaveItem(aData)})
				this.selectingList=this.pygmySelector;
				this.pygmySelector.startSelect();
				break;
			case "throw"://捨てる
				this.close();
				break;
			case "back"://やめる
				this.close();
				break;
			default:
		}
	}
	//アイテムを使う
	useItem(aData){
		if(aData=="back"){//閉じる
			this.close();
			return;
		}
		console.log(aData);
	}
	//アイテムを持たせる
	toHaveItem(aData){
		if(aData=="back"){//閉じる
			this.close();
			return;
		}
	}
	//閉じる
	close(){
		this.endFunction();
	}
}
