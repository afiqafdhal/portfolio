
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  useRopeJoint,
} from "@react-three/rapier";
import * as THREE from "three";

// ============================================
// PORTFOLIO LANYARD — STUDIO EDITION
// ============================================

const DESIGN = {
  width: 2.06,
  height: 2.76,
  zoom: 112,
  gravity: -9.81,
  linearDamping: 2.4,
  angularDamping: 4.6,
  ropeLength: 0.86,
  anchorY: 1.78,
  clipY: 1.47,
};

// ============================================
// PHOTO CROPPING SETTINGS
// Adjust these values to change the photo
// ============================================

const PHOTO = {
  zoom: 1.65,
  focusX: 0.5,
  focusY: 0.56,
};

// ============================================
// CARD TEXTURE
// ============================================

function createBadgeArtwork(photoUrl) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1200;

  const ctx = canvas.getContext("2d");

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;

  let disposed = false;

  function round(x, y, w, h, radius) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
  }

  function draw(image = null) {
    if (disposed) return;

    const W = 900;
    const H = 1200;

    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#fdfcfd";
    ctx.fillRect(0, 0, W, H);

    // Portrait frame
    const x = 38;
    const y = 38;
    const width = 824;
    const height = 963;

    ctx.save();
    round(x, y, width, height, 12);
    ctx.clip();

    ctx.fillStyle = "#eae2f0";
    ctx.fillRect(x, y, width, height);

    if (image && image.naturalWidth > 0) {
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;

      // Base cover scale, with additional zoom
      const scale =
        Math.max(
          width / imageWidth,
          height / imageHeight
        ) * PHOTO.zoom;

      // Visible source-image area
      const sourceWidth = width / scale;
      const sourceHeight = height / scale;

      // Focus on upper body instead of ceiling
      const sourceX = THREE.MathUtils.clamp(
        imageWidth * PHOTO.focusX - sourceWidth / 2,
        0,
        imageWidth - sourceWidth
      );

      const sourceY = THREE.MathUtils.clamp(
        imageHeight * PHOTO.focusY - sourceHeight / 2,
        0,
        imageHeight - sourceHeight
      );

      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        width,
        height
      );

      const overlay = ctx.createLinearGradient(
        0,
        y,
        0,
        y + height
      );

      overlay.addColorStop(
        0,
        "rgba(255,255,255,0.01)"
      );

      overlay.addColorStop(
        1,
        "rgba(115,85,140,0.04)"
      );

      ctx.fillStyle = overlay;
      ctx.fillRect(x, y, width, height);
    } else {
      const gradient = ctx.createLinearGradient(
        0,
        y,
        0,
        y + height
      );

      gradient.addColorStop(0, "#f0e9f5");
      gradient.addColorStop(1, "#e9e0f0");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, width, height);

      ctx.textAlign = "center";
      ctx.fillStyle = "#a38ab7";
      ctx.font = "800 220px Arial, sans-serif";
      ctx.fillText("AA", W / 2, 545);
    }

    ctx.restore();

    // Small lavender accent
    ctx.fillStyle = "#a58abb";
    round(40, 1037, 70, 6, 3);
    ctx.fill();

    // Name — only printed text
    ctx.textAlign = "left";
    ctx.fillStyle = "#17171c";
    ctx.font = "800 57px Arial, sans-serif";
    ctx.fillText("AFIQ AFDHAL", 40, 1127);

    texture.needsUpdate = true;
  }

  draw();

  const image = new Image();

  if (photoUrl) {
    image.onload = () => {
      if (!disposed) draw(image);
    };

    image.onerror = () => {
      if (!disposed) {
        console.warn(
          "[Lanyard] Portrait could not load:",
          photoUrl
        );
      }
    };

    image.src = photoUrl;
  }

  return {
    texture,
    dispose() {
      disposed = true;
      image.onload = null;
      image.onerror = null;
      texture.dispose();
    },
  };
}

// ============================================
// FABRIC TEXTURE
// ============================================

function createFabricTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#25252b";
  ctx.fillRect(0, 0, 128, 256);

  for (let y = 0; y < 256; y += 4) {
    ctx.fillStyle =
      y % 8 === 0
        ? "rgba(255,255,255,0.085)"
        : "rgba(255,255,255,0.035)";

    ctx.fillRect(0, y, 128, 1);
  }

  for (let x = 0; x < 128; x += 5) {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(x, 0, 1, 256);
  }

  ctx.fillStyle = "rgba(185,185,190,0.18)";
  ctx.fillRect(7, 0, 2, 256);
  ctx.fillRect(119, 0, 2, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return texture;
}

// ============================================
// RIBBON GEOMETRY
// ============================================

function createRibbonGeometry() {
  const segments = 40;
  const vertices = new Float32Array(
    (segments + 1) * 6
  );
  const uvs = new Float32Array(
    (segments + 1) * 4
  );
  const indices = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const a = i * 6;
    const uv = i * 4;

    vertices[a] = -0.075;
    vertices[a + 1] = 3.35 - t * 2.2;
    vertices[a + 2] = 0;

    vertices[a + 3] = 0.075;
    vertices[a + 4] = 3.35 - t * 2.2;
    vertices[a + 5] = 0;

    uvs[uv] = 0;
    uvs[uv + 1] = t * 8;
    uvs[uv + 2] = 1;
    uvs[uv + 3] = t * 8;

    if (i < segments) {
      const b = i * 2;
      const c = b + 2;

      indices.push(b, b + 1, c);
      indices.push(b + 1, c + 1, c);
    }
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices, 3)
  );

  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(uvs, 2)
  );

  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

// ============================================
// FABRIC RIBBON
// ============================================

function FabricRibbon({ ribbonRef, shade }) {
  const geometry = useMemo(
    () => createRibbonGeometry(),
    []
  );

  const texture = useMemo(
    () => createFabricTexture(),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      texture.dispose();
    };
  }, [geometry, texture]);

  return (
    <mesh
      ref={ribbonRef}
      geometry={geometry}
      frustumCulled={false}
    >
      <meshStandardMaterial
        map={texture}
        color={shade}
        roughness={0.96}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ============================================
// UPDATE STRAP POSITION
// ============================================

function updateRibbon(ref, start, control, end) {
  if (!ref.current) return;

  const geometry = ref.current.geometry;
  const attribute = geometry.attributes.position;

  const segments = 40;
  const halfWidth = 0.075;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const inv = 1 - t;

    const x =
      inv * inv * start.x +
      2 * inv * t * control.x +
      t * t * end.x;

    const y =
      inv * inv * start.y +
      2 * inv * t * control.y +
      t * t * end.y;

    const z =
      inv * inv * start.z +
      2 * inv * t * control.z +
      t * t * end.z;

    const dx =
      2 * inv * (control.x - start.x) +
      2 * t * (end.x - control.x);

    const dy =
      2 * inv * (control.y - start.y) +
      2 * t * (end.y - control.y);

    const length = Math.hypot(dx, dy) || 1;

    const nx = -dy / length;
    const ny = dx / length;

    const fold =
      Math.sin(t * Math.PI) * 0.023 +
      Math.sin(t * Math.PI * 3) * 0.006;

    attribute.setXYZ(
      i * 2,
      x + nx * halfWidth,
      y + ny * halfWidth,
      z + fold
    );

    attribute.setXYZ(
      i * 2 + 1,
      x - nx * halfWidth,
      y - ny * halfWidth,
      z - fold
    );
  }

  attribute.needsUpdate = true;
  geometry.computeVertexNormals();
}

// ============================================
// PHYSICS SCENE
// ============================================

function LanyardScene({ photoUrl, reducedMotion }) {
  const anchor = useRef(null);
  const badge = useRef(null);

  const leftRibbon = useRef(null);
  const rightRibbon = useRef(null);

  const dragging = useRef(false);
  const target = useRef(new THREE.Vector3());
  const clip = useRef(new THREE.Vector3());
  const rotation = useRef(new THREE.Quaternion());
  const positionVector = useRef(new THREE.Vector3());

  const plane = useMemo(
    () =>
      new THREE.Plane(
        new THREE.Vector3(0, 0, 1),
        0
      ),
    []
  );

  const artwork = useMemo(
    () => createBadgeArtwork(photoUrl),
    [photoUrl]
  );

  useEffect(() => {
    return () => {
      artwork.dispose();
      dragging.current = false;
      document.body.style.cursor = "";
    };
  }, [artwork]);

  useRopeJoint(anchor, badge, [
    [0, 0, 0],
    [0, DESIGN.clipY, 0],
    DESIGN.ropeLength,
  ]);

  // Initial gravity drop
  useEffect(() => {
    if (!badge.current) return;

    const body = badge.current;

    if (reducedMotion) {
      body.setTranslation(
        { x: 0, y: -0.55, z: 0 },
        true
      );
      body.setRotation(
        { x: 0, y: 0, z: 0, w: 1 },
        true
      );
      body.setLinvel(
        { x: 0, y: 0, z: 0 },
        true
      );
      body.setAngvel(
        { x: 0, y: 0, z: 0 },
        true
      );
    } else {
      body.setTranslation(
        { x: -0.16, y: 1.08, z: 0 },
        true
      );

      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0.035, -0.055, -0.1)
      );

      body.setRotation(
        { x: q.x, y: q.y, z: q.z, w: q.w },
        true
      );

      body.setLinvel(
        { x: 0.12, y: -0.15, z: 0 },
        true
      );

      body.setAngvel(
        { x: 0, y: 0.045, z: 0 },
        true
      );
    }

    body.wakeUp();
  }, [reducedMotion]);

  useFrame(() => {
    if (!badge.current) return;

    const body = badge.current;
    const p = body.translation();
    const q = body.rotation();

    positionVector.current.set(p.x, p.y, p.z);
    rotation.current.set(q.x, q.y, q.z, q.w);

    clip.current
      .set(0, DESIGN.clipY, 0)
      .applyQuaternion(rotation.current)
      .add(positionVector.current);

    const end = clip.current;
    const midY = (3.45 + end.y) / 2;

    updateRibbon(
      leftRibbon,
      new THREE.Vector3(-0.72, 3.45, 0),
      new THREE.Vector3(
        -0.36 + end.x * 0.36,
        midY,
        end.z * 0.38
      ),
      end
    );

    updateRibbon(
      rightRibbon,
      new THREE.Vector3(0.72, 3.45, 0),
      new THREE.Vector3(
        0.36 + end.x * 0.36,
        midY,
        end.z * 0.38
      ),
      end
    );

    if (dragging.current) {
      const dx = target.current.x - p.x;
      const dy = target.current.y - p.y;
      const dz = -p.z;

      body.applyImpulse(
        {
          x: THREE.MathUtils.clamp(dx * 0.11, -0.2, 0.2),
          y: THREE.MathUtils.clamp(dy * 0.11, -0.2, 0.2),
          z: THREE.MathUtils.clamp(dz * 0.07, -0.1, 0.1),
        },
        true
      );
    }
  });

  // Drag interaction
  function updatePointer(event) {
    const point = new THREE.Vector3();

    if (!event.ray.intersectPlane(plane, point)) {
      return;
    }

    target.current.set(
      THREE.MathUtils.clamp(point.x, -2.2, 2.2),
      THREE.MathUtils.clamp(point.y, -1.7, 1.85),
      0
    );
  }

  function startDrag(event) {
    event.stopPropagation();

    dragging.current = true;
    updatePointer(event);

    event.target.setPointerCapture(
      event.pointerId
    );

    document.body.style.cursor = "grabbing";
    badge.current?.wakeUp();
  }

  function stopDrag(event) {
    event?.stopPropagation();
    dragging.current = false;
    document.body.style.cursor = "";
  }

  return (
    <>
      <ambientLight intensity={1.55} />

      <directionalLight
        position={[3, 5, 7]}
        intensity={2.2}
      />

      <directionalLight
        position={[-4, 2, 4]}
        intensity={0.8}
      />

      <pointLight
        position={[1, 0, 5]}
        intensity={0.35}
        color="#f1e8f8"
      />

      {/* Invisible anchor */}
      <RigidBody
        ref={anchor}
        type="fixed"
        colliders={false}
        position={[0, DESIGN.anchorY, 0]}
      />

      {/* Woven straps */}
      <FabricRibbon
        ribbonRef={leftRibbon}
        shade="#dddddf"
      />
      <FabricRibbon
        ribbonRef={rightRibbon}
        shade="#ffffff"
      />

      {/* Draggable badge */}
      <RigidBody
        ref={badge}
        position={
          reducedMotion
            ? [0, -0.55, 0]
            : [-0.16, 1.08, 0]
        }
        colliders={false}
        linearDamping={DESIGN.linearDamping}
        angularDamping={DESIGN.angularDamping}
        canSleep={false}
        ccd
      >
        <CuboidCollider
          args={[
            DESIGN.width / 2,
            DESIGN.height / 2,
            0.07,
          ]}
        />

        <group
          onPointerOver={() => {
            if (!dragging.current) {
              document.body.style.cursor = "grab";
            }
          }}
          onPointerOut={() => {
            if (!dragging.current) {
              document.body.style.cursor = "";
            }
          }}
          onPointerDown={startDrag}
          onPointerMove={(event) => {
            if (dragging.current) updatePointer(event);
          }}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onLostPointerCapture={stopDrag}
        >
          {/* Metal ring */}
          <mesh position={[0, 1.47, 0.02]}>
            <torusGeometry
              args={[0.095, 0.022, 12, 36]}
            />
            <meshStandardMaterial
              color="#bfc3ca"
              metalness={0.9}
              roughness={0.24}
            />
          </mesh>

          {/* Metal swivel */}
          <RoundedBox
            args={[0.18, 0.25, 0.11]}
            radius={0.032}
            position={[0, 1.35, 0.03]}
          >
            <meshStandardMaterial
              color="#aeb3bc"
              metalness={0.88}
              roughness={0.27}
            />
          </RoundedBox>

          {/* Connector */}
          <RoundedBox
            args={[0.095, 0.13, 0.075]}
            radius={0.015}
            position={[0, 1.245, 0.07]}
          >
            <meshStandardMaterial
              color="#8e949e"
              metalness={0.82}
              roughness={0.31}
            />
          </RoundedBox>

          {/* Acrylic holder */}
          <RoundedBox
            args={[
              DESIGN.width + 0.045,
              DESIGN.height + 0.045,
              0.145,
            ]}
            radius={0.09}
            smoothness={6}
          >
            <meshPhysicalMaterial
              color="#e8e4eb"
              roughness={0.19}
              metalness={0.02}
              clearcoat={1}
              clearcoatRoughness={0.13}
            />
          </RoundedBox>

          {/* Frosted plastic */}
          <RoundedBox
            args={[
              DESIGN.width + 0.013,
              DESIGN.height + 0.013,
              0.112,
            ]}
            radius={0.078}
            smoothness={5}
            position={[0, 0, 0.012]}
          >
            <meshPhysicalMaterial
              color="#f6f3f8"
              roughness={0.33}
              transparent
              opacity={0.96}
              transmission={0.09}
              thickness={0.18}
              clearcoat={0.8}
            />
          </RoundedBox>

          {/* White card */}
          <RoundedBox
            args={[
              DESIGN.width,
              DESIGN.height,
              0.1,
            ]}
            radius={0.067}
            smoothness={5}
            position={[0, 0, 0.027]}
          >
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.42}
            />
          </RoundedBox>

          {/* Photo + name */}
          <mesh position={[0, 0, 0.084]}>
            <planeGeometry args={[2.0, 2.70]} />
            <meshBasicMaterial
              map={artwork.texture}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Card slot */}
          <RoundedBox
            args={[0.24, 0.032, 0.015]}
            radius={0.011}
            position={[0, 1.302, 0.096]}
          >
            <meshStandardMaterial
              color="#aaa5b0"
              metalness={0.23}
              roughness={0.45}
            />
          </RoundedBox>

          {/* Rear panel */}
          <mesh position={[0, 0, -0.076]}>
            <planeGeometry args={[1.99, 2.69]} />
            <meshStandardMaterial
              color="#ece7ef"
              roughness={0.6}
            />
          </mesh>
        </group>
      </RigidBody>
    </>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function PortfolioLanyard({ photoUrl }) {
  const selectedPhoto =
    photoUrl ||
    `${import.meta.env.BASE_URL}images/portrait.jpg`;

  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
  );

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setReducedMotion(query.matches);
    };

    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      className="hero-portrait portfolio-3d-lanyard"
      style={{
        position: "relative",
        width: "100%",
        minWidth: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(390px, 44vw, 520px)",
          overflow: "hidden",
          touchAction: "none",
          background: "transparent",
        }}
      >
        <Canvas
          orthographic
          camera={{
            position: [0, 0, 9],
            zoom: DESIGN.zoom,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
          }}
          style={{
            background: "transparent",
          }}
        >
          <Physics
            gravity={[0, DESIGN.gravity, 0]}
            timeStep={1 / 60}
          >
            <LanyardScene
              photoUrl={selectedPhoto}
              reducedMotion={reducedMotion}
            />
          </Physics>
        </Canvas>
      </div>
    </div>
  );
}
