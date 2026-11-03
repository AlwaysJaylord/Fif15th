'use client';
import { useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

function petalGeometry() {
 const geometry = new THREE.BufferGeometry(); const vertices: number[] = []; const indices: number[] = [];
 const rows = 10, cols = 10;
 for (let y=0;y<=rows;y++) for(let x=0;x<=cols;x++) {
   const t=y/rows, u=(x/cols-.5)*2; const width=Math.sin(t*Math.PI*.85)*.39+.025;
   vertices.push(u*width, t*.65 - .14*u*u*Math.pow(t,4), Math.pow(t,2)*.31 + u*u*.13*Math.sin(t*Math.PI));
 }
 for(let y=0;y<rows;y++) for(let x=0;x<cols;x++){const a=y*(cols+1)+x;indices.push(a,a+1,a+cols+1,a+1,a+cols+2,a+cols+1);}
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3)); geometry.setIndex(indices); geometry.computeVertexNormals(); return geometry;
}
function roseGeometry(petal: THREE.BufferGeometry) {
 const petals: THREE.BufferGeometry[] = [];
 for(let layer=0;layer<3;layer++) for(let i=0;i<(layer===0?5:8);i++) {
  const parent = new THREE.Object3D(); parent.rotation.y = i*Math.PI*2/(layer===0?5:8)+layer*.4;
  const child = new THREE.Object3D(); child.position.set(0,-.05+layer*.035,.06+layer*.085); child.rotation.x=.05+layer*.29; child.scale.set(.62+layer*.2,.72+layer*.1,.75+layer*.2); parent.add(child); parent.updateMatrixWorld(true);
  petals.push(petal.clone().applyMatrix4(child.matrixWorld));
 }
 const merged = mergeGeometries(petals); petals.forEach(p=>p.dispose()); return merged;
}
function Rose({ position, color, scale = 1, geometry }: { position: [number,number,number]; color: string; scale?: number; geometry: THREE.BufferGeometry }) {
 return <group position={position} scale={scale} rotation={[.8, position[0]*.25, -position[0]*.2]}>
  <mesh geometry={geometry}><meshStandardMaterial color={color} roughness={.73} side={THREE.DoubleSide}/></mesh>
  <mesh position={[0,.19,0]} scale={[.10,.20,.10]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color={color}/></mesh>
 </group>;
}
function Stem({ end }: { end: [number,number,number] }) {
 const start = new THREE.Vector3(0,-1.65,0); const target = new THREE.Vector3(...end); const direction = target.clone().sub(start);
 const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),direction.clone().normalize());
 return <mesh position={start.add(target).multiplyScalar(.5)} quaternion={quaternion}><cylinderGeometry args={[.023,.018,direction.length(),5]}/><meshStandardMaterial color="#687c58"/></mesh>;
}
export default function FlowerBouquet3D() {
 const geometry=useMemo(petalGeometry,[]);
 const blossom=useMemo(()=>roseGeometry(geometry),[geometry]);
 const flowers=useMemo(()=>Array.from({length:14},(_,i)=> { const angle=i*2.399; const radius=i===0?0:Math.sqrt(i/13)*1.03; return { position:[Math.cos(angle)*radius, .48+Math.sqrt(Math.max(0,1-radius*.72))*.55 + (i%3)*.07, Math.sin(angle)*radius*.66] as [number,number,number], color:['#9971bc','#bc8ec2','#d9a9cb','#835ca7'][i%4] }; }),[]);
 return <group position={[0,-.05,0]}>
  {flowers.map((flower,i)=><group key={i}><Stem end={flower.position}/><Rose {...flower} geometry={blossom} scale={1.08+(i%3)*.1}/></group>)}
  {Array.from({length:7},(_,i)=> {const a=i*2.4;const p:[number,number,number]=[Math.cos(a)*1.10,1.12+(i%3)*.16,Math.sin(a)*.67];return <group key={`t${i}`}><Stem end={p}/><group position={p} rotation={[.15, a, -.2*Math.cos(a)]}>{Array.from({length:5},(_,j)=><group key={j} rotation={[0,j*Math.PI*.4,0]}><mesh geometry={geometry} scale={[.55,.9,.55]} position={[0,0,.055]} rotation={[.06,0,0]}><meshStandardMaterial color={i%2?'#9576b8':'#c2a0d2'} side={THREE.DoubleSide} roughness={.65}/></mesh></group>)}</group></group>;})}
  {Array.from({length:16},(_,i)=>{const a=i*2.4;return <group key={`l${i}`} position={[Math.cos(a)*.78,.35+(i%4)*.24,Math.sin(a)*.54]} rotation={[.2,a,-Math.cos(a)*.65]}><mesh geometry={geometry} scale={[.65,1.1,.7]} rotation={[-.4,0,.3]}><meshStandardMaterial color={i%2?'#75866d':'#93a087'} roughness={.9} side={THREE.DoubleSide}/></mesh></group>;})}
  {Array.from({length:13},(_,i)=>{const a=i*2.399; const p:[number,number,number]=[Math.cos(a)*1.18, .85+(i%4)*.21,Math.sin(a)*.78];return <group key={`a${i}`}><Stem end={p}/><group position={p}>{Array.from({length:5},(_,j)=><mesh key={j} position={[Math.sin(j*5)*.095,(j%3)*.085,Math.cos(j*5)*.085]}><sphereGeometry args={[.047,6,5]}/><meshStandardMaterial color={i%3===0?'#b39bcd':'#fff7ec'}/></mesh>)}</group></group>;})}
  {/* Overlapping open paper cones give the wrapping actual volume. */}
  <group position={[0,-.55,0]} rotation={[0, .25, 0]}>
   <mesh><cylinderGeometry args={[1.05,.2,1.65,24,1,true]}/><meshStandardMaterial color="#c1a8cf" side={THREE.DoubleSide} roughness={.95}/></mesh>
   <mesh rotation={[0,0,.08]}><cylinderGeometry args={[1.12,.21,1.85,7,1,true,0,Math.PI*1.65]}/><meshStandardMaterial color="#e7d8e9" side={THREE.DoubleSide} roughness={.95}/></mesh>
   <mesh position={[0,-.04,.04]} rotation={[0,2.5,-.1]}><cylinderGeometry args={[1.03,.2,1.84,6,1,true,0,Math.PI*1.3]}/><meshStandardMaterial color="#c4afce" side={THREE.DoubleSide} roughness={.94}/></mesh>
   <mesh position={[0,-.15,.07]} rotation={[0,4.8,.07]}><cylinderGeometry args={[.94,.17,1.7,5,1,true,0,Math.PI*1.2]}/><meshStandardMaterial color="#f0e5ed" side={THREE.DoubleSide} roughness={.9}/></mesh>
  </group>
  <group position={[0,-1.35,.30]}>
   <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.30,.07,6,22]}/><meshStandardMaterial color="#a083bc" roughness={.5}/></mesh>
   {[-1,1].map(s=><group key={s}><mesh position={[s*.21,.01,.09]} rotation={[0,.2,s*.35]} scale={[1,.55,.45]}><torusGeometry args={[.20,.065,6,20]}/><meshStandardMaterial color="#b99dce" roughness={.5}/></mesh><mesh position={[s*.13,-.3,.07]} rotation={[0,0,s*-.24]}><boxGeometry args={[.12,.58,.025]}/><meshStandardMaterial color="#b99dce"/></mesh></group>)}
   <mesh position={[0,0,.15]}><sphereGeometry args={[.11,10,8]}/><meshStandardMaterial color="#b99dce"/></mesh>
  </group>
 </group>;
}
