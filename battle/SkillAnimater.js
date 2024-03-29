class SkillAnimater{
	//アニメーション実行
	static animate(aAnimation,aAttackChara,aDamagedCharas){
		return new Promise((res,rej)=>{
			this.resolve=()=>{res();}
			// this.animatingNum=;必要
			switch (aAnimation) {
				case "test":
					this.animatingNum=aDamagedCharas.length;
					for(let tChara of aDamagedCharas){
						let tSphere=ThreeFeild.createSphere(5);
						let tPosition=tChara.getPosition();
						let tThreePosition=Feild.convertToThreeFeildPosition(tPosition.x,tPosition.y)
						tSphere.position.x=tThreePosition.x;
						tSphere.position.y=tThreePosition.y;
						tSphere.position.z=mMasSize[2];
						tSphere.renderOrder=tPosition.y+0.9;
						tSphere.material.transparent=true;
						tSphere.material.opacity=0.6;
						tSphere.material.color={r:1,g:0.6,b:0}
						let i=0;
						ThreeFeild.setAnimation(()=>{
							if(i>15)return false;
							tSphere.scale.x+=0.4;
							tSphere.scale.y+=0.4;
							tSphere.scale.z+=0.4;
							i++;
							return true;
						},()=>{ThreeFeild.deleteObject(tSphere);this.endAnimation();})
					}
					break;
				default:
				console.log("存在しないアニメーションだよ");
			}
		})
	}
	//アニメーション終了時
	static endAnimation(){
		if(--this.animatingNum<=0){
			//アニメーション全て終了
			this.resolve();
		}
	}
	//配列の関数を全て実行し,全てからresが帰ってきたら,呼び出し元へresを返す
	static executeAnimations(aFunctions){
		this.animatingNum=aFunctions.length;
		return new Promise((res,rej)=>{
			if(this.animatingNum==0){
				res();
				return;
			}
			this.resolve=()=>{res();}
			for(let tFunction of aFunctions){
				tFunction().then(()=>{this.endAnimation();})
			}
		})
	}
}
