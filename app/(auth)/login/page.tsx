"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiPost, saveToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await apiPost<{ token?: string; email: string }>("/auth/login", { email, password });
      // Save token for cross-domain auth
      if (res.token) saveToken(res.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      {/* Left panel */}
      <div style={{ width:"45%", background:"#060d1f", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", padding:"3rem",
        position:"relative", overflow:"hidden" }} className="login-left">
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse 60% 70% at 60% 40%, rgba(15,212,180,0.07) 0%, transparent 70%)" }}/>
        <div style={{ position:"relative", zIndex:1, textAlign:"center", maxWidth:320 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            gap:10, marginBottom:"2rem" }}>
            <div style={{ width:40, height:40, borderRadius:10,
              background:"rgba(15,212,180,0.12)",
              border:"1px solid rgba(15,212,180,0.25)",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg viewBox="0 0 16 16" fill="none" width="18" height="18">
                <polyline points="1,13 5,7 9,10 15,3" stroke="#0fd4b4"
                  strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="15" cy="3" r="1.8" fill="#22c55e"/>
              </svg>
            </div>
            <span style={{ fontSize:"1.3rem", fontWeight:800, color:"#f0f6ff",
              letterSpacing:"-0.03em" }}>
              PSX<span style={{ color:"#0fd4b4" }}>.</span>Analysis
            </span>
          </div>
          <h2 style={{ fontSize:"1.5rem", fontWeight:800, color:"#f0f6ff",
            letterSpacing:"-0.03em", margin:"0 0 0.75rem" }}>
            Pakistan&apos;s Investment Intelligence Platform
          </h2>
          <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.4)",
            lineHeight:1.75, margin:"0 0 2rem" }}>
            Technical analysis, sector benchmarking, and AI-powered signals for PSX stocks.
          </p>
          {[
            "20+ technical indicators",
            "Buy / Hold / Sell signals",
            "Sector peer comparison",
            "Real-time PSX data",
          ].map(f => (
            <div key={f} style={{ display:"flex", alignItems:"center", gap:8,
              marginBottom:8, textAlign:"left" }}>
              <span style={{ width:16, height:16, borderRadius:"50%",
                background:"rgba(15,212,180,0.15)",
                border:"1px solid rgba(15,212,180,0.3)",
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, fontSize:"0.55rem", color:"#0fd4b4" }}>✓</span>
              <span style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.45)" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, background:"#050c1a", display:"flex",
        alignItems:"center", justifyContent:"center", padding:"2rem" }}>
        <div style={{ width:"100%", maxWidth:380 }}>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#f0f6ff",
            letterSpacing:"-0.03em", margin:"0 0 6px" }}>Welcome back</h1>
          <p style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.35)",
            margin:"0 0 2rem" }}>Sign in to your PSX Analysis account</p>

          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <div>
              <label style={{ display:"block", fontSize:"0.7rem", fontWeight:700,
                letterSpacing:"0.06em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.35)", marginBottom:6 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="you@example.com"
                style={{ width:"100%", padding:"0.7rem 0.9rem",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  borderRadius:9, color:"#f0f6ff", fontSize:"0.88rem",
                  fontFamily:"'Plus Jakarta Sans',sans-serif",
                  outline:"none", transition:"border-color 0.15s" }}
                onFocus={e => (e.target.style.borderColor="rgba(15,212,180,0.4)")}
                onBlur={e  => (e.target.style.borderColor="rgba(255,255,255,0.1)")}/>
            </div>

            <div>
              <label style={{ display:"block", fontSize:"0.7rem", fontWeight:700,
                letterSpacing:"0.06em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.35)", marginBottom:6 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                required placeholder="••••••••"
                style={{ width:"100%", padding:"0.7rem 0.9rem",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  borderRadius:9, color:"#f0f6ff", fontSize:"0.88rem",
                  fontFamily:"'Plus Jakarta Sans',sans-serif",
                  outline:"none", transition:"border-color 0.15s" }}
                onFocus={e => (e.target.style.borderColor="rgba(15,212,180,0.4)")}
                onBlur={e  => (e.target.style.borderColor="rgba(255,255,255,0.1)")}/>
            </div>

            {error && (
              <div style={{ padding:"0.65rem 0.9rem",
                background:"rgba(239,68,68,0.1)",
                border:"1px solid rgba(239,68,68,0.25)",
                borderRadius:8, fontSize:"0.75rem", color:"#f87171" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ padding:"0.8rem",
                background:loading?"rgba(15,212,180,0.5)":"#0fd4b4",
                color:"#060d1f", border:"none", borderRadius:9,
                fontSize:"0.88rem", fontWeight:700,
                cursor:loading?"not-allowed":"pointer",
                fontFamily:"'Plus Jakarta Sans',sans-serif",
                transition:"all 0.15s",
                marginTop:4 }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign:"center", fontSize:"0.75rem",
            color:"rgba(255,255,255,0.3)", marginTop:"1.5rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color:"#0fd4b4", textDecoration:"none", fontWeight:600 }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @media (max-width: 768px) { .login-left { display: none !important; } }
        input::placeholder { color: rgba(255,255,255,0.2) !important; }
      `}</style>
    </div>
  );
}