// xy 是点，zw是uv
attribute vec4 pos_uv;

uniform mat4 projection;
uniform mat4 model;

varying vec2 v_uv;


void main() {
    gl_Position = projection  * model * vec4(pos_uv.xy, 0.0, 1.0);
//    gl_PointSize = 10.0;
    v_uv = pos_uv.zw;
}
