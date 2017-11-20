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
	//指定したマスに攻撃
	static attackTo(aMas){
		AttackDivider.attack(this.selectedSkill,aMas,this.turnChara);
	}
}
