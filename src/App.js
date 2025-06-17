import React, { useState } from 'react';
import "./styles.css";

function App() {
  const [currentTool, setCurrentTool] = useState('home');

  if (currentTool === 'home') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Trust Law Educational Tools
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              marginBottom: '8px'
            }}>
              Interactive learning resources for Australian trust law
            </p>
            <p style={{
              fontSize: '1.125rem',
              color: '#9ca3af'
            }}>
              Featuring Queensland <em>Trusts Act 2025</em> modernisation
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '24px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s'
              }}
              onClick={() => setCurrentTool('duty-checker')}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                ⚖️ Interactive Duty Checker
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                marginBottom: '16px'
              }}>
                Analyse trustee scenarios to identify applicable duties and potential breaches
              </p>
              <span style={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                Interactive Tool
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '24px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s'
              }}
              onClick={() => setCurrentTool('jurisdiction-comparison')}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                🗺️ Jurisdiction Comparison Tool
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                marginBottom: '16px'
              }}>
                Compare trustee powers and duties across Australian states and territories
              </p>
              <span style={{
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '4px'
              }}>
                Interactive Tool
              </span>
            </div>
          </div>

          <div style={{
            marginTop: '48px',
            backgroundColor: '#eff6ff',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: '16px'
            }}>
              ✅ System Status
            </h2>
            <p style={{ color: '#1e40af' }}>
              🎯 <strong>React app is working perfectly!</strong><br/>
              🚀 Ready to add full interactive components<br/>
              📚 Educational tools loading successfully
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tool views
  if (currentTool === 'duty-checker') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 24px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setCurrentTool('home')}
              style={{
                color: '#2563eb',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              ← Back to Tools
            </button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Interactive Duty Checker</h1>
            <div></div>
          </div>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              🎯 Interactive Duty Checker
            </h2>
            <p>This tool analyzes trustee scenarios to identify applicable duties and potential breaches.</p>
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#f0f9ff',
              borderRadius: '4px',
              border: '1px solid #0ea5e9'
            }}>
              <p><strong>✅ Tool is working!</strong> This confirms your React setup is correct.</p>
              <p>We can now add the full interactive components with all the features.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentTool === 'jurisdiction-comparison') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 24px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setCurrentTool('home')}
              style={{
                color: '#2563eb',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              ← Back to Tools
            </button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Jurisdiction Comparison Tool</h1>
            <div></div>
          </div>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              🗺️ Jurisdiction Comparison Tool
            </h2>
            <p>Compare trustee powers and duties across Australian jurisdictions.</p>
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '4px',
              border: '1px solid #22c55e'
            }}>
              <p><strong>✅ Tool is working!</strong> Ready for full interactive features.</p>
              <p>This tool will compare Queensland <em>Trusts Act 2025</em> vs other jurisdictions.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
