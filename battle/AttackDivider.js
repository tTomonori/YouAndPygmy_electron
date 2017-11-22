class AttackDivider{
	//攻撃する
	static attack(aSkill,aDefender,aAttacker){
		this.endActivateSkill=()=>{
			this.counter(aSkill,aDefender,aAttacker);
		}
		this.activateSkill(aSkill,aDefender.getMas(),aAttacker);
	}
	//反撃する
	static counter(aActivatedSkill,aCounterChara,aAttackedChara){
		let tEndFunction=()=>{CharaController.endAttack()};
		//倒されている
		if(aCounterChara.isDown()||aAttackedChara.isDown()){
			tEndFunction();
			return;
		}
		let tCounterSkill=this.getCouterSkill(aActivatedSkill,aCounterChara,aAttackedChara);
		if(tCounterSkill==null){
			//反撃不可
			tEndFunction();
			return;
		}
		//反撃可能
		this.endActivateSkill=()=>{tEndFunction();}
		this.activateSkill(tCounterSkill,aAttackedChara.getMas(),aCounterChara);
	}
	//スキルを使用する
	static activateSkill(aSkill,aMas,aChara){
		//選択したマスにキャラがいない
		let tAttackedChara=aMas.getOnChara();
		if(tAttackedChara==null)return;
		//気力が足りない
		let tMp=aSkill.mp
		if(tMp!=undefined&&aChara.getMp()<tMp){
			console.log("気力が足りないスキルは使っちゃダメ");
			return;
		}
		//気力消費
		if(tMp!=undefined)aChara.useKiryoku(aSkill.mp);
		//アイテム消費
		if(aSkill.consum==true)aChara.useItem(aSkill.key);
		//攻撃可能
		Feild.resetSelectMasEvent();
		SkillButton.hideSkillList();
		//巻き込み範囲取得
		let tInvolveRange=SkillRangeDeriver.deriveInvolveRange(aSkill,aChara,aMas);
		//ダメージを受けるキャラを取得
		let tDamagedCharas=new Array();
		for(let tPosition of tInvolveRange){
			let tMas=Feild.getMas(tPosition.x,tPosition.y);
			if(tMas==null)continue;
			let tChara=tMas.getOnChara();
			if(tChara==null)continue;
			tDamagedCharas.push(tChara);
		}
		//アニメーション実行
		SkillAnimater.animate(aSkill.animation,aChara,tDamagedCharas).then(()=>{
			//スキルエフェクト終了
			let tDamagedFunctions=new Array();
			for(let tChara of tDamagedCharas){
				//ダメージ計算
				let tDamage=this.calcuDamage(aSkill,aChara,tChara);
				if(tDamage.accuracy-Math.random()*100>=0){//当たり,回避判定
					//攻撃が当たった
					switch (tDamage.effect) {
						case "damage"://ダメージ
							tChara.damage(tDamage.damage);
							//ダメージによるキャライラストアニメーション
							tDamagedFunctions.push(()=>{return tChara.damagedAnimate()})
						break;
						case "heal"://回復
							tChara.heal(tDamage.damage);
							this.endDamagedAnimation();
						break;
						default:
					}
				}
				else{
					//攻撃が外れた
					tChara.avoid();
				}
			}
			//被ダメージエフェクト
			SkillAnimater.executeAnimations(tDamagedFunctions).then(()=>{
				//被ダメージエフェクト終了
				let tDownFunctions=new Array();
				for(let tChara of tDamagedCharas){
					//戦闘不能判定
					if(!tChara.isDown())continue;
					tDownFunctions.push(()=>{return tChara.down()})
				}
				SkillAnimater.executeAnimations(tDownFunctions).then(()=>{
					//戦闘不能アニメーション終了
					this.endActivateSkill();
				})
			})
		})
	}
	//ダメージを受けた時の顔画像変更アニメ終了
	static endDamagedAnimation(){
		if(--this.animatingCharaNum<=0){
			//全てのキャラのアニメーション終了
			this.endActivateSkill();
		}
	}
	//戦闘不能判定
	static judgeDown(){

	}
	//反撃で発動するスキルを取得
	static getCouterSkill(aActivatedSkill,aCounterChara,aAttackedChara){
		//受けたスキルが回復
		if(aActivatedSkill.attribute=="heal")return null;

		let tSkills=aCounterChara.getSkill();
		let tCounterPosition=aCounterChara.getPosition();
		let tAttackedPosition=aAttackedChara.getPosition();
		for(let tSkill of tSkills){
			//反撃不可スキル
			if(tSkill.counter==false)continue;
			//気力が足りない
			if(aCounterChara.getMp()<tSkill.mp)continue;
			//攻撃範囲取得
			let tRange=SkillRangeDeriver.deriveRange(tSkill,tCounterPosition);
			for(let tRangePosition of tRange){
				if(tRangePosition.x==tAttackedPosition.x&&tRangePosition.y==tAttackedPosition.y){
					//反撃スキルの射程内
					return tSkill;
				}
			}
		}
		//反撃可能なスキルなし
		return null;
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
			case "fixed"://固定値
				tPower=aSkill.power;
				tDefence=0;
				break;
			default:
		}
		//ダメージ計算
		switch (aSkill.attribute) {
			case "physics"://物理攻撃
			case "magic"://魔法攻撃
				let tDamage=tPower-tDefence;
				if(tDamage<1)tDamage=1;//最低1ダメージ
				//命中率
				let tAccuracy=aSkill.accuracy+(aAttackChara.getWaza()-aDamagedChara.getBinsei());
				if(tAccuracy>100)tAccuracy=100;
				else if(tAccuracy<0)tAccuracy=0;
				return {effect:"damage",damage:tDamage,accuracy:tAccuracy};
				break;
			case "heal"://回復
				return {effect:"heal",damage:tPower,accuracy:aSkill.accuracy};
				break;
			default:
		}
	}
}
