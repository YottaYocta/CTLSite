precision mediump float;

varying vec2 vUv;

uniform sampler2D tMap;
uniform float uTime;
uniform vec2 uResolution;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    vec2 uv = vec2(vUv.x, 1.0 - vUv.y);

    vec2 pixel = uv * uResolution;

    float checker = mod(floor(pixel.x) + floor(pixel.y), 2.0);

    vec4 color = texture2D(tMap, uv);

    color.rgb *= checker;

    gl_FragColor = vec4(color.rgb, 1.0);
}
