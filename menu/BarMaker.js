class BarMaker{
	static makeWinterBar(aTileNum,aOption){
		if(aOption==undefined)aOption={};

		return (aOption.trans)
		?this.makeTransTileBar("image/choiceBar/winter/01 message/message_frame_v_not_opacity.png",aTileNum,
		{leftSize:100,rightSize:60,centerSize:80,imageWidth:960,imageHeight:170,imageMargin:{width:10,height:5},frameMargin:{width:12,height:12},trans:true})
		:this.makeTileBar("image/choiceBar/winter/01 message/message_frame_not_opacity.png",aTileNum,
		{leftSize:100,rightSize:60,centerSize:80,imageWidth:960,imageHeight:170,imageMargin:{width:10,height:5},frameMargin:{width:12,height:12}});
	}
	static makeTileBar(aBarImage,aTileNum,aOption){
		//元画像のサイズで生成した時のdomの幅
		let tOriginalBarWidth=aOption.leftSize+aOption.rightSize+aOption.centerSize*aTileNum;
		//外枠,この要素でサイズを指定する
		let tBar=document.createElement("div");
		tBar.classList.add("resizebleBar");
		tBar.style.position="relative";
		//外枠の幅か高さのどちらかを設定すると、生成する要素の高さが決まるようにする
		let tBefore=document.createElement("div");
		tBefore.style.display="block";
		tBefore.style.paddingTop=aOption.imageHeight/tOriginalBarWidth*100+"%";//外枠の幅に対する高さの割合
		tBar.appendChild(tBefore);
		//外枠の幅か高さを決定すると、この要素の高さが決まる
		let tContent=document.createElement("div");
		tContent.style.position="absolute";
		tContent.style.top="0";
		tContent.style.left="0";
		tContent.style.bottom="0";
		tContent.style.right="0";
		tBefore.appendChild(tContent);
		//画像の設定
		let tTrimmer,tImage;
		//画像の幅と高さを取得するための要素,画像と高さと幅が同じになる
		let tSizeBox=document.createElement("div");
		tSizeBox.style.position="absolute";
		tSizeBox.style.height="100%";
		tSizeBox.style.letterSpacing="-.4em";
		// tSizeBox.style.fontSize="0";
		tSizeBox.style.whiteSpace="nowrap";
		tContent.appendChild(tSizeBox);
		//画像の左端
		//画像をトリミングする
		tTrimmer=document.createElement("span");
		tTrimmer.style.display="inline-block";
		tTrimmer.style.width=aOption.leftSize/aOption.imageWidth*100+"%";
		tTrimmer.style.height="100%";
		tTrimmer.style.overflow="hidden";
		tSizeBox.appendChild(tTrimmer);
		//画像
		tImage=document.createElement("img");
		tImage.src=aBarImage;
		tImage.style.height="100%";
		tTrimmer.appendChild(tImage);
		//画像の中央
		for(let i=0;i<aTileNum;i++){
			//画像をトリミングする
			tTrimmer=document.createElement("span");
			tTrimmer.style.display="inline-block";
			tTrimmer.style.position="relative";
			tTrimmer.style.width=aOption.centerSize/aOption.imageWidth*100+"%";
			tTrimmer.style.height="100%";
			tTrimmer.style.overflow="hidden";
			tSizeBox.appendChild(tTrimmer);
			//画像
			tImage=document.createElement("img");
			tImage.src=aBarImage;
			tImage.style.height="100%";
			tImage.style.marginLeft=-aOption.leftSize/aOption.centerSize*100+"%";
			tImage.style.position="absolute";
			tTrimmer.appendChild(tImage);
		}
		//画像の右端
		//画像をトリミングする
		tTrimmer=document.createElement("span");
		tTrimmer.style.display="inline-block";
		tTrimmer.style.position="relative";
		tTrimmer.style.width=aOption.rightSize/aOption.imageWidth*100+"%";
		tTrimmer.style.height="100%";
		tTrimmer.style.overflow="hidden";
		tSizeBox.appendChild(tTrimmer);
		//画像
		tImage=document.createElement("img");
		tImage.src=aBarImage;
		tImage.style.height="100%";
		tImage.style.position="absolute";
		tImage.style.right="0";
		tTrimmer.appendChild(tImage);
		//生成した要素に中身を入れるための要素,画像の枠になっている部分を除いたサイズにする
		let tMarginTop=(aOption.imageMargin.height+aOption.frameMargin.height)/aOption.imageHeight*100;
		let tMarginLeft=(aOption.imageMargin.width+aOption.frameMargin.width)/aOption.imageWidth*100;
		let tInner=document.createElement("div");
		tInner.classList.add("inner")
		tInner.style.position="absolute";
		tInner.style.top=tMarginTop+"%";
		tInner.style.left=tMarginLeft+"%";
		tInner.style.letterSpacing="normal";
		tInner.style.width=(tOriginalBarWidth/aOption.imageWidth)*100-2*tMarginLeft+"%";
		tInner.style.height=100-2*tMarginTop+"%";
		tSizeBox.appendChild(tInner);

		return {bar:tBar,content:tInner};
	}
	//画像が縦向きのとき
	static makeTransTileBar(aBarImage,aTileNum,aOption){
		//元画像のサイズで生成した時のdomの幅
		let tOriginalBarWidth=aOption.leftSize+aOption.rightSize+aOption.centerSize*aTileNum;
		//外枠,この要素でサイズを指定する
		let tBar=document.createElement("div");
		tBar.classList.add("resizebleBar");
		tBar.style.position="relative";
		tBar.style.display="inline-block";
		//外枠の幅か高さのどちらかを設定すると、生成する要素の高さが決まるようにする
		let tBefore=document.createElement("div");
		tBefore.style.display="block";
		//
		tBefore.style.paddingTop=tOriginalBarWidth/aOption.imageHeight*100+"%";//外枠の幅に対する高さの割合
		tBar.appendChild(tBefore);
		//外枠の幅か高さを決定すると、この要素の高さが決まる
		let tContent=document.createElement("div");
		tContent.style.position="absolute";
		tContent.style.top="0";
		tContent.style.left="0";
		tContent.style.bottom="0";
		tContent.style.right="0";
		tBefore.appendChild(tContent);
		//画像の設定
		let tTrimmer,tImage;
		//画像の幅と高さを取得するための要素,画像と高さと幅が同じになる
		let tSizeBox=document.createElement("div");
		tSizeBox.style.position="absolute";
		tSizeBox.style.lineHeight="0";
		//
		tSizeBox.style.height=aOption.imageWidth/tOriginalBarWidth*100+"%";
		// tSizeBox.style.letterSpacing="-.4em";
		// tSizeBox.style.fontSize="0";
		// tSizeBox.style.whiteSpace="nowrap";
		tContent.appendChild(tSizeBox);
		//画像の左端
		//画像をトリミングする
		tTrimmer=document.createElement("span");
		tTrimmer.style.display="inline-block";
		//
		tTrimmer.style.height=aOption.leftSize/aOption.imageWidth*100+"%";
		tTrimmer.style.width="100%";
		tTrimmer.style.overflow="hidden";
		tSizeBox.appendChild(tTrimmer);
		//画像
		tImage=document.createElement("img");
		tImage.src=aBarImage;
		tImage.style.height=aOption.imageWidth/aOption.leftSize*100+"%";
		tTrimmer.appendChild(tImage);
		//画像の中央
		for(let i=0;i<aTileNum;i++){
			//画像をトリミングする
			tTrimmer=document.createElement("span");
			tTrimmer.style.display="inline-block";
			tTrimmer.style.position="relative";
			tTrimmer.style.height=aOption.centerSize/aOption.imageWidth*100+"%";
			tTrimmer.style.width="100%";
			tTrimmer.style.overflow="hidden";
			tSizeBox.appendChild(tTrimmer);
			//画像
			tImage=document.createElement("img");
			tImage.src=aBarImage;
			//
			tImage.style.width="100%";
			//
			tImage.style.marginTop=-aOption.leftSize/aOption.imageHeight*100+"%";
			tImage.style.position="absolute";
			tTrimmer.appendChild(tImage);
		}
		//画像の右端
		//画像をトリミングする
		tTrimmer=document.createElement("span");
		tTrimmer.style.display="inline-block";
		tTrimmer.style.position="relative";
		//
		tTrimmer.style.height=aOption.rightSize/aOption.imageWidth*100+"%";
		tTrimmer.style.width="100%";
		tTrimmer.style.overflow="hidden";
		tSizeBox.appendChild(tTrimmer);
		//画像
		tImage=document.createElement("img");
		tImage.src=aBarImage;
		tImage.style.width="100%";
		tImage.style.position="absolute";
		tImage.style.bottom="0";
		tTrimmer.appendChild(tImage);
		//生成した要素に中身を入れるための要素,画像の枠になっている部分を除いたサイズにする
		let tMarginTop=(aOption.imageMargin.width+aOption.frameMargin.width)/aOption.imageWidth*100;
		let tMarginLeft=(aOption.imageMargin.height+aOption.frameMargin.height)/aOption.imageHeight*100;
		let tInner=document.createElement("div");
		tInner.classList.add("inner")
		tInner.style.position="absolute";
		tInner.style.top=tMarginTop+"%";
		tInner.style.left=tMarginLeft+"%";
		tInner.style.boxSizing="border-box";
		//
		tInner.style.lineHeight="normal";
		tInner.style.height=(tOriginalBarWidth/aOption.imageWidth)*100-2*tMarginTop+"%";
		tInner.style.width=100-2*tMarginLeft+"%";
		tSizeBox.appendChild(tInner);

		return {bar:tBar,content:tInner};
	}
}
