class Battle{
	static init(aUserTeam,aEnemyTeam,aFeild){
		ThreeWarld.init();
		//背景設定
		// mBattleSecene.style.backgroundImage="url('image/background/"+aFeild.background+"')";
		//カメラ位置設定
		ThreeWarld.setCamera({x:aFeild.feild[0].length/2*mMasSize[0],y:-aFeild.feild.length*mMasSize[1]-mMasSize[1]*5,z:mMasSize[2]+400},{x:0.95})

		this.userTeam=new Array();
		this.enemyTeam=new Array();
		this.userTeamDown=new Array();
		this.enemyTeamDown=new Array();
		for(let tChara of aUserTeam){//味方チームのキャラインスタンス生成
			this.userTeam.push(new Chara(tChara,"ally"));
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
	//戦闘開始
	static start(){
		Turn.nextTurn();
		ThreeWarld.setMouseMove();
		ThreeWarld.setClick();
		ThreeWarld.setDrag();
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
		SceneChanger.endBattle(aWinOrLose);
	}
}
var mMasSize=[80,80,80];
var mButtonSize=mScreenSize.height/8;
var mBattleSecene=document.getElementById("battleScene");
