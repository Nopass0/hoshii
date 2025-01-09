import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Canvas({ width = 200, height = 200 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.OrthographicCamera>();
  const rendererRef = useRef<THREE.Renderer>();
  const lineRef = useRef<THREE.Line>();
  const points = useRef<THREE.Vector3[]>([]);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -1000,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setClearColor(new THREE.Color("white"), 1);
    renderer.setSize(width, height);

    // Position camera
    camera.position.z = 10;
    camera.lookAt(scene.position);
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create initial line geometry and material
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    lineRef.current = line;

    // Rendering loop
    function render() {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();

    // Event Handling for Drawing
    const handlePointerDown = (event: PointerEvent) => {
      isDrawingRef.current = true;
      points.current = []; // Reset points array
      addPoint(event); // Add the first point
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDrawingRef.current) return; // Only draw if stylus is pressed
      addPoint(event); // Add new points while drawing
    };

    const handlePointerUp = () => {
      isDrawingRef.current = false; // Stop drawing
    };

    // Add a new point to the line
    const addPoint = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - width / 2;
      const y = -(event.clientY - rect.top) + height / 2;
      const pressure = event.pressure !== undefined ? event.pressure : 1; // Default pressure is 1

      // Adjust brush size based on pressure
      const brushSize = pressure * 10; // Adjust multiplier as needed

      // Add the new point with brush size
      points.current.push(new THREE.Vector3(x, y, 0));

      // Update the line geometry
      const positions = new Float32Array(points.current.length * 3);
      points.current.forEach((point, index) => {
        positions[index * 3] = point.x;
        positions[index * 3 + 1] = point.y;
        positions[index * 3 + 2] = point.z;
      });

      lineRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      lineRef.current.geometry.attributes.position.needsUpdate = true;

      // Update material linewidth (if supported)
      lineRef.current.material.linewidth = brushSize;
    };

    // Add Event Listeners
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);

    // Cleanup on Unmount
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: "1px solid #000",
        borderRadius: "8px",
        display: "block",
        cursor: "auto",
      }}
    />
  );
}
