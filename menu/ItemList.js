class ItemList extends Selector{
	constructor(aParentTag){
		super(false);
		this.parentTag=aParentTag;
		this.parentSize={width:parseFloat(this.parentTag.style.width),height:parseFloat(this.parentTag.style.height)}
		this.detailBoxHeight=this.parentSize.width*160/960;
		//詳細表示欄
		this.detailBox=document.createElement("div");
		this.detailBox.style.width=this.parentSize.width+"px";
		this.detailBox.style.height=this.detailBoxHeight+"px";
		this.detailBoxFrame=document.createElement("img");
		this.detailBoxFrame.src="image/choiceBar/blue/message/mesframe.png";
		this.detailBoxFrame.style.width="100%";
		this.detailBoxText=document.createElement("div");
		this.detailBoxText.style.position="absolute";
		this.detailBoxText.style.top=this.detailBoxHeight/10+"px";
		this.detailBoxText.style.left=this.detailBoxHeight/10+"px";
		this.detailBoxText.style.width="calc(100% - "+this.detailBoxHeight/10+"px)";
		this.detailBoxText.style.height="calc(100% - "+this.detailBoxHeight/10+"px)";
		this.detailBoxText.style.fontSize=this.detailBoxHeight/6+"px";
		this.detailBox.appendChild(this.detailBoxFrame);
		this.detailBox.appendChild(this.detailBoxText);
		this.parentTag.appendChild(this.detailBox);
		//リスト表示欄
		this.listBox=document.createElement("div");
		this.listBox.style.width="96%";
		this.listBox.style.height=this.parentSize.height-this.detailBoxHeight+"px"
		this.listBox.style.marginTop="0";
		this.listBox.style.marginRight="2%";
		this.listBox.style.marginBottom="0";
		this.listBox.style.marginLeft="2%";
		this.listBox.style.overflow="scroll";
		this.parentTag.appendChild(this.listBox);
	}
	//リストセット
	setList(aList){
		this.itemList=aList;
		this.listBox.textContent="";
		for(let tItemData of aList){
			let tItem=ItemDictionary.get(tItemData.name);
			let tContainer=ChoiceBarMaker.make("image/choiceBar/green/choice/item.png",tItem.name+"　x"+tItemData.possess,{width:"100%"})
			this.listBox.appendChild(tContainer);

			this.initSelector(this.listBox.children,this.listBox)
		}
	}
	selectNumber(aNum){
		console.log(aNum+"を選択");
		this.selectedFunction(this.itemList[aNum]);
	}
	pickElement(aNum){
		this.listBox.children[aNum].style.webkitFilter="brightness(120%)";
		this.detailBoxText.textContent=ItemDictionary.get(this.itemList[aNum].name).text;
	}
	releaseElement(aNum){
		this.listBox.children[aNum].style.webkitFilter="brightness(100%)";
	}
	keepElement(aNum){}
	unKeepElement(aNum){}
}
