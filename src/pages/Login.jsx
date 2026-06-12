import React, { useState } from 'react';

/* ==============================================================
   Login Page – "تسجيل الدخول" for Gharam customers
   ============================================================== */

const styles = {
  container: {
    direction: 'rtl',
    fontFamily: "'Tajawal', 'Segoe UI', 'Cairo', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 40%, #fff1f2 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  /* Decorative floating elements */
  decor: (top, left, emoji, size = '2.5rem', opacity = 0.15, rotate = '0deg') => ({
    position: 'absolute',
    top,
    left,
    fontSize: size,
    opacity,
    userSelect: 'none',
    transform: `rotate(${rotate})`,
    pointerEvents: 'none',
  }),
  card: {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '28px',
    padding: '40px 36px',
    maxWidth: '420px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(244, 114, 182, 0.15), 0 8px 24px rgba(0,0,0,0.04)',
    border: '1px solid rgba(244, 114, 182, 0.12)',
    position: 'relative',
    zIndex: 2,
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  cardIcon: {
    fontSize: '2.8rem',
    marginBottom: '8px',
    display: 'block',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#4a044e',
    margin: '0 0 6px',
    lineHeight: 1.3,
  },
  cardSubtitle: {
    fontSize: '0.85rem',
    color: '#a78ba0',
    margin: 0,
    fontWeight: 500,
  },
  inputGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#5c4a5c',
    marginBottom: '6px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #f3e8f0',
    borderRadius: '14px',
    background: '#fff',
    transition: 'border-color 0.3s ease',
    overflow: 'hidden',
  },
  inputWrapperFocus: {
    borderColor: '#f472b6',
    boxShadow: '0 0 0 3px rgba(244, 114, 182, 0.12)',
  },
  prefix: {
    padding: '0 12px 0 8px',
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#4a044e',
    background: '#fdf2f8',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    borderLeft: '2px solid #f3e8f0',
    whiteSpace: 'nowrap',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '0 14px',
    height: '48px',
    fontSize: '0.95rem',
    color: '#1f1a1f',
    fontFamily: 'inherit',
    background: 'transparent',
    width: '100%',
  },
  passwordToggle: {
    padding: '0 14px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    userSelect: 'none',
    color: '#a78ba0',
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  submitBtn: (loading) => ({
    width: '100%',
    padding: '14px 0',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1.05rem',
    fontWeight: 800,
    cursor: loading ? 'not-allowed' : 'pointer',
    background: loading
      ? '#f3e8f0'
      : 'linear-gradient(135deg, #f472b6, #ec4899)',
    color: loading ? '#a78ba0' : '#fff',
    boxShadow: loading
      ? 'none'
      : '0 6px 20px rgba(244, 114, 182, 0.4)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '8px',
    letterSpacing: '1px',
  }),
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid #fff',
    borderRadius: '50%',
    animation: 'loginSpin 0.7s linear infinite',
  },
  successMsg: {
    textAlign: 'center',
    padding: '14px 0',
    color: '#065f46',
    fontWeight: 700,
    fontSize: '1rem',
    background: '#d1fae5',
    borderRadius: '12px',
    marginTop: '16px',
    animation: 'fadeInUp 0.4s ease',
  },
  errorMsg: {
    textAlign: 'center',
    padding: '10px 14px',
    color: '#991b1b',
    fontWeight: 600,
    fontSize: '0.85rem',
    background: '#fee2e2',
    borderRadius: '12px',
    marginBottom: '10px',
    animation: 'fadeInUp 0.3s ease',
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px',
    fontSize: '0.85rem',
    color: '#a78ba0',
  },
  footerLink: {
    color: '#ec4899',
    fontWeight: 700,
    textDecoration: 'none',
    marginRight: '4px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '20px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #f3e8f0, transparent)',
  },
  dividerText: {
    color: '#c4a4b8',
    fontSize: '0.75rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
};

/* ==============================================================
   Login Component
   ============================================================== */
const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!phone.trim()) {
      setError('يرجى إدخال رقم الهاتف');
      return;
    }
    if (!password.trim()) {
      setError('يرجى إدخال كلمة المرور');
      return;
    }

    setLoading(true);
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Store demo token
      const demoToken = `gharam_demo_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      localStorage.setItem('gharam_token', demoToken);
      localStorage.setItem('gharam_user', JSON.stringify({
        name: 'عميلة غرام',
        phone: `+20${phone}`,
        loyaltyPoints: 250,
      }));

      // Clear success after 5s
      setTimeout(() => setSuccess(false), 5000);
    }, 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700;800&family=Tajawal:wght@400;500;700;800&display=swap');

        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: 'Tajawal', 'Cairo', sans-serif;
        }

        @keyframes loginSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }

        .deco-float {
          animation: float 6s ease-in-out infinite;
        }
        .deco-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .deco-float-2 {
          animation: float 7s ease-in-out infinite 1s;
        }
        .deco-float-3 {
          animation: floatSlow 9s ease-in-out infinite 2s;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(244, 114, 182, 0.5) !important;
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>

      <div style={styles.container}>
        {/* ===== DECORATIVE ELEMENTS ===== */}
        <span className="deco-float" style={styles.decor('8%', '5%', '🌸', '3rem', 0.12)} />
        <span className="deco-float-slow" style={styles.decor('12%', '85%', '💐', '2.8rem', 0.1)} />
        <span className="deco-float-2" style={styles.decor('50%', '3%', '✨', '2rem', 0.1)} />
        <span className="deco-float-3" style={styles.decor('70%', '88%', '🌹', '3.2rem', 0.1)} />
        <span className="deco-float" style={styles.decor('30%', '92%', '💄', '2.2rem', 0.08)} />
        <span className="deco-float-slow" style={styles.decor('85%', '8%', '👑', '2rem', 0.08)} />
        <span className="deco-float-2" style={styles.decor('88%', '55%', '👜', '2.5rem', 0.07)} />
        <span className="deco-float-3" style={styles.decor('20%', '15%', '💎', '1.8rem', 0.06)} />

        {/* ===== LOGIN CARD ===== */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>💝</span>
            <h2 style={styles.cardTitle}>تسجيل الدخول بحساب غرام بونص</h2>
            <p style={styles.cardSubtitle}>أهلاً بعودتكِ! سجلي الدخول لمتابعة رحلة جمالك</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Error message */}
            {error && <div style={styles.errorMsg}>❌ {error}</div>}

            {/* Phone input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>رقم الهاتف</label>
              <div
                style={{
                  ...styles.inputWrapper,
                  ...(phoneFocused ? styles.inputWrapperFocus : {}),
                }}
              >
                <span style={styles.prefix}>+20</span>
                <input
                  type="tel"
                  dir="ltr"
                  style={styles.input}
                  placeholder="10X XXX XXXX"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    if (val.length <= 11) setPhone(val);
                  }}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                />
              </div>
            </div>

            {/* Password input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>كلمة المرور</label>
              <div
                style={{
                  ...styles.inputWrapper,
                  ...(passFocused ? styles.inputWrapperFocus : {}),
                }}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  dir="auto"
                  style={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={() => setShowPassword((p) => !p)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              style={styles.submitBtn(loading)}
            >
              {loading ? (
                <>
                  <div style={styles.spinner} />
                  جاري تسجيل الدخول...
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          {/* Success message */}
          {success && (
            <div style={styles.successMsg}>
              تم تسجيل الدخول بنجاح ✅
            </div>
          )}

          {/* Divider */}
          <div style={styles.divider}>
            <span style={styles.dividerLine} />
            <span style={styles.dividerText}>أو</span>
            <span style={styles.dividerLine} />
          </div>

          {/* Registration link */}
          <div style={styles.footer}>
            ماعندكيش حساب؟
            <a
              href="https://gharam.art/loyalty-portal"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
            >
              سجلي في غرام بونص
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
