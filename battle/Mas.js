class Mas{
	constructor(aX,aY,aData){
		this.data=aData;
		this.x=aX;
		this.y=aY;
		this.attribute=aData.attribute;
		this.image=aData.image;
		this.object=aData.object;

		this.chara=null;//このマスにいるキャラ

		let tThreePosition=Feild.convertToThreeFeildPosition(this.x,this.y);
		//3dの要素
		this.box=ThreeFeild.createTextureBox(mMasSize,"image/battleTile/"+this.image+".jpg");
		this.box.position.x=tThreePosition.x;
		this.box.position.y=tThreePosition.y;
		this.box.className="mas";
		this.box.renderOrder=this.y;
		this.box.class=this;
		//マスを変色させるためのbox
		this.cover=ThreeFeild.createBox([mMasSize[0],mMasSize[1],1])
		this.cover.position.x=this.box.position.x;
		this.cover.position.y=this.box.position.y;
		this.cover.position.z=mMasSize[2]/2;
		this.cover.renderOrder=this.y+0.2;
		// this.cover.material.depthTest=false;
		this.cover.material.transparent=true;
		this.cover.material.opacity=0;
		//オブジェクト
		this.objects=new Array();
		for(let tObjectName of this.object){
			let tObject=ObjectMaker.createObject(tObjectName);
			tObject.position.x=tThreePosition.x;
			tObject.position.y=tThreePosition.y;
			this.objects.push(tObject);
		}
	}
	//このマスの座標を返す
	getPosition(){
		return {x:this.x,y:this.y};
	}
	//このマスにいるキャラをセット
	on(aChara){
		this.chara=aChara;
	}
	//このマスからキャラが移動
	out(){
		this.chara=null;
	}
	//このマスにいるキャラを返す
	getOnChara(){
		return this.chara;
	}
	//属性を返す
	getAttribute(){
		return this.attribute;
	}
	//移動可能マスとしてセットする
	changeToMovable(){
		this.changeToMovableColor();
		this.mouseOverTemp=()=>{this.changeToSelectedColor();};
		this.click=()=>{
			// Turn.getTurnChara().moveToSelectedMas(this);
			CharaController.selectedDestination(this);
		}
		ThreeFeild.setMouseMoveFunction(()=>{
			this.changeToMovableColor();
		})
	}
	//攻撃可能マスとしてセットする
	changeToAttackable(){
		this.changeToAttackableColor();
		this.mouseOverTemp=()=>{
			this.changeToSelectedColor();
			if(this.chara!=null){
				DamagePredictor.displayPredict(CharaController.getSelectedSkill(),Turn.getTurnChara(),this);
			}
		};
		this.click=()=>{
			// Turn.getTurnChara().attack(this);
			CharaController.selectedAttackMas(this);
		}
		ThreeFeild.setMouseMoveFunction(()=>{
			this.changeToAttackableColor();
		})
	}
	//回復可能マスとしてセットする
	changeToHealable(){
		this.changeToHealableColor();
		this.mouseOverTemp=()=>{
			this.changeToSelectedColor();
			if(this.chara!=null){
				DamagePredictor.displayPredict(CharaController.getSelectedSkill(),Turn.getTurnChara(),this);
			}
		};
		this.click=()=>{
			// Turn.getTurnChara().attack(this);
			CharaController.selectedAttackMas(this);
		}
		ThreeFeild.setMouseMoveFunction(()=>{
			this.changeToHealableColor();
		})
	}
	//移動可能マスとして変色させる
	changeToMovableColor(){
		this.cover.material.opacity=0.3;
		this.cover.material.color={r:0,g:0,b:1};
	}
	//攻撃可能マスとして変色させる
	changeToAttackableColor(){
		this.cover.material.opacity=0.3;
		this.cover.material.color={r:1,g:0,b:0};
	}
	//回復可能マスとして変色させる
	changeToHealableColor(){
		this.cover.material.opacity=0.3;
		this.cover.material.color={r:0,g:1,b:0};
	}
	//選択されているマスとして変色させる
	changeToSelectedColor(){
		this.cover.material.opacity=0.3;
		this.cover.material.color={r:1,g:1,b:0};
	}
	//マスの変色を元に戻す
	resetCover(){
		this.cover.material.opacity=0;
	}
	//マウスオーバーとクリック時のメソッドリセット
	resetMouseEvent(){
		this.mouseOverTemp=()=>{};
		this.click=()=>{};
	}
	//マス選択イベントリセット
	resetSelectEvent(){
		this.resetCover();
		this.resetMouseEvent();
	}
	//マウスオーバーされた時
	mouseOver(){
		this.mouseOverTemp();
		this.mouseOverForever();
	}
	//マウスオーバーされた時(セット,リセットする)(他のメソッドで上書きする)
	mouseOverTemp(){}
	//マウスオーバーされた時(常に実行)
	mouseOverForever(){
		if(this.getOnChara()!=null){
			StatusBox.setSelectedCharaInfo(this.getOnChara());
		}
	}
	//クリックされた時(他のメソッドで上書きする)
	click(){

	}
}
