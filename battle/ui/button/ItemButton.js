class ItemButton{
	static init(){
		//ボタン
		this.button=document.createElement("div");
		this.button.id="skillButton";
		this.button.style.position="absolute";
		this.button.style.top=mButtonSize*2+"px";
		this.button.style.left="0";
		this.button.style.width=mButtonSize+"px";
		this.button.style.height=mButtonSize+"px";
		// this.button.style.background="#3df";
		this.buttonImage=document.createElement("img");
		this.buttonImage.src="image/ui/itemButton.png";
		this.buttonImage.style.position="absolute";
		this.buttonImage.style.top="0";
		this.buttonImage.style.left="0";
		this.buttonImage.style.width="100%";
		this.itemImage=document.createElement("img");
		this.itemImage.src="image/ui/item.png";
		this.itemImage.style.position="absolute";
		this.itemImage.style.top="15%";
		this.itemImage.style.left="25%";
		this.itemImage.style.height="70%";
		this.button.appendChild(this.buttonImage);
		this.button.appendChild(this.itemImage);
		mBattleSecene.appendChild(this.button);

		this.button.onclick=()=>{this.click();};

		//アイテムリスト
		this.itemList=document.createElement("div");
		this.itemList.id="itemList";
		this.itemList.style.position="absolute";
		this.itemList.style.top=mButtonSize*2+"px";
		this.itemList.style.left=mButtonSize+"px";
		this.itemList.style.width=mScreenSize.width/4+"px";
		this.itemList.style.background="#00d6c3";
		this.itemList.style.borderRadius="10px";
		this.itemList.style.color="#fff";
		this.itemList.style.display="none";
		mBattleSecene.appendChild(this.itemList);
		this.items=new Array();
		this.itemNum=1;//アイテムの最大数
		for(let i=0;i<this.itemNum;i++){
			let tItemTag=document.createElement("div");
			tItemTag.style.width="94%";
			tItemTag.style.height=mScreenSize.width/20+"px";
			tItemTag.style.marginLeft="3%";
			tItemTag.style.marginTop="7px";
			tItemTag.style.background="#1b11dd";
			tItemTag.style.borderRadius="7px";
			this.itemList.appendChild(tItemTag);
			this.items.push(tItemTag);
		}
		//アイテムがない時用
		this.noneItem=document.createElement("div");
		this.noneItem.style.marginTop="7px";
		this.noneItem.textContent="なし";
		this.itemList.appendChild(this.noneItem);
		//リストの下側margin
		let tMarginBox=document.createElement("div");
		tMarginBox.style.marginBottom="7px";
		this.itemList.appendChild(tMarginBox);
		this.items.push(tMarginBox);

		//ボタンのクリックが有効かどうか
		this.activeButtonFlag=false;
	}
	//クリックされた時
	static click(){}
	//リストをクリックする
	static clickList(aNum){
		//ボタンのクリックが無効になっていたら実行しない
		if(!this.activeButtonFlag)return;
		this.items[aNum].click();
	}
	//クリックした時に実行する関数セット
	static setClickFunction(aFunction){
		this.click=()=>{aFunction()}
		this.activeButtonFlag=true;
	}
	//クリックした時に実行する関数リセット
	static resetClickFunction(){
		this.activeButtonFlag=false;
		this.click=()=>{}
	}
	//アイテムリストセット
	static setItemList(aItemList){
		for(let i=0;i<this.itemNum;i++){
			let tItemTag=this.items[i];
			if(i>=aItemList.length||aItemList.possess==0){
				tItemTag.style.display="none";
				tItemTag.onclick=()=>{};
				continue;
			}
			let tItem=aItemList;
			//アイテムの効果を、スキルと同様の形式で取得
			let tItemData=ItemDictionary.get(tItem.name);
			let tItemEffect=tItemData.skill;
			tItemEffect.key=tItem.name;
			tItemEffect.name=tItemData.name;
			//アイテム名表示
			tItemTag.textContent=tItemEffect.name+"　x"+tItem.possess;
			tItemTag.onclick=()=>{CharaController.selectedItem(tItemEffect)};
			tItemTag.style.display="block";
		}
		if(aItemList.possess==0)this.noneItem.style.display="block";
		else this.noneItem.style.display="none";
	}
	//アイテムリストを表示していたらture
	static isDisplayed(){
		return this.itemList.style.display=="block";
	}
	//アイテムを表示
	static displayItem(aItemList){
		this.itemList.style.display="block";
	}
	//アイテムリスト非表示
	static hideItemList(){
		this.itemList.style.display="none";
	}
}
