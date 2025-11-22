# TODO: Replace Earth GLTF with Spherical Earth Structure in TechOrbit

## Tasks
- [ ] Edit src/components/TechOrbit.tsx to replace EarthGLTF component with a new Earth component using a rotating sphere
- [ ] Remove useGLTF import from @react-three/drei
- [ ] Update the Canvas to use the new Earth component
- [ ] Test the changes by running the development server and verifying the spherical earth renders correctly in the TechOrbit section

## Notes
- The new Earth component should have a blue material for an earth-like appearance
- Maintain the same rotation speed and scale as the original GLTF
- Ensure the sphere is positioned and animated similarly
