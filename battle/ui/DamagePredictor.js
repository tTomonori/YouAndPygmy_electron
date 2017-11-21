class DamagePredictor{
	static init(){
		this.tag=document.createElement("div");
		this.tag.style.position="absolute";
		this.tag.style.bottom=(mScreenSize.width/2-2)/4+"px";
		this.tag.style.left="0";
		this.tag.style.width=mScreenSize.width/4+"px";
		this.tag.style.height=mScreenSize.width/16+"px";
		this.tag.style.color="#fff";
		this.tag.style.background="#542";
		this.tag.style.display="none";

		let tCreatePredictBox=(aName,aPosition)=>{//威力,命中を表示するbox生成
			let tBox=document.createElement("div");
			tBox.style.position="absolute";
			tBox.style.top="0";
			if(aPosition=="left")tBox.style.left="0";
			else tBox.style.right="0";
			tBox.style.width="calc(50% - 2px)";
			tBox.style.height="100%";
			tBox.style.border="solid 1px #431";
			//威力
			let tPower=document.createElement("div");
			tPower.style.width="100%";
			tPower.style.height="50%";
			let tPowerName=document.createElement("span");
			tPowerName.textContent=aName+"　";
			let tPowerValue=document.createElement("span");
			tPower.appendChild(tPowerName);
			tPower.appendChild(tPowerValue);
			//命中
			let tAccuracy=document.createElement("div");
			tAccuracy.style.width="100%";
			tAccuracy.style.height="50%";
			let tAccuracyName=document.createElement("span");
			tAccuracyName.textContent="命中　";
			let tAccuracyValue=document.createElement("span");
			tAccuracy.appendChild(tAccuracyName);
			tAccuracy.appendChild(tAccuracyValue);

			tBox.appendChild(tPower);
			tBox.appendChild(tAccuracy);
			return tBox;
		}
		this.tag.appendChild(tCreatePredictBox("攻撃","left"));
		this.tag.appendChild(tCreatePredictBox("反撃","right"));
		mBattleSecene.appendChild(this.tag);

		//マウスが移動するたびにダメージ予測欄を消す
		ThreeWarld.setMouseMoveForeverFunction(()=>{
			this.hidePredict();
		})
	}
	//ダメージ予測表示
	static displayPredict(aSkill,aAttacker,aMas){
		if(AttackSelecter.judgeAttackable(aMas,aSkill)){
			let tDefender=aMas.getOnChara();
			//攻撃予測
			let tDamage=AttackDivider.calcuDamage(aSkill,aAttacker,tDefender);
			this.setDamageInfo(tDamage,this.tag.children[0]);
			//反撃予測
			let tCounterSkill=AttackDivider.getCouterSkill(aSkill,tDefender,aAttacker);
			if(tCounterSkill==null)tDamage=null;
			else tDamage=AttackDivider.calcuDamage(tCounterSkill,tDefender,aAttacker);
			this.setDamageInfo(tDamage,this.tag.children[1]);
		}
		else{
			//攻撃不可のマス
			this.setDamageInfo(null,this.tag.children[0]);
			this.setDamageInfo(null,this.tag.children[1]);
		}

		this.tag.style.display="block";
	}
	//予測boxに情報表示
	static setDamageInfo(aDamageInfo,aTag){
		if(aDamageInfo==null){
			//ダメージ
			aTag.firstChild.children[1].textContent="---";
			//命中
			aTag.children[1].children[1].textContent="---";
		}
		else{
			//ダメージ
			aTag.firstChild.children[1].textContent=aDamageInfo.damage;
			//命中
			aTag.children[1].children[1].textContent=aDamageInfo.accuracy+"%";
		}
	}
	//予測非表示
	static hidePredict(){
		this.tag.style.display="none";
	}
}
