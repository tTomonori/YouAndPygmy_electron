class AttackDivider{
	//攻撃する
	static attack(aSkill,aMas,aChara){
		let tAttackedChara=aMas.getOnChara();
		if(tAttackedChara==null)return;
		//攻撃可能
		Feild.resetSelectMasEvent();
		SkillButton.hideSkillList();
		//巻き込み範囲取得
		let tInvolveRange=SkillRangeDeriver.deriveInvolveRange(aSkill,aChara,aMas);
		for(let tPosition of tInvolveRange){
			let tMas=Feild.getMas(tPosition.x,tPosition.y);
			let tChara=tMas.getOnChara();
			if(tChara==null)continue;
			let tDamage=this.calcuDamage(aSkill,aChara,tChara);
			switch (tDamage.effect) {
				case "damage"://ダメージ
					tChara.damage(tDamage.damage);
					break;
				case "heal"://回復
					tChara.heal(tDamage.damage);
					break;
				default:
			}
		}
		aChara.endAttack();
	}
	//ダメージ計算
	static calcuDamage(aSkill,aAttackChara,aDamagedChara){
		let tPower;
		let tDefence;
		//計算に使用するステータス決定
		switch (aSkill.attribute) {
			case "physics"://物理攻撃
				tPower=aAttackChara.getTikara();
				tDefence=aDamagedChara.getMamori();
				break;
			case "magic"://魔法攻撃
				tPower=aAttackChara.getMaryoku();
				tDefence=aDamagedChara.getSeisin();
				break;
			case "heal"://回復
				tPower=aAttackChara.getYuryoku();
				tDefence=aDamagedChara.getYuryoku();
				break;
			default:
		}
		//スキル倍率計算
		switch (aSkill.magnification) {
			case "addition"://加算
				tPower+=aSkill.power;
				break;
			case "multiplication"://乗算
				tPower=Math.floor(tPower*aSkill.power);
				break;
			default:
		}
		//ダメージ計算
		switch (aSkill.attribute) {
			case "physics"://物理攻撃
			case "magic"://魔法攻撃
				let tDamage=tPower-tDefence;
				if(tDamage<0)tDamage=0;
				return {effect:"damage",damage:tDamage};
				break;
			case "heal"://回復
				return {effect:"heal",damage:tPower};
				break;
			default:
		}
	}
}
