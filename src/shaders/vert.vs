attribute vec2 pos;
attribute vec2 uv;

varying vec3 v_pos;
varying vec2 v_uv;

void main() {
    gl_Position = vec4(pos, 1.0, 1.0);
    v_pos = vec3(pos, 1.0);
    v_uv = uv;
}
