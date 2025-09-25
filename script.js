(function(){
  const PRODUCTS = {
    1:{name:"Classical Venus",price:"$2,450",material:"Marble",desc:"Reproduction of Venus de Milo in Carrara marble.",dims:"H 24\" × W 12\" × D 8\"",weight:"45 lbs",seller:"Renaissance Reproductions",emoji:"🗿",grad:"from-amber-100 to-amber-200"},
    2:{name:"Majestic Eagle",price:"$1,850",material:"Bronze",desc:"Bronze eagle in full flight.",dims:"H 18\" × W 22\" × D 10\"",weight:"28 lbs",seller:"Wildlife Bronze Studio",emoji:"🦅",grad:"from-gray-100 to-gray-200"},
    3:{name:"Garden Nymph",price:"$890",material:"Stone",desc:"Elegant limestone figure for gardens.",dims:"H 36\" × W 14\" × D 12\"",weight:"85 lbs",seller:"Garden Art Collective",emoji:"🌿",grad:"from-green-100 to-green-200"},
    4:{name:"Royal Lion",price:"$3,200",material:"Marble",desc:"Majestic marble lion.",dims:"H 20\" × L 28\" × W 16\"",weight:"65 lbs",seller:"Majestic Sculptures",emoji:"👑",grad:"from-purple-100 to-purple-200"},
    5:{name:"Racing Horse",price:"$2,750",material:"Bronze",desc:"Dynamic bronze gallop pose.",dims:"H 22\" × L 26\" × W 8\"",weight:"42 lbs",seller:"Equestrian Arts",emoji:"🐎",grad:"from-blue-100 to-blue-200"},
    6:{name:"Ancient Vase",price:"$650",material:"Ceramic",desc:"Hand-painted replica pottery.",dims:"H 16\" × Ø 10\"",weight:"8 lbs",seller:"Classical Ceramics",emoji:"🏺",grad:"from-red-100 to-red-200"}
  };

  const PAGES = {
    home: document.getElementById('page-home'),
    browse: document.getElementById('page-browse'),
    product: document.getElementById('page-product'),
    sell: document.getElementById('page-sell'),
    about: document.getElementById('page-about')
  };

  function showPage(name){
    Object.values(PAGES).forEach(el => el.classList.add('hidden'));
    const el = PAGES[name];
    if (el) { el.classList.remove('hidden'); el.classList.add('fade-in'); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  window.showPage = showPage; // expose globally

  function renderBrowse(){
    const grid = document.getElementById('browseGrid');
    grid.innerHTML = '';
    Object.entries(PRODUCTS).forEach(([id, p]) => {
      const card = document.createElement('div');
      card.className = 'card hover-scale cursor-pointer';
      card.setAttribute('data-product', id);
      card.innerHTML = `
        <div class="h-48 bg-gradient-to-br ${p.grad} flex items-center justify-center"><div class="text-5xl">${p.emoji}</div></div>
        <div class="p-4"><h3 class="font-semibold mb-1">${p.name}</h3><p class="text-gray-600 text-sm mb-2">${p.material}</p><span class="text-lg font-bold text-blue-600">${p.price}</span></div>`;
      card.addEventListener('click', () => showProduct(+id));
      grid.appendChild(card);
    });
  }

  function showProduct(id){
    const p = PRODUCTS[id]; if (!p) return;
    const left = (id === 4)
      ? `<div class="rounded-xl overflow-hidden shadow mb-6">
           <iframe src="https://poly.cam/capture/E3F7D015-70D7-4AE0-83CA-18DDAE402668/embed" title="Polycam capture viewer"
            style="height:100%;width:100%;max-height:720px;max-width:1280px;min-height:280px;min-width:280px" frameborder="0"></iframe>
         </div>`
      : `<div>
           <div class="h-96 bg-gradient-to-br ${p.grad} rounded-xl flex items-center justify-center mb-6"><div class="text-8xl">${p.emoji}</div></div>
           <div class="grid grid-cols-3 gap-4">
             <div class="h-24 bg-gradient-to-br ${p.grad} rounded-lg flex items-center justify-center"><div class="text-2xl">${p.emoji}</div></div>
             <div class="h-24 bg-gradient-to-br ${p.grad} rounded-lg flex items-center justify-center"><div class="text-2xl">${p.emoji}</div></div>
             <div class="h-24 bg-gradient-to-br ${p.grad} rounded-lg flex items-center justify-center"><div class="text-2xl">${p.emoji}</div></div>
           </div>
         </div>`;

    const html = `${left}
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">${p.name}</h1>
        <div class="text-3xl font-bold text-blue-600 mb-6">${p.price}</div>
        <div class="space-y-4 mb-8">
          <div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium">Material:</span><span>${p.material}</span></div>
          <div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium">Dimensions:</span><span>${p.dims}</span></div>
          <div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium">Weight:</span><span>${p.weight}</span></div>
          <div class="flex justify-between py-2 border-b border-gray-200"><span class="font-medium">Seller:</span><span>${p.seller}</span></div>
        </div>
        <div class="mb-8"><h3 class="text-lg font-semibold mb-3">Description</h3><p class="text-gray-700 leading-relaxed">${p.desc}</p></div>
        <div class="space-y-4">
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Add to Cart</button>
          <button class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 rounded-lg font-semibold">Contact Seller</button>
        </div>
      </div>`;

    document.getElementById('product-content').innerHTML = html;
    showPage('product');
    bindARUpload();
  }
  window.showProduct = showProduct;

  function bindARUpload(){
    const file = document.getElementById('arFile');
    const preview = document.getElementById('arPreview');
    if (!file || !preview) return;
    if (file.__wired) return;
    file.__wired = true;

    file.addEventListener('change', () => {
      const f = file.files && file.files[0];
      if (!f) return;
      const url = URL.createObjectURL(f);
      preview.innerHTML = '<div class="p-6 text-center text-gray-500 animate-pulse">Loading model…</div>';
      const mv = document.createElement('model-viewer');
      mv.setAttribute('src', url);
      mv.setAttribute('camera-controls','');
      mv.setAttribute('ar','');
      mv.setAttribute('ar-modes','webxr scene-viewer quick-look');
      mv.setAttribute('shadow-intensity','0.9');
      mv.setAttribute('exposure','1.0');
      mv.addEventListener('load', () => {
        preview.innerHTML = '';
        preview.appendChild(mv);
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      });
      mv.addEventListener('error', () => {
        preview.innerHTML = '<div class="p-6 text-center text-red-600">Could not load this model. Try a smaller GLB/USDZ or ensure GLTF is packaged as GLB.</div>';
      });
    });
  }

  function wireNav(){
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => showPage(btn.dataset.target));
    });
    document.getElementById('brandBtn').addEventListener('click', () => showPage('home'));
    document.getElementById('btnStartBrowsing').addEventListener('click', () => showPage('browse'));
    document.getElementById('backToBrowse').addEventListener('click', () => showPage('browse'));

    // Featured clicks
    document.querySelectorAll('[data-product]').forEach(el => {
      el.addEventListener('click', () => showProduct(+el.getAttribute('data-product')));
    });
  }

  function init(){
    wireNav();
    renderBrowse();
    showPage('home');
  }
  document.addEventListener('DOMContentLoaded', init);
})();