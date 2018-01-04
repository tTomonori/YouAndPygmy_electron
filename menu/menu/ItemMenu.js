class ItemMenu extends MenuBoard{
	//ボードの表示初期化
	static initBoard(){
		this.board.textContent="";
		this.itemList=new ItemList(this.board);
		this.selectingList=this.menu;
	}
	//キー入力
	static inputKey(aKey){
		switch (aKey) {
			case "up":
				this.selectingList.pickPreviousChoice();
				break;
			case "down":
				this.selectingList.pickNextChoice();
				break;
			case "right":
				this.menu.release();
				this.selectingList=this.itemList;
				this.itemList.pickNextChoice();
				break;
			case "left":
				this.itemList.release();
				this.selectingList=this.menu;
				this.menu.pickNextChoice();
				break;
			case "ok":
				this.selectingList.select();
				break;
			case "cancel":
				this.close();
				break;
			default:
		}
	}
	//選択肢が選択された
	static select(aKey){
		switch (aKey) {
			case "consum":
				this.itemList.setList(User.getConsum());
				break;
			case "important":
				this.itemList.setList(User.getImportant());
				break;
			case "accessory":
				this.itemList.setList(User.getAccessory());
				break;
			case "fragment":
				this.itemList.setList(User.getFragment());
				break;
			case "back":
				this.close();
				break;
			default:

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
