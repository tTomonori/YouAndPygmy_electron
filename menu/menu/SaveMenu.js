class SaveMenu extends MenuBoard{
	//キー入力
	static inputKey(aKey){
		switch (aKey) {
			case "up":
				this.menu.pickPreviousChoice();
				break;
			case "down":
				this.menu.pickNextChoice();
				break;
			case "ok":
				this.menu.select();
				break;
			case "cancel":
				this.close();
				break;
			default:
		}
	}
	//ボード初期化
	static initBoard(){
		this.board.textContent="";
	}
	//選択肢が選択された
	static select(aKey){
		this.close();
	}
}
//選択肢
SaveMenu.init([
	{name:"もどる",key:"back"},
],"save")
