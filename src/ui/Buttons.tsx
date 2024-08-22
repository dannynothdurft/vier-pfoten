/*
    File: ui/Buttons.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

"use client";
import "@/styles/ui.scss";

import Link from "next/link";

export const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href} className="link-button">
      {text}
    </Link>
  );
};

export const LabelButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button className="btn ui-label-button" onClick={onClick}>
      {text}
    </button>
  );
};

export const LabelLinkButton = ({
  href,
  text,
}: {
  href: string;
  text: string;
}) => {
  return (
    <Link href={href} className="btn ui-label-button secondary">
      {text}
    </Link>
  );
};

export const IconLabelLinkButton = ({
  icon,
  href,
  text,
}: {
  icon: any;
  href: string;
  text: string;
}) => {
  return (
    <Link href={href} className="btn ui-label-button icon-label-button">
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export const IconButton = ({
  icon,
  onClick,
  Dref,
}: {
  icon: any;
  onClick: () => void;
  Dref?: string;
}) => {
  return (
    <button className="btn icon-button" onClick={onClick} data-ref={Dref}>
      {icon}
    </button>
  );
};
