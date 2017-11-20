class SkillRangeDeriver{
	//スキルの攻撃範囲を返す
	static deriveRange(aSkillData,aPosition){
		let tDerivedRange=new Array();
		let tCharaPosition=aPosition;
		for(let tRange of aSkillData.range){
			this.skillMoveCost.object=(aSkillData.object)?1:false;
			this.skillMoveCost.wall=(aSkillData.wall)?1:false;
			switch (tRange.range) {
				case "circumference"://周囲
					let tDerived=RootSearcher.searchMovable(tRange.value,this.skillMoveCost,tCharaPosition);
					tDerivedRange=tDerivedRange.concat(tDerived);
					break;
				case "straight"://直線
					let tDirectionList=[{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];
					for(let tDirection of tDirectionList){
						for(let i=1;i<=tRange.value;i++){
							let tMas=Feild.getMas(tCharaPosition.x+i*tDirection.x,tCharaPosition.y+i*tDirection.y);
							if(tMas==null)break;
							tDerivedRange.push(tMas.getPosition());
							if(tRange.near==true&&tMas.getOnChara()!=null)break;
						}
					}
					break;
				case "my"://自分
					tDerivedRange.push(tCharaPosition);
					break;
				default:

			}
		}
		return tDerivedRange;
	}
	//スキルの巻き込み範囲を返す
	static deriveInvolveRange(aSkillData,aChara,aSelectedMas){
		let tDerivedRange=new Array();
		let tSelectedPosition=aSelectedMas.getPosition();
		switch (aSkillData.involve.involve) {
			case "none"://巻き込みなし
				tDerivedRange.push(tSelectedPosition);
				break;
			case "circumference"://周囲
				let tInvolveRange=this.deriveRange({range:[{range:"circumference",value:aSkillData.involve.value}]},tSelectedPosition);
				tInvolveRange.push(tSelectedPosition);
				tDerivedRange=tInvolveRange;
				break;
			case "through"://貫通
				let tCharaPosition=aChara.getPosition();
				let tDirection;
				if(tCharaPosition.y<tSelectedPosition.y)tDirection={x:0,y:1}//上
				else if(tCharaPosition.x<tSelectedPosition.x)tDirection={x:1,y:0}//右
				else if(tCharaPosition.y>tSelectedPosition.y)tDirection={x:0,y:-1}//下
				else if(tCharaPosition.x>tSelectedPosition.x)tDirection={x:-1,y:0}//左
				else{console.log("貫通範囲エラー");}//エラー
				for(let i=1;i<=aSkillData.range[0].value;i++){
					tDerivedRange.push({x:tCharaPosition.x+i*tDirection.x,y:tCharaPosition.y+i*tDirection.y});
				}
				break;
			default:

		}
		return tDerivedRange;
	}
}
SkillRangeDeriver.skillMoveCost={
	grass:1,
	sand:1,
	water:1,
	magma:1,
	snow:1,
	ice:1,
	air:1,
	chara:true
}
