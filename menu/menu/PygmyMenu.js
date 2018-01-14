class PygmyMenu extends MenuBoard{
	//キー入力
	static inputKey(aKey){
		switch (aKey) {
			case "up":
				this.selectingList=this.menu;
				this.pygmySelector.release();
				this.menu.pickPreviousChoice();
				break;
			case "down":
				this.selectingList=this.menu;
				this.pygmySelector.release();
				this.menu.pickNextChoice();
				break;
			case "right":
				this.selectingList=this.pygmySelector;
				this.menu.release();
				this.pygmySelector.pickNextChoice();
				break;
			case "left":
				this.selectingList=this.pygmySelector;
				this.menu.release();
				this.pygmySelector.pickPreviousChoice();
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
	//ボード初期化
	static initBoard(){
		this.board.textContent="";
		this.board.style.paddingTop=mScreenSize.height/20+"px";
		this.pygmySelector=new PygmySelector({displayData:["image","name","race","tairyoku","experience","item","accessory"],append:false,width:this.boardWidth});
		this.pygmySelector.setSelectedFunction((aData)=>{console.log(aData);})
		let tSelector=this.pygmySelector.getElement();
		tSelector.style.width="100%";
		this.board.appendChild(tSelector);
	}
	static displayed(){
		this.selectingList=this.menu;
	}
	//選択肢が選択された
	static select(aKey){
		this.close();
	}
}
//選択肢
PygmyMenu.init([
	{name:"もどる",key:"back"},
],"pygmy")
