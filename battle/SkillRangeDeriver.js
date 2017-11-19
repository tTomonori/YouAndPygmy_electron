class SkillRangeDeriver{
	static deriveRange(aSkillData,aChara){
		let tDerivedRange=new Array();
		let tCharaPosition=aChara.getPosition();
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
				default:

			}
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
