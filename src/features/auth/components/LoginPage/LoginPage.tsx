import logoImage from "@assets/taekwondo.jpg";
import { useState } from "react";
import styles from "./LoginPage.module.scss";

function LeftPanel() {
  return (
    <div className={styles.leftPanel}>
      {/* Abstract SVG decorations */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 480 560"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="80" cy="100" r="130" fill="rgba(255,100,100,0.18)" />
        <circle cx="400" cy="460" r="110" fill="rgba(255,100,100,0.15)" />
        <path
          d="M 0 500 Q 200 300 420 80"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow2)"
        />
        <path
          d="M 0 540 Q 220 340 460 100"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 60 560 Q 250 370 480 130"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -30 180 Q 220 260 480 160"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -30 220 Q 220 300 480 200"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="60,60 80,72 80,96 60,108 40,96 40,72"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.05)"
        />
        <polygon
          points="400,420 418,431 418,453 400,464 382,453 382,431"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.04)"
        />
        <circle
          cx="60"
          cy="84"
          r="5"
          fill="white"
          opacity="0.8"
          filter="url(#glow2)"
        />
        <circle cx="60" cy="84" r="12" fill="rgba(255,255,255,0.12)" />
        <circle
          cx="400"
          cy="440"
          r="5"
          fill="white"
          opacity="0.75"
          filter="url(#glow2)"
        />
        <line
          x1="60"
          y1="84"
          x2="420"
          y2="98"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      </svg>

      {/* Logo & brand content */}
      <div className={styles.leftPanelContent}>
        <div className={styles.logoWrapper}>
          <img
            src={logoImage}
            alt="Hệ Thống Taekwondo Văn Quán"
            className={styles.logoImage}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Chào mừng trở lại
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "11px",
              marginTop: "0.25rem",
            }}
          >
            Đăng nhập để quản lý hệ thống
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "9rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.4)",
            }}
          />
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.2)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <LeftPanel />

          <div className={styles.rightPanel}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Đăng Nhập</h2>
              <p className={styles.formSubtitle}>
                Vui lòng nhập thông tin tài khoản của bạn
              </p>
            </div>

            <form onSubmit={handleLogin}>
              {/* Phone Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Số điện thoại</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Mật khẩu</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className={`${styles.formInput} ${styles.passwordInput}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.togglePassword}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className={styles.forgotPassword}>
                  <a href="#" className={styles.forgotLink}>
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={styles.loginButton}
              >
                {loading ? (
                  <span className={styles.loadingContent}>
                    <svg
                      className={styles.spinner}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        style={{ opacity: 0.25 }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        style={{ opacity: 0.75 }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  "ĐĂNG NHẬP"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>hoặc</span>
              <div className={styles.dividerLine} />
            </div>

            {/* Register link */}
            <p className={styles.registerSection}>
              Chưa có tài khoản?{" "}
              <a href="#" className={styles.registerLink}>
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
