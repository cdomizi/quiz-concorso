import { NotFoundRouteComponent } from "@tanstack/react-router";
import { ButtonLink } from "./ButtonLink";

export const NotFound: NotFoundRouteComponent = () => {
  return (
    <div>
      <h1>Pagina non trovata</h1>
      <ButtonLink to="/home">Torna alla home</ButtonLink>
    </div>
  );
};
