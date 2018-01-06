var mWindowSize={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight};
//画面の縦横比
const mScreenRatio={width:12,height:7};
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
	KeyMonitor.setMapKey();
	KeyMonitor.startMonitor();
}
function prepareBattle(){
	Battle.init([{
		name:"猫ちゃん",
		race:"ばけねこ",
		status:{
			tairyoku:30,
			currentTairyoku:20,
			kiryoku:20,
			tikara:20,
			mamori:10,
			maryoku:14,
			seisin:13,
			yuryoku:12,
			waza:16,
			binsei:22,
			idou:3,
		},
		skill:["hikkaki","enjutu"],
		item:[{name:"kinomi",number:2}],
		moc:{
			grass:1,
			sand:1,
			water:false,
			magma:false,
			snow:2,
			ice:2,
			air:false,
			object:false
		},
		image:{
			body:"pygmy/bakeneko",
			eye:{normal:"gray",damage:"sanMe"},
			mouth:{normal:"yaeba",damage:"sanKuti"},
			accessory:[{name:"星の髪飾り",image:"starOrnaments"}]
		},
		ai:"user",
	},
	{
		name:"すらりん",
		race:"すらいむ",
		status:{
			tairyoku:32,
			currentTairyoku:30,
			kiryoku:15,
			tikara:10,
			mamori:17,
			maryoku:18,
			seisin:20,
			yuryoku:12,
			waza:10,
			binsei:7,
			idou:3,
		},
		skill:["tataku","suihou"],
		item:[{name:"kinomi",number:1}],
		moc:{
			grass:1.5,
			sand:1.5,
			water:1,
			magma:false,
			snow:1,
			ice:1,
			air:false,
			object:false
		},
		image:{
			body:"pygmy/suraimu",
			eye:{normal:"green",damage:"sanMe"},
			mouth:{normal:"smile",damage:"sanKuti"},
			accessory:[{name:"星の髪飾り",image:"starOrnaments"}]
		},
		ai:"user",
	}
	],[{
		name:"てきねこ",
		race:"ばけねこ",
		status:{
			tairyoku:30,
			currentTairyoku:30,
			kiryoku:20,
			tikara:20,
			mamori:10,
			maryoku:14,
			seisin:13,
			yuryoku:12,
			waza:16,
			binsei:22,
			idou:3,
		},
		skill:["hikkaki","denkousekka"],
		item:[],
		moc:{
			grass:1,
			sand:1,
			water:false,
			magma:false,
			snow:2,
			ice:2,
			air:false,
			object:false
		},
		image:{
			body:"pygmy/bakeneko",
			eye:{normal:"gray",damage:"sanMe"},
			mouth:{normal:"yaeba",damage:"sanKuti"},
			accessory:[]
		},
		ai:"user",
	}
	],{
		feild:[
			[1,0,0,0,0,0,1],
			[1,0,0,0,2,0,1],
			[1,1,0,0,0,1,1],
			[1,1,1,0,0,1,1],
			[1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0]
		],
		masData:{
			0:{
				attribute:"grass",
				image:"grass",
				object:[]
			},
			1:{
				attribute:"water",
				image:"water",
				object:[]
			},
			2:{
				attribute:"object",
				image:"grass",
				object:["stump"]
			}
		},
		charaPosition:{
			user:[{x:5,y:4},{x:2,y:4}],
			enemy:[{x:2,y:0}]
		},
		background:"BG24a_80.jpg"
	})
	// Battle.start();
}
