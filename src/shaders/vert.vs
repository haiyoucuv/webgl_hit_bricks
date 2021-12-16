attribute vec2 a_pos;
attribute vec2 a_uv;

varying vec3 v_pos;
varying vec2 v_uv;

void main(){
    gl_Position = vec4(a_pos, 1.0, 1.0);
    v_pos = vec3(a_pos, 1.0);
    v_uv = a_uv;
}
