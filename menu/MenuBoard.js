class MenuBoard{
	static init(aList,aName){
		this.choices=aList;
		this.menu=new Menu(aList,mScreenSize.width*0.18,(aKey)=>{this.select(aKey)});
		this.boardWidth=mScreenSize.width-mScreenSize.width*0.18;
		this.boardHeight=mScreenSize.height;
		this.board=document.createElement("div");
		this.board.id=aName+"MenuBoard";
		this.board.style.position="absolute";
		this.board.style.top="0";
		this.board.style.right="0";
		this.board.style.width=this.boardWidth+"px";
		this.board.style.height="100%";
		this.board.style.display="none";
		mMenuScene.appendChild(this.board);
	}
	//メニューを表示
	static display(){
		this.displayChoice();
		return new Promise((res,rej)=>{
			this.closed=(aMessage)=>{res(aMessage);}
		})
	}
	//ボードの表示初期化
	static initBoard(){}
	//キー入力関数セット
	static setKey(){}
	//選択肢が選択された
	static select(aKey){}
	//選択肢が表示された
	static displayed(){}
	//キー入力
	static inputKey(aKey){}
	//選択肢,ボードを表示
	static displayChoice(){
		this.initBoard();
		this.board.style.display="block";
		//キー入力
		KeyMonitor.setKeyFunction(mOkKeyCode,()=>{this.inputKey("ok")})
		KeyMonitor.setKeyFunction(mCancelKeyCode,()=>{this.inputKey("cancel")})
		KeyMonitor.setCrossKeyFunction((aDirection)=>{this.inputKey(aDirection)})
		this.menu.display().then(()=>{
			this.displayed();
			KeyMonitor.startMonitor();
			this.startSelect();
		})
	}
	//メニューを閉じる
	static close(){
		KeyMonitor.stopMonitor();
		this.stopSelect();
		this.menu.hide().then(()=>{
			this.board.style.display="none";
			this.closed();//メニューを開いた関数にresを返す
		})
	}
	//新たにMenuBoardを開く
	static openNextStory(aMenu){
		KeyMonitor.stopMonitor();
		this.stopSelect();
		this.menu.hide().then(()=>{//メニューを閉じる
			this.board.style.display="none";
			aMenu.display().then((aFlag)=>{
				if(aFlag=="close"){
					this.closed("close");
					return;
				}
				this.board.style.display="block";
				this.displayChoice();
			})
		})
	}
	//選択可能に
	static startSelect(){
		this.menu.startSelect();
	}
	//選択不可に
	static stopSelect(){
		this.menu.stopSelect();
	}
}
