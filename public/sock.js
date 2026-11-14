/* Cliente mínimo de tempo real com fila de mensagens e reconexão automática.
   Usa WebSocket puro para funcionar diretamente no Cloudflare Workers. */
function io() {
  const H = {}, acks = {}, pending = [];
  let ws = null, code = null, n = 0, fails = 0, want = true, ping;
  const fire = (e, ...a) => (H[e] || []).forEach(f => f(...a));
  const transmit = o => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); };
  const raw = o => {
    if (ws && ws.readyState === 1) transmit(o);
    else if (want && code && pending.length < 100) pending.push(o);
  };
  function dial() {
    const w = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws?room=${code}`); ws = w;
    w.onopen = () => {
      fails = 0; clearInterval(ping); ping = setInterval(() => raw({ e: 'ping' }), 25000);
      fire('connect');
      // Primeiro autentica/reassocia a sessão; depois envia ações feitas durante a queda.
      const queued = pending.splice(0);
      queued.forEach(transmit);
    };
    w.onmessage = m => {
      let d; try { d = JSON.parse(m.data); } catch (e) { return; }
      if (d.r) { const f = acks[d.r]; delete acks[d.r]; if (f) f(d.d); }
      else fire(d.e, ...(d.a || []));
    };
    w.onclose = () => {
      if (w !== ws) return;
      clearInterval(ping); if (!want) return;
      fire('disconnect');
      fails++;
      if (fails === 4) fire('failed');
      const delay = Math.min(5000, 1200 * Math.pow(1.35, Math.min(fails - 1, 4)));
      setTimeout(() => { if (want && w === ws) dial(); }, delay);
    };
    w.onerror = () => { try { w.close(); } catch (e) { } };
  }
  const close = () => {
    want = false; clearInterval(ping); pending.length = 0;
    Object.keys(acks).forEach(k => delete acks[k]);
    if (ws) { const w = ws; ws = null; w.close(); }
  };
  return {
    on(e, f) { (H[e] = H[e] || []).push(f); },
    emit(e, ...a) {
      const cb = typeof a[a.length - 1] === 'function' ? a.pop() : null;
      const id = cb ? ++n : undefined; if (cb) acks[id] = cb;
      raw({ e, a, id });
    },
    open(c) { if (ws && code === c && ws.readyState < 2) return; close(); code = c; want = true; fails = 0; dial(); },
    close
  };
}
