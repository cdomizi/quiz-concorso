import { Link, NotFoundRouteComponent } from "@tanstack/react-router";

export const NotFound: NotFoundRouteComponent = () => {
  return (
    <div>
      <h1>Pagina non trovata</h1>
      <Link to="/home">Torna alla home</Link>
    </div>
  );
};
