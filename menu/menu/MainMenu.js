class MainMenu extends MenuBoard{
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
	//選択肢が選択された
	static select(aKey){
		let tMenu;
		//次に表示するメニューのクラスを取得
		for(let tChoice of this.choices){
			if(aKey==tChoice.key){
				tMenu=tChoice.class;
				break;
			}
		}
		//次の階層のメニューを表示
		this.openNextStory(tMenu);
	}
}
//選択肢
MainMenu.init([
	{name:"ぴぐみー",class:PygmyMenu,key:"pygmy"},
	{name:"アイテム",class:ItemMenu,key:"item"},
	{name:"セーブ",class:SaveMenu,key:"save"},
	{name:"マップ",class:MapMenu,key:"map"},
	{name:"ずかん",class:BookMenu,key:"book"},
	{name:"あなた",class:YouMenu,key:"you"},
	{name:"設定",class:SettingMenu,key:"setting"},
],"main")
