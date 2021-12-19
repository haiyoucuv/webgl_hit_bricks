/*
 * GameObject.ts
 * Created by 还有醋v on 2021/12/18.
 * Copyright © 2021 haiyoucuv. All rights reserved.
 */

import { Matrix4, Vector2 } from "../math";
import Texture from "./Texture";

export default class GameObject {

	// 位置
	private _position: Vector2 = new Vector2();
	get position(): Vector2 {
		return this._position;
	}

	get x(): number {
		return this._position.x;
	}

	set x(x: number) {
		this._position.x = x;
	}

	get y(): number {
		return this._position.y;
	}

	set y(y: number) {
		this._position.y = y;
	}


	// 缩放
	private _scale: Vector2 = new Vector2(1, 1);

	get scale(): Vector2 {
		return this._scale;
	}

	get scaleX(): number {
		return this._scale.x;
	}

	set scaleX(x: number) {
		this._scale.x = x;
	}

	get scaleY(): number {
		return this._scale.y;
	}

	set scaleY(y: number) {
		this._scale.y = y;
	}

	// 旋转，顺时针，角度制
	private _rotation: number = 0;
	get rotation() {
		return this._rotation;
	}

	set rotation(r: number) {
		this._rotation = r;
	}

	// 透明度
	private _alpha: number = 1;
	get alpha(): number {
		return this._alpha;
	}

	set alpha(a: number) {
		this._alpha = a;
	}

	private _worldAlpha: number = 1;
	get worldAlpha(): number {
		return this._worldAlpha;
	}

	_texture: Texture = null;
	get texture(): Texture {
		return this._texture
	}

	set texture(t: Texture) {
		this._texture = t;
		this.width = t.width;
		this.height = t.height;
	}

	_modelMatrix = new Matrix4();
	get modelMatrix() {
		return this._modelMatrix;
	}

	_worldMatrix = new Matrix4();
	get worldMatrix() {
		return this._worldMatrix;
	}

	_width = 1;
	_height = 1;

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}

	set width(w: number) {
		this._width = w;
	}

	set height(h: number) {
		this._height = h;
	}

	children: Array<GameObject> = [];
	parent: GameObject = null;

	add(child: GameObject) {
		if (child.parent) child.removeFromParent();
		this.children.push(child);
		child.parent = this;
		return child;
	}

	remove(child: GameObject) {
		if (!child.parent) return child;
		const index = this.children.indexOf(child);
		if (index <= -1) return child;
		this.children.splice(index, 1);
		child.parent = null;
	}

	removeFromParent() {
		this.parent.remove(this);
		return this;
	}

	update() {

		const { modelMatrix, x, y, rotation, width, height, parent, scaleX, scaleY } = this;

		modelMatrix.setIdentity();
		modelMatrix.translate(x, y, 0);
		modelMatrix.rotate(rotation, 0, 0, 1);
		modelMatrix.scale(width, height, 1);
		modelMatrix.scale(scaleX, scaleY, 1);

		if (this.parent) {
			this._worldMatrix.multiplyMatrices(parent.modelMatrix, modelMatrix);
			this._worldAlpha = this.alpha * parent._worldAlpha;
		} else {
			this._worldMatrix.copy(modelMatrix);
			this._worldAlpha = this.alpha;
		}

		for (let i = 0; i < this.children.length; i++) {
			this.children[i].update();
		}
	}

	render() {
		for (let i = 0; i < this.children.length; i++) {
			this.children[i].render();
		}
	}
}
