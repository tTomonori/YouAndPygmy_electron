class ItemMenu extends MenuBoard{
	//ボードの表示初期化
	static initBoard(){
		this.board.textContent="";
		this.itemList=new ItemList(this.board);
		this.itemList.setSelectedFunction((aItem)=>{this.selectedItem(aItem)});
		this.itemCategory;//現在選んでいるアイテムのカテゴリ(消費or大切なものor...)
	}
	//キー入力
	static inputKey(aKey){
		if(this.selectingList==this.menu&&aKey=="right"){
			this.menu.release();
			this.selectingList=this.itemList;
			this.itemList.pickNextChoice();
		}
		else if(this.selectingList==this.itemList&&aKey=="left"){
			this.itemList.release();
			this.selectingList=this.menu;
			this.menu.pickNextChoice();
		}
		else{
			this.selectingList.inputKey(aKey);
		}
	}
	//選択肢が選択された
	static select(aKey){
		if(aKey=="back"){
			this.close();
			return;
		}
		this.renewList(aKey);
		this.startSelect();
	}
	//アイテムリスト表示更新
	static renewList(aCategory){
		if(aCategory==undefined)aCategory=this.itemCategory;
		switch (aCategory) {
			case "consum":
				this.itemList.setList(User.getConsum());
				this.itemCategory="consum";
				break;
			case "important":
				this.itemList.setList(User.getImportant());
				this.itemCategory="important";
				break;
			case "accessory":
				this.itemList.setList(User.getAccessory());
				this.itemCategory="accessory";
				break;
			case "fragment":
				this.itemList.setList(User.getFragment());
				this.itemCategory="fragment";
				break;
			default:
		}
	}
	//アイテムが選択された
	static selectedItem(aItem){
		if(aItem=="back"){//メニューを閉じる
			this.select("back");
			return;
		}
		this.stopSelect();
		this.itemHandler=new ItemHandler(aItem,this.itemCategory);
		this.itemHandler.operate({renew:()=>{this.renewList();}}).then(()=>{
			// this.renewList();//アイテムリスト表示更新
			this.startSelect("item");
			KeyMonitor.setInputKeyFunction((aKey)=>{this.inputKey(aKey)});
		})
	}
	//選択肢が表示された
	static displayed(){
		this.menu.pickNextChoice();
		this.menu.select();
	}
	//選択可能に
	static startSelect(aMenuOrItem){
		this.selectingList=(aMenuOrItem=="item")?this.itemList:this.menu;
		this.menu.startSelect();
		this.itemList.startSelect();
	}
	//選択不可に
	static stopSelect(){
		this.menu.stopSelect();
		this.itemList.stopSelect();
	}
}
//選択肢
ItemMenu.init([
	{name:"消費",key:"consum"},
	{name:"大切なもの",key:"important"},
	{name:"アクセサリ",key:"accessory"},
	{name:"かけら",key:"fragment"},
	{name:"もどる",key:"back"},
],"item")
