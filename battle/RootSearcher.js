class RootSearcher{
	//引数のキャラが移動可能なマスを探す
	static searchMovable(aChara){
		let tMove=aChara.getMove();
		let tMoveCost=aChara.getMoveCost();
		let tCharaPosition=aChara.getPosition();
		let tSearchingList=new Array();
		let tSearchedList=new Array();
		tSearchingList.push({x:tCharaPosition.x,y:tCharaPosition.y,cost:0,pre:null});
		tSearchedList.push({x:tCharaPosition.x,y:tCharaPosition.y,cost:0,pre:null});
		let tGetLowest=()=>{//探索中の配列からコストがもっとも低いものをさがす
			let tLowest=tSearchingList[0];
			let tNum=0;
			for(let i=1;i<tSearchingList.length;i++){
				if(tLowest.cost>tSearchingList[i].cost){
					tLowest=tSearchingList[i];
					tNum=i;
				}
			}
			tSearchingList.splice(tNum,1);
			return tLowest;
		}
		let tGetSearched=(aX,aY)=>{//探索済み配列から指定した座標の情報を取得
			for(let i=0;i<tSearchedList.length;i++){
				if(tSearchedList[i].x==aX&&tSearchedList[i].y==aY)return tSearchedList[i];
			}
			return null;
		}
		let tRemoveSearched=(aX,aY)=>{
			for(let i=0;i<tSearchedList.length;i++){
				if(tSearchedList[i].x==aX&&tSearchedList[i].y==aY){
					tSearchedList.splice(i,1);
					return;
				}
			}
		}
		while(tSearchingList.length>0){
			let tSearching=tGetLowest();
			let tX=tSearching.x;
			let tY=tSearching.y;
			let tNextSearchPositionList=[{x:tX+1,y:tY},{x:tX-1,y:tY},{x:tX,y:tY+1},{x:tX,y:tY-1}];
			for(let tNextPosition of tNextSearchPositionList){
				let tMas=Feild.getMas(tNextPosition.x,tNextPosition.y);
				if(tMas==null)continue;//フィールド外
				let tCost=tMoveCost[tMas.getAttribute()];
				if(tCost==false)continue;//移動不可
				if(tMas.getOnChara()!=null)continue;//他のキャラがいるマス
				let tTotalCost=tSearching.cost+tCost;
				let tPreCostData=tGetSearched(tNextPosition.x,tNextPosition.y)
				if(tPreCostData!=null&&tPreCostData.cost<=tTotalCost)continue;//他のルートの方が最適
				//前のコストデータ削除
				tRemoveSearched(tNextPosition.x,tNextPosition.y);
				//新しいコストデータ登録
				let tNextData={x:tNextPosition.x,y:tNextPosition.y,cost:tTotalCost,pre:{x:tX,y:tY}};
				tSearchedList.push(tNextData);
				//移動コストが余っている
				if(tMove>tTotalCost)tSearchingList.push(tNextData);
			}
		}
		//元々キャラがいる場所を削除
		tSearchedList.splice(0,1);
		return tSearchedList;
	}
}
