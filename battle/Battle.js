class Battle{
	static init(aUserTeam,aEnemyTeam,aFeild){
		ThreeFeild.init();
		//背景設定
		// mBattleSecene.style.backgroundImage="url('image/background/"+aFeild.background+"')";
		//カメラ位置設定
		ThreeFeild.setCamera({x:aFeild.feild[0].length/2*mMasSize[0],y:-aFeild.feild.length*mMasSize[1]-mMasSize[1]*5,z:mMasSize[2]+400},{x:0.95})

		this.userPygmies=new Array();//終了時に体力などの情報を返すための
		this.userTeam=new Array();
		this.enemyTeam=new Array();
		this.userTeamDown=new Array();
		this.enemyTeamDown=new Array();
		for(let tChara of aUserTeam){//味方チームのキャラインスタンス生成
			let tPygmy=new Chara(tChara,"ally");
			this.userTeam.push(tPygmy);
			this.userPygmies.push(tPygmy);
		}
		for(let tChara of aEnemyTeam){//敵チームのキャラインスタンス生成
			this.enemyTeam.push(new Chara(tChara,"enemy"));
		}
		//ターン初期化
		Turn.init(this.userTeam.concat(this.enemyTeam));
		//フィールド初期化
		Feild.init(aFeild);
		//キャラ配置
		let tPositionData=aFeild.charaPosition.user;
		for(let i=0;i<this.userTeam.length;i++){
			this.userTeam[i].initPosition(tPositionData[i].x,tPositionData[i].y);
		}
		tPositionData=aFeild.charaPosition.enemy;
		for(let i=0;i<this.enemyTeam.length;i++){
			this.enemyTeam[i].initPosition(tPositionData[i].x,tPositionData[i].y);
		}
		CancelMoveButton.init();
		EndTurnButton.init();
		ItemButton.init();
		OptionButton.init();
		SkillButton.init();

		DamagePredictor.init();
		StatusBox.init();
	}
	//チームメンバー取得(生存キャラのみ)
	static getUserTeam(){return this.userTeam}
	static getEnemyTeam(){return this.enemyTeam}
	//戦闘開始
	static start(){
		KeyMonitor.setInputKeyFunction((aKey)=>{this.inputKey(aKey)});
		KeyMonitor.startMonitor();
		Turn.nextTurn();
		ThreeFeild.setMouseMove();
		ThreeFeild.setClick();
		ThreeFeild.setDrag();
	}
	//キー入力
	static inputKey(aKey){
		switch (aKey) {
			case "skill":
				SkillButton.click()
				break;
			case "item":
				ItemButton.click()
				break;
			case "reset":
				CancelMoveButton.click()
				break;
			case "end":
				EndTurnButton.click()
				break;
			case "skill0":
				SkillButton.clickList(0)
				break;
			case "skill1":
				SkillButton.clickList(1)
				break;
			case "skill2":
				SkillButton.clickList(2)
				break;
			default:

		}
	}
	//キャラを消す(戦闘不能)
	static deleteChara(aChara){
		Turn.deleteChara(aChara);
		//倒されたキャラを配列から移動
		let tCharas;
		let tDowns;
		if(aChara.getTeam()=="ally"){
			tCharas=this.userTeam;
			tDowns=this.userTeamDown;
		}
		else{
			tCharas=this.enemyTeam;
			tDowns=this.enemyTeamDown;
		}
		for(let i=0;i<tCharas.length;i++){
			if(tCharas[i]==aChara){
				tCharas.splice(i,1);
				tDowns.push(aChara);
			}
		}
	}
	//勝敗判定
	static judge(){
		if(this.userTeam.length==0){
			this.finish("lose");
			return true;
		}
		if(this.enemyTeam.length==0){
			this.finish("win");
			return true;
		}
		return false;
	}
	//勝敗決定
	static finish(aWinOrLose){
		let tReturn=new Array();
		for(let tPygmy of this.userPygmies){
			tReturn.push({tairyoku:tPygmy.getTairyoku(),item:tPygmy.getItem(),acconpanyingNumber:tPygmy.getAcconpanyingNumber()})
		}
		KeyMonitor.stopMonitor();
		SceneChanger.endBattle(aWinOrLose,tReturn);
	}
}
var mMasSize=[80,80,80];
var mButtonSize=mScreenSize.height/8;
var mBattleSecene=document.getElementById("battleScene");
