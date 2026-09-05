import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles/TechStack.css";

gsap.registerPlugin(ScrollTrigger);

const textureLoader = new THREE.TextureLoader();

/* Existing images from public/images */
const imageUrls = [
  "/images/python.png",
  "/images/mysql2.png",
  "/images/html.png",
  "/images/github.png",
  "/images/java.png",
  "/images/css.png",
  "/images/javascript2.png",
  "/images/react.webp",
];

const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(12)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;

    delta = Math.min(0.1, delta);

    if (!api.current) return;

    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />

      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />

      <mesh
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({
  vec = new THREE.Vector3(),
  isActive,
}: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;

    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );

    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  /* Your actual skills */
  const skills = [
    "Python",
    "MySQL",
    "Excel",
    "Power BI",
    "Tableau",
    "Data Cleaning",
    "Data Handling",
  ];

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (window.innerWidth <= 1024) return;

    /* Header animation */
    gsap.fromTo(
      section.querySelector(".tech-header"),
      {
        y: 80,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    /* Canvas animation */
    gsap.fromTo(
      section.querySelector(".tech-canvas-container"),
      {
        opacity: 0,
        scale: 0.9,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    /* Skills animation */
    gsap.fromTo(
      section.querySelector(".skills-list"),
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
      }
    );

    const techStackElement =
      document.querySelector(".tech-section");

    if (techStackElement) {
      observer.observe(techStackElement);
    }

    return () => {
      if (techStackElement) {
        observer.unobserve(techStackElement);
      }
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div
      className="tech-section"
      ref={sectionRef}
    >
      <div className="tech-bg-grid"></div>

      <div className="tech-glow"></div>

      <div className="tech-header">
        <h2>
          My <span>Techstack</span>
        </h2>

        <p className="tech-subtitle">
          I work with data analysis tools and techniques to
          clean, handle, analyze, and visualize data.
        </p>

        {/* YOUR SKILLS */}
        <div className="skills-list">
          {skills.map((skill) => (
            <span
              className="skill-tag"
              key={skill}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="tech-canvas-container">
        <Canvas
          gl={{
            alpha: true,
            stencil: false,
            depth: false,
            antialias: false,
            powerPreference: "high-performance",
          }}
          camera={{
            position: [0, 0, 20],
            fov: 32.5,
            near: 1,
            far: 100,
          }}
          onCreated={(state) =>
            (state.gl.toneMappingExposure = 1.5)
          }
          className="tech-canvas"
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1} />

          <spotLight
            position={[20, 20, 25]}
            penumbra={1}
            angle={0.2}
            color="white"
          />

          <directionalLight
            position={[0, 5, -4]}
            intensity={2}
          />

          <Physics gravity={[0, 0, 0]}>
            <Pointer isActive={isActive} />

            {spheres.map((props, i) => (
              <SphereGeo
                key={i}
                {...props}
                material={
                  materials[
                    Math.floor(
                      Math.random() * materials.length
                    )
                  ]
                }
                isActive={isActive}
              />
            ))}
          </Physics>

          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default TechStack;