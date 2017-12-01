class SceneChanger{
	//バトルシーンへ遷移
	static changeToBattleScene(){
		return new Promise((res,rej)=>{
			document.getElementById("battleScene").style.display="block";
			document.getElementById("mapScene").style.display="none";
			Battle.start();
			KeyMonitor.setBattleKey();
			this.endBattleMessage=()=>{
				KeyMonitor.setMapKey();
				res();
			}
		})
	}
	//バトル終了
	static endBattle(aWinOrLose){
		KeyMonitor.stopMonitor();
		document.getElementById("mapScene").style.display="block";
		document.getElementById("battleScene").style.display="none";
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
	//メニューを開く
	static changeToMenuScene(){
		KeyMonitor.stopMonitor();
		KeyMonitor.setMenuKey();
		document.getElementById("menuScene").style.display="block";
		MainMenu.display().then(()=>{
			//メニューが閉じられた
			KeyMonitor.stopMonitor();
			document.getElementById("menuScene").style.display="none";
			KeyMonitor.setMapKey();
			KeyMonitor.startMonitor();
		})
	}
}
