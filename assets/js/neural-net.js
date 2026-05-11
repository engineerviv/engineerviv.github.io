(function () {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
  camera.position.z = 130;

  const N = 65, LINK_DIST = 30;
  const pos = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 200;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 140;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 90;
  }

  // Cyan nodes
  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(pos.slice(), 3));
  const ptMat = new THREE.PointsMaterial({
    color: 0x00d9ff, size: 2.4, transparent: true, opacity: 0.85, sizeAttenuation: true
  });
  scene.add(new THREE.Points(ptGeo, ptMat));

  // Purple accent nodes (every 6th)
  const purplePos = [];
  for (let i = 0; i < N; i += 6) {
    purplePos.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
  }
  const purpleGeo = new THREE.BufferGeometry();
  purpleGeo.setAttribute('position', new THREE.Float32BufferAttribute(purplePos, 3));
  scene.add(new THREE.Points(purpleGeo, new THREE.PointsMaterial({
    color: 0xa855f7, size: 3.8, transparent: true, opacity: 0.9, sizeAttenuation: true
  })));

  // Connections between nearby nodes
  const linkPts = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = pos[i*3]   - pos[j*3];
      const dy = pos[i*3+1] - pos[j*3+1];
      const dz = pos[i*3+2] - pos[j*3+2];
      if (dx*dx + dy*dy + dz*dz < LINK_DIST * LINK_DIST) {
        linkPts.push(
          pos[i*3], pos[i*3+1], pos[i*3+2],
          pos[j*3], pos[j*3+1], pos[j*3+2]
        );
      }
    }
  }
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.Float32BufferAttribute(linkPts, 3));
  scene.add(new THREE.LineSegments(linkGeo, new THREE.LineBasicMaterial({
    color: 0x5b1fa8, transparent: true, opacity: 0.22
  })));

  function resize() {
    const p = canvas.parentElement;
    const w = p.clientWidth;
    const h = p.clientHeight || window.innerHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  (function tick() {
    requestAnimationFrame(tick);
    t += 0.004;
    scene.rotation.y = t * 0.1;
    scene.rotation.x = Math.sin(t * 0.06) * 0.08;
    ptMat.opacity = 0.7 + Math.sin(t * 1.8) * 0.15;
    renderer.render(scene, camera);
  })();
})();
