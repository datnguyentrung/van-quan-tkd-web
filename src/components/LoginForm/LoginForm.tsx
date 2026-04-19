import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 1. Thêm import chuyển trang
import { useLogin } from "../../features/auth/api/useAuthentication";
import styles from "./LoginForm.module.scss";

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // ✅ 2. Khởi tạo hàm chuyển trang

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ 3. Sửa lại chỗ gọi login: Thêm cục onSuccess để cất token và bay sang Dashboard
    login(
      {
        phoneNumber,
        password,
        idDevice: navigator.userAgent,
      },
      {
        onSuccess: (response: any) => {
          // Lấy token từ API trả về (tùy theo API của ông ghi là access_token hay accessToken)
          const token = response?.access_token || response?.accessToken; 
          
          if (token) {
            // Cất vé vào ví (localStorage)
            localStorage.setItem("access_token", token);
          }
          
          // Chuyển thẳng sang Dashboard
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error("Lỗi đăng nhập:", error);
          alert("Sai tài khoản hoặc mật khẩu!");
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Số điện thoại */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="phoneNumber">
          Số điện thoại
        </label>
        <div className={styles.inputWrapper}>
          <Phone className={styles.inputIcon} />
          <input
            id="phoneNumber"
            type="tel"
            className={styles.formInput}
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Mật khẩu */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="password">
          Mật khẩu
        </label>
        <div className={styles.inputWrapper}>
          <Lock className={styles.inputIcon} />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={`${styles.formInput} ${styles.passwordInput}`}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#" className={styles.forgotLink}>
            Quên mật khẩu?
          </a>
        </div>
      </div>

      {/* Nút đăng nhập */}
      <button type="submit" className={styles.loginButton} disabled={isPending}>
        {isPending ? (
          <span className={styles.loadingContent}>
            <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="60"
                strokeDashoffset="20"
              />
            </svg>
            Đang đăng nhập...
          </span>
        ) : (
          "Đăng nhập"
        )}
      </button>
    </form>
  );
}