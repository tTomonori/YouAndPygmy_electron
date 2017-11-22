class KeyMonitor{
	//キー入力監視開始
	static startMonitor(){
		$(window).keydown((e)=>{
			let tKeyCode=e.keyCode;
			let tFunction=this.assignedFunctions.get(tKeyCode);
			if(tFunction!=null)tFunction();
		})
	}
	//キー入力監視終了
	static stopMonitor(){
		$(window).off();
	}
	//キー入力時の関数セット
	static setKey(aKeyCode,aFunction){
		this.assignedFunctions.set(aKeyCode,aFunction);
	}
	//キー入力時の関数リセット
	static resetKey(aKeyCode){

	}
}
KeyMonitor.assignedFunctions=new Map();

//ショートカットキー設定
KeyMonitor.setKey(90,()=>{SkillButton.click()})
KeyMonitor.setKey(88,()=>{ItemButton.click()})
KeyMonitor.setKey(67,()=>{CancelMoveButton.click()})
KeyMonitor.setKey(86,()=>{EndTurnButton.click()})
KeyMonitor.setKey(65,()=>{SkillButton.clickList(0)})
KeyMonitor.setKey(83,()=>{SkillButton.clickList(1)})
KeyMonitor.setKey(68,()=>{SkillButton.clickList(2)})
KeyMonitor.startMonitor();
