import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import radian from './radian';

type loaderType = 'GLTF' | 'TEXTURE' | 'PLY';

export default (type: loaderType, path: string) =>
  new Promise((resolve, reject) => {
    let mixer;
    const gltfComplete = (gltf) => {
      const mesh = gltf.scene.children[0];
      const { scene, animations } = gltf;
      if (animations && animations.length) {
        mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction(animations[0]).play();
      }

      // if(material){
      //   applyMaterial(mesh, material)
      // }

      return resolve(scene);
    };

    const progress = (e: ProgressEvent) => {};

    const error = (e: ErrorEvent) => reject(e);

    switch (type) {
      case 'GLTF':
        new GLTFLoader().load(path, gltfComplete, progress, error);
        break;
      case 'TEXTURE':
        new THREE.TextureLoader().load(path, (texture) => resolve(texture), progress, error);
        break;
      case 'PLY':
        const material = new THREE.PointsMaterial({
          vertexColors: true, //頂点の色付けを有効にす
          // color: 0xff0000,
          size: 0.03,
        });

        new PLYLoader().load(
          path,
          (geometry) => {
            //引数にはpositionとcolorを持つBufferGeometryが入ってる

            //原宿の点群データ補正用
            //本来ならデータ側で対応したい
            geometry.rotateX(radian(-90));
            geometry.translate(-5, 0, 0);

            // const particles = new THREE.Points(geometry, material);
            // return resolve(particles);
            // const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
            return resolve(geometry);
          },
          progress,
          error
        );
        break;
      default:
        return resolve(undefined);
        break;
    }
  });
