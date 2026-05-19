import { useState } from 'react';
import { behavioralQuestions } from '../data/behavioralQuestions.js';
import { getAllBehavioralProgress } from '../utils/behavioralProgress.js';

const TAGS = ['All', 'influence', 'failure', 'leadership', 'data-impact', 'conflict', 'communication'];

const DIFFICULTY_COLOR = {
  'Any level':  { color: 'var(--text-muted)', bg: 'var(--surface-2)',  border: 'var(--border)'         },
  'Mid-level':  { color: 'var(--accent)',     bg: 'var(--accent-bg)',  border: 'var(--accent-border)'  },
  'Senior':     { color: 'var(--red)',         bg: 'var(--red-bg)',     border: 'var(--red-border)'     },
};

const CATEGORY_COLOR = {
  influence:     { color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
  failure:       { color: 'var(--red)',    bg: 'var(--red-bg)',    border: 'var(--red-border)'    },
  leadership:    { color: 'var(--teal)',   bg: 'var(--teal-bg)',   border: 'var(--teal-border)'   },
  'data-impact': { color: 'var(--green)',  bg: 'var(--green-bg)',  border: 'var(--green-border)'  },
  conflict:      { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  communication: { color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
};

const RATING_COLOR = {
  strong:  'var(--green)',
  partial: 'var(--yellow)',
  miss:    'var(--red)',
};

export function BehavioralBrowser({ onStart, unlocked }) {
  const [activeTag, setActiveTag] = useState('All');
  const progress = getAllBehavioralProgress();

  const filtered = activeTag === 'All'
    ? behavioralQuestions
    : behavioralQuestions.filter(q => q.category === activeTag || q.tags.includes(activeTag));

  const completedCount = Object.keys(progress).length;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🗣</span>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>
            Behavioral & Leadership
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, maxWidth: '640px' }}>
          Practice the storytelling behind the data. "Tell me about a time..." questions that senior DS/PM roles care about most.
        </p>
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            {behavioralQuestions.length} questions
          </span>
          {completedCount > 0 && (
            <span style={{ fontSize: '0.82rem', color: 'var(--green)' }}>
              ✓ {completedCount} completed
            </span>
          )}
        </div>
      </div>

      {/* Tag filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '20px',
              border: activeTag === tag ? '1px solid var(--accent-border)' : '1px solid var(--border)',
              background: activeTag === tag ? 'var(--accent-bg)' : 'var(--surface)',
              color: activeTag === tag ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: activeTag === tag ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Question cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filtered.map(question => {
          const prog = progress[question.id];
          const isLocked = !question.isFree && !unlocked;
          const dc = DIFFICULTY_COLOR[question.difficulty] || {};
          const cc = CATEGORY_COLOR[question.category] || {};

          return (
            <div
              key={question.id}
              onClick={() => onStart(question.id)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '1.1rem 1.25rem',
                cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                position: 'relative',
                opacity: isLocked ? 0.7 : 1,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent-border)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  {/* Badges row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                    {/* ID */}
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {question.id}
                    </span>
                    {/* Difficulty */}
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600,
                      color: dc.color, background: dc.bg, border: `1px solid ${dc.border}`,
                      borderRadius: '4px', padding: '0.1rem 0.4rem',
                    }}>
                      {question.difficulty}
                    </span>
                    {/* Category */}
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600,
                      color: cc.color, background: cc.bg, border: `1px solid ${cc.border}`,
                      borderRadius: '4px', padding: '0.1rem 0.4rem',
                      textTransform: 'capitalize',
                    }}>
                      {question.category}
                    </span>
                    {/* Free badge */}
                    {question.isFree && (
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 600,
                        color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                        borderRadius: '4px', padding: '0.1rem 0.4rem',
                      }}>Free</span>
                    )}
                    {isLocked && <span style={{ fontSize: '0.75rem' }}>🔒</span>}
                  </div>

                  {/* Title */}
                  <div style={{ fontWeight: 600, fontSize: '0.97rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
                    {question.title}
                  </div>

                  {/* Subtitle */}
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                    {question.subtitle}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {question.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.72rem', color: 'var(--text-dim)',
                        background: 'var(--surface-2)', borderRadius: '4px',
                        padding: '0.1rem 0.45rem', border: '1px solid var(--border-subtle)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Completion indicator */}
                {prog && (
                  <div style={{
                    fontSize: '0.75rem', fontWeight: 600,
                    color: RATING_COLOR[prog.rating] || 'var(--text-muted)',
                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                    borderRadius: '6px', padding: '0.3rem 0.6rem',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {prog.rating === 'strong' ? '✓ Nailed it' : prog.rating === 'partial' ? '~ Partial' : '✗ Revisit'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
