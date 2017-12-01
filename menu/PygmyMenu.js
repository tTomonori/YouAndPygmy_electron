class PygmyMenu extends MenuBoard{
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
		KeyMonitor.startMonitor();
	}
	//メニューを表示
	static display(){
		this.displayChoice();
		return new Promise((res,rej)=>{
			this.closed=(aMessage)=>{res(aMessage);}
		})
	}
	//選択肢が選択された
	static select(aKey){
		KeyMonitor.stopMonitor();
		this.menu.hide().then(()=>{
			if(aKey=="back")this.close();
		})
	}
}
//選択肢
PygmyMenu.init([
	{name:"もどる",key:"back"},
])
