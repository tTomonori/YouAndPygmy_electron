class ItemMenu extends MenuBoard{
	//ボードの表示初期化
	static initBoard(){
		this.board.textContent="";
		this.itemList=new ItemList(this.board);
		this.itemList.setSelectedFunction((aItem)=>{this.selectedItem(aItem)});
		this.selectingList=this.menu;
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
		switch (aKey) {
			case "consum":
				this.itemList.setList(User.getConsum());
				this.startSelect();
				break;
			case "important":
				this.itemList.setList(User.getImportant());
				this.startSelect();
				break;
			case "accessory":
				this.itemList.setList(User.getAccessory());
				this.startSelect();
				break;
			case "fragment":
				this.itemList.setList(User.getFragment());
				this.startSelect();
				break;
			case "back":
				this.close();
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
		this.alartMenu=new AlartMenu([{name:"使う",key:"use"},{name:"持たせる",key:"have"},{name:"捨てる",key:"throw"},{name:"やめる",key:"back"}],{x:"700px",y:"200px"});
		this.alartMenu.setSelectedFunction((aKey)=>{
			//アイテムをどうするか決定した
			switch (aKey) {
				case "use":
					this.pygmySelector=new PygmySelector();
					this.pygmySelector.setSelectedFunction((aPygmy)=>{this.selectedPygmy(aPygmy,aItem,"use")})
					this.selectingList=this.pygmySelector;
					this.pygmySelector.startSelect();
					break;
				case "have":
					this.pygmySelector=new PygmySelector();
					this.pygmySelector.setSelectedFunction((aPygmy)=>{this.selectedPygmy(aPygmy,aItem,"have")})
					this.selectingList=this.pygmySelector;
					this.pygmySelector.startSelect();
					break;
				case "throw":

					break;
				case "back":
					this.selectingList=this.itemList;
					this.startSelect();
					break;
				default:
			}
		})
		//alartMenuからキー,マウスで選べるように
		this.selectingList=this.alartMenu;
		this.alartMenu.startSelect();
	}
	//ぴぐみーが選択された
	static selectedPygmy(aPygmy,aItem,aAction){
		if(aPygmy=="back"){
			this.selectingList=this.itemList;
			this.startSelect();
		}
	}
	//選択肢が表示された
	static displayed(){
		this.menu.pickNextChoice();
		this.menu.select();
	}
	//選択可能に
	static startSelect(){
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
