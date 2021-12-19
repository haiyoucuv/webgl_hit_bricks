/*
 * Sprite.ts
 * Created by 还有醋v on 2021/12/17.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

import { Matrix4, Vector2 } from "../math";
import SpriteRenderer from "../Render/SpriteRenderer";
import GameObject from "./GameObject";
import Texture from "./Texture";

export default class Sprite extends GameObject {


	constructor(texture?) {
		super();
		this.texture = texture;
	}

	render() {
		SpriteRenderer.renderSprite(this);
	}

	static async fromUrl(url: string): Promise<Sprite> {
		return new Sprite(await Texture.fromUrl(url));
	}

}
