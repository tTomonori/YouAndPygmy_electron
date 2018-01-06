class ChoiceBarMaker{
	//選択肢のbarを生成する
	static make(aBarImage,aText,aOption){
		let tOption=(aOption==undefined)?{}:aOption;
		let tBar=document.createElement("div");
		tBar.style.position="relative";
		let tBarImage=document.createElement("img");
		tBarImage.src=aBarImage;
		let tLabel=document.createElement("div");
		tLabel.textContent=aText;
		tLabel.style.position="absolute";
		tLabel.style.top="0";
		tLabel.style.left="0";
		tBar.appendChild(tBarImage);
		tBar.appendChild(tLabel);

		tBarImage.onload=()=>{
		if(tOption.width!=undefined)tBarImage.style.width=tOption.width;
		if(tOption.height!=undefined)tBarImage.style.height=tOption.height;
		if(tOption.fontSize!=undefined)tLabel.style.fontSize=tOption.fontSize;
		else tLabel.style.fontSize=tBarImage.clientHeight*0.65+"px";
		tLabel.style.top=tBarImage.clientHeight/30+"px";
		tLabel.style.left=tBarImage.clientHeight/5+"px";
			// console.log(tBarImage.clientHeight,tBarImage.clientWidth);
		}
		return tBar;
	}
	//選択肢のbarの文字を変更する
	static changeText(aBar,aText){
		aBar.children[1].textContent=aText;
	}
}
