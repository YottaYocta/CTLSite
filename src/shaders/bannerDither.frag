precision mediump float;

varying vec2 vUv;

uniform sampler2D tSource;
uniform sampler2D tBayer;
uniform sampler2D tGradient;
uniform float uTime;
uniform vec2 uResolution;
uniform float uDitherSize;
uniform int uNumColors;
uniform float uIntensity;

float getLuminosity(vec3 color) {
    return dot(color, vec3(0.2126, 0.7152, 0.0722));
}

vec3 dither(vec3 color, float threshold) {
    return texture2D(tGradient, vec2(getLuminosity(color + vec3(threshold * uIntensity)), 0.5)).rgb;
}

void main() {
    vec2 uv = vec2(vUv.x, 1.0-vUv.y);

    vec2 pixel = uv * uResolution;
    vec2 cell = floor(pixel / uDitherSize);

    vec2 sampleUv = (cell * uDitherSize + 0.5) / uResolution;
    sampleUv = vec2(sampleUv.x, sampleUv.y);
    vec4 color = texture2D(tSource, sampleUv);

    vec2 bayerUv = mod(cell, 8.0) / 8.0;
    float threshold = texture2D(tBayer, bayerUv).r;

    gl_FragColor = vec4(
        dither(
            mix(
                color.rgb + vec3(
                    max(min(log((2.0 * uv.x + (1.0 - uv.y)) / 1.5), 0.0), -0.5)
                ), 
                vec3(1.0), 
                pow((2.0 * uv.x + 1.0 - uv.y) / 3.0, 3.0)
            ),
            threshold
    ), 1.0);

}
