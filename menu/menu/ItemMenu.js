class ItemMenu extends MenuBoard{
	//ボードの表示初期化
	static initBoard(){
		this.board.textContent="";
		this.itemList=new ItemList(this.board);
		this.itemList.setSelectedFunction((aItem)=>{this.selectedItem(aItem)});
		this.selectingList=this.menu;
		this.alartMenu=new Selector();
		this.pygmySelector=new Selector();
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
		this.alartMenu=new AlartMenu(
			[{name:"使う",key:"use"},{name:"持たせる",key:"have"},{name:"捨てる",key:"throw"},{name:"やめる",key:"back"}],
			{right:mScreenSize.width/20+"px",top:mScreenSize.height/3+"px"});
		this.alartMenu.setSelectedFunction((aKey)=>{
			//アイテムをどうするか決定した
			switch (aKey) {
				case "use":
					this.pygmySelector=new PygmySelector({bottom:mScreenSize.height/10+"px",left:mScreenSize.width/4+"px"},
																								{list:[{name:"１つ使う",key:"one"},{name:"全回復",key:"all"}],position:"left",option:{loop:true}});
					this.pygmySelector.setSelectedFunction((aPygmy)=>{this.useItem(aPygmy,aItem)})
					this.selectFromPygmySelector();
					break;
				case "have":
					this.pygmySelector=new PygmySelector({bottom:mScreenSize.height/10+"px",left:mScreenSize.width/4+"px"},
																								{list:[{name:"１",key:"1"},{name:"２",key:"2"},{name:"３",key:"3"}],position:"left",option:{loop:false}});
					this.pygmySelector.setSelectedFunction((aPygmy)=>{this.toHaveItem(aPygmy,aItem)})
					this.selectFromPygmySelector();
					break;
				case "throw":
					this.selectFromMenuAndItemList("item");
					break;
				case "back":
					this.selectFromMenuAndItemList("item");
					break;
				default:
			}
		})
		//alartMenuからキー,マウスで選べるように
		this.selectFromAlartMenu();
	}
	//アイテムを使う
	static useItem(aPygmy,aItem,aAction){
		if(aPygmy=="back"){
			this.selectFromMenuAndItemList("item");
		}
	}
	//アイテムを持たせる
	static toHaveItem(aPygmy,aItem,aAction){
		if(aPygmy=="back"){
			this.selectFromMenuAndItemList("item");
		}
	}
	static selectFromMenuAndItemList(aMenuOrItem){
		this.alartMenu.stopSelect();
		this.pygmySelector.stopSelect();
		this.selectingList=(aMenuOrItem=="menu")?this.menu:this.itemList;
		this.startSelect();
	}
	static selectFromAlartMenu(){
		this.stopSelect();
		this.pygmySelector.stopSelect();
		this.selectingList=this.alartMenu;
		this.selectingList.startSelect();
	}
	static selectFromPygmySelector(){
		this.stopSelect();
		this.alartMenu.stopSelect();
		this.selectingList=this.pygmySelector;
		this.selectingList.startSelect();
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
