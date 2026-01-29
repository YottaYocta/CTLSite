export type ColorStop = { position: number; color: string };

export const HEATMAP_GRADIENT_STOPS: ColorStop[] = [
  { position: 0, color: "#413FC5" },    // dark blue
  { position: 0.4, color: "#26B8FF" },  // light blue
  { position: 0.5, color: "#40FFAB" },  // green
  { position: 0.6, color: "#F1FF5B" },  // yellow
  { position: 0.7, color: "#FF8B21" }, // orange
  { position: 0.99, color: "#FFF" },    // white
];

/**
 * Draws a constant interpolation gradient by filling rectangles for each color stop.
 * Each color fills from its position to the next stop's position.
 */
export function drawConstantGradient(
  ctx: CanvasRenderingContext2D,
  stops: ColorStop[],
  width: number,
  height: number,
): void {
  for (let i = 0; i < stops.length; i++) {
    const start = stops[i].position;
    const end = i < stops.length - 1 ? stops[i + 1].position : 1;
    const x = Math.floor(start * width);
    const w = Math.ceil((end - start) * width);

    ctx.fillStyle = stops[i].color;
    ctx.fillRect(x, 0, w, height);
  }
}

/**
 * Creates a heatmap gradient canvas with constant interpolation (step function).
 */
export function createHeatmapGradientCanvas(width = 64, height = 1): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  drawConstantGradient(ctx, HEATMAP_GRADIENT_STOPS, width, height);

  return canvas;
}
