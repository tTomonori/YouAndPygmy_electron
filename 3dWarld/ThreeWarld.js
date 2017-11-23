class ThreeWarld{
	static init(){
		const width = mScreenSize.width;
		const height = mScreenSize.height;

		// レンダラーを作成
		// レンダラーを作成
		this.renderer = new THREE.WebGLRenderer({
			canvas: document.querySelector('#threeWarld'),
			alpha:true
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(width, height);

		// シーンを作成
		this.scene = new THREE.Scene();

		// カメラを作成
		this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
		this.camera.position.set(0, 0, +1000);

		//カーソルの位置記憶
		this.mousePoint=null;
		//描画毎に呼ばれる関数
		this.intervalFunction=new Array();
		//マウスが移動するたびに呼ばれる関数
		this.mouseMoveFunctions=new Array();
		//マウスが移動するたびに呼ばれる関数(消えない方)
		this.mouseMoveForeverFunctions=new Array();

		let tick=()=>{
			requestAnimationFrame(tick);

			// // // 箱を回転させる
			// box.rotation.x += 0.01;
			// box.rotation.y += 0.01;
			// this.camera.position.x += 1;
			// this.camera.position.y -= 1;
			// this.camera.rotation.x += 0.01;
			// this.camera.rotation.y += 0.01;
			// this.camera.rotation.z -= 0.01;
			// camera.lookAt(new THREE.Vector3(0, 100, 0));

			//描画毎に呼ぶ関数
			for(let tFunction of this.intervalFunction){
				tFunction();
			}
			// レンダリング
			ThreeWarld.renderer.render(ThreeWarld.scene, ThreeWarld.camera);
		}
		// 初回実行
		tick();
	}
	//描画毎に呼ぶ関数セット
	static setInterval(aFunction){
		this.intervalFunction.push(aFunction);
	}
	//描画毎に呼ぶ関数リセット
	static resetInterval(){
		this.intervalFunction=new Array();
	}
	//カメラの位置設定
	static setCamera(aPosition,aRotation){
		if(aPosition.x!=undefined)this.camera.position.x=aPosition.x;
		if(aPosition.y!=undefined)this.camera.position.y=aPosition.y;
		if(aPosition.z!=undefined)this.camera.position.z=aPosition.z;
		if(aRotation.x!=undefined)this.camera.rotation.x=aRotation.x;
		if(aRotation.y!=undefined)this.camera.rotation.y=aRotation.y;
		if(aRotation.z!=undefined)this.camera.rotation.z=aRotation.z;
	}
	//meshに貼る画像を生成
	static createTexture(aFileName){
		let tTexture=THREE.ImageUtils.loadTexture(aFileName,{},()=>{this.renderer.render(this.scene, this.camera);})
		tTexture.minFilter=THREE.LinearFilter;//縮小時の警告を消す
		return tTexture;
	}
	//画像を貼り付けた箱を作成
	static createTextureBox(aSize,aImage){
		// 箱を作成
		let tGeometry = new THREE.BoxGeometry(aSize[0],aSize[1],aSize[2]);
		let tMaterial=new THREE.MeshBasicMaterial({
			map:THREE.ImageUtils.loadTexture(aImage,{},()=>{this.renderer.render(this.scene, this.camera);}),
		})
		tMaterial.map.minFilter=THREE.LinearFilter;//縮小時の警告を消す
		// let tMaterial = new THREE.MeshBasicMaterial({color: aColor});
		// const tMaterial = new THREE.MeshStandardMaterial({color: aColor});
		let tBox = new THREE.Mesh(tGeometry, tMaterial);
		this.scene.add(tBox);
		return tBox;
	}
	// 箱を作成
	static createBox(aSize){
		let tGeometry = new THREE.BoxGeometry(aSize[0],aSize[1],aSize[2]);
		let tMaterial = new THREE.MeshBasicMaterial();
		let tBox = new THREE.Mesh(tGeometry, tMaterial);
		this.scene.add(tBox);
		return tBox;
	}
	//円柱を生成する
	static createCylinder(aRadius,aHeight){
		let tGeometry = new THREE.CylinderGeometry(aRadius,aRadius,aHeight,50);
		let tMaterial = new THREE.MeshBasicMaterial();
		let tCylinder = new THREE.Mesh(tGeometry, tMaterial);
		//sceneオブジェクトに追加
		this.scene.add(tCylinder);
		return tCylinder;
	}
	//球体を生成する
	static createSphere(aRadius){
		let tGeometry = new THREE.SphereGeometry(aRadius,50);
		let tMaterial = new THREE.MeshBasicMaterial();
		let tSphere = new THREE.Mesh(tGeometry, tMaterial);
		//sceneオブジェクトに追加
		this.scene.add(tSphere);
		return tSphere;
	}
	//物体を削除する
	static deleteObject(aObject){
		this.scene.remove(aObject);
		aObject.geometry.dispose();
		if(aObject.material.dispose==undefined){
			//面ごとに違うマテリアルが使われている
			for(let tMaterial of aObject.material){
				tMaterial.dispose();
			}
		}
		else{
			//全ての面が同じ
			aObject.material.dispose()
		}
	}
	//文字オブジェクトを生成する
	static createTextObject(aText,aSize){
		var tGeometry=new THREE.TextGeometry(aText,{
			font:mFont,
			size:aSize,
			height:2,
			curveSegments:20,
		});
		var tMaterial=new THREE.MeshBasicMaterial()
		var tText=new THREE.Mesh(tGeometry,tMaterial);
		tText.rotation.x=Math.PI/2;
		this.scene.add(tText);
		return tText;
	}
	//キャラのオブジェクト生成
	static createChara(aSize,aImage){
		//画像を指定したmaterialの用意
		//何も表示しない面
		let tTransparent=new THREE.MeshBasicMaterial( {
			map:THREE.ImageUtils.loadTexture("",{},()=>{this.renderer.render(this.scene, this.camera);}),
			transparent:true
		});
		let tMaterial = [
			tTransparent,tTransparent,tTransparent,
			new THREE.MeshBasicMaterial({
				map:THREE.ImageUtils.loadTexture(aImage,{},()=>{this.renderer.render(this.scene, this.camera);}),
				transparent:true
			}),
		tTransparent,tTransparent]
		tMaterial[3].map.minFilter=THREE.LinearFilter;//縮小時の警告を消す
		// Cubeの用意
		let tGeometry = new THREE.CubeGeometry(aSize[0],aSize[1],aSize[2]);
		let tMesh = new THREE.Mesh( tGeometry, tMaterial );
		// let tMesh=new THREE.Sprite(tMaterial[3]);
		// tMesh.scale.multiplyScalar(10);
		this.scene.add(tMesh);
		return tMesh;
	}
	//マウスが移動するたびに呼ぶ関数セット
	static setMouseMoveFunction(aFunction){
		this.mouseMoveFunctions.push(aFunction);
	}
	//マウスが移動するたびに呼ぶ関数セット(消えない方)
	static setMouseMoveForeverFunction(aFunction){
		this.mouseMoveForeverFunctions.push(aFunction);
	}
	//マウスが移動するたびに呼ぶ関数リセット
	static resetMouseMoveFunctions(aFunction){
		this.mouseMoveFunctions=new Array();
	}
	static setMouseMove(){
		let tCanvas=document.getElementById("threeWarld");
		tCanvas.onmousemove=(e)=>{
			//カーソル位置記憶
			this.mousePoint={clientX:e.clientX,clientY:e.clientY,target:e.target};
			//マウスが動くたびに呼ぶ関数(消えない方)
			for(let tFunction of this.mouseMoveForeverFunctions){
				tFunction();
			}
			//マウスが動くたびに呼ぶ関数
			for(let tFunction of this.mouseMoveFunctions){
				tFunction();
			}
			//Masクラスのマウスオーバーメソッドを呼ぶ
			if(this.mousePoint!=null){
				let tObjects=this.getOverdObjects(e);
				for(let tObject of tObjects){
					if(tObject.object.className=="mas"){
						tObject.object.class.mouseOver();
						break;
					}
				}
			}
		}
	}
	static setClick(){
		let tCanvas=document.getElementById("threeWarld");
		tCanvas.onclick=(e)=>{
			let tObjects=this.getOverdObjects(e);
			for(let tObject of tObjects){
				if(tObject.object.className=="mas"){
					tObject.object.class.click();
					return;
				}
			}
		}
	}
	//右クリックドラッグでカメラ移動
	static setDrag(){
		let tCanvas=document.getElementById("threeWarld");
		let tCameraMove=()=>{}
		ThreeWarld.setMouseMoveForeverFunction(()=>{tCameraMove()})
		tCanvas.oncontextmenu=(e)=>{
			let tPreMouse;
			tPreMouse=this.mousePoint;
			tCameraMove=()=>{
				this.camera.position.x+=1.2*(tPreMouse.clientX-this.mousePoint.clientX);
				this.camera.position.y-=1.2*(tPreMouse.clientY-this.mousePoint.clientY);
				tPreMouse=this.mousePoint;
			}
			tCanvas.onmouseup=()=>{
				tCameraMove=()=>{}
				tCanvas.onmouseup=()=>{}
			}
		}
	}
	//移動アニメーション(objectlist[0]がatrgetpositionへ移動)
	static setMoveAnimation(aObjectList,aTargetPosition,aDuration,aCallBack){
		let tPosition=aObjectList[0].position;
		let tSpeed={};
		let tTimes=Math.ceil(aDuration*0.06);
		//1フレームで移動させる距離を求める
		for(let tAxis in aTargetPosition){
			tSpeed[tAxis]=(aTargetPosition[tAxis]-tPosition[tAxis])/tTimes;
		}
		let tLoop=()=>{
			let tArriveFlag=true;
			//物体の移動
			for(let tObject of aObjectList){
				for(let tAxis in tSpeed){
					tObject.position[tAxis]+=tSpeed[tAxis];
					//目標地点に到達したか確認
					if(tSpeed[tAxis]<0){
						if(tObject.position[tAxis]>aTargetPosition[tAxis]){
							tArriveFlag=false;
						}
					}
					else{
						if(tObject.position[tAxis]<aTargetPosition[tAxis]){
							tArriveFlag=false;
						}
					}
				}
			}
			if(!tArriveFlag){
				//目標地点に到達していない
				requestAnimationFrame(tLoop);
			}
			else{
				//目標地点に到達した
				for(let tObject of aObjectList){
					for(let tAxis in aTargetPosition){
						tObject.position[tAxis]=aTargetPosition[tAxis];
					}
				}
				aCallBack();
			}
		}
		tLoop();
	}
	//アニメションセット(aFunctionの戻り値が true:繰り返し,false:callback)
	static setAnimation(aFunction,aCallBack){
		let tAnimate=()=>{
			if(aFunction())requestAnimationFrame(tAnimate);
			else aCallBack();
		}
		tAnimate();
	}
	//マウスオーバーされているオブジェクトのリストを返す
	static getOverdObjects(e){
		// var rect = e.target.getBoundingClientRect();
    //
		// // スクリーン上のマウス位置を取得する
		// var mouseX = e.clientX - rect.left;
		// var mouseY = e.clientY - rect.top;
		var mouseX = e.clientX;
		var mouseY = e.clientY;

		// 取得したスクリーン座標を-1〜1に正規化する（WebGLは-1〜1で座標が表現される）
		mouseX =  (mouseX/window.innerWidth)  * 2 - 1;
		mouseY = -(mouseY/window.innerHeight) * 2 + 1;

		// マウスの位置ベクトル
		var pos = new THREE.Vector3(mouseX, mouseY, 1);

		// pos はスクリーン座標系なので、オブジェクトの座標系に変換
		// オブジェクト座標系は今表示しているカメラからの視点なので、第二引数にカメラオブジェクトを渡す
		// new THREE.Projector.unprojectVector(pos, camera); ↓最新版では以下の方法で得る
		pos.unproject(this.camera);

		// 始点、向きベクトルを渡してレイを作成
		var ray = new THREE.Raycaster(this.camera.position, pos.sub(this.camera.position).normalize());

		// 交差判定
		// 引数は取得対象となるMeshの配列を渡す。以下はシーン内のすべてのオブジェクトを対象に。
		var objs = ray.intersectObjects(this.scene.children);
		//ヒエラルキーを持った子要素も対象とする場合は第二引数にtrueを指定する
		//var objs = ray.intersectObjects(scene.children, true);

		return objs;
		// if (objs.length > 1) {
		// 	// 交差していたらobjsが1以上になるので、やりたいことをやる。
		// 	// objs[0].object.position.x = 10;
		// 	let tClassName=objs[1].object.className;
		// 	let tClass=objs[1].object.class;
		// 	if(tClassName=="mas")tClass.changeToSelected()
		// 	// console.log(objs[0].object.class);
		// }
	}
}
