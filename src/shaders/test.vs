attribute vec2 pos;
attribute vec2 uv;

uniform mat4 projection;

varying vec2 v_uv;


void main() {
    gl_Position = projection * vec4(pos, 0.0, 1.0);
    v_uv = uv;
}
