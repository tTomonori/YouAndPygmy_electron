var mWindowSize={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight};
//画面の縦横比
const mScreenRatio={width:16,height:9};
//ゲーム画面のサイズ
var mScreenSize;
//ゲーム画面サイズ決定
if(mWindowSize.width/mScreenRatio.width>mWindowSize.height/mScreenRatio.height){
	mScreenSize={width:mWindowSize.height*mScreenRatio.width/mScreenRatio.height,height:mWindowSize.height}
}
else{
	mScreenSize={width:mWindowSize.width,height:mWindowSize.width*mScreenRatio.height/mScreenRatio.width}
}
//ゲーム画面サイズにbodyをサイズ変更
let mGameScreen=document.getElementById("gameScreen");
mGameScreen.style.width=mScreenSize.width+"px";
mGameScreen.style.height=mScreenSize.height+"px";
mGameScreen.style.top=(mWindowSize.height-mScreenSize.height)/2+"px";
mGameScreen.style.left=(mWindowSize.width-mScreenSize.width)/2+"px";
//最前面表示する要素を入れるタグ
mAlartScene=document.getElementById("alartScene");
//3dで表示するフォント
var mFont;
//主人公
var mMyChara;

window.addEventListener('DOMContentLoaded', ()=>{
	//セーブデータをロード
	Database.loadSaveData(()=>{
		//フォントをロード
		let tLoader=new THREE.FontLoader();
		tLoader.load("threejsmaster/examples/fonts/helvetiker_bold.typeface.json",(aFont)=>{
			mFont=aFont;
			KeyMonitor.init();
			// prepareBattle();//バトル開始
			prepareMap();//マップ準備
		})
	})
});
function prepareMap(){
	ThreeMap.init();
	User.init();
	Encounter.init();
	let tHeroPosition=Database.getPosition();
	MapFeild.setMap(MapDictionary.get(tHeroPosition.mapName));
	mMyChara=new Hero(tHeroPosition);
	document.getElementById("mapScene").style.display="block";
	MapFeild.enableOperate();
	KeyMonitor.startMonitor();
}
