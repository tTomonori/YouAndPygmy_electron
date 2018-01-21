class BarMaker{
	static makeWinterBar(aTileNum){
		return this.makeTileBar("image/choiceBar/winter/01 message/message_frame_not_opacity.png",
		aTileNum,
		{leftSize:100,rightSize:60,centerSize:80,imageWidth:960,imageHeight:170,trans:false});
	}
	static makeTileBar(aBarImage,aTileNum,aOption){
		let tOriginalWidth=aOption.leftSize+aOption.rightSize+aOption.centerSize*aTileNum;
		let tBar=document.createElement("div");
		tBar.style.position="absolute";
		tBar.style.width="500px";
		tBar.style.zIndex="10"
		//左端
		let tLeft=document.createElement("div");
		if(!aOption.trans)tLeft.style.display="inline-block";
		tLeft.style.overflow="hidden";
		tLeft.style.width=aOption.leftSize/tOriginalWidth*100+"%";
		tLeft.style.height="100%";
		let tLeftImage=document.createElement("img");
		tLeftImage.src=aBarImage;
		tLeftImage.style.width=aOption.imageWidth/aOption.leftSize*100+"%";
		tLeft.appendChild(tLeftImage);
		tBar.appendChild(tLeft);
		//中央
		for(let i=0;i<aTileNum;i++){
			let tCenter=document.createElement("div");
			if(!aOption.trans)tCenter.style.display="inline-block";
			tCenter.style.overflow="hidden";
			tCenter.style.width=aOption.centerSize/tOriginalWidth*100+"%";
			let tCenterImage=document.createElement("img");
			tCenterImage.src=aBarImage;
			tCenterImage.style.height="100%";
			tCenterImage.style.width=aOption.imageWidth/aOption.centerSize*100+"%";
			tCenterImage.style.marginLeft=-aOption.leftSize/aOption.centerSize*100+"%";
			tCenter.appendChild(tCenterImage);
			tBar.appendChild(tCenter);
		}
		//右端
		let tRight=document.createElement("div");
		if(!aOption.trans)tRight.style.display="inline-block";
		tRight.style.overflow="hidden";
		tRight.style.width=aOption.rightSize/tOriginalWidth*100+"%";
		let tRightImage=document.createElement("img");
		tRightImage.src=aBarImage;
		tRightImage.style.position="relative";
		tRightImage.style.marginLeft=-(aOption.imageWidth-aOption.rightSize)/aOption.rightSize*100+"%"
		tRightImage.style.height="100%";
		tRightImage.style.width=aOption.imageWidth/aOption.rightSize*100+"%";
		tRight.appendChild(tRightImage);
		tBar.appendChild(tRight);
		//中身
		let tContent=document.createElement("div");
		tContent.style.position="absolute";
		tContent.style.top="0";
		tContent.style.left="0";
		tContent.style.marginTop=17/tOriginalWidth*100+"%";
		tContent.style.marginLeft=22/tOriginalWidth*100+"%";
		tContent.style.width=100-44/tOriginalWidth*100+"%";
		tContent.style.height=100-34/aOption.imageHeight*100+"%";
		tBar.appendChild(tContent);

		return {bar:tBar,content:tContent}
	}
}
