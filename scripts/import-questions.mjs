import { readFileSync, writeFileSync } from 'node:fs';
import { QUESTION_SOURCES } from '../public/question-catalog.js';
const categories = ['gates', 'derived', 'truth', 'algebra', 'circuits'];
const questions = [];
for (const { file, prefix, expected } of QUESTION_SOURCES) {
  const source = readFileSync(new URL('../data/' + file, import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const digital = prefix === 'digital-';
  const pattern = digital ? /^## (\d+)\. (.+) — (Fácil|Médio)\s+([\s\S]*?)(?=^## \d+\.|$(?![\s\S]))/gm : /^### Questão (\d+) — (Fácil|Médio)\s+([\s\S]*?)(?=^### Questão|$(?![\s\S]))/gm;
  const count = questions.length;
  for (const match of source.matchAll(pattern)) {
    const [number, title, level, body] = digital ? match.slice(1) : [match[1], null, match[2], match[3]];
    const options = [...body.matchAll(/^- \*\*([A-D])\)\*\* (.+)$/gm)].map(m => m[2]);
    const answer = body.match(/\*\*Resposta correta: ([A-D])[).]/);
    const why = body.match(/\*\*(?:Explicação|Justificativa):\*\* ([\s\S]*?)(?=\n\n---|\n\n## |$(?![\s\S]))/)?.[1].trim();
    if (options.length !== 4 || !answer || !why || new Set(options).size !== 4) throw new Error(`Questão inválida: ${file} / ${number}`);
    const n = Number(number);
    questions.push({ id: prefix + number.padStart(3, '0'), source: file, number: n, ...(title ? { title } : {}), cat: digital ? 'digital' : categories[n <= 100 ? Math.floor((n - 1) / 20) : Math.floor((n - 101) / 10)], d: level === 'Fácil' ? 0 : 1,
      text: body.slice(0, body.indexOf('- **A)**')).trim(), options, ans: 'ABCD'.indexOf(answer[1]), why, time: 90 });
  }
  if (questions.length - count !== expected) throw new Error(`Contagem inesperada em ${file}: revise o documento antes de importar.`);
}
if (new Set(questions.map(q => q.id)).size !== questions.length) throw new Error('IDs duplicados.');
writeFileSync(new URL('../public/question-bank.js', import.meta.url), '// Gerado por scripts/import-questions.mjs a partir dos documentos em data/.\nexport const DOCUMENT_QUESTIONS = ' + JSON.stringify(questions, null, 2) + ';\n');
console.log(`Importadas ${questions.length} questões, preservando enunciados, alternativas, gabaritos e formatação.`);
