"use client";

import { useRef } from "react";

export default function SiteMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");

  const menuItems = [
    {
      title: "Home",
      description: "Software developer in Melbourne.",
      href: "#top",
      external: false,
    },
    {
      title: "Projects",
      description: "Client, team and independent work.",
      href: "#work",
      external: false,
    },
    {
      title: "About",
      description: "A little about me.",
      href: "#about",
      external: false,
    },
    {
      title: "Resume",
      description: "View my resume.",
      href: "/Soeun-Kwon-Resume.pdf",
      external: true,
    },
    {
      title: "Contact",
      description: "Let’s connect.",
      href: "#contact",
      external: false,
    },
  ];

  function open() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function close() {
    const element = dialog.current;
    if (!element) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.close();
      return;
    }

    const animation = element.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(-110%)" },
      ],
      {
        duration: 700,
        easing: "cubic-bezier(.165,.84,.44,1)",
      }
    );

    animation.onfinish = () => element.close();
  }

  return (
    <>
      <button
        className="menuTrigger"
        type="button"
        ref={trigger}
        onClick={open}
        aria-haspopup="dialog"
      >
        Menu <span aria-hidden="true">＋</span>
      </button>

      <dialog
        className="siteMenu"
        ref={dialog}
        aria-label="Site navigation"
        onClose={() => {
          document.body.style.overflow = previousOverflow.current;
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <div className="menuHeader">
          <span>Soeun Kwon</span>
          <button type="button" onClick={close}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav aria-label="Main navigation">
          {menuItems.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              onClick={() => {
                if (!item.external) {
                  dialog.current?.close();
                }
              }}
              style={{
                animationDelay: `${index * 250 + 750}ms`,
              }}
            >
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </a>
          ))}
        </nav>

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

      <noscript>
        <a href="#work">Projects</a> /{" "}
        <a href="#about">About</a> /{" "}
        <a
          href="/Soeun-Kwon-Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>{" "}
        / <a href="#contact">Contact</a>
      </noscript>
    </>
  );
}