class KeyMonitor{
	//キー入力監視開始
	static startMonitor(){
		$(window).keydown((e)=>{
			let tKeyCode=e.keyCode;
			//キーに割り当てられた関数実行
			let tFunction=this.assignedFunctions.get(tKeyCode);
			if(tFunction!=null)tFunction();
			//十字キーに割り当てられた関数実行
			if(this.crossKeyFlag&&37<=tKeyCode&&tKeyCode<=40){//十字キーに関数が割り当てられている,十字キーが押されている
				let tDirection;
				switch (tKeyCode) {
					case 37:tDirection="left";break;
					case 38:tDirection="up";break;
					case 39:tDirection="right";break;
					case 40:tDirection="down";break;
					default:
				}
				if(this.pushingKeys.indexOf(tDirection)==-1)this.pushingKeys.push(tDirection);
				this.assignedCrossKeyFunction(tDirection);
			}
		})
		$(window).keyup((e)=>{
			let tKeyCode=e.keyCode;
			//十字キーが放されたか確認
			if(this.crossKeyFlag&&37<=tKeyCode&&tKeyCode<=40){//十字キーに関数が割り当てられている,十字キーが押されている
				let tDirection;
				switch (tKeyCode) {
					case 37:tDirection="left";break;
					case 38:tDirection="up";break;
					case 39:tDirection="right";break;
					case 40:tDirection="down";break;
					default:
				}
				let tIndex=this.pushingKeys.indexOf(tDirection);
				if(tIndex!=-1)this.pushingKeys.splice(tIndex,1);
			}
		})
	}
	//キー入力監視終了
	static stopMonitor(){
		$(window).off();
		this.crossKeyFlag=false;
		this.assignedFunctions=new Map();
		this.pushingKeys=new Array();
	}
	//キー入力時の関数セット
	static setKey(aKeyCode,aFunction){
		this.assignedFunctions.set(aKeyCode,aFunction);
	}
	//十字キー入力関数セット
	static setCrossKey(aFunction){
		this.crossKeyFlag=true;
		this.assignedCrossKeyFunction=(aDirection)=>{aFunction(aDirection)};
	}
	//押し込んでいる十字キーを取得
	static getPushingCrossKeys(){
		return this.pushingKeys;
	}
	//キー入力時の関数リセット
	static resetKey(aKeyCode){

	}
	//バトル用キー入力
	static setBattleKey(){
		this.stopMonitor();
		//ショートカットキー設定
		this.setKey(90,()=>{SkillButton.click()})
		this.setKey(88,()=>{ItemButton.click()})
		this.setKey(67,()=>{CancelMoveButton.click()})
		this.setKey(86,()=>{EndTurnButton.click()})
		this.setKey(65,()=>{SkillButton.clickList(0)})
		this.setKey(83,()=>{SkillButton.clickList(1)})
		this.setKey(68,()=>{SkillButton.clickList(2)})
		this.startMonitor();
	}
	//マップ用キー入力
	static setMapKey(){
		this.stopMonitor();
		this.setCrossKey((aDirection)=>{mMyChara.moveByInput(aDirection)});
		this.startMonitor();
	}
}
