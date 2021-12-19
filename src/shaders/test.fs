precision mediump float;

uniform sampler2D u_texture;
uniform sampler2D u_dissolve;

uniform float u_dissolveThreshold;

varying vec2 v_uv;

void main () {

    float value = texture2D(u_dissolve, v_uv).r;

    if (value < u_dissolveThreshold){
        discard;
    }

    vec4 color = texture2D(u_texture, v_uv);

    if (value < u_dissolveThreshold + 0.05){
        color = vec4(0.9, 0.6, 0.3, color.a);
    }

    gl_FragColor = color;
}
