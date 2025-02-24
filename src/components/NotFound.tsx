import { ButtonLink } from "@components/ButtonLink";
import { NotFoundRouteComponent } from "@tanstack/react-router";

export const NotFound: NotFoundRouteComponent = () => {
  return (
    <div>
      <h1>Pagina non trovata</h1>
      <ButtonLink to="/">Torna alla home</ButtonLink>
    </div>
  );
};
