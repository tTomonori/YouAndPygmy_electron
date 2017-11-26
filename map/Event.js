class Event{
	//複数のイベントを連続で実行
	static runEvents(aEvents){
		return new Promise((res,rej)=>{
			let i=0;
			let tLength=aEvents.length;
			let tRunEvent=()=>{
				if(i==tLength){
					//イベント全て終了
					res();
					return;
				}
				this.runEvent(aEvents[i]).then(()=>{
					i++;
					tRunEvent();
				})
			}
			tRunEvent();
		})
	}
	//イベント実行
	static runEvent(aEvent){
		return new Promise((res,rej)=>{
			switch (aEvent.event) {
				case "battle":

					break;
				case "randomEncount":
					Encounter.countRandomEncount(aEvent.num).then(()=>{
						res();
					})
					break;
				default:
			}
		})
	}
}
