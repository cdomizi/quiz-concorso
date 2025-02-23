import { createLink, LinkComponent } from "@tanstack/react-router";
import { ButtonHTMLAttributes, Ref } from "react";

type BasicLinkProps = {
  ref: Ref<HTMLButtonElement>;
  children?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BasicLinkComponent = (props: BasicLinkProps) => {
  return <button {...props}>{props.children}</button>;
};

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const ButtonLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};
