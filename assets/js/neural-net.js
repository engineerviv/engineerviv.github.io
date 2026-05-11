(function () {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
  camera.position.z = 130;

  const N = 70, LINK_DIST = 30;

  // Store original positions for scroll dispersal
  const origPos = new Float32Array(N * 3);
  const curPos  = new Float32Array(N * 3);

  for (let i = 0; i < N; i++) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 140;
    const z = (Math.random() - 0.5) * 90;
    origPos[i*3] = curPos[i*3] = x;
    origPos[i*3+1] = curPos[i*3+1] = y;
    origPos[i*3+2] = curPos[i*3+2] = z;
  }

  // Cyan nodes (dynamic — updated on scroll)
  const ptGeo = new THREE.BufferGeometry();
  const posAttr = new THREE.Float32BufferAttribute(curPos.slice(), 3);
  posAttr.setUsage(THREE.DynamicDrawUsage);
  ptGeo.setAttribute('position', posAttr);
  const ptMat = new THREE.PointsMaterial({
    color: 0x00d9ff, size: 2.4, transparent: true, opacity: 0.85, sizeAttenuation: true
  });
  scene.add(new THREE.Points(ptGeo, ptMat));

  // Purple accent nodes (every 6th — static subset)
  const purpleArr = [];
  for (let i = 0; i < N; i += 6) purpleArr.push(origPos[i*3], origPos[i*3+1], origPos[i*3+2]);
  const purpleGeo = new THREE.BufferGeometry();
  purpleGeo.setAttribute('position', new THREE.Float32BufferAttribute(purpleArr, 3));
  scene.add(new THREE.Points(purpleGeo, new THREE.PointsMaterial({
    color: 0xa855f7, size: 4, transparent: true, opacity: 0.9, sizeAttenuation: true
  })));

  // Connections (static snapshot of original positions)
  const linkPts = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = origPos[i*3]-origPos[j*3], dy = origPos[i*3+1]-origPos[j*3+1], dz = origPos[i*3+2]-origPos[j*3+2];
      if (dx*dx + dy*dy + dz*dz < LINK_DIST*LINK_DIST) {
        linkPts.push(origPos[i*3], origPos[i*3+1], origPos[i*3+2], origPos[j*3], origPos[j*3+1], origPos[j*3+2]);
      }
    }
  }
  const linkGeo = new THREE.BufferGeometry();
  linkGeo.setAttribute('position', new THREE.Float32BufferAttribute(linkPts, 3));
  const linkMat = new THREE.LineBasicMaterial({ color: 0x5b1fa8, transparent: true, opacity: 0.22 });
  scene.add(new THREE.LineSegments(linkGeo, linkMat));

  // Resize
  function resize() {
    const p = canvas.parentElement;
    const w = p.clientWidth, h = p.clientHeight || window.innerHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Mouse parallax
  let mx = 0, my = 0, rotX = 0, rotY = 0;
  document.addEventListener('mousemove', function (e) {
    mx = (e.clientX / window.innerWidth  - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Scroll dispersal
  let scrollP = 0;
  window.addEventListener('scroll', function () {
    scrollP = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
  });

  let t = 0;
  (function tick() {
    requestAnimationFrame(tick);
    t += 0.004;

    // Smooth mouse parallax (lerp)
    rotX += (my * -0.1 - rotX) * 0.04;
    rotY += (mx *  0.14 - rotY) * 0.04;
    scene.rotation.x = rotX + Math.sin(t * 0.05) * 0.04;
    scene.rotation.y = rotY + t * 0.08;

    // Scroll-driven dispersal — particles explode outward
    if (scrollP > 0) {
      const scale = 1 + scrollP * 5;
      for (let i = 0; i < N; i++) {
        posAttr.array[i*3]   = origPos[i*3]   * scale;
        posAttr.array[i*3+1] = origPos[i*3+1] * scale;
        posAttr.array[i*3+2] = origPos[i*3+2] * scale;
      }
      posAttr.needsUpdate = true;
      ptMat.opacity  = 0.85 * (1 - scrollP * 0.9);
      linkMat.opacity = 0.22 * (1 - scrollP);
      camera.position.z = 130 + scrollP * 120;
    } else {
      ptMat.opacity   = 0.7 + Math.sin(t * 1.8) * 0.15;
      linkMat.opacity = 0.22;
      camera.position.z = 130;
    }

    renderer.render(scene, camera);
  })();
})();
