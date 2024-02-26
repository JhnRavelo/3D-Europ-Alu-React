import { useRef } from 'react';
import { DirectionalLight, HemisphereLight, AmbientLight } from 'three';
import { useThree } from '@react-three/fiber';

function ToplLight() {
  const { scene } = useThree();
  const topLightRef = useRef();

  // Création de la lumière directionnelle
  topLightRef.current = new DirectionalLight(0xffffff, 2.2);
  topLightRef.current.position.set(100, 100, 100);
  // topLightRef.current.castShadow = true;
  topLightRef.current.color.setHSL(0.1, 1, 0.95);
  // topLightRef.current.shadow.mapSize.width = 3 * 1024;
  // topLightRef.current.shadow.mapSize.height = 3 * 1024;
  // topLightRef.current.shadow.bias = -0.0001;

  scene.add(topLightRef.current);
}

function HemiLight() {
  const { scene } = useThree();
  const hemiLightRef = useRef();

  hemiLightRef.current = new HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLightRef.current.color.setHSL(0.6, 0.75, 0.5);
  hemiLightRef.current.groundColor.setHSL(0.095, 0.5, 0.5);
  hemiLightRef.current.position.set(0, 500, 0);
  scene.add(hemiLightRef.current);
}

function AroundLight() {
  const { scene } = useThree();
  const ambientLightRef = useRef();

  ambientLightRef.current = new AmbientLight(0x333333, 0.8);
  scene.add(ambientLightRef.current);
}

export { ToplLight, HemiLight, AroundLight };
