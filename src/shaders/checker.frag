precision mediump float;

varying vec2 vUv;

uniform sampler2D tSource;
uniform sampler2D tBayer;
uniform float uTime;
uniform vec2 uResolution;
uniform float uDitherSize;
uniform int uNumColors;
uniform float uIntensity;

vec3 dither(vec3 color, float threshold) {
    float nColors = float(uNumColors);
    float offset = (threshold - 0.5) * uIntensity / (nColors - 1.0);
    return floor((color + offset) * (nColors - 1.0) + 0.5) / (nColors - 1.0);
}

void main() {
    vec2 uv = vec2(vUv.x, vUv.y);

    vec2 pixel = uv * uResolution;
    vec2 cell = floor(pixel / uDitherSize);

    vec2 sampleUv = (cell * uDitherSize + 0.5) / uResolution;
    sampleUv = vec2(sampleUv.x, sampleUv.y);
    vec4 color = texture2D(tSource, sampleUv);

    vec2 bayerUv = mod(cell, 8.0) / 8.0;
    float threshold = texture2D(tBayer, bayerUv).r;

    color.rgb = dither(color.rgb, threshold);

    gl_FragColor = vec4(color.rgb, 1.0);
}
