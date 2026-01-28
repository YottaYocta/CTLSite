attribute vec2 texcoord;
attribute vec2 position;

varying vec2 vUv;

void main() {
    vUv = texcoord;
    gl_Position = vec4(position, 0, 1);
}
