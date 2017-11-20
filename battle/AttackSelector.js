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
	//指定したキャラに攻撃
	static attackTo(aChara){
		AttackDivider.attack(this.selectedSkill,aChara,this.turnChara);
	}
}
