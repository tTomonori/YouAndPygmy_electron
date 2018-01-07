class AlartText{
	static alart(aText,aOption){
		if(aOption==undefined)aOption={};
		let tContainer=document.createElement("div");
		tContainer.classList.add("alartText");
		tContainer.style.position="absolute";
		tContainer.style.left=mScreenSize.width/4+"px";
		tContainer.style.top=mScreenSize.height/3+"px";
		//画像
		let tImage=document.createElement("img");
		let tBarColor=(aOption.barColor!=undefined)?aOption.barColor:"purple";
		tImage.src="image/choiceBar/"+tBarColor+"/message/mesframe.png";
		tImage.style.width=mScreenSize.width/2+"px";
		tContainer.appendChild(tImage);
		mAlartScene.appendChild(tContainer);
		tImage.onload=()=>{
			//テキスト
			let tLabel=document.createElement("div");
			tLabel.textContent=aText;
			tLabel.style.position="absolute";
			tLabel.style.top=tImage.clientHeight/30+"px";
			tLabel.style.left=tImage.clientWidth/50+"px";
			tLabel.style.fontSize=tImage.clientHeight/4+"px";
			tContainer.appendChild(tLabel);

			setTimeout(()=>{
				$(tContainer).animate({
					opacity:0
				},1000,()=>{tContainer.remove();})
			},800)
		}
	}
}
