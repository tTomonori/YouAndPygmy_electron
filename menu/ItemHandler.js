class ItemHandler{
	constructor(aItem,aCategory){
		let tChoiceList=new Array();
		this.item=aItem.name;
		this.itemData=ItemDictionary.get(this.item);
		switch (aCategory) {
			case "consum"://消費アイテム
				if(this.itemData.use)tChoiceList.push({name:"使う",key:"use"});
				if(this.itemData.have)tChoiceList.push({name:"持たせる",key:"have"});
				break;
			case "accessory"://アクセサリ
				tChoiceList.push({name:"装備する",key:"equip"});
			default:
		}
		tChoiceList.push({name:"やめる",key:"back"});

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
							tList.push({name:"全回復",key:"targetFull"});
						}
					}
				}
				if(tList.length==0)tList.push({name:"１つ使う",key:"one"});
				this.pygmySelector=new PygmySelector({bottom:mScreenSize.height/10+"px",right:mScreenSize.width/50+"px",displayData:["image","name","tairyoku"]},
																							{list:tList,position:"left",option:{loop:true}});
				this.pygmySelector.setSelectedFunction((aData)=>{this.decideUsing(aData);this.pygmySelector.resetPygmies();})
				this.selectingList=this.pygmySelector;
				this.pygmySelector.startSelect();
				break;
			case "have"://持たせる
				tList=new Array();
				//同時に所持できる最大数によってリストを設定
				for(let i=1;i<=this.itemData.have;i++)tList.push({name:i,key:i});
				this.pygmySelector=new PygmySelector({bottom:mScreenSize.height/10+"px",right:mScreenSize.width/50+"px",displayData:["image","name","item"]},
																							{list:tList,position:"left",option:{loop:false}});
				this.pygmySelector.setSelectedFunction((aData)=>{this.decideToHaving(aData);this.pygmySelector.resetPygmies();})
				this.selectingList=this.pygmySelector;
				this.pygmySelector.startSelect();
				break;
			case "equip"://装備する
				this.pygmySelector=new PygmySelector({bottom:mScreenSize.height/10+"px",right:mScreenSize.width/50+"px",displayData:["image","name","accessory"]});
				this.pygmySelector.setSelectedFunction((aData)=>{this.decideToEquip(aData);this.pygmySelector.resetPygmies();})
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
		//アイテムが足りているか
		if(User.getItemNum(this.item)==0){
			AlartText.alart("アイテムが足りないよ",{barColor:"yellow"});
			return;
		}
		//アイテムが使用可能か
		let tCanUseFlag=false;
		for(let tEffect of this.itemData.use){
			if(tEffect.target=="all"){
				//パーティー全体に効果がある
				if(this.canUseToParty(this.item)){
					tCanUseFlag=true;
					break;
				}
			}
			else{
				//単体にのみ効果がある
				if(this.canUseToPygmy(this.item,aData.pygmy)){
					tCanUseFlag=true;
					break;
				}
			}
		}
		if(!tCanUseFlag){//アイテムが使用できない
			AlartText.alart("使っても効果がないよ",{barColor:"yellow"});
			return;
		}
		//アイテムを使用(指定した使用回数で分岐)
		switch (aData.count) {
			case "one"://一つ使う
				this.useItem(this.item,aData.pygmy);
				break;
			case "targetFull"://一人全回復
				if(!this.canUseToPygmy(this.item,aData.pygmy)){
					AlartText.alart(aData.pygmy.getName()+"は既に元気だよ",{barColor:"yellow"});
					return;
				}
				while(true){
					if(!this.canUseToPygmy(this.item,aData.pygmy))break;//体力満タンになった
					if(User.getItemNum(this.item)==0)break;//アイテムがなくなった
					this.useItem(this.item,aData.pygmy);
				}
				break;
			case "allFull"://全員全回復
				while(true){
					if(!this.canUseToParty(this.item))break;//全員体力満タンになった
					if(User.getItemNum(this.item)==0)break;//アイテムがなくなった
					this.useItem(this.item,aData.pygmy);
				}
				break;
			default:
		}
		//アイテムを操作した時に実行する関数
		if(this.functions.renew!=undefined)this.functions.renew();
	}
	//アイテムを持たせる対象と個数が決定された
	decideToHaving(aData){
		if(aData=="back"){//閉じる
			this.close();
			return;
		}
		//アイテムを預かる
		let tReceivedItem=this.receiveItem(aData.pygmy);
		let tNum=User.getItemNum(this.item);
		if(aData.count>tNum){
			//アイテムの数が足りない
			AlartText.alart("アイテムの数が足りないよ",{barColor:"yellow"});
			if(tReceivedItem==null)return;
			//もともと持っていたアイテムを持たせ直す
			this.toHaveItem(tReceivedItem.name,tReceivedItem.possess,aData.pygmy);
			return;
		}
		//アイテムを持たせる
		this.toHaveItem(this.item,aData.count,aData.pygmy);
		AlartText.alart(aData.pygmy.getName()+"は"+this.itemData.name+"を"+aData.count+"個受け取ったよ",{barColor:"purple"});
		//アイテムを操作した時に実行する関数
		if(this.functions.renew!=undefined)this.functions.renew();
	}
	//アクセサリを装備させるぴぐみーを決定した
	decideToEquip(aPygmy){
		if(aPygmy=="back"){//閉じる
			this.close();
			return;
		}
		//アクセサリを預かる
		let tAccessory=aPygmy.takeOfAccessory();
		if(tAccessory.length!=0)User.receiveItem(tAccessory[0],1);
		//アクセサリの数確認
		if(User.getItemNum(this.item)==0){
			//アクセサリが足りない
			AlartText.alart("アクセサリの数が足りないよ",{barColor:"yellow"});
			User.takeOutItem(tAccessory[0],1);
			aPygmy.equipAccessory(tAccessory[0]);
			return;
		}
		//アクセサリを装備する
		User.takeOutItem(this.item,1);
		aPygmy.equipAccessory(this.item);
		if(this.item==tAccessory[0]) AlartText.alart(aPygmy.getName()+"は既に"+this.itemData.name+"を身につけているよ",{barColor:"purple"});
		else AlartText.alart(aPygmy.getName()+"は"+this.itemData.name+"を"+"身につけたよ",{barColor:"purple"});
		//アイテムを操作した時に実行する関数
		if(this.functions.renew!=undefined)this.functions.renew();
	}
	//パーティーに指定したアイテムを使うことができるか
	canUseToParty(aItem){
		let tPygmies=User.getAcconpanying();
		for(let tPygmy of tPygmies){
			if(this.canUseToPygmy(aItem,tPygmy))return true;
		}
		return false;
	}
	//指定したぴぐみーにアイテムを使うことができるか
	canUseToPygmy(aItem,aPygmy){
		let tEffects=ItemDictionary.get(aItem).use;
		for(let tEffect of tEffects){
			switch (tEffect.effect) {
				case "heal"://たいりょく回復
					if(aPygmy.getCurrentTairyoku()<aPygmy.getStatus().tairyoku)return true;//たいりょくが減っている
					break;
				case "cure"://状態異常治療

					break;
				default:
			}
		}
	}
	//アイテムを使う
	useItem(aItem,aPygmy){
		User.takeOutItem(aItem,1);//アイテムの所持数を減らす
		let tEffects=ItemDictionary.get(aItem).use;
		//効果適用
		for(let tEffect of tEffects){
			if(tEffect.target=="all"){
				//パーティー全体に効果あり
				for(let tPygmy of User.getAcconpanying()){
					this.applyEffect(tPygmy,tEffect);
				}
			}
			else{
				//単体にのみ効果あり
				this.applyEffect(aPygmy,tEffect);
			}
		}
	}
	//指定したぴぐみーに効果を適用
	applyEffect(aPygmy,aEffect){
		switch (aEffect.effect) {
			case "heal"://たいりょく回復
				if(aEffect.value=="full") aPygmy.heal(999);//全回復
				else aPygmy.heal(aEffect.value);
				break;
			case "cure"://状態異常治療

				break;
			default:

		}
	}
	//アイテムを預かる
	receiveItem(aPygmy){
		let tItem=aPygmy.receiveItem();
		if(tItem.length==0)return null;//アイテムを持っていなかった
		tItem=tItem[0];
		User.receiveItem(tItem.name,tItem.possess);
		return {name:tItem.name,possess:tItem.possess};
	}
	//アイテムを持たせる
	toHaveItem(aItem,aNum,aPygmy){
		User.takeOutItem(aItem,aNum);
		aPygmy.haveItem(aItem,aNum);
	}
	//閉じる
	close(){
		this.endFunction();
	}
}
