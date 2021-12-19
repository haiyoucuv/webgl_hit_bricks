/*
 * index.js
 * Created by 还有醋v on 2021/8/29.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

import Game from "./Game";
import Sprite from "./Object/Sprite";
import Texture from "./Object/Texture";
import Renderer from "./Render/Render";
import SpriteRenderer from "./Render/SpriteRenderer";

import { loadImage } from "./glTools";

async function main() {

	const game = new Game(1000, 800);
	document.body.appendChild(game.domElement);

	// const winSize = {
	// 	width: 1000,
	// 	height: 800,
	// }
	//
	// const canvas = document.createElement("canvas");
	// canvas.width = winSize.width
	// canvas.height = winSize.height;
	// document.body.appendChild(canvas);
	//
	// const gl = canvas.getContext("webgl");
	//
	// window['gl'] = gl;
	//
	// const image = await loadImage("./assets/图层 1.png");
	// const avatar = await loadImage("./assets/avatar.jpg");
	// const noise = await loadImage("./assets/noise.png");
	//
	// gl.viewport(0, 0, winSize.width, winSize.height);
	// gl.clearColor(0.2, 0.2, 0.2, 1);
	// gl.enable(gl.CULL_FACE); // 剔除背面
	//
	// Renderer.init(gl, winSize.width, winSize.height);
	//
	// const texture1 = new Texture(gl, image);
	// const sprite = new Sprite(texture1);
	//
	// SpriteRenderer.renderSprite(sprite);

}

main();
