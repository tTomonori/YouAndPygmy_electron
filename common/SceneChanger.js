class SceneChanger{
	//バトルシーンへ遷移
	static changeToBattleScene(){
		return new Promise((res,rej)=>{
			document.getElementById("battleScene").style.display="block";
			document.getElementById("mapScene").style.display="none";
			Battle.start();
			KeyMonitor.setBattleKey();
		})
	}
	//バトル終了
	static endBattle(aWinOrLose){
		document.getElementById("mapScene").style.display="block";
		document.getElementById("battleScene").style.display="none";
		KeyMonitor.setMapKey();
	}
}
