import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeHeroNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGLFallback, setHasWebGLFallback] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch {
        return false;
      }
    };

    if (!checkWebGL() || prefersReducedMotion) {
      setHasWebGLFallback(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 85;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGLFallback(true);
      return;
    }

    // 2. Network Nodes
    const nodeCount = 45;
    const nodePositions: THREE.Vector3[] = [];
    const nodeVelocities: THREE.Vector3[] = [];

    const nodeGeometry = new THREE.SphereGeometry(0.55, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75
    });

    const nodesInstanced = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 110,
        (Math.random() - 0.5) * 65,
        (Math.random() - 0.5) * 45
      );
      nodePositions.push(pos);
      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.02
        )
      );

      matrix.setPosition(pos);
      nodesInstanced.setMatrixAt(i, matrix);
    }
    nodesInstanced.instanceMatrix.needsUpdate = true;
    scene.add(nodesInstanced);

    // 3. Dynamic Lines Buffer
    const maxLines = 120;
    const linePositions = new Float32Array(maxLines * 6); // 2 vertices * 3 coords
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.18,
      linewidth: 1
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // 4. Moving Packets along links
    const packetCount = 18;
    const packetGeometry = new THREE.SphereGeometry(0.35, 8, 8);
    const packetMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.9 });
    const packetMeshes: THREE.Mesh[] = [];
    const packetData: { sourceIndex: number; targetIndex: number; progress: number; speed: number }[] = [];

    for (let p = 0; p < packetCount; p++) {
      const mesh = new THREE.Mesh(packetGeometry, packetMaterial);
      scene.add(mesh);
      packetMeshes.push(mesh);
      packetData.push({
        sourceIndex: Math.floor(Math.random() * nodeCount),
        targetIndex: (Math.floor(Math.random() * (nodeCount - 1)) + 1) % nodeCount,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.007
      });
    }

    // 5. Parallax Mouse Listener
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 12;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Visibility Change handler (pause when tab hidden)
    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 8. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      // Parallax smooth camera glide
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(0, 0, 0);

      // Update Node positions & bounce bounds
      for (let i = 0; i < nodeCount; i++) {
        const pos = nodePositions[i];
        const vel = nodeVelocities[i];
        pos.add(vel);

        if (pos.x > 55 || pos.x < -55) vel.x *= -1;
        if (pos.y > 33 || pos.y < -33) vel.y *= -1;
        if (pos.z > 22 || pos.z < -22) vel.z *= -1;

        matrix.setPosition(pos);
        nodesInstanced.setMatrixAt(i, matrix);
      }
      nodesInstanced.instanceMatrix.needsUpdate = true;

      // Update Connection Lines based on proximity
      let lineIndex = 0;
      const positions = lineGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < nodeCount && lineIndex < maxLines; i++) {
        for (let j = i + 1; j < nodeCount && lineIndex < maxLines; j++) {
          const p1 = nodePositions[i];
          const p2 = nodePositions[j];
          const distSq = p1.distanceToSquared(p2);

          if (distSq < 320) { // proximity threshold
            const ptr = lineIndex * 6;
            positions[ptr] = p1.x;
            positions[ptr + 1] = p1.y;
            positions[ptr + 2] = p1.z;
            positions[ptr + 3] = p2.x;
            positions[ptr + 4] = p2.y;
            positions[ptr + 5] = p2.z;
            lineIndex++;
          }
        }
      }

      // Hide remaining lines
      for (let k = lineIndex * 6; k < maxLines * 6; k++) {
        positions[k] = 0;
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      // Update Moving Packets
      for (let p = 0; p < packetCount; p++) {
        const item = packetData[p];
        item.progress += item.speed;
        if (item.progress >= 1.0) {
          item.progress = 0;
          item.sourceIndex = Math.floor(Math.random() * nodeCount);
          item.targetIndex = (item.sourceIndex + Math.floor(Math.random() * 5) + 1) % nodeCount;
        }

        const p1 = nodePositions[item.sourceIndex];
        const p2 = nodePositions[item.targetIndex];
        const mesh = packetMeshes[p];
        mesh.position.lerpVectors(p1, p2, item.progress);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      packetGeometry.dispose();
      packetMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {hasWebGLFallback && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-transparent to-[#050811] opacity-60" />
      )}
    </div>
  );
};
