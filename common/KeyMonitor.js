class KeyMonitor{
	static init(){
		this.assignedFunctions=new Map();//キーに割り当てられた関数
		this.assignedCrossKeyFunction=()=>{};//十字キーに割り当てられた関数
		this.pushingKeys=new Array();//押されている十字キーを記憶
		this.downKey=()=>{};
		this.downCrossKey=()=>{};
		this.upCrossKey=()=>{};
		$(window).keydown((e)=>{
			let tKeyCode=e.keyCode;
			this.downKey(tKeyCode);
			this.setPushingCrossKeyFlag(tKeyCode);
			this.downCrossKey(tKeyCode);
		})
		$(window).keyup((e)=>{
			let tKeyCode=e.keyCode;
			this.resetPushingCrossKeyFlag(tKeyCode);
			this.upCrossKey=(tKeyCode);
		})
	}
	//キー入力監視開始
	static startMonitor(){
		this.downKey=(aKeyCode)=>{this.runAssignedFunctions(aKeyCode)}
		this.downCrossKey=(aKeyCode)=>{this.runAssignedCrossKeyFunction(aKeyCode)}
	}
	//キー入力監視終了
	static stopMonitor(){
		this.downKey=()=>{}
		this.downCrossKey=()=>{}
	}
	//キーに割り当てられた関数実行
	static runAssignedFunctions(aKeyCode){
		let tFunction=this.assignedFunctions.get(aKeyCode);
		if(tFunction!=null)tFunction();
	}
	//十字キーに割り当てられた関数実行
	static runAssignedCrossKeyFunction(aKeyCode){
		let tDirection=this.getKeyDirection(aKeyCode);
		if(tDirection==null)return;//押されたキーが十字キーでない
		//十字キーに割り当てられた関数実行
		this.assignedCrossKeyFunction(tDirection);
	}
	//十字キーが押されたことを記憶
	static setPushingCrossKeyFlag(aKeyCode){
		let tDirection=this.getKeyDirection(aKeyCode);
		if(tDirection==null)return;//押されたキーが十字キーでない
		//押されているキーを記憶
		let tContainFlag=false;
		for(let tPushing of this.pushingKeys){
			if(tPushing.direction!=tDirection)continue;
			tContainFlag=true;
			if(tPushing.keys.indexOf(aKeyCode)==-1){
				tPushing.keys.push(aKeyCode);
				break;
			}
		}
		if(!tContainFlag)this.pushingKeys.unshift({direction:tDirection,keys:[aKeyCode]});
	}
	//十字キーが放されたことを記憶
	static resetPushingCrossKeyFlag(aKeyCode){
		let tDirection=this.getKeyDirection(aKeyCode);
		if(tDirection==null)return;//押されたキーが十字キーでない
		//キーが放されたことを記憶
		for(let i=0;i<this.pushingKeys.length;i++){
			let tPushing=this.pushingKeys[i];
			if(tPushing.direction!=tDirection)continue;
			let tIndex=tPushing.keys.indexOf(aKeyCode);
			if(tIndex==-1)break;
			tPushing.keys.splice(tIndex,1);
			if(tPushing.keys.length!=0)break;
			this.pushingKeys.splice(i,1);
			break;
		}
	}
	//押されたキーの方向を取得
	static getKeyDirection(aKeyCode){
		switch (aKeyCode) {
			case 37:
			case mLeftKeyCode:
				return "left";
			case 38:
			case mUpKeyCode:
				return "up";
			case 39:
			case mRightKeyCode:
				return "right";
			case 40:
			case mDownKeyCode:
				return "down";
			default:
			return null;//十字キーじゃないキーが押されていた
		}
	}
	//押し込んでいる十字キーを取得
	static getPushingCrossKeyDirection(){
		if(this.pushingKeys.length==0)return null;
		return this.pushingKeys[0].direction;
	}
	//キー入力時の関数セット
	static setKeyFunction(aKeyCode,aFunction){
		this.assignedFunctions.set(aKeyCode,aFunction);
	}
	//十字キー入力関数セット
	static setCrossKeyFunction(aFunction){
		this.crossKeyFlag=true;
		this.assignedCrossKeyFunction=(aDirection)=>{aFunction(aDirection)};
	}
	//キー入力時の関数リセット
	static resetKey(aKeyCode){
		this.assignedFunctions.clear();//キーに割り当てられた関数
		this.assignedCrossKeyFunction=()=>{};//十字キーに割り当てられた関数
	}
	//セットした関数全てリセット
	static reset(){
		this.assignedFunctions.clear();//キーに割り当てられた関数
		this.assignedCrossKeyFunction=()=>{};//十字キーに割り当てられた関数
		this.pushingKeys.length=0;//押されている十字キーを記憶
	}
	//キー入力を処理する関数セット
	static setInputKeyFunction(aFunction){
		this.reset();
		this.setCrossKeyFunction((aDirection)=>{aFunction(aDirection)});
		for(let tKeyName in mKeyCodeSet){
			let tKey=mKeyCodeSet[tKeyName];
			this.setKeyFunction(tKey.code,()=>{aFunction(tKey.key)});
		}
	}
}
var mOkKeyCode=65;
var mCancelKeyCode=68;

var mKeyCodeSet={
	ok:{code:65,key:"ok"},
	cancel:{code:68,key:"cancel"},
	skill:{code:81,key:"skill"},
	item:{code:87,key:"item"},
	reset:{code:69,key:"reset"},
	end:{code:82,key:"end"},
	skill0:{code:49,key:"skill0"},
	skill1:{code:50,key:"skill1"},
	skill2:{code:51,key:"skill2"},
}

var mUpKeyCode=83;
var mDownKeyCode=88;
var mLeftKeyCode=90;
var mRightKeyCode=67;
