/*
 * GameScene.ts
 * Created by 还有醋v on 2021/12/18.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

import GameObject from "./Object/GameObject";
import Scene from "./Object/Scene";
import Sprite from "./Object/Sprite";

export default class GameScene extends Scene {

	constructor() {
		super();
		this.init();
	}

	async init() {

		const sprite = await Sprite.fromUrl("./assets/block.png");
		this.add(sprite);

		const sprite2 = await Sprite.fromUrl("./assets/block_solid.png");
		sprite2.position.set(100, 100);

		const obj = new GameObject();
		this.add(obj);
		obj.position.set(10, 1);

		obj.add(sprite2);

	}

}
