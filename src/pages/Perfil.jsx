import { useEffect, useState } from "react";

const IconPackage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
);
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconAlertTriangle = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

function Perfil() {
  const [tab, setTab] = useState("pedidos");
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [perfil, setPerfil] = useState({ nombre: "", email: "", telefono: "" });
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [perfilForm, setPerfilForm] = useState({ nombre: "", email: "", telefono: "" });
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);
  const [mensajePerfil, setMensajePerfil] = useState("");

  const [direcciones, setDirecciones] = useState([]);
  const [cargandoDirs, setCargandoDirs] = useState(false);
  const [mostrarFormDir, setMostrarFormDir] = useState(false);
  const [editandoDir, setEditandoDir] = useState(null);
  const [formDir, setFormDir] = useState({ calle: "", numero: "", piso: "", localidad: "", provincia: "", codigoPostal: "" });
  const [guardandoDir, setGuardandoDir] = useState(false);
  const [errorDir, setErrorDir] = useState("");
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
  const [confirmTexto, setConfirmTexto] = useState("");
  const [eliminandoCuenta, setEliminandoCuenta] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState("");

  const nombre = localStorage.getItem("clienteNombre");
  const email = localStorage.getItem("clienteEmail");
  const token = localStorage.getItem("clienteToken");
  const authHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) { window.location.href = "/login"; return; }
    cargarPedidos();
    cargarPerfil();
    cargarDirecciones();
  }, []);

  const cargarPedidos = async () => {
    setCargando(true);
    try {
      const res = await fetch("https://funtechstore-production.up.railway.app/mis-pedidos", { headers: authHeader });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("clienteToken");
        localStorage.removeItem("clienteEmail");
        localStorage.removeItem("clienteNombre");
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setPedidos(Array.isArray(data) ? data : []);
    } catch { setError("No pudimos cargar tus pedidos."); }
    finally { setCargando(false); }
  };

  const cargarPerfil = async () => {
    try {
      const res = await fetch("https://funtechstore-production.up.railway.app/perfil", { headers: authHeader });
      const data = await res.json();
      const p = { nombre: data.nombre || "", email: data.email || "", telefono: data.telefono || "" };
      setPerfil(p); setPerfilForm(p);
    } catch {}
  };

  const cargarDirecciones = async () => {
    setCargandoDirs(true);
    try {
      const res = await fetch("https://funtechstore-production.up.railway.app/direcciones", { headers: authHeader });
      const data = await res.json();
      setDirecciones(Array.isArray(data) ? data : []);
    } catch {}
    finally { setCargandoDirs(false); }
  };

  const guardarPerfil = async () => {
    setGuardandoPerfil(true); setMensajePerfil("");
    try {
      const res = await fetch("https://funtechstore-production.up.railway.app/perfil", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify(perfilForm)
      });
      const data = await res.json();
      if (res.ok) {
        setPerfil(perfilForm);
        localStorage.setItem("clienteNombre", perfilForm.nombre);
        localStorage.setItem("clienteEmail", perfilForm.email);
        setEditandoPerfil(false);
        setMensajePerfil("Perfil actualizado correctamente");
        setTimeout(() => setMensajePerfil(""), 3000);
      } else { setMensajePerfil(data.message || "Error al guardar"); }
    } catch { setMensajePerfil("Error de conexión"); }
    finally { setGuardandoPerfil(false); }
  };

  const abrirFormDir = (dir = null) => {
    setErrorDir("");
    if (dir) {
      setEditandoDir(dir._id);
      setFormDir({ calle: dir.calle, numero: dir.numero, piso: dir.piso || "", localidad: dir.localidad, provincia: dir.provincia, codigoPostal: dir.codigoPostal });
    } else {
      setEditandoDir(null);
      setFormDir({ calle: "", numero: "", piso: "", localidad: "", provincia: "", codigoPostal: "" });
    }
    setMostrarFormDir(true);
  };

  const cerrarFormDir = () => { setMostrarFormDir(false); setEditandoDir(null); setErrorDir(""); };

  const guardarDir = async () => {
    if (!formDir.calle || !formDir.numero || !formDir.localidad || !formDir.provincia || !formDir.codigoPostal)
      return setErrorDir("Completá todos los campos obligatorios");
    setGuardandoDir(true); setErrorDir("");
    try {
      const url = editandoDir ? `https://funtechstore-production.up.railway.app/direcciones/${editandoDir}` : "https://funtechstore-production.up.railway.app/direcciones";
      const res = await fetch(url, {
        method: editandoDir ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify(formDir)
      });
      const data = await res.json();
      if (res.ok) { setDirecciones(data.direcciones); cerrarFormDir(); }
      else { setErrorDir(data.message || "Error al guardar"); }
    } catch { setErrorDir("Error de conexión"); }
    finally { setGuardandoDir(false); }
  };

  const eliminarDir = async (id) => {
    if (!confirm("¿Eliminar esta dirección?")) return;
    try {
      const res = await fetch(`https://funtechstore-production.up.railway.app/direcciones/${id}`, { method: "DELETE", headers: authHeader });
      const data = await res.json();
      if (res.ok) setDirecciones(data.direcciones);
    } catch {}
  };

  const eliminarCuenta = async () => {
    if (confirmTexto !== "ELIMINAR") return setErrorEliminar('Escribí "ELIMINAR" para confirmar');
    setEliminandoCuenta(true); setErrorEliminar("");
    try {
      const res = await fetch("https://funtechstore-production.up.railway.app/cuenta", {
        method: "DELETE",
        headers: authHeader
      });
      if (res.ok) {
        localStorage.removeItem("clienteToken");
        localStorage.removeItem("clienteEmail");
        localStorage.removeItem("clienteNombre");
        window.location.href = "/";
      } else {
        const data = await res.json();
        setErrorEliminar(data.message || "Error al eliminar la cuenta");
      }
    } catch { setErrorEliminar("Error de conexión"); }
    finally { setEliminandoCuenta(false); }
  };

  const colorEstado = (estado) => ({
    pendiente: { bg: "#fff3cd", color: "#856404" },
    pagado:    { bg: "#d1ecf1", color: "#0c5460" },
    Enviado:   { bg: "#cce5ff", color: "#004085" },
    Entregado: { bg: "#d4edda", color: "#155724" },
    rechazado: { bg: "#f8d7da", color: "#721c24" }
  }[estado] || { bg: "#eee", color: "#333" });

  const PASOS = ["pendiente", "pagado", "Enviado", "Entregado"];
  const PASO_LABEL = ["Pendiente", "Pagado", "Enviado", "Entregado"];
  const pasoIndex = (estado) => PASOS.indexOf(estado);
  const porcentajeLinea = (idx) => ["0%", "33%", "66%", "calc(100% - 32px)"][Math.max(0, idx)] || "0%";

  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #e8e8e8", fontSize: "14px", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s", boxSizing: "border-box" };
  const labelStyle = { display: "block", fontSize: "11px", fontWeight: "700", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px" };

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", padding: "40px 20px", fontFamily: "'DM Sans', sans-serif" }}>

      {/* MODAL ELIMINAR CUENTA */}
      {modalEliminarAbierto && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(4px)" }}
          onClick={() => { setModalEliminarAbierto(false); setConfirmTexto(""); setErrorEliminar(""); }}>
          <div style={{ background: "white", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "420px", boxShadow: "0 30px 80px rgba(0,0,0,0.25)", animation: "fadeUp 0.3s ease" }}
            onClick={e => e.stopPropagation()}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "28px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#dc2626", marginBottom: "16px" }}>
                <IconAlertTriangle />
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: "19px", fontWeight: "700", color: "#111" }}>¿Eliminar tu cuenta?</h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#888", lineHeight: 1.6 }}>
                Esta acción es <strong style={{ color: "#dc2626" }}>permanente e irreversible</strong>. Se borrarán tus datos, direcciones e historial de pedidos.
              </p>
            </div>

            {errorEliminar && (
              <div style={{ background: "#fef2f2", color: "#dc2626", borderRadius: "10px", padding: "11px 14px", fontSize: "13px", fontWeight: "500", marginBottom: "16px", border: "1px solid #fecaca" }}>
                {errorEliminar}
              </div>
            )}

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                Escribí <span style={{ color: "#dc2626", fontFamily: "monospace" }}>ELIMINAR</span> para confirmar
              </label>
              <input
                type="text"
                placeholder="ELIMINAR"
                value={confirmTexto}
                onChange={e => { setConfirmTexto(e.target.value); setErrorEliminar(""); }}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "11px", border: `1.5px solid ${confirmTexto === "ELIMINAR" ? "#dc2626" : "#e8e8e8"}`, fontSize: "14px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s", textAlign: "center", fontWeight: "700", letterSpacing: "2px" }}
                onFocus={e => e.target.style.borderColor = confirmTexto === "ELIMINAR" ? "#dc2626" : "#111"}
                onBlur={e => e.target.style.borderColor = confirmTexto === "ELIMINAR" ? "#dc2626" : "#e8e8e8"}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => { setModalEliminarAbierto(false); setConfirmTexto(""); setErrorEliminar(""); }}
                style={{ flex: 1, padding: "13px", border: "1.5px solid #e8e8e8", borderRadius: "12px", background: "white", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>
                Cancelar
              </button>
              <button onClick={eliminarCuenta} disabled={eliminandoCuenta || confirmTexto !== "ELIMINAR"}
                style={{ flex: 1, padding: "13px", background: confirmTexto === "ELIMINAR" ? "#dc2626" : "#f0f0f0", color: confirmTexto === "ELIMINAR" ? "white" : "#bbb", border: "none", borderRadius: "12px", fontWeight: "700", cursor: confirmTexto === "ELIMINAR" ? "pointer" : "not-allowed", fontFamily: "inherit", fontSize: "14px", transition: "all 0.2s" }}>
                {eliminandoCuenta ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ background: "white", borderRadius: "20px", padding: "32px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#ffd000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: "700", flexShrink: 0, color: "#111" }}>
            {(perfil.nombre || nombre || "?").charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#111" }}>{perfil.nombre || nombre || "Cliente"}</h2>
            <p style={{ margin: "4px 0 0", color: "#aaa", fontSize: "13px" }}>{perfil.email || email}</p>
            {perfil.telefono && <p style={{ margin: "2px 0 0", color: "#aaa", fontSize: "13px" }}>{perfil.telefono}</p>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
            <a href="/" style={{ textDecoration: "none", fontSize: "13px", color: "#aaa" }}>← Volver a la tienda</a>
            <button onClick={() => { localStorage.removeItem("clienteToken"); localStorage.removeItem("clienteEmail"); localStorage.removeItem("clienteNombre"); window.location.href = "/"; }}
              style={{ background: "#111", color: "white", border: "none", padding: "8px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {[
            { id: "pedidos", label: "Mis pedidos", icon: <IconPackage /> },
            { id: "cuenta", label: "Mi cuenta", icon: <IconUser /> },
            { id: "direcciones", label: "Mis direcciones", icon: <IconMapPin /> }
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "12px", border: "none",
              background: tab === t.id ? "#111" : "white", color: tab === t.id ? "#ffd000" : "#666",
              fontWeight: "600", fontSize: "14px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "all 0.2s", fontFamily: "inherit"
            }}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* ─── PEDIDOS ─── */}
        {tab === "pedidos" && (
          <>
            {cargando && <p style={{ color: "#aaa", textAlign: "center", padding: "40px" }}>Cargando pedidos...</p>}
            {error && <div style={{ background: "#fef2f2", borderRadius: "12px", padding: "20px", textAlign: "center", color: "#dc2626" }}>{error}</div>}
            {!cargando && !error && pedidos.length === 0 && (
              <div style={{ background: "white", borderRadius: "20px", padding: "60px 40px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <div style={{ color: "#ddd", marginBottom: "16px", display: "flex", justifyContent: "center" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  </svg>
                </div>
                <p style={{ color: "#aaa", fontSize: "15px", margin: "0 0 20px" }}>Todavía no hiciste ningún pedido</p>
                <a href="/catalogo" style={{ display: "inline-block", background: "#ffd000", padding: "12px 28px", borderRadius: "30px", fontWeight: "700", textDecoration: "none", color: "#111", fontSize: "14px" }}>
                  Explorar productos
                </a>
              </div>
            )}
            {pedidos.map((pedido) => {
              const total = pedido.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
              const { bg, color } = colorEstado(pedido.estado);
              const fecha = new Date(pedido.createdAt).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
              const idx = pasoIndex(pedido.estado);
              return (
                <div key={pedido._id} style={{ background: "white", borderRadius: "20px", padding: "28px", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: "12px", color: "#bbb" }}>{fecha}</p>
                      <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#bbb" }}>#{pedido._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <span style={{ background: bg, color, padding: "5px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                      {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                    </span>
                  </div>
                  {pedido.estado === "rechazado" ? (
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "14px 18px", marginBottom: "20px" }}>
                      <p style={{ margin: 0, fontWeight: "700", fontSize: "14px", color: "#dc2626" }}>Pago rechazado</p>
                      <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#f87171" }}>El pago no fue procesado. Podés intentar nuevamente.</p>
                    </div>
                  ) : (
                    <div style={{ marginBottom: "24px", padding: "18px", background: "#fafafa", borderRadius: "14px" }}>
                      <p style={{ margin: "0 0 16px", fontSize: "11px", fontWeight: "700", color: "#bbb", textTransform: "uppercase", letterSpacing: "1px" }}>Seguimiento</p>
                      <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                        <div style={{ position: "absolute", top: "15px", left: "16px", right: "16px", height: "3px", background: "#ebebeb", zIndex: 0, borderRadius: "2px" }} />
                        <div style={{ position: "absolute", top: "15px", left: "16px", height: "3px", background: "#ffd000", zIndex: 1, borderRadius: "2px", width: porcentajeLinea(idx), transition: "width 0.6s ease" }} />
                        {PASOS.map((paso, i) => {
                          const activo = i <= idx; const esCurrent = i === idx;
                          return (
                            <div key={paso} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2, flex: 1 }}>
                              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: activo ? "#ffd000" : "white", border: esCurrent ? "3px solid #111" : activo ? "3px solid #ffd000" : "3px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", boxShadow: esCurrent ? "0 0 0 4px rgba(255,208,0,0.25)" : "none" }}>
                                {activo && ["⏱","💳","🚚","✅"][i]}
                              </div>
                              <span style={{ fontSize: "10px", fontWeight: esCurrent ? "700" : "500", color: activo ? "#111" : "#ccc", textAlign: "center" }}>{PASO_LABEL[i]}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {pedido.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f5f5f5", fontSize: "14px" }}>
                      <span style={{ color: "#555" }}>{item.nombre} × {item.cantidad}</span>
                      <span style={{ fontWeight: "700" }}>${item.precio * item.cantidad}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px", fontWeight: "700", fontSize: "16px" }}>
                    <span>Total</span><span>${total}</span>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ─── CUENTA ─── */}
        {tab === "cuenta" && (
          <div style={{ background: "white", borderRadius: "20px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "700" }}>Información de la cuenta</h3>
              {!editandoPerfil && (
                <button onClick={() => { setEditandoPerfil(true); setPerfilForm({ ...perfil }); setMensajePerfil(""); }}
                  style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f4f4f4", border: "none", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" }}>
                  <IconEdit /> Editar
                </button>
              )}
            </div>
            {mensajePerfil && (
              <div style={{ background: mensajePerfil.includes("Error") ? "#fef2f2" : "#f0fdf4", color: mensajePerfil.includes("Error") ? "#dc2626" : "#15803d", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", marginBottom: "20px" }}>
                {mensajePerfil}
              </div>
            )}
            {!editandoPerfil ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[{ label: "Nombre", value: perfil.nombre }, { label: "Email", value: perfil.email }, { label: "Teléfono", value: perfil.telefono || "No especificado" }].map(({ label, value }) => (
                  <div key={label}>
                    <p style={labelStyle}>{label}</p>
                    <p style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: value === "No especificado" ? "#bbb" : "#111" }}>{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { label: "Nombre *", key: "nombre", type: "text", placeholder: "Tu nombre" },
                  { label: "Email *", key: "email", type: "email", placeholder: "tu@email.com" },
                  { label: "Teléfono", key: "telefono", type: "tel", placeholder: "+54 9 341..." }
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input type={type} placeholder={placeholder} value={perfilForm[key]}
                      onChange={e => setPerfilForm({ ...perfilForm, [key]: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#111"}
                      onBlur={e => e.target.style.borderColor = "#e8e8e8"} />
                  </div>
                ))}
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <button onClick={() => { setEditandoPerfil(false); setMensajePerfil(""); }}
                    style={{ flex: 1, padding: "12px", border: "1.5px solid #e8e8e8", borderRadius: "10px", background: "white", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <IconX /> Cancelar
                  </button>
                  <button onClick={guardarPerfil} disabled={guardandoPerfil}
                    style={{ flex: 2, padding: "12px", background: "#111", color: "#ffd000", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <IconCheck /> {guardandoPerfil ? "Guardando..." : "Guardar cambios"}
                  </button>
                </div>
              </div>
            )}

            {/* Zona de peligro */}
            <div style={{ marginTop: "32px", borderTop: "1px solid #f0f0f0", paddingTop: "28px" }}>
              <p style={{ margin: "0 0 6px", fontSize: "13px", fontWeight: "700", color: "#dc2626" }}>Zona de peligro</p>
              <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#aaa" }}>Una vez que eliminás tu cuenta, no hay vuelta atrás.</p>
              <button onClick={() => { setModalEliminarAbierto(true); setConfirmTexto(""); setErrorEliminar(""); }}
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fecaca", borderRadius: "10px", padding: "10px 18px", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.borderColor = "#dc2626"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.borderColor = "#fecaca"; }}>
                <IconTrash /> Eliminar mi cuenta
              </button>
            </div>
          </div>
        )}

        {/* ─── DIRECCIONES ─── */}
        {tab === "direcciones" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "700" }}>Mis direcciones</h3>
              {!mostrarFormDir && (
                <button onClick={() => abrirFormDir()}
                  style={{ display: "flex", alignItems: "center", gap: "6px", background: "#111", color: "#ffd000", border: "none", borderRadius: "10px", padding: "10px 16px", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>
                  <IconPlus /> Agregar
                </button>
              )}
            </div>

            {mostrarFormDir && (
              <div style={{ background: "white", borderRadius: "20px", padding: "28px", marginBottom: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h4 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700" }}>{editandoDir ? "Editar dirección" : "Nueva dirección"}</h4>
                {errorDir && <div style={{ background: "#fef2f2", color: "#dc2626", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", marginBottom: "16px" }}>{errorDir}</div>}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {[
                    { label: "Calle *", key: "calle", placeholder: "Nombre de la calle", full: true },
                    { label: "Número *", key: "numero", placeholder: "1234" },
                    { label: "Piso/Depto", key: "piso", placeholder: "3° B (opcional)" },
                    { label: "Localidad *", key: "localidad", placeholder: "Rosario" },
                    { label: "Provincia *", key: "provincia", placeholder: "Santa Fe" },
                    { label: "Código Postal *", key: "codigoPostal", placeholder: "2000" }
                  ].map(({ label, key, placeholder, full }) => (
                    <div key={key} style={{ gridColumn: full ? "1 / -1" : "auto" }}>
                      <label style={labelStyle}>{label}</label>
                      <input placeholder={placeholder} value={formDir[key]}
                        onChange={e => setFormDir({ ...formDir, [key]: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#111"}
                        onBlur={e => e.target.style.borderColor = "#e8e8e8"} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                  <button onClick={cerrarFormDir}
                    style={{ flex: 1, padding: "12px", border: "1.5px solid #e8e8e8", borderRadius: "10px", background: "white", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <IconX /> Cancelar
                  </button>
                  <button onClick={guardarDir} disabled={guardandoDir}
                    style={{ flex: 2, padding: "12px", background: "#111", color: "#ffd000", border: "none", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <IconCheck /> {guardandoDir ? "Guardando..." : "Guardar dirección"}
                  </button>
                </div>
              </div>
            )}

            {cargandoDirs && <p style={{ color: "#aaa", textAlign: "center", padding: "20px" }}>Cargando...</p>}

            {!cargandoDirs && direcciones.length === 0 && !mostrarFormDir && (
              <div style={{ background: "white", borderRadius: "20px", padding: "48px 40px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <div style={{ color: "#ddd", marginBottom: "12px", display: "flex", justifyContent: "center" }}><IconMapPin /></div>
                <p style={{ color: "#aaa", fontSize: "14px", margin: "0 0 20px" }}>No tenés direcciones guardadas</p>
                <button onClick={() => abrirFormDir()}
                  style={{ background: "#ffd000", border: "none", padding: "11px 24px", borderRadius: "20px", fontWeight: "700", cursor: "pointer", fontSize: "14px", fontFamily: "inherit" }}>
                  Agregar dirección
                </button>
              </div>
            )}

            {direcciones.map(dir => (
              <div key={dir._id} style={{ background: "white", borderRadius: "16px", padding: "20px 24px", marginBottom: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                <div>
                  <p style={{ margin: 0, fontWeight: "700", fontSize: "15px", color: "#111" }}>
                    {dir.calle} {dir.numero}{dir.piso ? `, ${dir.piso}` : ""}
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#888" }}>
                    {dir.localidad}, {dir.provincia} — CP {dir.codigoPostal}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button onClick={() => abrirFormDir(dir)}
                    style={{ background: "#f4f4f4", border: "none", borderRadius: "8px", padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "600", fontFamily: "inherit" }}>
                    <IconEdit /> Editar
                  </button>
                  <button onClick={() => eliminarDir(dir._id)}
                    style={{ background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: "8px", padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "600", fontFamily: "inherit" }}>
                    <IconTrash /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Perfil;
