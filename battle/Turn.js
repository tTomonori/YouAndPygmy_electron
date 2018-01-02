class Turn{
	static init(aCharaList){
		this.allChara=aCharaList;//全てのキャラ
		this.order;//このターンに行動していないキャラ
		this.actedChara;//行動済みのキャラ
		this.turnChara=null;//ターン中のキャラ
		this.resetOrder();
	}
	static getTurnChara(){
		return this.turnChara;
	}
	//攻撃順リセット
	static resetOrder(){
		this.order=this.allChara.concat();
		this.actedChara=new Array();
		//びんせい順に並び替え
		this.sortOrder();
	}
	//orderをびんせい順に並び替え
	static sortOrder(){
		this.order.sort(function(a,b){
			if(a.getBinsei()<b.getBinsei()) return 1;
			if(a.getBinsei()>b.getBinsei()) return -1;
			return 0;
		});
	}
	//次のターン開始
	static nextTurn(){
		//勝敗判定
		if(Battle.judge())return;
		//全キャラ行動済みなら順番リセット
		if(this.order.length==0)this.resetOrder();
		this.turnChara=this.order[0];
		StatusBox.setTurnCharaInfo(this.turnChara);
		CharaController.setAi(this.turnChara.getAi());
		MoveSelecter.setTurnChara(this.turnChara);
		AttackSelecter.setTurnChara(this.turnChara);
		CharaController.startTurn();
		// this.turnChara.startTurn();
	}
	//ターン終了
	static endTurn(){
		if(this.order.length>0&&this.turnChara==this.order[0])
			this.actedChara.push(this.order.shift());
		this.nextTurn();
	}
	//キャラを消す(戦闘不能)
	static deleteChara(aChara){
		let tDelete=(aList)=>{
			let i=0;
			for(let tChara of aList){
				if(tChara==aChara){
					aList.splice(i,1);
					return;
				}
				i++;
			}
		}
		tDelete(this.allChara);
		tDelete(this.order);
		tDelete(this.actedChara);
	}
}
