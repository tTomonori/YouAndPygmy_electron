class Gage{
	//ゲージを生成
	static createGage(aSize,aGage,aImage){
		let tGageContainer=document.createElement("div");
		tGageContainer.id="gage";
		tGageContainer.style.width=aSize.width+"px";
		tGageContainer.style.height=aSize.height+"px";
		tGageContainer.style.overflow="hidden";
		let tMerter=document.createElement("div");
		tMerter.style.width=aGage.current/aGage.max*100+"%";
		tMerter.style.height="100%";
		tMerter.style.overflow="hidden";
		let tGage=document.createElement("img");
		tGage.src=ImagePathMaker.getGagePath(aImage);
		tGage.style.height="100%";
		tMerter.appendChild(tGage);
		tGageContainer.appendChild(tMerter);
		switch (aImage) {
			case "tairyoku":
				tGageContainer.style.background="#a33";
				break;
			case "experience":
				tGageContainer.style.background="#999";
				break;
			default:
		}
		return tGageContainer;
	}
}
