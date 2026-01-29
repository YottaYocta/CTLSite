precision highp float;

#define PI 3.1415

uniform sampler2D tSource;
uniform float uTime;

varying vec2 vUv;

float computeValue(vec4 color) {
    return (color.r+color.g+color.b)/(3.0);
}

void main() {
    vec2 uv = vec2(vUv.x, vUv.y);
    vec4 sourceColor = texture2D(tSource, vec2(uv.x, clamp(uv.y - sin(uv.x * 100.0 - uTime/10.0)/120.0, 0.05, 0.95)));
    float gradientOffset = computeValue(sourceColor);

    float currentGradientPosition = sin(2.0 * PI * (uv.x - uTime / 20.0 - gradientOffset)) / 2.0 + 0.5;
    vec4 heatmapColor = vec4(vec3(currentGradientPosition * 0.8), 1.0);
    gl_FragColor = heatmapColor;
}
