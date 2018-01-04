class Selector{
	constructor(aKeepFlag){
		this.keepFlag=aKeepFlag;//選択肢決定時に、選択肢をkeepするかどうか
	}
	initSelector(aChoiceElements,aChoiceContainer){
		this.choiceElements=aChoiceElements;
		this.choiceContainer=aChoiceContainer;
		this.pickNum=null;
		this.keepNum=null;
		this.lastSelectNum=null;
		this.choiceNum=this.choiceElements.length;
	}
	//選択可能に
	startSelect(){
		//マウスオーバー時関数
		for(let i=0;i<this.choiceElements.length;i++){
			let tChoiceBar=this.choiceElements[i];
			tChoiceBar.onmouseover=()=>{
				this.release();
				if(this.keepNum!=i)this.pick(i);
			}
			tChoiceBar.onmouseout=()=>{
				if(this.keepNum!=i)this.release(i);
			}
			tChoiceBar.onclick=()=>{
				this.select();
			}
		}
	}
	//選択不可に
	stopSelect(){
		//マウスオーバー時関数
		for(let i=0;i<this.choiceElements.length;i++){
			let tChoiceBar=this.choiceElements[i];
			tChoiceBar.onmouseover=()=>{}
			tChoiceBar.onmouseout=()=>{}
			tChoiceBar.onclick=()=>{}
		}
	}
	//子クラスで定義する
	selectNumber(aNum){}
	pickElement(aNum){}
	releaseElement(aNum){}
	keepElement(aNum){}
	unKeepElement(aNum){}
	//選択肢決定
	select(){
		if(this.pickNum==null)return;
		let tSelectNum=this.pickNum;
		if(this.keepFlag)this.keep(this.pickNum);
		this.selectNumber(tSelectNum);
	}
	//次の選択肢を選択
	pickNextChoice(){
		let tPickNum;
		if(this.pickNum==null){
			tPickNum=0;
		}
		else{
			tPickNum=(this.pickNum+1)%this.choiceNum;
		}
		//keep中の選択肢なら次を選択
		if(tPickNum==this.keepNum)tPickNum=(tPickNum+1)%this.choiceNum;

		this.release();
		this.pick(tPickNum);
	}
	//前の選択肢を選択
	pickPreviousChoice(){
		let tPickNum;
		if(this.pickNum==null){
			tPickNum=this.choiceNum-1;
		}
		else{
			tPickNum=(this.pickNum+this.choiceNum-1)%this.choiceNum;
		}
		//keep中の選択肢なら前を選択
		if(tPickNum==this.keepNum)tPickNum=(tPickNum+this.choiceNum-1)%this.choiceNum;

		this.release();
		this.pick(tPickNum);
	}
	//選択肢をハイライト
	pick(aNum){
		this.pickNum=aNum;
		this.pickElement(aNum);
	}
	//選択肢のハイライト解除
	release(){
		if(this.pickNum==null)return;
		this.releaseElement(this.pickNum);
		this.pickNum=null;
	}
	//選択した選択肢を強調
	keep(aNum){
		this.unKeep();
		this.keepElement(aNum);
		this.keepNum=aNum;
		this.pickNum=null;
	}
	//強調した選択肢を解除
	unKeep(){
		if(this.keepNum==null)return;
		this.unKeepElement(this.keepNum);
		this.keepNum=null;
	}
}
