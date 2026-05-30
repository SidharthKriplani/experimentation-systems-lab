import { useState, useEffect, useRef } from 'react';
import { sqlLabProblems } from '../data/sqlLabProblems.js';

const DIFF_COLOR = {
  Easy:   { bg: 'var(--green-bg, rgba(16,185,129,0.08))',  text: 'var(--green)',  border: 'var(--green-border, rgba(16,185,129,0.25))' },
  Medium: { bg: 'var(--yellow-bg, rgba(245,158,11,0.08))', text: 'var(--yellow)', border: 'var(--yellow-border, rgba(245,158,11,0.25))' },
  Hard:   { bg: 'var(--red-bg, rgba(239,68,68,0.08))',     text: 'var(--red)',    border: 'var(--red-border, rgba(239,68,68,0.25))' },
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

function SchemaAccordion({ problem, open, onToggle }) {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm, 6px)', overflow: 'hidden', marginTop: '0.75rem' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.5rem 0.75rem', background: 'var(--surface-2)', border: 'none',
          cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500,
        }}
      >
        <span>Schema — {problem.schema.match(/CREATE TABLE (\w+)/)?.[1]}</span>
        <span style={{ fontSize: '0.65rem', transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: '0.5rem 0.75rem', background: 'var(--surface)' }}>
          {problem.schemaDisplay.map(row => (
            <div key={row.col} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '2px 0', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', minWidth: 140 }}>{row.col}</span>
              <span style={{ color: 'var(--text-dim, var(--text-muted))', fontFamily: 'monospace', fontSize: '0.7rem' }}>{row.type}</span>
            </div>
          ))}
          {problem.sqliteNote && (
            <div style={{
              marginTop: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: '4px',
              background: 'var(--surface-2)', fontSize: '0.7rem', color: 'var(--text-muted)',
              borderLeft: '2px solid var(--teal)',
            }}>
              {problem.sqliteNote}
            </div>
          )}
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
            <tr key={ri} style={{ borderBottom: '1px solid var(--border-subtle, var(--border))' }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '5px 10px', color: 'var(--text)', whiteSpace: 'nowrap' }}>
                  {cell === null ? <span style={{ color: 'var(--text-dim, var(--text-muted))' }}>NULL</span> : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
  const dbRef = useRef(null);

  const problem = sqlLabProblems[problemIdx];

  useEffect(() => {
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
      try { dbRef.current.close(); } catch (e) {}
      dbRef.current = null;
    }

    async function initDb() {
      try {
        const sqlJsModule = await import('sql.js');
        const initSqlJs = sqlJsModule.default || sqlJsModule;
        if (cancelled) return;
        const SQL = await initSqlJs({ locateFile: () => '/sql-wasm.wasm' });
        if (cancelled) return;
        const database = new SQL.Database();
        problem.schema.split(';').forEach(stmt => {
          const s = stmt.trim();
          if (s) database.run(s + ';');
        });
        problem.seed.forEach(stmt => database.run(stmt));
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
    if (!dbRef.current || !query.trim()) return;
    try {
      const res = dbRef.current.exec(query);
      if (res.length === 0) {
        setResults({ columns: [], rows: [] });
      } else {
        setResults({ columns: res[0].columns, rows: res[0].values });
      }
      setRunError(null);
      setHasRun(true);
      setCorrect(validateResults({ columns: res[0]?.columns || [], rows: res[0]?.values || [] }, problem));
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
      const val = el.value;
      setQuery(val.substring(0, start) + '  ' + val.substring(end));
      requestAnimationFrame(() => {
        el.selectionStart = start + 2;
        el.selectionEnd = start + 2;
      });
    }
  }

  const diffStyle = DIFF_COLOR[problem.difficulty] || DIFF_COLOR.Easy;

  return (
    <div className="pal-page-enter" style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem 1.5rem 4rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.3rem 0.7rem', fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
        >
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 28, height: 28, background: 'var(--teal-bg, rgba(20,184,166,0.1))', border: '1px solid var(--teal-border, rgba(20,184,166,0.25))', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--teal)' }}>{'<>'}</div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>SQL Lab</span>
          <span style={{ fontSize: '0.72rem', padding: '1px 7px', borderRadius: '99px', background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>internal preview</span>
        </div>
      </div>

      {/* Problem tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {sqlLabProblems.map((p, i) => {
          const ds = DIFF_COLOR[p.difficulty] || DIFF_COLOR.Easy;
          const active = i === problemIdx;
          return (
            <button
              key={p.id}
              onClick={() => setProblemIdx(i)}
              style={{
                padding: '5px 14px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
                background: active ? ds.bg : 'var(--surface)',
                border: active ? ('1px solid ' + ds.border) : '1px solid var(--border)',
                color: active ? ds.text : 'var(--text-muted)',
              }}
            >
              {i + 1}. {p.title}
            </button>
          );
        })}
      </div>

      {/* Split pane */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: '1rem', alignItems: 'start' }}
           className="sql-lab-grid">
        <style>{'.sql-lab-grid { } @media (max-width: 800px) { .sql-lab-grid { grid-template-columns: 1fr !important; } }'}</style>

        {/* Left: problem */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <Badge label={problem.difficulty} style={{ background: diffStyle.bg, color: diffStyle.text, borderColor: diffStyle.border }} />
            {problem.tags.slice(0, 3).map(t => (
              <Badge key={t} label={t} style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', borderColor: 'var(--border)' }} />
            ))}
            <Badge label={problem.company} style={{ background: 'var(--accent-bg, rgba(67,56,202,0.08))', color: 'var(--accent)', borderColor: 'var(--accent-border, rgba(67,56,202,0.2))' }} />
          </div>

          <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.6rem', color: 'var(--text)' }}>{problem.title}</h2>
          <p style={{ fontSize: '0.83rem', lineHeight: 1.65, color: 'var(--text-secondary, var(--text-muted))', margin: 0 }}>{problem.prompt}</p>

          <SchemaAccordion problem={problem} open={schemaOpen} onToggle={() => setSchemaOpen(o => !o)} />

          <div style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            ⏱ ~{problem.estimatedMin} min &nbsp;·&nbsp; Ctrl+Enter to run
          </div>
        </div>

        {/* Right: editor + results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
                  width: '100%', minHeight: 180, resize: 'vertical', fontFamily: 'monospace',
                  fontSize: '0.82rem', lineHeight: 1.6, padding: '0.75rem',
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                  borderRadius: '6px', color: 'var(--text)', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
                  <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600 }}>✓ Correct</span>
                )}
                {hasRun && correct === false && !runError && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Output doesn't match — check row count or column names</span>
                )}
              </div>

              {runError && (
                <div style={{ padding: '0.6rem 0.75rem', background: 'var(--red-bg, rgba(239,68,68,0.08))', border: '1px solid var(--red-border, rgba(239,68,68,0.2))', borderRadius: '6px', fontSize: '0.78rem', color: 'var(--red)', fontFamily: 'monospace' }}>
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

          {/* Reveal button */}
          {!revealed && (
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
        </div>
      </div>

      {/* Debrief panel */}
      {revealed && (
        <div className="pal-reveal-in" style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
          </div>
        </div>
      )}
    </div>
  );
}
