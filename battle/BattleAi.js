class BattleAi{
	//キャラの行動を決定
	static decideAction(aChara,aAi){
		this.turnChara=aChara;
		this.turnCharaPosition=aChara.getPosition();
		this.turnCharaTeam=aChara.getTeam();
		switch (aAi) {
			case "tonikakunaguru":
				return this.tonikakunaguru();
				break;
			default:
		}
	}
	//最も近くにいる相手に攻撃
	static tonikakunaguru(){
		let tEnemies=this.getCharasSortedByDistance({enemy:true});
		let tMasList=this.getMasSortedByDistance();
		for(let tChara of tEnemies){
			for(let tMasPosition of tMasList){
				let tAttackData=this.canAttack(tMasPosition,tChara);
				if(tAttackData.length==0)continue;//攻撃不可
				//攻撃可能
				//最もダメージが大きいスキルを選択
				let tSkill=getMaxEvaluted(tAttackData,(aData)=>{return aData.damage}).skill;
				return {goTo:tMasPosition,skill:tSkill,attackTo:tChara.getPosition()};
			}
		}
		//誰にも攻撃できない
		return {goTo:this.turnCharaPosition};
	}
	//指定したマスからキャラへ攻撃できるか(攻撃できるなら、使用するスキルと効果などを返す)
	static canAttack(aMasPosition,aChara){
		let tCharaPosition=aChara.getPosition();
		let tCharaTeam=aChara.getTeam();
		let tAttackData=new Array();
		for(let tSkill of this.turnChara.getSkill()){
			//きりょく不足
			if(this.turnChara.getKiryoku()<tSkill.mp)continue;
			if(this.turnCharaTeam==tCharaTeam){
				//標的が味方
				//攻撃スキルはしようしない
				if(tSkill.attribute=="physics")continue;
				if(tSkill.attribute=="magic")continue;
			}
			else{
				//標的が敵
				//回復スキルは使用しない
				if(tSkill.attribute=="heal")continue;
			}
			//標的が範囲内にいるか
			let tRange=SkillRangeDeriver.deriveRange(tSkill,aMasPosition);
			let tAttackFlag=false;
			for(let tRangePosition of tRange){
				if(tRangePosition.x==tCharaPosition.x&&tRangePosition.y==tCharaPosition.y){
					tAttackFlag=true;
					break;
				}
			}
			if(!tAttackFlag)continue;//スキルの攻撃範囲外
			//攻撃可能
			let tDamageData=AttackDivider.calcuDamage(tSkill,this.turnChara,aChara);
			tAttackData.push({skill:tSkill,effect:tDamageData.effect,damage:tDamageData.damage,accuracy:tDamageData.accuracy});
		}
		return tAttackData;
	}
	//指定チームのキャラを、自分から近い順に並べたリストを生成
	static getCharasSortedByDistance(aTeams){
		let tCharas=[];
		let tDistanceList=new Array();
		//指定チームのキャラリスト
		if(this.turnCharaTeam=="enemy"){
			if(aTeams.ally)Array.prototype.push.apply(tCharas,Battle.getEnemyTeam());
			if(aTeams.enemy)Array.prototype.push.apply(tCharas,Battle.getUserTeam());
		}
		else{
			if(aTeams.ally)Array.prototype.push.apply(tCharas,Battle.getUserTeam());
			if(aTeams.enemy)Array.prototype.push.apply(tCharas,Battle.getEnemyTeam());
		}
		//並び替える
		let tList=this.sortByEvalution(tCharas,(aChara)=>{
			let tCharaPosition=aChara.getPosition();
			let tDistance=Math.abs(this.turnCharaPosition.x-tCharaPosition.x)+Math.abs(this.turnCharaPosition.y-tCharaPosition.y);//自分との距離
			return tDistance;
		})
		return tList;
	}
	//移動可能マス+自分がいるマスを、移動距離が短い順に並び替えたリスト生成
	static getMasSortedByDistance(){
		let tMovableMas=MoveSelecter.getMovablePositions();
		//自分がいるマスを追加
		tMovableMas.push({x:this.turnCharaPosition.x,y:this.turnCharaPosition.y});
		//並び替える
		let tList=this.sortByEvalution(tMovableMas,(aMas)=>{
			let tMasPosition=aMas;
			let tDistance=Math.abs(this.turnCharaPosition.x-tMasPosition.x)+Math.abs(this.turnCharaPosition.y-tMasPosition.y);//自分マスからの距離
			return tDistance;
		})
		return tList;
	}
	//リストの要素を評価値の順に並び替える(評価値が同じ要素はランダムに並び替える)
	static sortByEvalution(aList,aEvaluteFunction){
		let tEvalutionList=new Array();//=[{element:,evalution:},elemnt,element,...]
		for(let tElement of aList){
			let tEvalution=aEvaluteFunction(tElement);//評価値計算
			//リストに評価値を記録
			for(let i=0;i<=tEvalutionList.length;i++){
				if(i==tEvalutionList.length){
					tEvalutionList.push([{element:tElement,evalution:tEvalution}]);
					break;
				}
				if(tEvalution<tEvalutionList[i][0].evalution){
					tEvalutionList.splice(i,0,[{element:tElement,evalution:tEvalution}]);
					break;
				}
				if(tEvalution==tEvalutionList[i][0].evalution){
					tEvalutionList[i].push(tElement);
					break;
				}
			}
		}
		let tSortedList=new Array();
		for(let tList of tEvalutionList){
			tList[0]=tList[0].element
			//同じ評価値のキャラをランダムに並び替える
			Array.prototype.push.apply(tSortedList,randomSort(tList));
		}
		return tSortedList;
	}
}
//リストをランダムに並び替える
function randomSort(aList){
	for(let i=0;i<aList.length-1;i++){
		let tTemp=aList[i];
		let tIndex=Math.floor(i+Math.random()*(aList.length-i));
		aList[i]=aList[tIndex];
		aList[tIndex]=tTemp;
	}
	return aList;
}
//リストから最も評価値が高い要素を取得
function getMaxEvaluted(aList,aEvaluteFunction){
	let tMaxEvalution;
	let tMaxElement=null;
	for(let tElement of aList){
		let tEvalution=aEvaluteFunction(tElement);
		if(tMaxElement==null||tMaxEvalution<tEvalution){
			tMaxEvalution=tEvalution;
			tMaxElement=tElement
		}
	}
	return tMaxElement;
}
