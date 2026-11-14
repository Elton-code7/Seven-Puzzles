import { Room } from './room.js';
export { Room };

const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json' } });
const CH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const genCode = () => [...crypto.getRandomValues(new Uint8Array(5))].map(x => CH[x % CH.length]).join('');
const validCode = c => /^[A-HJ-NP-Z2-9]{5}$/.test(c);

export default {
  async fetch(req, env) {
    const url = new URL(req.url), room = id => env.ROOMS.get(env.ROOMS.idFromName(id));
    const code = String(url.searchParams.get('code') || url.searchParams.get('room') || '').trim().toUpperCase();

    // Admin cria a sala (exige ADMIN_USERNAME e ADMIN_PASSWORD configurados no servidor)
    if (url.pathname === '/api/create' && req.method === 'POST') {
      if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) return json({ ok: false, error: 'O servidor ainda não tem ADMIN_USERNAME e ADMIN_PASSWORD configurados.' }, 500);
      const body = await req.json().catch(() => null);
      if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ ok: false, error: 'Dados de acesso inválidos.' }, 400);
      const { username, password } = body;
      if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) return json({ ok: false, error: 'Usuário ou senha incorretos.' }, 401);
      for (let i = 0; i < 6; i++) {
        const c = genCode();
        if ((await room(c).fetch(`https://room/init?code=${c}`)).status === 200) return json({ ok: true, code: c });
      }
      return json({ ok: false, error: 'Não foi possível criar a sala. Tente de novo.' }, 500);
    }
    if (url.pathname === '/api/check') {
      if (!validCode(code)) return json({ ok: false, error: 'Código inválido. Ele tem 5 caracteres.' });
      return room(code).fetch(`https://room/check?code=${code}`);
    }
    if (url.pathname === '/ws') {
      if (req.headers.get('Upgrade') !== 'websocket') return new Response('Esperava uma conexão WebSocket', { status: 426 });
      if (!validCode(code)) return new Response('Código inválido', { status: 404 });
      return room(code).fetch(req);
    }
    return new Response('Não encontrado', { status: 404 });
  }
};
