precision highp float;

uniform sampler2D tSource;

varying vec2 vUv;

void main() {
    vec2 uv = vec2(vUv.x, vUv.y);
    gl_FragColor = texture2D(tSource, uv);
}
