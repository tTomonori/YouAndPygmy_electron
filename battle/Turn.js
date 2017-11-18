class Turn{
	static init(aCharaList){
		this.allChara=aCharaList;//全てのキャラ
		this.order;//このターンに行動していないキャラ
		this.actedChara;//行動済みのキャラ
		this.resetOrder();
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
		//全キャラ行動済みなら順番リセット
		if(this.order.length==0)this.resetOrder();
		this.order[0].startTurn();
	}
}
