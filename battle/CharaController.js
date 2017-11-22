class CharaController{
	//AI(もしくはユーザ)の操作法設定
	static setAi(aAi){
		this.turnChara=Turn.getTurnChara();
		this.ai=aAi;
	}
	//選択しているスキル(アイテムの効果)を返す
	static getSelectedSkill(){
		return this.selectingSkill;
	}
	//ボタンクリック時の関数を全てリセット
	static resetButtonFunctions(){
		CancelMoveButton.resetClickFunction();
		EndTurnButton.resetClickFunction();
		ItemButton.resetClickFunction();
		OptionButton.resetClickFunction();
		SkillButton.resetClickFunction();
	}
	//ターン開始
	static startTurn(){
		 SkillButton.setSkillList(this.turnChara.getSkill());
		 ItemButton.setItemList(this.turnChara.getItem());
		this.setBeforMoveUi();
	}
	//移動先のマスが選択された
	static selectedDestination(aMas){
		Feild.resetSelectMasEvent();
		this.resetButtonFunctions();
		MoveSelecter.moveTo(aMas);
	}
	//スキルが選択された
	static selectedSkill(aSkill){
		this.selectingSkill=aSkill;
		StatusBox.setSelectedSkillInfo(aSkill);
		this.turnChara.setLastSelectedSkill(aSkill);
		if(this.turnChara.getMp()<aSkill.mp){
			//気力が足りない
			AttackSelecter.displayNotEnoughSkillRange(aSkill);
		}
		else{
			AttackSelecter.displayAttackRange(aSkill);
		}
	}
	//アイテムが選択された
	static selectedItem(aItem){
		this.selectingSkill=aItem;
		StatusBox.setSelectedItemInfo(aItem);
		AttackSelecter.displayAttackRange(aItem);
	}
	//攻撃するマスが選択された
	static selectedAttackMas(aMas){
		if(AttackSelecter.judgeAttackable(aMas,this.selectingSkill)){
			this.resetButtonFunctions();
			AttackSelecter.attackTo(aMas,this.selectingSkill);
		}
	}
	//移動したあと
	static moved(){
		this.setAfterMoveUi();
	}
	//攻撃した後
	static endAttack(){
		Turn.endTurn();
	}
	//移動先を選択するためのuiセット
	static setSelectMoveUi(){
		Feild.resetSelectMasEvent();
		//移動可能マス表示
		MoveSelecter.displayMoveRange();
	}
	//スキル,攻撃先を選択するためのuiセット
	static setSelectSkillUi(){
		Feild.resetSelectMasEvent();
		let tLastSelectedSkill=this.turnChara.getLastSelectedSkill();
		//最後に選択したスキルを自動選択
		if(tLastSelectedSkill!=null)this.selectedSkill(tLastSelectedSkill);
	}
	//アイテム,使用先を選択するためのuiセット
	static setSelectItemUi(){
		Feild.resetSelectMasEvent();
		ItemButton.clickList(0);
	}
	//移動する前のuiセット
	static setBeforMoveUi(){
		SkillButton.hideSkillList();
		ItemButton.hideItemList();
		//ボタンセット
		CancelMoveButton.setClickFunction(()=>{
			this.setBeforMoveUi();
		})
		EndTurnButton.setClickFunction(()=>{
			this.resetButtonFunctions();
			SkillButton.hideSkillList();
			ItemButton.hideItemList();
			Feild.resetSelectMasEvent();
			Turn.endTurn();
		})
		ItemButton.setClickFunction(()=>{
			if(ItemButton.isDisplayed()){
				//アイテムリストが表示されている
				ItemButton.hideItemList();
				this.setSelectMoveUi();
			}
			else{
				//アイテムリストが表示されていない
				SkillButton.hideSkillList();
				ItemButton.displayItem();
				this.setSelectItemUi();
			}
		})
		OptionButton.setClickFunction(()=>{

		})
		SkillButton.setClickFunction(()=>{
			if(SkillButton.isDisplayed()){
				//スキルリストが表示されている
				SkillButton.hideSkillList();
				this.setSelectMoveUi();
			}
			else{
				//スキルリストが表示されていない
				ItemButton.hideItemList();
				SkillButton.displaySkill();
				this.setSelectSkillUi();
			}
		})
		this.setSelectMoveUi();
	}
	//移動した後のuiセット
	static setAfterMoveUi(){
		SkillButton.displaySkill();
		//ボタンセット
		CancelMoveButton.setClickFunction(()=>{
			this.resetButtonFunctions();
			Feild.resetSelectMasEvent();
			MoveSelecter.cancelMove();
			this.setBeforMoveUi();
		})
		EndTurnButton.setClickFunction(()=>{
			this.resetButtonFunctions();
			SkillButton.hideSkillList();
			ItemButton.hideItemList();
			Feild.resetSelectMasEvent();
			Turn.endTurn();
		})
		ItemButton.setClickFunction(()=>{
			if(ItemButton.isDisplayed()){
				//アイテムリストが表示されている
				ItemButton.hideItemList();
			}
			else{
				//アイテムリストが表示されていない
				SkillButton.hideSkillList();
				ItemButton.displayItem();
				this.setSelectItemUi();
			}
		})
		OptionButton.setClickFunction(()=>{

		})
		SkillButton.setClickFunction(()=>{
			if(SkillButton.isDisplayed()){
				//スキルリストが表示されている
				SkillButton.hideSkillList();
			}
			else{
				//スキルリストが表示されていない
				ItemButton.hideItemList();
				SkillButton.displaySkill();
				this.setSelectSkillUi();
			}
		})
		this.setSelectSkillUi();
	}
}
