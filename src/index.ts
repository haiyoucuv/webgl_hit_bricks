/*
 * index.js
 * Created by 还有醋v on 2021/8/29.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */


import Shader from "./Shader/Shader";
import vertexSource from './shaders/vert.vs';
import fragSource from './shaders/frag.fs';

import { createTexture, initProgram, loadImage } from "./glTools";

async function main() {

	const canvas = document.createElement("canvas");
	canvas.width = 400;
	canvas.height = 400;

	document.body.appendChild(canvas);

	const gl = canvas.getContext("webgl");

	window['gl'] = gl;

	const image = await loadImage("./assets/图层 1.png");
	const avatar = await loadImage("./assets/avatar.jpg");
	const noise = await loadImage("./assets/noise.png");

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.2, 0.2, 0.2, 1);
	gl.enable(gl.CULL_FACE); // 剔除背面

	const shader = new Shader(gl, vertexSource, fragSource);

	const pos = new Float32Array([
		-0.7, -0.7, 0, 0,
		0.7, -0.7, 1, 0,
		-0.7, 0.7, 0, 1,
		0.7, 0.7, 1, 1,
	]);

    const index = new Uint8Array([
        0, 1, 2,
        2, 1, 3,
    ]);

    const BYTES = pos.BYTES_PER_ELEMENT;

    const vertexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);

	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, index, gl.STATIC_DRAW);

	gl.clear(gl.COLOR_BUFFER_BIT);

	shader.use();

	const a_pos = gl.getAttribLocation(shader.program, "pos");
	gl.enableVertexAttribArray(a_pos);
	const a_uv = gl.getAttribLocation(shader.program, "uv");
	gl.enableVertexAttribArray(a_uv);

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 4 * BYTES, 0);
	gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, 4 * BYTES, 2 * BYTES);

	const texture = createTexture(gl, image);
	const noiseTexture = createTexture(gl, noise);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, noiseTexture);

	shader.uniforms.u_texture = 0;
	shader.uniforms.u_dissolve = 1;
	shader.uniforms.u_dissolveThreshold = 0.4;

	gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);

}

main();
