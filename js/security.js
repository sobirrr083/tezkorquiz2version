(function () {

  function xavfsizlikXatosi(kod, xabar) {
    alert('⚠️ Tizim xavfsizligi [' + kod + ']: ' + xabar);
    location.replace('about:blank');
  }

  document.addEventListener('keydown', function (e) {
    const k = (e.key || '').toLowerCase();

    if (e.ctrlKey && e.shiftKey && k === 'i') {
      e.preventDefault();
      xavfsizlikXatosi('001', 'Ctrl+Shift+I bosildi — DevTools Inspector blok.');
    }

    if (e.ctrlKey && e.shiftKey && k === 'j') {
      e.preventDefault();
      xavfsizlikXatosi('002', 'Ctrl+Shift+J bosildi — DevTools Console blok.');
    }

    if (e.ctrlKey && e.shiftKey && k === 'c') {
      e.preventDefault();
      xavfsizlikXatosi('003', 'Ctrl+Shift+C bosildi — Element Inspect blok.');
    }

    if (e.ctrlKey && e.shiftKey && k === 'k') {
      e.preventDefault();
      xavfsizlikXatosi('004', 'Ctrl+Shift+K bosildi — Firefox Console blok.');
    }

    if (e.key === 'F12') {
      e.preventDefault();
      xavfsizlikXatosi('005', 'F12 bosildi — DevTools blok.');
    }

    if (e.ctrlKey && k === 'u') {
      e.preventDefault();
      xavfsizlikXatosi('006', 'Ctrl+U bosildi — Sahifa manbasini ko\'rish blok.');
    }
  });

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    xavfsizlikXatosi('007', 'O\'ng klik bosildi — Context menu blok.');
  });

  const _isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!_isMobile) {
    const LIMIT = 160;
    setInterval(function () {
      const dw = window.outerWidth - window.innerWidth;
      const dh = window.outerHeight - window.innerHeight;
      if (dw > LIMIT || dh > LIMIT) {
        xavfsizlikXatosi('008', 'DevTools oynasi aniqlandi — o\'lcham farqi ' + Math.max(dw, dh) + 'px.');
      }
    }, 700);
  }

})();
