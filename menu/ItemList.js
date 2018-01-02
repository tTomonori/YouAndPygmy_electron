class ItemList{
	constructor(aParentTag){
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
		this.detailBox.appendChild(this.detailBoxFrame);
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
		this.listBox.textContent="";
		for(let tItemData of aList){
			let tItem=ItemDictionary.get(tItemData.name);
			let tContainer=document.createElement("div");
			tContainer.style.position="relative";
			let tImage=document.createElement("img");
			tImage.src="image/choiceBar/green/choice/item.png";
			tImage.style.width="100%";
			tContainer.appendChild(tImage);
			let tName=document.createElement("div");
			tName.style.position="absolute";
			tName.style.top="0";
			tName.style.left="0";
			tName.style.fontSize=this.parentSize.width*0.03+"px";
			tName.style.width="100%";
			tName.textContent=tItem.name+"　x"+tItemData.possess;
			tContainer.appendChild(tName);
			this.listBox.appendChild(tContainer);
		}
	}
}
