precision mediump float;

uniform sampler2D u_texture;
uniform float u_alpha;

varying vec2 v_uv;

void main () {
    vec4 o = texture2D(u_texture, v_uv);

    gl_FragColor = vec4(o.xyz, o.a * u_alpha);
    //    gl_FragColor = vec4(1, 0, 0, 0);
}
