"use client";

import { useRef } from "react";

export default function SiteMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  function open() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }
  function close() {
    const element = dialog.current;
    if (!element) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { element.close(); return; }
    const animation = element.animate([{ transform: "translateY(0)" }, { transform: "translateY(-110%)" }], { duration: 700, easing: "cubic-bezier(.165,.84,.44,1)" });
    animation.onfinish = () => element.close();
  }
  return <>
    <button className="menuTrigger" type="button" ref={trigger} onClick={open} aria-haspopup="dialog">Menu <span aria-hidden="true">＋</span></button>
    <dialog className="siteMenu" ref={dialog} aria-label="Site navigation" onClose={() => { document.body.style.overflow = previousOverflow.current; trigger.current?.focus({ preventScroll: true }); }}>
      <div className="menuHeader"><span>Soeun Kwon</span><button type="button" onClick={close}>Close <span aria-hidden="true">×</span></button></div>
      <nav aria-label="Main navigation">{[["top", "Home", "Software developer in Melbourne."], ["work", "Projects", "Client, team and independent work."], ["about", "About", "A little about me."], ["contact", "Contact", "Let’s connect."]].map(([id, title, description], index) => <a key={id} href={`#${id}`} onClick={() => dialog.current?.close()} style={{ animationDelay: `${index * 250 + 750}ms` }}><strong>{title}</strong><span>{description}</span></a>)}</nav>
      <a
  className="menuEmail"
  href="mailto:elliekw2003@gmail.com"
>
  elliekw2003@gmail.com

  <svg
    className="externalArrow"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 12L12 4M6 4H12V10"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</a>
    </dialog>
    <noscript><a href="#work">Projects</a> / <a href="#about">About</a> / <a href="#contact">Contact</a></noscript>
  </>;
}
