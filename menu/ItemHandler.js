class ItemHandler{
	constructor(aItem,aCategory){
		let tChoiceList=new Array();
		this.item=aItem.name;
		this.itemData;
		switch (aCategory) {
			case "consum"://消費アイテム
				this.itemData=ItemDictionary.get(this.item);
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
	operate(aFunctions){
		this.functions=aFunctions;
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
				this.pygmySelector.setSelectedFunction((aData)=>{this.decideUsing(aData)})
				this.selectingList=this.pygmySelector;
				this.pygmySelector.startSelect();
				break;
			case "have"://持たせる
				tList=new Array();
				//同時に所持できる最大数によってリストを設定
				for(let i=1;i<=this.itemData.have;i++)tList.push({name:i,key:i});
				this.pygmySelector=new PygmySelector({bottom:mScreenSize.height/10+"px",left:mScreenSize.width/4+"px"},
																							{list:tList,position:"left",option:{loop:false}});
				this.pygmySelector.setSelectedFunction((aData)=>{this.decideToHaving(aData)})
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
	//アイテムを使う対象と回数が決定された
	decideUsing(aData){
		if(aData=="back"){//閉じる
			this.close();
			return;
		}

		if(this.functions.renew!=undefined)this.functions.renew();
	}
	//アイテムを持たせる対象と個数が決定された
	decideToHaving(aData){
		if(aData=="back"){//閉じる
			this.close();
			return;
		}
		let tReceivedItem=this.receiveItem(aData.pygmy);
		let tNum=User.getItemNum(this.item,"consum");
		if(aData.count>tNum){
			//アイテムの数が足りない
			AlartText.alart("アイテムの数が足りません",{barColor:"yellow"});
			if(tReceivedItem==null)return;
			//もともと持っていたアイテムを持たせ直す
			this.toHaveItem(tReceivedItem.name,tReceivedItem.possess,aData.pygmy);
			return;
		}
		//アイテムを持たせる
		this.toHaveItem(this.item,aData.count,aData.pygmy);
		AlartText.alart(aData.pygmy.getName()+"に"+this.itemData.name+"を"+aData.count+"個持たせました",{barColor:"purple"});
		if(this.functions.renew!=undefined)this.functions.renew();
	}
	//アイテムを使う
	useItem(aItem,aPygmy){

	}
	//アイテムを預かる
	receiveItem(aPygmy){
		let tItem=aPygmy.receiveItem();
		if(tItem.length==0)return null;//アイテムを持っていなかった
		tItem=tItem[0];
		User.receiveItem(tItem.name,tItem.possess,"consum");
		return {name:tItem.name,possess:tItem.possess};
	}
	//アイテムを持たせる
	toHaveItem(aItem,aNum,aPygmy){
		User.takeOutItem(aItem,aNum,"consum");
		aPygmy.haveItem(aItem,aNum);
	}
	//閉じる
	close(){
		this.endFunction();
	}
}
