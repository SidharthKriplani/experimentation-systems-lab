// validate-data.js — PAL data file health checker (no external deps)
// Checks every src/data/*.js file for:
//   1. Template literals (backtick characters) — break Vite/Rolldown builds
//   2. Unescaped apostrophes in single-quoted strings (contraction heuristic)
//   3. Missing required fields: at least one `id:` and one `title:` per non-empty file
// Exits with code 1 if any violations found, code 0 if all clean.

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');

// ── Check 1: Template literals ─────────────────────────────────────────────
// Any backtick in a data file is a Vite/Rolldown parse error at build time.
function checkTemplateLiterals(src) {
  var violations = [];
  var lines = src.split('\n');
  lines.forEach(function(line, i) {
    if (line.indexOf('`') !== -1) {
      violations.push('  Line ' + (i + 1) + ': template literal (backtick) — ' + line.trim().slice(0, 80));
    }
  });
  return violations;
}

// ── Check 2: Unescaped apostrophes ─────────────────────────────────────────
// Heuristic: scan each line looking for single-quoted string tokens, then
// check whether the content between the single quotes contains an unescaped
// apostrophe (letter'letter pattern, not preceded by backslash).
//
// Algorithm per line:
//   - Walk through the line character by character.
//   - Skip over double-quoted segments entirely (they can safely contain ' chars).
//   - For each single-quoted segment found, check its interior for bare
//     letter'letter sequences (contractions / possessives).
//   - Properly escaped apostrophes (\') are not flagged.
function checkUnescapedApostrophes(src) {
  var violations = [];
  var lines = src.split('\n');

  lines.forEach(function(line, lineIdx) {
    // Extract the interior text of each single-quoted string on the line,
    // while skipping over double-quoted strings.
    var inDouble = false;
    var inSingle = false;
    var singleStart = -1;
    var i = 0;

    while (i < line.length) {
      var ch = line[i];

      // Handle escape sequences inside any string
      if ((inDouble || inSingle) && ch === '\\') {
        i += 2; // skip next char
        continue;
      }

      if (inDouble) {
        if (ch === '"') inDouble = false;
        i++;
        continue;
      }

      if (inSingle) {
        if (ch === "'") {
          // Closing quote — extract and inspect the interior
          var interior = line.slice(singleStart + 1, i);
          // Look for bare letter'letter inside the interior
          var re = /(?<!\\)([a-zA-Z])'([a-zA-Z])/g;
          var m;
          while ((m = re.exec(interior)) !== null) {
            violations.push(
              '  Line ' + (lineIdx + 1) + ': possible unescaped apostrophe (' +
              m[1] + '\'' + m[2] + ') — ' + line.trim().slice(0, 80)
            );
          }
          inSingle = false;
          singleStart = -1;
        }
        i++;
        continue;
      }

      // Not inside any string
      if (ch === '"') { inDouble = true; i++; continue; }
      if (ch === "'") { inSingle = true; singleStart = i; i++; continue; }
      // Skip line comments
      if (ch === '/' && line[i + 1] === '/') break;
      i++;
    }
  });

  return violations;
}

// ── Check 3: Required fields ────────────────────────────────────────────────
// Best-effort: confirm the raw text contains at least one `id:` and one `title:`.
// Files under 50 chars are treated as empty stubs and skipped.
function checkRequiredFields(src) {
  var violations = [];
  if (src.trim().length < 50) return violations;

  if (!/\bid\s*:/.test(src))    violations.push('  Missing required field: id');
  if (!/\btitle\s*:/.test(src)) violations.push('  Missing required field: title');

  return violations;
}

// ── Main ────────────────────────────────────────────────────────────────────
var files;
try {
  files = fs.readdirSync(DATA_DIR).filter(function(f) { return f.endsWith('.js'); });
} catch (err) {
  console.error('ERROR: Could not read data directory: ' + DATA_DIR);
  console.error(err.message);
  process.exit(1);
}

if (files.length === 0) {
  console.log('No .js files found in ' + DATA_DIR);
  process.exit(0);
}

var totalViolations = 0;
var failCount = 0;

console.log('\nPAL data file validator — ' + files.length + ' files checked\n');
console.log('────────────────────────────────────────────────────────────');

files.forEach(function(filename) {
  var filepath = path.join(DATA_DIR, filename);
  var src;
  try {
    src = fs.readFileSync(filepath, 'utf8');
  } catch (err) {
    console.log('ERROR  ' + filename + ' — could not read: ' + err.message);
    return;
  }

  var violations = [];
  violations = violations.concat(checkTemplateLiterals(src));
  violations = violations.concat(checkUnescapedApostrophes(src));
  violations = violations.concat(checkRequiredFields(src));

  if (violations.length === 0) {
    console.log('PASS   ' + filename);
  } else {
    console.log('FAIL   ' + filename + ' (' + violations.length + ' violation' + (violations.length === 1 ? '' : 's') + ')');
    violations.forEach(function(v) { console.log(v); });
    totalViolations += violations.length;
    failCount++;
  }
});

console.log('────────────────────────────────────────────────────────────');

if (totalViolations === 0) {
  console.log('\nAll files PASS. No violations found.\n');
  process.exit(0);
} else {
  console.log(
    '\n' + totalViolations + ' violation' + (totalViolations === 1 ? '' : 's') +
    ' found across ' + failCount + ' file(s).\n'
  );
  process.exit(1);
}
