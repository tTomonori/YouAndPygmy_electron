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

		let tick=()=>{
			requestAnimationFrame(tick);

			// // // 箱を回転させる
			// box.rotation.x += 0.01;
			// box.rotation.y += 0.01;
			// ThreeWarld.camera.rotation.x += 0.001;
			// ThreeWarld.camera.position.y -= 1;
			// camera.rotation.y += 0.001;
			// camera.rotation.z -= 0.001;
			// camera.lookAt(new THREE.Vector3(0, 100, 0));

			//描画毎に呼ぶ関数
			for(let tFunction of this.intervalFunction){
				tFunction();
			}
			//Masクラスのマウスオーバーメソッドを呼ぶ
			if(this.mousePoint!=null){
				let tObjects=this.getOverdObjects(this.mousePoint);
				for(let tObject of tObjects){
					if(tObject.object.className=="mas"){
						tObject.object.class.mouseOver();
						break;
					}
				}
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
	//描画まいに呼ぶ関数リセット
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
	static createBox(aSize){
		// 箱を作成
		let tGeometry = new THREE.BoxGeometry(aSize[0],aSize[1],aSize[2]);
		let tMaterial = new THREE.MeshBasicMaterial();
		let tBox = new THREE.Mesh(tGeometry, tMaterial);
		this.scene.add(tBox);
		return tBox;
	}
	//キャラのオブジェクト生成
	static createChara(aSize,aImage){
		// // 画像を指定したmaterialの用意
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
		this.scene.add(tMesh);
		return tMesh;
	}
	static setMouseMove(){
		let tCanvas=document.getElementById("threeWarld");
		tCanvas.onmousemove=(e)=>{
			//カーソル位置記憶
			this.mousePoint={clientX:e.clientX,clientY:e.clientY,target:e.target};
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
