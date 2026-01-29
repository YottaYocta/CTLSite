precision highp float;

#define PI 3.1415

uniform sampler2D tSource;
uniform sampler2D tGradient;
uniform float uTime;

varying vec2 vUv;

float computeValue(vec4 color) {
    return (color.r+color.g+color.b)/(3.0);
}

void main() {
    vec2 uv = vec2(vUv.x, vUv.y);
    vec4 sourceColor = texture2D(tSource, vec2(uv.x, clamp(uv.y - sin(uv.x * 100.0 - uTime/10.0)/120.0, 0.05, 0.95)));
    float gradientOffset = computeValue(sourceColor);

    float currentGradientPosition = pow((1.0 - sin(2.0* PI * (uv.x - uTime / 80.0 - gradientOffset))) / 2.0, 1.0);
    vec4 heatmapColor = mix(texture2D(tGradient, vec2(1.0-currentGradientPosition, 0.5)), vec4(1.0), pow(max(0.0, uv.x - 0.1), 2.5));
    gl_FragColor = heatmapColor;
}
