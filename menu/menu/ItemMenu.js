class ItemMenu extends MenuBoard{
	//ボードの表示初期化
	static initBoard(){
		this.board.textContent="";
		this.itemList=new ItemList(this.board);
	}
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
			default:

		}
	}
	//選択肢が表示された
	static displayed(){
		this.menu.pickNextChoice();
		this.menu.select();
	}
}
//選択肢
ItemMenu.init([
	{name:"消費",key:"consum"},
	{name:"大切なもの",key:"important"},
	{name:"アクセサリ",key:"accessory"},
	{name:"かけら",key:"fragment"},
])
