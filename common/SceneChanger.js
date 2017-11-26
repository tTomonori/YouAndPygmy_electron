class SceneChanger{
	//バトルシーンへ遷移
	static changeToBattleScene(){
		KeyMonitor.stopMonitor();
		return new Promise((res,rej)=>{
			document.getElementById("battleScene").style.display="block";
			document.getElementById("mapScene").style.display="none";
			Battle.start();
			KeyMonitor.setBattleKey();
			this.endBattleMessage=()=>{res()}
		})
	}
	//バトル終了
	static endBattle(aWinOrLose){
		KeyMonitor.stopMonitor();
		document.getElementById("mapScene").style.display="block";
		document.getElementById("battleScene").style.display="none";
		KeyMonitor.setMapKey();
		this.endBattleMessage();
	}
	//マップ移動
	static moveMap(aMoveEvent){
		return new Promise((res,rej)=>{
			MapFeild.releaseMap();
			MapFeild.setMap(MapDictionary.getMap(aMoveEvent.mapName));
			mMyChara.setPosition(aMoveEvent.neighborPosition);
			res();
		})
	}
}
