/*
 * Game.ts
 * Created by 还有醋v on 2021/12/16.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

import GameScene from "./GameScene";
import Scene from "./Object/Scene";
import Renderer from "./Render/Render";

export default class Game {

	domElement: HTMLCanvasElement;

	width: number = 0;
	height: number = 0;

	scene: Scene;

	constructor(width: number, height: number) {
		const canvas = document.createElement("canvas");
		canvas.id = "render";
		canvas.width = width
		canvas.height = height;

		this.domElement = canvas;

		this.width = width;
		this.height = height;

		Renderer.init(canvas, width, height);

		this.init();

		this.loop();

	}

	init() {
		this.scene = new GameScene();
	}

	addList(obj) {

	}

	onEvent(e) {

	}

	update() {
		this.scene.update();
	}

	render() {
		Renderer.render(this.scene);
	}

	loop = () => {
		requestAnimationFrame(this.loop);
		this.update();
		this.render();
	}

}
