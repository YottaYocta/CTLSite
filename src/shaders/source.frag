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
    vec4 sourceColor = texture2D(tSource, vec2(uv.x, uv.y));
    float gradientOffset = computeValue(sourceColor);

    float currentGradientPosition = pow((1.0 - sin(3.0 * PI * (uv.x - uTime / 80.0 - gradientOffset))) / 2.0, 2.0);
    gl_FragColor = vec4(vec3(currentGradientPosition), 1.0);
}
