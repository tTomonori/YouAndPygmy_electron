class MenuBoard{
	static init(aList){
		this.choices=aList;
		this.menu=new Menu(aList,mScreenSize.width*0.18,(aKey)=>{this.select(aKey)});
		this.boardWidth=mScreenSize.width-mScreenSize.width*0.18;
		this.boardHeight=mScreenSize.height;
		this.board=document.createElement("div");
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
	//選択肢,ボードを表示
	static displayChoice(){
		this.initBoard();
		this.board.style.display="block";
		this.setKey();
		this.menu.display().then(()=>{
			KeyMonitor.startMonitor();
		})
	}
	//キー入力関数セット
	static setKey(){}
	//選択肢が選択された
	static select(aKey){}
	//メニューを閉じる
	static close(){
		KeyMonitor.stopMonitor();
		this.menu.hide().then(()=>{
			this.board.style.display="none";
			this.closed();
		})
	}
}
