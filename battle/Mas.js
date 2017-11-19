class Mas{
	constructor(aX,aY,aData){
		this.data=aData;
		this.x=aX;
		this.y=aY;
		this.attribute=aData.attribute;
		this.image=aData.image;
		this.object=aData.object;

		this.chara=null;//このマスにいるキャラ

		let tThreePosition=Feild.convertToThreeWarldPosition(this.x,this.y);
		//3dの要素
		this.box=ThreeWarld.createTextureBox(mMasSize,"image/battleTile/"+this.image+".jpg");
		this.box.position.x=tThreePosition.x;
		this.box.position.y=tThreePosition.y;
		this.box.className="mas";
		this.box.class=this;
		//マスを変色させるためのbox
		this.cover=ThreeWarld.createBox([mMasSize[0],mMasSize[1],1])
		this.cover.position.x=this.box.position.x;
		this.cover.position.y=this.box.position.y;
		this.cover.position.z=mMasSize[2]/2;
		this.cover.material.transparent=true;
		this.cover.material.opacity=0;
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
		this.mouseOver=()=>{this.changeToSelectedColor();};
		this.click=()=>{
			Turn.getTurnChara().moveToSelectedMas(this);
		}
		ThreeWarld.setInterval(()=>{
			this.changeToMovableColor();
		})
	}
	//移動可能マスとして変色させる
	changeToMovableColor(){
		this.cover.material.opacity=0.3;
		this.cover.material.color={r:0,g:0,b:1};
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
		this.mouseOver=()=>{};
		this.click=()=>{};
	}
	//マウスオーバーされた時(他のメソッドで上書きする)
	mouseOver(){

	}
	//クリックされた時(他のメソッドで上書きする)
	click(){

	}
}
