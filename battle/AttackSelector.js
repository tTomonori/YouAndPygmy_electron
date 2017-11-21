class AttackSelecter{
	//ターンを開始したキャラをセット
	static setTurnChara(aChara){
		this.turnChara=aChara;
		this.selectedSkill=null;
	}
	//スキルの攻撃範囲表示
	static displayAttackRange(aSkill){
		this.selectedSkill=aSkill;
		Feild.resetSelectMasEvent();
		let tRange=SkillRangeDeriver.deriveRange(aSkill,this.turnChara.getPosition());
		if(aSkill.attribute=="heal")Feild.displaySkillHealRange(tRange);
		else Feild.displaySkillAttackRange(tRange);
	}
	//気力が足りない時の範囲表示
	static displayNotEnoughSkillRange(aSkill){
		this.selectedSkill=aSkill;
		Feild.resetSelectMasEvent();
	}
	//指定したマスが攻撃可能か判定
	static judgeAttackable(aMas,aSkill){
		let tChara=aMas.getOnChara();
		if(tChara==null)return false;
		if(tChara.getTeam()==this.turnChara.getTeam()&&aSkill.attribute!="heal")return false;
		return true;
	}
	//指定したマスに攻撃
	static attackTo(aMas,aSkill){
		let tChara=aMas.getOnChara();
		AttackDivider.attack(this.selectedSkill,tChara,this.turnChara);
	}
}
