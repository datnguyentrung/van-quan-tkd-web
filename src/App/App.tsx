import { useState } from "react";
import logoImage from "../assets/taekwondo.jpg";
import styles from "./App.module.scss";

function LeftPanel() {
  return (
    <div className={styles.leftPanel}>
      {/* Abstract SVG decorations */}
      <svg
        className="absolute inset-0 w-full h-full"
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
        {/* Glowing ambient blobs */}
        <circle cx="80" cy="100" r="130" fill="rgba(255,100,100,0.18)" />
        <circle cx="400" cy="460" r="110" fill="rgba(255,100,100,0.15)" />
        {/* Diagonal flow lines */}
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
        {/* Sweep curves */}
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
        {/* Hexagons */}
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
        <polygon
          points="420,80 435,89 435,107 420,116 405,107 405,89"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.04)"
        />
        <polygon
          points="50,450 65,459 65,477 50,486 35,477 35,459"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.04)"
        />
        {/* Node dots */}
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
          cx="420"
          cy="98"
          r="4"
          fill="white"
          opacity="0.7"
          filter="url(#glow2)"
        />
        <circle
          cx="400"
          cy="440"
          r="5"
          fill="white"
          opacity="0.75"
          filter="url(#glow2)"
        />
        <circle cx="400" cy="440" r="12" fill="rgba(255,255,255,0.1)" />
        {/* Dashed connector lines */}
        <line
          x1="60"
          y1="84"
          x2="420"
          y2="98"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
        <line
          x1="60"
          y1="84"
          x2="400"
          y2="440"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        {/* Diamonds */}
        <polygon
          points="240,40 254,56 240,72 226,56"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          fill="rgba(255,255,255,0.06)"
        />
        <polygon
          points="240,488 252,502 240,516 228,502"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          fill="rgba(255,255,255,0.04)"
        />
        {/* Circuit lines */}
        <path
          d="M 0 30 L 40 30 L 40 60 L 70 60"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 480 530 L 440 530 L 440 500 L 410 500"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          fill="none"
        />
        {/* Corner marks */}
        <path
          d="M 0 0 L 50 0 L 50 4 L 4 4 L 4 50 L 0 50 Z"
          fill="rgba(255,255,255,0.2)"
        />
        <path
          d="M 480 560 L 430 560 L 430 556 L 476 556 L 476 510 L 480 510 Z"
          fill="rgba(255,255,255,0.2)"
        />
        {/* Small dots scatter */}
        <circle cx="150" cy="40" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="340" cy="50" r="2.5" fill="rgba(255,255,255,0.35)" />
        <circle cx="460" cy="250" r="2" fill="rgba(255,255,255,0.35)" />
        <circle cx="20" cy="320" r="2.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="120" cy="520" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="360" cy="530" r="2" fill="rgba(255,255,255,0.3)" />
      </svg>

      {/* Logo & brand content */}
      <div className={styles.leftPanelContent}>
        {/* Logo in a glassy circle */}
        <div className={styles.logoWrapper}>
          <img
            src={logoImage}
            alt="Hệ Thống Taekwondo Văn Quán"
            className={styles.logoImage}
          />
        </div>

        {/* Tagline */}
        <div className="text-center mt-2">
          <p
            className="text-white/80 tracking-widest uppercase"
            style={{ fontSize: "11px", letterSpacing: "3px" }}
          >
            Chào mừng trở lại
          </p>
          <p className="text-white/50 mt-1" style={{ fontSize: "11px" }}>
            Đăng nhập để quản lý hệ thống
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-2 w-36">
          <div className="flex-1 h-px bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="flex-1 h-px bg-white/20" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
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
          {/* ── Left: Logo Panel ── */}
          <LeftPanel />

          {/* ── Right: Login Form ── */}
          <div className={styles.rightPanel}>
            {/* Header */}
            <div className="mb-8">
              <h2
                className="text-[#1a1a2e]"
                style={{ fontSize: "26px", fontWeight: 700 }}
              >
                Đăng Nhập
              </h2>
              <p className="text-[#8a8fa8] mt-1" style={{ fontSize: "14px" }}>
                Vui lòng nhập thông tin tài khoản của bạn
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Phone Field */}
              <div>
                <label
                  className="block text-[#3d3d5c] mb-1.5"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  Số điện thoại
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c0392b]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[18px] h-[18px]"
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
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e5e8f0] bg-[#f8f9fc] text-[#1a1a2e] placeholder-[#b0b5c8] outline-none transition-all focus:border-[#c0392b] focus:bg-white"
                    style={{ fontSize: "14px" }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="block text-[#3d3d5c] mb-1.5"
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c0392b]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[18px] h-[18px]"
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
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-[#e5e8f0] bg-[#f8f9fc] text-[#1a1a2e] placeholder-[#b0b5c8] outline-none transition-all focus:border-[#c0392b] focus:bg-white"
                    style={{ fontSize: "14px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b0b5c8] hover:text-[#c0392b] transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[18px] h-[18px]"
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
                        className="w-[18px] h-[18px]"
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

                {/* Forgot password */}
                <div className="flex justify-end mt-2">
                  <a
                    href="#"
                    className="text-[#c0392b] hover:text-[#96281b] transition-colors"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
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
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className={`${styles.spinner} w-4 h-4`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
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
            <div className="flex items-center my-6 gap-3">
              <div className="flex-1 h-px bg-[#e8eaf2]" />
              <span className="text-[#c0c4d6]" style={{ fontSize: "12px" }}>
                hoặc
              </span>
              <div className="flex-1 h-px bg-[#e8eaf2]" />
            </div>

            {/* Register link */}
            <p
              className="text-center text-[#8a8fa8]"
              style={{ fontSize: "14px" }}
            >
              Chưa có tài khoản?{" "}
              <a
                href="#"
                className="text-[#c0392b] hover:text-[#96281b] transition-colors"
                style={{ fontWeight: 600 }}
              >
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
