import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { QUESTION_SOURCES } from '../public/question-catalog.js';
import { pathToFileURL } from 'node:url';
import { DOCUMENT_QUESTIONS } from '../public/question-bank.js';

export function auditQuestions(paths = QUESTION_SOURCES.map(s => new URL('../data/' + s.file, import.meta.url))) {
  const found = new Set(), selected = new Set();
  for (const path of paths) {
    const source = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
    const digital = /^## 1\. /m.test(source);
    const sections = source.split(digital ? /^## (?=\d+\. )/m : /^### Questão /m).slice(1);
    const filename = path instanceof URL ? basename(path.pathname) : basename(path); selected.add(filename);
    for (const section of sections) {
      const lines = section.split('\n');
      const [heading, level] = lines.shift().trim().split(' — ');
      const number = digital ? heading.slice(0, heading.indexOf('.')) : heading;
      const id = (digital ? 'digital-' : 'md-') + number.padStart(3, '0'), q = DOCUMENT_QUESTIONS.find(q => q.id === id);
      assert.ok(q, `Questão ${number} ausente do site`);
      assert.equal(q.source, filename, `${id}: arquivo de origem`);
      assert.equal(q.number, Number(number), `${id}: número original`);
      if (digital) { assert.equal(q.cat, 'digital'); assert.equal(q.title, heading.slice(heading.indexOf('.') + 2)); }
      assert.ok(!found.has(id), `Questão ${number} duplicada`); found.add(id);
      const optionStart = lines.findIndex(line => line.startsWith('- **A)**'));
      const options = 'ABCD'.split('').map(letter => lines.find(line => line.startsWith(`- **${letter})** `))?.slice(9));
      const answerLine = lines.find(line => line.startsWith('**Resposta correta: '));
      const label = digital ? '**Justificativa:** ' : '**Explicação:** ';
      const explanation = lines.findIndex(line => line.startsWith(label));
      const explanationLines = [lines[explanation].slice(label.length)];
      for (let i = explanation + 1; i < lines.length && !lines[i].startsWith('---') && !lines[i].startsWith('## '); i++) explanationLines.push(lines[i]);
      assert.equal(q.text, lines.slice(0, optionStart).join('\n').trim(), `${id}: enunciado`);
      assert.deepEqual(q.options, options, `${id}: alternativas`);
      assert.equal(q.ans, 'ABCD'.indexOf(answerLine.charAt('**Resposta correta: '.length)), `${id}: gabarito`);
      assert.equal(q.why, explanationLines.join('\n').trim(), `${id}: explicação`);
      assert.equal(q.d, level === 'Fácil' ? 0 : 1, `${id}: nível`);
    }
  }
  assert.equal(found.size, DOCUMENT_QUESTIONS.filter(q => selected.has(q.source)).length, 'Questões extras no site');
  return { checked: found.size, missingNumbers: Array.from({ length: 150 }, (_, i) => i + 1).filter(n => !found.has('md-' + String(n).padStart(3, '0'))) };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = auditQuestions(process.argv.length > 2 ? process.argv.slice(2) : undefined);
  console.log(`${result.checked} questões conferidas: enunciados, alternativas na ordem original, gabaritos, explicações e níveis idênticos aos documentos. Números ausentes nos dois primeiros arquivos: ${result.missingNumbers.join(', ')}.`);
}
