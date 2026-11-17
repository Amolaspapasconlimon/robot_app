import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../api-connection/client";
import "../login.css";

function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function Robot() {
  return (
    <div className="robot" aria-hidden="true">
      <span className="robot-antenna" />
      <div className="robot-head">
        <span className="robot-ear robot-ear--left" />
        <span className="robot-ear robot-ear--right" />
        <div className="robot-face">
          <div className="robot-eyes">
            <span className="robot-eye" />
            <span className="robot-eye" />
          </div>
          <div className="robot-mouth">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "ok" | "error", text }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setMessage({
        type: "ok",
        text: `Enlace enviado a ${email}. Revisa tu correo.`,
      });
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "No pudimos enviar el enlace. Revisa el correo e inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

const handleGoogleLogin = async () => {
  setMessage(null);
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
    setMessage({
      type: "error",
      text: "No pudimos conectar con Google. Inténtalo de nuevo.",
    });
  }
};
  // Si ya hay sesión, manda al inicio. Si no, se queda en el login.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/");
    });
  }, [navigate]);

  return (
    <div className="login">
      <aside className="login-panel">
        <Robot />
        <p className="login-tagline">
          Busca un robot por nombre y descubre en qué mercado está.
        </p>
      </aside>

      <main className="login-main">
        <div className="login-card">
          <h1 className="login-title">Entra a tu cuenta</h1>
          <p className="login-lead">
            Usa tu cuenta de Google o recibe un enlace en tu correo. No
            necesitas contraseña.
          </p>

          <button
            type="button"
            className="btn btn--google"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <GoogleIcon />
            Continuar con Google
          </button>

          <div className="divider">o</div>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email" className="field-label">
              Correo
            </label>
            <input
              id="email"
              className="field-input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="tu-correo@nosequien.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>

          {message && (
            <p
              role="status"
              className={`message ${
                message.type === "error" ? "message--error" : ""
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Login;