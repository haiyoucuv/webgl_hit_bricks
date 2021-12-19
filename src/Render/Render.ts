/*
 * Render.ts
 * Created by 还有醋v on 2021/12/18.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

import { Matrix4 } from "../math";
import Scene from "../Object/Scene";
import SpriteRenderer from "./SpriteRenderer";

export default class Renderer {
	static _gl: WebGLRenderingContext;
	static get gl(): WebGLRenderingContext {
		return Renderer._gl;
	}

	static projection: Matrix4;

	static init(canvas: HTMLCanvasElement, width: number, height: number) {
		const gl = canvas.getContext("webgl");
		Renderer._gl = gl;
		gl.viewport(0, 0, width, height);
		gl.clearColor(0.2, 0.2, 0.2, 1);
		gl.enable(gl.CULL_FACE); // 剔除背面
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		SpriteRenderer.init(gl);
		Renderer.projection = (new Matrix4()).setOrtho(
			0,
			width,
			0,
			height,
			-1,
			1
		);
	}

	static render(scene: Scene) {
		Renderer._gl.clear(Renderer._gl.COLOR_BUFFER_BIT);
		scene.render();
	}

}
