import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
const files = [];
function walk(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['node_modules','dist','coverage'].includes(entry.name)) continue;
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) walk(path); else files.push(path);
  }
}
walk(root);
let checked = 0;
for (const path of files.filter(p => ['.js','.mjs'].includes(extname(p)))) {
  const check = spawnSync(process.execPath, ['--check', path], { encoding:'utf8' });
  assert.equal(check.status, 0, check.stderr); checked++;
  for (const m of readFileSync(path,'utf8').matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g)) assert.ok(existsSync(resolve(dirname(path),m[1])), `Importação não encontrada: ${path} → ${m[1]}`);
}
for (const file of ['index.html','admin.html','teste.html']) {
  const html = readFileSync(resolve(root,'public',file),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`IDs duplicados: ${file}`);
  for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)) if(!/^(?:https?:|\/\/)/.test(m[1])) assert.ok(existsSync(resolve(root,'public', m[1].replace(/^\//,''))), `Recurso inexistente: ${file} → ${m[1]}`);
  const client = { 'index.html':'app.js', 'admin.html':'admin.js', 'teste.html':'teste.js' }[file];
  const script = readFileSync(resolve(root,'public',client),'utf8');
  const availableIds = new Set([...ids, ...[...script.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1])]);
  for(const m of script.matchAll(/\$\('#([\w-]+)'\)/g)) assert.ok(availableIds.has(m[1]), `Elemento inexistente: ${client} → #${m[1]}`);
}
console.log(`✅ Sintaxe de ${checked} módulos, importações, arquivos locais e elementos das três páginas verificados.`);
