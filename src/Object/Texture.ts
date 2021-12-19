/*
 * Texture.ts
 * Created by 还有醋v on 2021/12/17.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

import { createTexture, loadImage } from "../glTools";
import Renderer from "../Render/Render";

export default class Texture {

	private _glTexture: WebGLTexture = null;

	_width: number = 0;
	get width(): number {
		return this._width;
	}

	_height: number = 0;
	get height(): number {
		return this._height;
	}

	get glTexture(): WebGLTexture {
		return this._glTexture;
	}

	private gl: WebGLRenderingContext;

	private image: HTMLImageElement

	constructor(image: HTMLImageElement) {
		this.gl = Renderer.gl;
		this.image = image;
		this._width = image.width;
		this._height = image.height;
		this._glTexture = createTexture(this.gl, image);
	}

	bind() {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this._glTexture);
	}

	static create(image: HTMLImageElement) {
		return new Texture(image);
	}

	static async fromUrl(src: string) {
		const image = await loadImage(src);
		return new Texture(image);
	}


}
