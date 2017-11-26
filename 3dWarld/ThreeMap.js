class ThreeMap{
	static init(){
		const width = mScreenSize.width;
		const height = mScreenSize.height;

		// レンダラーを作成
		// レンダラーを作成
		this.renderer = new THREE.WebGLRenderer({
			canvas: document.querySelector('#threeMap'),
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

			// レンダリング
			this.renderer.render(this.scene, this.camera);
		}
		// 初回実行
		tick();
		//地面用ジオメトリ生成
		this.groundGeometry=new THREE.CubeGeometry(mGroundSize[0],mGroundSize[1],mGroundSize[2]);
		this.upGeometry={
			"up":new THREE.CubeGeometry(mGroundSize[0],mGroundSize[1],mGroundSize[2]),
			"right":new THREE.CubeGeometry(mGroundSize[0],mGroundSize[1],mGroundSize[2]),
			"down":new THREE.CubeGeometry(mGroundSize[0],mGroundSize[1],mGroundSize[2]),
			"left":new THREE.CubeGeometry(mGroundSize[0],mGroundSize[1],mGroundSize[2]),
		}
		//画像の向きを変える
		//右面
		this.groundGeometry.faces[0].a=2;
		this.groundGeometry.faces[0].b=3;
		this.groundGeometry.faces[0].c=0;
		this.groundGeometry.faces[1].a=3;
		this.groundGeometry.faces[1].b=1;
		this.groundGeometry.faces[1].c=0;
		//左面
		this.groundGeometry.faces[2].a=5;
		this.groundGeometry.faces[2].b=4;
		this.groundGeometry.faces[2].c=7;
		this.groundGeometry.faces[3].a=4;
		this.groundGeometry.faces[3].b=6;
		this.groundGeometry.faces[3].c=7;
		// this.groundGeometry.faces[3]={a:}
		//頂点の位置を変更して三角柱にする
		this.upGeometry.up.vertices[2].z-=mGroundSize[2];
		this.upGeometry.up.vertices[7].z-=mGroundSize[2];
		this.upGeometry.right.vertices[5].z-=mGroundSize[2];
		this.upGeometry.right.vertices[7].z-=mGroundSize[2];
		this.upGeometry.down.vertices[0].z-=mGroundSize[2];
		this.upGeometry.down.vertices[5].z-=mGroundSize[2];
		this.upGeometry.left.vertices[0].z-=mGroundSize[2];
		this.upGeometry.left.vertices[2].z-=mGroundSize[2];
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
	//マップチップを作成
	static createChip(aChipList){
		this.chipList={};
		for(let tKey in aChipList){
			let tChip=aChipList[tKey];
			//画像読み込み
			let tAbove=new THREE.MeshBasicMaterial( {
				map:THREE.ImageUtils.loadTexture("image/battleTile/"+tChip.image.above+".jpg",{},()=>{this.renderer.render(this.scene, this.camera);}),
			});
			let tSide=new THREE.MeshBasicMaterial( {
				map:THREE.ImageUtils.loadTexture("image/battleTile/"+tChip.image.side+".jpg",{},()=>{this.renderer.render(this.scene, this.camera);}),
			});
			tAbove.map.minFilter=THREE.LinearFilter;//縮小時の警告を消す
			tSide.map.minFilter=THREE.LinearFilter;//縮小時の警告を消す
			this.chipList[tKey]={
				above:tAbove,
				side:tSide,
				material:[tSide,tSide,tSide,tSide,tAbove,tSide]
			}
			if(tChip.height==undefined){
				//立方体
				this.chipList[tKey].geometry=this.groundGeometry;
			}
			else{
				//円柱(坂道)
				for(let tDirection in tChip.height){
					if(tChip.height[tDirection]!=1)continue;
					this.chipList[tKey].geometry=this.upGeometry[tDirection]
					break;
				}
			}
		}
	}
	//地面用の箱生成
	static createGround(aChipNum){
		let tChip=this.chipList[aChipNum];
		let tMesh = new THREE.Mesh( tChip.geometry, tChip.material );
		this.scene.add(tMesh);
		return tMesh;
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
	//物体のmeshのみ削除
	static deleteMesh(aMesh){
		this.scene.remove(aMesh);
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
	static createChara(aSize,aMaterial){
		//画像を指定したmaterialの用意
		//何も表示しない面
		let tTransparent=new THREE.MeshBasicMaterial( {
			map:THREE.ImageUtils.loadTexture("",{},()=>{this.renderer.render(this.scene, this.camera);}),
			transparent:true
		});
		let tImageMaterial=new THREE.MeshBasicMaterial( {
			map:aMaterial,
			transparent:true
		});
		let tMaterial = [
			tTransparent,tTransparent,tTransparent,tImageMaterial,tTransparent,tTransparent];
		// Cubeの用意
		let tGeometry = new THREE.CubeGeometry(aSize[0],aSize[1],aSize[2]);
		let tMesh = new THREE.Mesh( tGeometry, tMaterial );
		this.scene.add(tMesh);
		return tMesh;
	}
	//アニメションセット(aFunctionの戻り値が true:繰り返し,false:callback)
	static setAnimation(aFunction,aCallBack){
		let tAnimate=()=>{
			if(aFunction())requestAnimationFrame(tAnimate);
			else aCallBack();
		}
		tAnimate();
	}
}
