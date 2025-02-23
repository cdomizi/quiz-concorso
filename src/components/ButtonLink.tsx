import { createLink, LinkComponent } from "@tanstack/react-router";
import { ButtonHTMLAttributes, HTMLAttributes, Ref } from "react";

type BasicLinkProps = {
  // Add any additional props you want to pass to the anchor element
  className: Pick<HTMLAttributes<HTMLButtonElement>, "className">;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BasicLinkComponent = ({
  ref,
  children,
  ...props
}: {
  ref: Ref<HTMLButtonElement>;
  children?: string;
  props?: BasicLinkProps;
}) => {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
};

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const ButtonLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};
