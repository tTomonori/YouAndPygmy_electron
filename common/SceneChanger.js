class SceneChanger{
	//バトルシーンへ遷移
	static changeToBattleScene(){
		return new Promise((res,rej)=>{
			document.getElementById("battleScene").style.display="block";
			document.getElementById("mapScene").style.display="none";
			Battle.start();
			KeyMonitor.setBattleKey();
			this.endBattleMessage=(aWinOrLose,aReturn)=>{
				KeyMonitor.setMapKey();
				res({winOrLose:aWinOrLose,pygmy:aReturn});
			}
		})
	}
	//バトル終了
	static endBattle(aWinOrLose,aReturn){
		KeyMonitor.stopMonitor();
		document.getElementById("mapScene").style.display="block";
		document.getElementById("battleScene").style.display="none";
		this.endBattleMessage(aWinOrLose,aReturn);
	}
	//マップ移動
	static moveMap(aMoveEvent){
		return new Promise((res,rej)=>{
			MapFeild.releaseMap();
			MapFeild.setMap(MapDictionary.get(aMoveEvent.mapName));
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
