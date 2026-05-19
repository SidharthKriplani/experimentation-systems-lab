// PostDetail — renders a full Playbook article inline
// Content sections: text | heading | callout | list | framework_box | example | table

const ROOM_CONFIG = {
  stats:   { label: 'Stats Room',   color: 'var(--accent)'    },
  metrics: { label: 'Metrics Room', color: 'var(--green)'     },
  design:  { label: 'Design Room',  color: 'var(--teal)'      },
  review:  { label: 'Review Room',  color: 'var(--accent)'    },
  rca:     { label: 'RCA Room',     color: 'var(--yellow)'    },
  cases:   { label: 'Cases Room',   color: 'var(--purple)'    },
};

const CATEGORY_CONFIG = {
  'Metrics':             { color: 'var(--green)',     bg: 'var(--green-bg)',    border: 'var(--green-border)'   },
  'RCA':                 { color: 'var(--yellow)',    bg: 'var(--yellow-bg)',   border: 'var(--yellow-border)'  },
  'Experimentation':     { color: 'var(--accent)',    bg: 'var(--accent-bg)',   border: 'var(--accent-border)'  },
  'Statistics':          { color: 'var(--teal)',      bg: 'var(--teal-bg)',     border: 'var(--teal-border)'    },
  'Ambiguous Problems':  { color: 'var(--purple)',    bg: 'var(--purple-bg)',   border: 'var(--purple-border)'  },
  'GenAI Analytics':     { color: 'var(--teal)',      bg: 'var(--teal-bg)',     border: 'var(--teal-border)'    },
  'Product Sense':       { color: 'var(--blue-text)', bg: 'var(--blue-bg)',     border: 'var(--blue-border)'    },
  'SQL & Data':          { color: 'var(--accent)',    bg: 'var(--accent-bg)',   border: 'var(--accent-border)'  },
  'Company Questions':   { color: 'var(--red)',       bg: 'var(--red-bg)',      border: 'var(--red-border)'     },
  'Mental Models':       { color: 'var(--purple)',    bg: 'var(--purple-bg)',   border: 'var(--purple-border)'  },
  'Career & Interview':  { color: 'var(--text-muted)',bg: 'var(--surface-2)',   border: 'var(--border)'         },
};

function Section({ section }) {
  switch (section.type) {
    case 'text':
      return (
        <p style={{
          fontSize: '0.93rem', color: 'var(--text-secondary)', lineHeight: 1.75,
          margin: '0 0 1.1rem', whiteSpace: 'pre-line',
        }}>
          {section.text}
        </p>
      );
    case 'heading':
      return (
        <h3 style={{
          fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)',
          margin: '1.75rem 0 0.55rem', letterSpacing: '-0.015em',
        }}>
          {section.text}
        </h3>
      );
    case 'callout':
      return (
        <div style={{
          background: 'var(--accent-bg)', border: '1.5px solid var(--accent-border)',
          borderLeft: '3px solid var(--accent)', borderRadius: 'var(--radius)',
          padding: '0.85rem 1rem', margin: '1.1rem 0',
        }}>
          {section.label && (
            <div style={{
              fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.09em', color: 'var(--accent)', marginBottom: '0.35rem',
            }}>
              {section.label}
            </div>
          )}
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
            {section.text}
          </p>
        </div>
      );
    case 'list':
      return (
        <ul style={{ margin: '0.4rem 0 1.1rem', paddingLeft: '1.4rem' }}>
          {section.items.map((item, i) => (
            <li key={i} style={{
              fontSize: '0.88rem', color: 'var(--text-secondary)',
              lineHeight: 1.65, marginBottom: '0.4rem',
            }}>
              {item}
            </li>
          ))}
        </ul>
      );
    case 'framework_box':
      return (
        <div style={{
          background: 'var(--surface-2)', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '1rem 1.1rem', margin: '1.1rem 0',
        }}>
          {section.label && (
            <div style={{
              fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.09em', color: 'var(--text-dim)', marginBottom: '0.65rem',
            }}>
              {section.label}
            </div>
          )}
          <ol style={{ margin: 0, paddingLeft: '1.3rem' }}>
            {section.items.map((item, i) => (
              <li key={i} style={{
                fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500,
                lineHeight: 1.6, marginBottom: '0.45rem',
              }}>
                {item}
              </li>
            ))}
          </ol>
        </div>
      );
    case 'example':
      return (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', padding: '0.9rem 1rem', margin: '1.1rem 0',
        }}>
          {section.label && (
            <div style={{
              fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.09em', color: 'var(--text-muted)', marginBottom: '0.5rem',
            }}>
              {section.label}
            </div>
          )}
          <p style={{
            fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65,
            margin: 0, whiteSpace: 'pre-line', fontFamily: 'inherit',
          }}>
            {section.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export function PostDetail({ post, onBack, onOpenItem }) {
  const cfg = CATEGORY_CONFIG[post.category] || {};

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem 0',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          color: 'var(--text-muted)', fontSize: '0.83rem', marginBottom: '1.5rem',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
      >
        ← Back to Playbook
      </button>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em',
          color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
          borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
        }}>
          {post.category}
        </span>
        <span style={{
          fontSize: '0.6rem', color: 'var(--text-dim)', background: 'var(--surface-2)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
        }}>
          {post.readMin} min read
        </span>
        {post.source && (
          <span style={{
            fontSize: '0.58rem', color: 'var(--red)', background: 'var(--red-bg)',
            border: '1px solid var(--red-border)', borderRadius: 'var(--radius-sm)',
            padding: '0.1rem 0.4rem',
          }}>
            🏢 {post.source}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)',
        margin: '0 0 0.6rem', letterSpacing: '-0.025em', lineHeight: 1.25,
      }}>
        {post.title}
      </h1>

      {/* Summary / lead */}
      <p style={{
        fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65,
        margin: '0 0 2rem', fontStyle: 'italic',
        borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem',
      }}>
        {post.summary}
      </p>

      {/* Content sections */}
      <div>
        {post.content.map((section, i) => (
          <Section key={i} section={section} />
        ))}
      </div>

      {/* Practice links */}
      {post.relatedItems?.length > 0 && (
        <div style={{
          marginTop: '2.5rem', paddingTop: '1.5rem',
          borderTop: '1.5px solid var(--border-subtle)',
        }}>
          <div style={{
            fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.09em', color: 'var(--text-dim)', marginBottom: '0.75rem',
          }}>
            Now practice it →
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {post.relatedItems.map(item => {
              const rc = ROOM_CONFIG[item.room];
              return (
                <button
                  key={item.id}
                  onClick={() => onOpenItem && onOpenItem(item.room, item.id)}
                  style={{
                    background: 'var(--surface-2)', border: `1px solid var(--border)`,
                    borderRadius: 'var(--radius)', padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem', color: rc?.color || 'var(--text-muted)',
                    cursor: onOpenItem ? 'pointer' : 'default',
                    fontWeight: 600, transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => {
                    if (onOpenItem) {
                      e.currentTarget.style.borderColor = rc?.color || 'var(--accent)';
                      e.currentTarget.style.background = 'var(--surface)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--surface-2)';
                  }}
                >
                  {item.label} →
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer back */}
      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <button
          onClick={onBack}
          style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '0.45rem 1rem',
            color: 'var(--text-muted)', fontSize: '0.82rem', cursor: 'pointer',
            fontWeight: 500,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          ← Back to Playbook
        </button>
      </div>
    </div>
  );
}
