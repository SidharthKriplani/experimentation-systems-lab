import { useState, useEffect, useRef } from 'react';
import { sqlLabProblems } from '../data/sqlLabProblems.js';
import { datamarts } from '../data/sqlLabDatamarts.js';

const DIFF_COLOR = {
  Easy:   { bg: 'var(--green-bg,  rgba(16,185,129,0.08))',  text: 'var(--green)',  border: 'var(--green-border,  rgba(16,185,129,0.25))' },
  Medium: { bg: 'var(--yellow-bg, rgba(245,158,11,0.08))',  text: 'var(--yellow)', border: 'var(--yellow-border, rgba(245,158,11,0.25))' },
  Hard:   { bg: 'var(--red-bg,    rgba(239,68,68,0.08))',   text: 'var(--red)',    border: 'var(--red-border,    rgba(239,68,68,0.25))' },
  Master: { bg: 'var(--purple-bg, rgba(139,92,246,0.08))',  text: 'var(--purple)', border: 'var(--purple-border, rgba(139,92,246,0.25))' },
};

function Badge({ label, style }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: '0.7rem', fontWeight: 600,
      padding: '2px 8px', borderRadius: '99px',
      border: '1px solid', letterSpacing: '0.02em',
      ...style,
    }}>{label}</span>
  );
}

function SchemaAccordion({ dm, open, onToggle }) {
  if (!dm) return null;
  const tableNames = Object.keys(dm.tables);
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginTop: '0.75rem' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.5rem 0.75rem', background: 'var(--surface-2)', border: 'none',
          cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500,
        }}
      >
        <span>Schema — {dm.name} ({tableNames.length} tables)</span>
        <span style={{ fontSize: '0.65rem', transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: '0.6rem 0.75rem', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '45vh', overflowY: 'auto' }}>
          {Object.entries(dm.tables).map(([tableName, table]) => (
            <div key={tableName}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal)', marginBottom: '4px' }}>
                {tableName}
              </div>
              {table.columns.map(col => (
                <div key={col.name} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', padding: '1px 0', fontSize: '0.72rem' }}>
                  <span style={{ color: 'var(--text)', fontFamily: 'monospace', minWidth: 140 }}>{col.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.67rem' }}>{col.type}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultsTable({ results }) {
  if (!results || results.columns.length === 0) {
    return <div style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Query returned no rows.</div>;
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: 'monospace' }}>
        <thead>
          <tr style={{ background: 'var(--surface-2)' }}>
            {results.columns.map(col => (
              <th key={col} style={{ padding: '6px 10px', textAlign: 'left', fontWeight: 600, fontSize: '0.7rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: '1px solid var(--border)' }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '5px 10px', color: 'var(--text)', whiteSpace: 'nowrap' }}>
                  {cell === null ? <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>NULL</span> : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SidebarProblemBtn({ p, globalIdx, isCurrent, isSolved, onSelect }) {
  const ds = DIFF_COLOR[p.difficulty] || DIFF_COLOR.Easy;
  return (
    <button
      onClick={() => onSelect(globalIdx)}
      style={{
        width: '100%', display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
        padding: '0.6rem 0.875rem', border: 'none', borderBottom: '1px solid var(--border)',
        background: isCurrent ? 'var(--surface-2)' : 'transparent',
        cursor: 'pointer', textAlign: 'left',
        borderLeft: isCurrent ? '3px solid var(--teal)' : '3px solid transparent',
        transition: 'background 0.15s',
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 2,
        background: isSolved ? 'var(--green)' : 'transparent',
        border: isSolved ? 'none' : '1.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.55rem', color: '#fff', fontWeight: 700,
      }}>
        {isSolved ? '✓' : ''}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.78rem', fontWeight: isCurrent ? 600 : 400, lineHeight: 1.4, marginBottom: '2px',
          color: isCurrent ? 'var(--text)' : 'var(--text-muted)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {globalIdx + 1}. {p.title}
        </div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, color: ds.text }}>{p.difficulty}</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--border)' }}>·</span>
          {p.companyDomain ? (
            <img
              src={`https://logo.clearbit.com/${p.companyDomain}`}
              alt={p.company}
              style={{ width: 12, height: 12, borderRadius: 2, objectFit: 'contain', verticalAlign: 'middle' }}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          ) : null}
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{p.company}</span>
        </div>
      </div>
    </button>
  );
}

function ProblemSidebar({ problems, currentIdx, solved, filterDiff, onFilterDiff, onSelect }) {
  const nonMaster = problems.filter(p => p.difficulty !== 'Master');
  const masterProblems = problems.filter(p => p.difficulty === 'Master');
  const filtered = nonMaster.filter(p => !filterDiff || p.difficulty === filterDiff);
  const solvedCount = nonMaster.filter(p => solved.has(p.id)).length;

  return (
    <div style={{ width: 256, flexShrink: 0, position: 'sticky', top: '1.5rem', maxHeight: 'calc(100vh - 3rem)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%', overflowY: 'auto', paddingBottom: '1rem' }}>

      {/* Progress */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.875rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Progress</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>{solvedCount}</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>/ {nonMaster.length} solved</span>
        </div>
        <div style={{ height: 4, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${solvedCount / nonMaster.length * 100}%`, background: 'var(--teal)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Difficulty filter */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.875rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Difficulty</div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {[null, 'Easy', 'Medium', 'Hard'].map(d => {
            const label = d || 'All';
            const active = filterDiff === d;
            const ds = d ? DIFF_COLOR[d] : null;
            return (
              <button
                key={label}
                onClick={() => onFilterDiff(active ? null : d)}
                style={{
                  padding: '3px 10px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 600,
                  cursor: 'pointer', border: '1px solid',
                  background: active ? (ds ? ds.bg : 'rgba(20,184,166,0.1)') : 'var(--surface-2)',
                  color: active ? (ds ? ds.text : 'var(--teal)') : 'var(--text-muted)',
                  borderColor: active ? (ds ? ds.border : 'rgba(20,184,166,0.3)') : 'var(--border)',
                }}
              >{label}</button>
            );
          })}
        </div>
      </div>

      {/* Problem list */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '0.5rem 0.875rem', borderBottom: '1px solid var(--border)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {filtered.length} problem{filtered.length !== 1 ? 's' : ''}
        </div>
        {filtered.map(p => {
          const globalIdx = problems.findIndex(x => x.id === p.id);
          return (
            <SidebarProblemBtn
              key={p.id} p={p} globalIdx={globalIdx}
              isCurrent={globalIdx === currentIdx}
              isSolved={solved.has(p.id)}
              onSelect={onSelect}
            />
          );
        })}
        {filtered.length === 0 && (
          <div style={{ padding: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>No problems match</div>
        )}
      </div>

      {/* Challenge Vault — Master problems */}
      {masterProblems.length > 0 && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--purple-border, rgba(139,92,246,0.25))', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ padding: '0.5rem 0.875rem', borderBottom: '1px solid var(--border)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--purple, #8b5cf6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚡ Challenge Vault
          </div>
          {masterProblems.map(p => {
            const globalIdx = problems.findIndex(x => x.id === p.id);
            return (
              <SidebarProblemBtn
                key={p.id} p={p} globalIdx={globalIdx}
                isCurrent={globalIdx === currentIdx}
                isSolved={solved.has(p.id)}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}

export function SqlLabPage({ onBack }) {
  const [problemIdx, setProblemIdx] = useState(0);
  const [db, setDb] = useState(null);
  const [sqlLoading, setSqlLoading] = useState(true);
  const [sqlError, setSqlError] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [runError, setRunError] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [schemaOpen, setSchemaOpen] = useState(true);
  const [hasRun, setHasRun] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [filterDiff, setFilterDiff] = useState(null);
  const [solved, setSolved] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('pal-sql-lab-solved-v1') || '[]');
      return new Set(stored);
    } catch { return new Set(); }
  });
  const dbRef = useRef(null);

  const problem = sqlLabProblems[problemIdx];
  const dm = problem ? datamarts[problem.datamartId] : null;
  const diffStyle = problem ? (DIFF_COLOR[problem.difficulty] || DIFF_COLOR.Easy) : DIFF_COLOR.Easy;

  // Mark solved on correct answer
  useEffect(() => {
    if (correct !== true || !problem) return;
    setSolved(prev => {
      const next = new Set(prev);
      next.add(problem.id);
      try { localStorage.setItem('pal-sql-lab-solved-v1', JSON.stringify([...next])); } catch {}
      return next;
    });
  }, [correct]);

  // Re-init DB on problem change
  useEffect(() => {
    if (!problem || !dm) return;
    let cancelled = false;
    setSqlLoading(true);
    setSqlError(null);
    setResults(null);
    setRunError(null);
    setRevealed(false);
    setHasRun(false);
    setCorrect(null);
    setQuery('');

    if (dbRef.current) {
      try { dbRef.current.close(); } catch {}
      dbRef.current = null;
      setDb(null);
    }

    async function initDb() {
      try {
        const sqlJsModule = await import('sql.js');
        const initSqlJs = sqlJsModule.default || sqlJsModule;
        if (cancelled) return;
        const SQL = await initSqlJs({ locateFile: () => '/sql-wasm.wasm' });
        if (cancelled) return;
        const database = new SQL.Database();

        // Create tables and insert seed data via prepared statements
        Object.entries(dm.tables).forEach(([tableName, table]) => {
          database.run(table.schema + ';');
          if (table.rows.length > 0) {
            const colCount = table.columns.length;
            const placeholders = '(' + Array(colCount).fill('?').join(',') + ')';
            const stmt = database.prepare(`INSERT INTO ${tableName} VALUES ${placeholders}`);
            table.rows.forEach(row => stmt.run(row));
            stmt.free();
          }
        });

        if (cancelled) return;
        dbRef.current = database;
        setDb(database);
        setSqlLoading(false);
      } catch (e) {
        if (!cancelled) {
          setSqlError('Failed to load SQL engine: ' + e.message);
          setSqlLoading(false);
        }
      }
    }

    initDb();
    return () => { cancelled = true; };
  }, [problemIdx]);

  function runQuery() {
    if (!dbRef.current || !query.trim() || !problem) return;
    try {
      const res = dbRef.current.exec(query);
      const resultData = res.length === 0
        ? { columns: [], rows: [] }
        : { columns: res[0].columns, rows: res[0].values };
      setResults(resultData);
      setRunError(null);
      setHasRun(true);
      setCorrect(validateResults(resultData, problem));
    } catch (e) {
      setRunError(e.message);
      setResults(null);
      setHasRun(true);
      setCorrect(false);
    }
  }

  function validateResults(res, prob) {
    if (!res || res.rows.length !== prob.expectedRowCount) return false;
    for (const expected of prob.expectedColumns) {
      if (!res.columns.includes(expected)) return false;
    }
    const colIdx = {};
    res.columns.forEach((col, i) => { colIdx[col] = i; });
    for (const check of prob.checkValues) {
      const match = res.rows.find(row =>
        Object.entries(check).every(([col, val]) => {
          const i = colIdx[col];
          return i !== undefined && String(row[i]) === String(val);
        })
      );
      if (!match) return false;
    }
    return true;
  }

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runQuery();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      setQuery(el.value.substring(0, start) + '  ' + el.value.substring(end));
      requestAnimationFrame(() => {
        el.selectionStart = start + 2;
        el.selectionEnd = start + 2;
      });
    }
  }

  if (!problem) return null;

  return (
    <div className="pal-page-enter" style={{ maxWidth: 1280, margin: '0 auto', padding: '1.5rem 1.5rem 4rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.3rem 0.7rem', fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 28, height: 28, background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.25)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--teal)' }}>{'<>'}</div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>SQL Lab</span>
          <span style={{ fontSize: '0.72rem', padding: '1px 7px', borderRadius: '99px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>internal preview</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>

        {/* Main column */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Problem card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <Badge label={problem.difficulty} style={{ background: diffStyle.bg, color: diffStyle.text, borderColor: diffStyle.border }} />
              {problem.tags.slice(0, 3).map(t => (
                <Badge key={t} label={t} style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', borderColor: 'var(--border)' }} />
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {problem.companyDomain && (
                  <img
                    src={`https://logo.clearbit.com/${problem.companyDomain}`}
                    alt={problem.company}
                    style={{ width: 14, height: 14, borderRadius: 2, objectFit: 'contain' }}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                <Badge label={problem.company} style={{ background: 'rgba(67,56,202,0.08)', color: 'var(--accent)', borderColor: 'rgba(67,56,202,0.2)' }} />
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {problem.roles.map(r => (
                  <span key={r} style={{ fontSize: '0.65rem', color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '1px 6px', borderRadius: '4px' }}>{r}</span>
                ))}
              </div>
            </div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.6rem', color: 'var(--text)' }}>{problem.title}</h2>
            <p style={{ fontSize: '0.83rem', lineHeight: 1.65, color: 'var(--text-muted)', margin: 0 }}>{problem.prompt}</p>
            <SchemaAccordion dm={dm} open={schemaOpen} onToggle={() => setSchemaOpen(o => !o)} />
            {problem.sqliteNote && (
              <div style={{ marginTop: '0.6rem', padding: '0.4rem 0.6rem', borderRadius: '4px', background: 'var(--surface-2)', fontSize: '0.7rem', color: 'var(--text-muted)', borderLeft: '2px solid var(--teal)' }}>
                {problem.sqliteNote}
              </div>
            )}
            <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              ⏱ ~{problem.estimatedMin} min &nbsp;·&nbsp; Ctrl+Enter to run
            </div>
          </div>

          {/* Editor + results */}
          {sqlLoading && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Loading SQL engine…
            </div>
          )}
          {sqlError && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem', fontSize: '0.8rem', color: 'var(--red)' }}>
              {sqlError}
            </div>
          )}
          {!sqlLoading && !sqlError && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <textarea
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                placeholder={'-- Write your SQL here\n-- Ctrl+Enter to run'}
                style={{
                  width: '100%', minHeight: 280, resize: 'vertical', fontFamily: 'monospace',
                  fontSize: '0.82rem', lineHeight: 1.6, padding: '0.75rem',
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                  borderRadius: '6px', color: 'var(--text)', outline: 'none', boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button
                  onClick={runQuery}
                  disabled={!query.trim()}
                  style={{
                    padding: '0.45rem 1rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.82rem',
                    background: 'var(--teal)', color: '#fff', border: 'none', cursor: 'pointer',
                    opacity: query.trim() ? 1 : 0.4,
                  }}
                >
                  ▶ Run
                </button>
                {hasRun && correct === true && (
                  <span className="pal-success-ring" style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600 }}>✓ Correct — well done</span>
                )}
                {hasRun && correct === false && !runError && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Output does not match — check row count or column names</span>
                )}
              </div>
              {runError && (
                <div style={{ padding: '0.6rem 0.75rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', fontSize: '0.78rem', color: 'var(--red)', fontFamily: 'monospace' }}>
                  {runError}
                </div>
              )}
              {results && !runError && (
                <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ padding: '4px 10px', background: 'var(--surface-2)', fontSize: '0.7rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                    {results.rows.length} row{results.rows.length !== 1 ? 's' : ''}
                  </div>
                  <ResultsTable results={results} />
                </div>
              )}
            </div>
          )}

          {/* Reveal */}
          {!sqlLoading && !sqlError && !revealed && (
            <button
              onClick={() => setRevealed(true)}
              style={{
                background: 'none', border: '1px solid var(--border)', borderRadius: '6px',
                padding: '0.4rem 0.9rem', fontSize: '0.78rem', color: 'var(--text-muted)',
                cursor: 'pointer', alignSelf: 'flex-start',
              }}
            >
              Show answer
            </button>
          )}

          {/* Debrief */}
          {revealed && (
            <div className="pal-reveal-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                borderLeft: '3px solid var(--discovery, #E8A033)',
                background: 'rgba(232,160,51,0.07)',
                borderRadius: '0 8px 8px 0',
                padding: '0.85rem 1rem',
                fontSize: '0.83rem', lineHeight: 1.65, color: 'var(--text)',
              }}>
                {problem.debrief}
              </div>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Model solution</div>
                <pre style={{
                  margin: 0, padding: '0.75rem', background: 'var(--surface-2)', borderRadius: '6px',
                  fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.6, color: 'var(--text)',
                  overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                }}>{problem.solution}</pre>
                {correct === true && (
                  <button
                    className="pal-glow-pulse"
                    onClick={() => {
                      const next = sqlLabProblems.findIndex((p, i) => i > problemIdx && !solved.has(p.id));
                      if (next !== -1) setProblemIdx(next);
                    }}
                    style={{
                      marginTop: '0.75rem', padding: '0.5rem 1.25rem', borderRadius: '6px',
                      fontWeight: 600, fontSize: '0.82rem', background: 'var(--teal)',
                      color: '#fff', border: 'none', cursor: 'pointer',
                    }}
                  >
                    Next unsolved →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <ProblemSidebar
          problems={sqlLabProblems}
          currentIdx={problemIdx}
          solved={solved}
          filterDiff={filterDiff}
          onFilterDiff={setFilterDiff}
          onSelect={idx => setProblemIdx(idx)}
        />
      </div>
    </div>
  );
}
