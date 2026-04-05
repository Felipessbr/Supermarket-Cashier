import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, tiposPermitidos }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (
    tiposPermitidos &&
    !tiposPermitidos.includes(usuario.tipo)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}