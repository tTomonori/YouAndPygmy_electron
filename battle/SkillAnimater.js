class SkillAnimater{
	static animate(aAnimation,aAttackChara,aDamagedCharas){
		return new Promise((res,rej)=>{
			switch (aAnimation) {
				case "test":
					res();
					break;
				default:
				console.log("存在しないアニメーションだよ");
			}
		})
	}
}
