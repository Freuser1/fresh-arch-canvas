// Canvas 2D interactive "nyrenässans" facade (no external libs)
(function(){
  const canvas = document.getElementById("facade");
  const tooltip = document.getElementById("tooltip");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 1200, H = 600;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = Math.max(600, rect.width);
    H = Math.max(360, rect.height);
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.setTransform(DPR,0,0,DPR,0,0);
    draw();
  }

  const ctx = canvas.getContext("2d");

  // Scene params
  let yaw = 0.3;         // rotation around Y
  let zoom = 1.0;        // scale factor
  const focal = 520;     // focal length for perspective
  const baseZ = 10;      // push scene away from camera

  // Facade params (world units)
  const bayCount = 6;
  const spacing = 2.2;
  const colW = 0.6;
  const colH = 3.6;
  const archRise = 0.9;
  const wallH = colH + 1.2;

  const center = () => ({ x: W/2, y: H*0.68 });

  // Helper: rotate Y and project
  function project(x,y,z){
    // rotate around Y
    const cos = Math.cos(yaw), sin = Math.sin(yaw);
    const xr = x*cos - z*sin;
    const zr = x*sin + z*cos + baseZ/zoom;
    const scale = (focal * zoom) / (zr);
    return { x: center().x + xr*scale, y: center().y - y*scale, z: zr, s: scale };
  }

  // Build shape registry for hit-testing
  let shapes = []; // { path: Path2D, label: string, zAvg: number }

  function drawWall(){
    // Wall quad
    shapes.push(); // placeholder not interactive
    const left = -((bayCount-1)*spacing)/2 - 1.2;
    const right = ((bayCount-1)*spacing)/2 + 1.2;
    const z = -0.6;
    const p1 = project(left, 0, z);
    const p2 = project(right, 0, z);
    const p3 = project(right, wallH, z);
    const p4 = project(left, wallH, z);

    const grad = ctx.createLinearGradient(p1.x, p4.y, p2.x, p3.y);
    grad.addColorStop(0, "#1a2024");
    grad.addColorStop(1, "#121517");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    ctx.fill();
  }

  function drawCornice(){
    const left = -((bayCount-1)*spacing)/2 - 1.3;
    const right = ((bayCount-1)*spacing)/2 + 1.3;
    const z = -0.2;
    const h = 0.28;
    const y0 = wallH + 0.25;
    const a = project(left, y0, z);
    const b = project(right, y0, z);
    const c = project(right, y0+h, z);
    const d = project(left, y0+h, z);

    const path = new Path2D();
    path.moveTo(a.x,a.y);
    path.lineTo(b.x,b.y);
    path.lineTo(c.x,c.y);
    path.lineTo(d.x,d.y);
    path.closePath();

    ctx.fillStyle = "#6c7b6d";
    ctx.strokeStyle = "#2b3236";
    ctx.lineWidth = 1;
    ctx.fill(path);
    ctx.stroke(path);

    shapes.push({ path, label: "Gesims: avslutar fasaden och skyddar mot regn.", zAvg: (a.z+b.z+c.z+d.z)/4 });
  }

  function drawColumn(x){
    const z = 0;
    const y0 = 0, y1 = colH;
    const half = colW/2;

    // front rectangle
    const p1 = project(x-half, y0, z);
    const p2 = project(x+half, y0, z);
    const p3 = project(x+half, y1, z);
    const p4 = project(x-half, y1, z);

    const path = new Path2D();
    path.moveTo(p1.x,p1.y);
    path.lineTo(p2.x,p2.y);
    path.lineTo(p3.x,p3.y);
    path.lineTo(p4.x,p4.y);
    path.closePath();

    // shading
    ctx.fillStyle = "#b7a07a";
    ctx.strokeStyle = "#403a32";
    ctx.lineWidth = 1;
    ctx.fill(path);
    ctx.stroke(path);

    // capital
    const capH = 0.28, capW = colW*1.3;
    const c1 = project(x-capW/2, y1, z);
    const c2 = project(x+capW/2, y1, z);
    const c3 = project(x+capW/2, y1+capH, z);
    const c4 = project(x-capW/2, y1+capH, z);

    const cap = new Path2D();
    cap.moveTo(c1.x,c1.y); cap.lineTo(c2.x,c2.y); cap.lineTo(c3.x,c3.y); cap.lineTo(c4.x,c4.y); cap.closePath();
    ctx.fillStyle = "#c8b89b";
    ctx.strokeStyle = "#463f33";
    ctx.fill(cap); ctx.stroke(cap);

    shapes.push({ path, label: "Kolonn: bärande element", zAvg: (p1.z+p2.z+p3.z+p4.z)/4 });
    shapes.push({ path: cap, label: "Kapitäl", zAvg: (c1.z+c2.z+c3.z+c4.z)/4 });
  }

  function drawArch(xL, xR){
    // Semicircular arch between two columns
    const span = xR - xL;
    const r = span/2;
    const cx = (xL + xR)/2;
    const baseY = colH - 0.25;
    const z = 0.02;

    const steps = 48;
    const path = new Path2D();
    let first = true;
    for (let i=0;i<=steps;i++){
      const t = i/steps * Math.PI;
      const x = cx + Math.cos(t)*r;
      const y = baseY + Math.sin(t)*archRise + 0.05;
      const p = project(x,y,z);
      if (first){ path.moveTo(p.x,p.y); first=false; }
      else path.lineTo(p.x,p.y);
    }
    // close down to imposts
    const pL = project(xL, baseY, z);
    const pR = project(xR, baseY, z);
    path.lineTo(pR.x, pR.y);
    path.lineTo(pL.x, pL.y);
    path.closePath();

    ctx.fillStyle = "#8aa1b1";
    ctx.strokeStyle = "#2b3236";
    ctx.lineWidth = 1;
    ctx.fill(path);
    ctx.stroke(path);

    // label area slightly inset
    shapes.push({ path, label: "Rundbåge: fördelar last till kolonnerna.", zAvg: baseZ });
  }

  function drawBase(){
    const left = -((bayCount-1)*spacing)/2 - 1.6;
    const right = ((bayCount-1)*spacing)/2 + 1.6;
    const z = 0.15;
    const h = 0.5;
    const y0 = -0.1;
    const a = project(left, y0, z);
    const b = project(right, y0, z);
    const c = project(right, y0+h, z);
    const d = project(left, y0+h, z);

    const path = new Path2D();
    path.moveTo(a.x,a.y); path.lineTo(b.x,b.y); path.lineTo(c.x,c.y); path.lineTo(d.x,d.y); path.closePath();
    ctx.fillStyle = "#2a2f32"; ctx.strokeStyle = "#111416"; ctx.fill(path); ctx.stroke(path);
  }

  function drawGrid(){
    const cx = center().x, cy = center().y;
    ctx.strokeStyle = "#151a1d";
    ctx.lineWidth = 1;
    for (let i=0;i<24;i++){
      const z = i*1.2;
      const p1 = project(-40, 0, z);
      const p2 = project(40, 0, z);
      ctx.beginPath(); ctx.moveTo(p1.x, cy); ctx.lineTo(p2.x, cy); ctx.stroke();
    }
  }

  function draw(){
    shapes = [];
    ctx.clearRect(0,0,W,H);

    // background
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0, "#0f1417");
    grad.addColorStop(1, "#0b0e10");
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,W,H);

    drawGrid();
    drawBase();
    drawWall();

    const x0 = -((bayCount-1)*spacing)/2;
    // columns
    for (let i=0;i<bayCount;i++){
      drawColumn(x0 + i*spacing);
    }
    // arches between columns
    for (let i=0;i<bayCount-1;i++){
      const a = x0 + i*spacing + colW/2 + 0.15;
      const b = x0 + (i+1)*spacing - colW/2 - 0.15;
      drawArch(a, b);
    }
    drawCornice();
  }

  // Interaction
  let dragging = false, lastX = 0;
  canvas.addEventListener("mousedown", (e)=>{ dragging = true; lastX = e.clientX; });
  window.addEventListener("mouseup", ()=> dragging=false);
  window.addEventListener("mousemove", (e)=>{
    if (dragging){
      const dx = e.clientX - lastX; lastX = e.clientX;
      yaw += dx * 0.005;
      draw();
    }
    // hover tooltips
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * DPR;
    const y = (e.clientY - rect.top) * DPR;
    // Check shapes in z-order (front-most last) -> iterate reverse
    let hit = null;
    for (let i=shapes.length-1; i>=0; i--){
      const s = shapes[i];
      if (!s || !s.path) continue;
      if (ctx.isPointInPath(s.path, (e.clientX - rect.left), (e.clientY - rect.top))){
        hit = s; break;
      }
    }
    if (hit){
      tooltip.textContent = hit.label;
      tooltip.style.left = e.clientX + "px";
      tooltip.style.top = e.clientY + "px";
      tooltip.style.opacity = 1;
      canvas.style.cursor = "help";
    } else {
      tooltip.style.opacity = 0;
      canvas.style.cursor = "grab";
    }
  });
  canvas.addEventListener("wheel", (e)=>{
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    zoom *= (delta>0 ? 0.92 : 1.08);
    zoom = Math.max(0.6, Math.min(2.2, zoom));
    draw();
  }, { passive:false });

  // Fake submit for contact
  const btn = document.getElementById("fakeSubmit");
  const status = document.getElementById("formStatus");
  if (btn) btn.addEventListener("click", ()=>{
    status.textContent = "Tack! Ditt meddelande har registrerats (demoläge).";
    setTimeout(()=>status.textContent="", 4000);
  });

  window.addEventListener("resize", resize);
  resize();
  draw();
})();