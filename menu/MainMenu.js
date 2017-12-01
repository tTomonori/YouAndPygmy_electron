class MainMenu extends MenuBoard{
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
		KeyMonitor.stopMonitor();
		this.menu.hide().then(()=>{
			let tMenu;
			//次に表示するメニューのクラスを取得
			for(let tChoice of this.choices){
				if(aKey==tChoice.key){
					tMenu=tChoice.class;
					break;
				}
			}
			//次の階層のメニューを表示
			tMenu.display().then((aFlag)=>{
				if(aFlag=="close"){
					this.closed("close");
					return;
				}
				this.displayChoice();
			})
		})
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
])
