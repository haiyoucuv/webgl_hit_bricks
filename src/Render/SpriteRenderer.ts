/*
 * SpriteRender.ts
 * Created by 还有醋v on 2021/12/17.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */


import { Matrix4 } from "../math";
import Sprite from "../Object/Sprite";
import Shader from "../Shader/Shader";

import spriteVs from "../shaders/sprite.vs"
import spriteFs from "../shaders/sprite.fs"
import Renderer from "./Render";

export default class SpriteRenderer {

	static vertices = new Float32Array([
		0, 1, 0, 0,
		1, 1, 1, 0,
		1, 0, 1, 1,
		0, 0, 0, 1,
	]);

	static indexes = new Uint16Array([
		0, 1, 2,
		0, 2, 3
	]);

	static shader: Shader;

	static gl: WebGLRenderingContext;

	static indexBuffer;

	static init(gl: WebGLRenderingContext) {
		SpriteRenderer.gl = gl;

		const { vertices, indexes } = SpriteRenderer;

		SpriteRenderer.shader = new Shader(gl, spriteVs, spriteFs);

		const BYTES = vertices.BYTES_PER_ELEMENT;
		SpriteRenderer.shader.attributes.pos_uv.bind(vertices);
		SpriteRenderer.shader.attributes.pos_uv.pointer(gl.FLOAT, false, 4 * BYTES, 0);

		SpriteRenderer.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, SpriteRenderer.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexes, gl.STATIC_DRAW);
	}

	static renderSprite(sprite: Sprite) {
		const { gl, shader, indexBuffer } = SpriteRenderer;

		shader.use();

		const { worldMatrix, worldAlpha } = sprite;

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

		gl.activeTexture(gl.TEXTURE0);
		sprite.texture.bind();

		shader.uniforms.model = worldMatrix.toArray();
		shader.uniforms.u_texture = 0;
		shader.uniforms.u_alpha = worldAlpha;
		shader.uniforms.projection = Renderer.projection.toArray();

		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

	}
}
