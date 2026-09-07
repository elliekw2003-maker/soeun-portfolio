"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PortfolioMotion() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".heroChar", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 2, stagger: .02, ease: "power4.out", clearProps: "transform,opacity" });
      gsap.to(".hero", { opacity: .3, scale: .95, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.fromTo(".sectionTitle", { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: ".workSection", start: "top 80%", once: true } });
      gsap.fromTo(".projectIndex nav a", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: .8, stagger: .1, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: ".projectIndex", start: "top 70%", once: true } });
      gsap.utils.toArray<HTMLElement>(".project").forEach(project => {
        gsap.fromTo(project, { scale: .9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: project, start: "top 85%", once: true } });
      });
      gsap.fromTo(".aboutCopy", { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out", immediateRender: false, scrollTrigger: { trigger: ".aboutStory", start: "top 75%", once: true } });
      gsap.fromTo(".aboutGraphic", { scaleX: 1.23, scaleY: .94, opacity: 0 }, { scaleX: 1, scaleY: 1, opacity: 1, duration: 1.125, ease: "elastic.out(1,.4)", immediateRender: false, scrollTrigger: { trigger: ".aboutStory", start: "top 75%", once: true } });
      gsap.to(".graphicLayer", { y: -10, duration: 4, stagger: .35, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const ring = cursor.current;
      if (!ring) return;
      const xTo = gsap.quickTo(ring, "x", { duration: .18, ease: "power2.out" });
      const yTo = gsap.quickTo(ring, "y", { duration: .18, ease: "power2.out" });
      const trails = gsap.utils.toArray<HTMLElement>(".cursorTrail").map((element, index) => ({ element, x: gsap.quickTo(element, "x", { duration: .1 + index * .07 }), y: gsap.quickTo(element, "y", { duration: .1 + index * .07 }) }));
      function pointer(event: PointerEvent) {
        xTo(event.clientX); yTo(event.clientY);
        ring!.style.opacity = "1";
        ring!.classList.toggle("cursorHover", !!(event.target as Element).closest("a,button"));
        trails.forEach(trail => { trail.x(event.clientX); trail.y(event.clientY); trail.element.style.visibility = "visible"; });
        const graphic = document.querySelector(".aboutGraphic");
        if (graphic) {
          const rect = graphic.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < innerHeight) gsap.utils.toArray<SVGElement>(".graphicLayer").forEach(layer => gsap.to(layer, { x: (event.clientX / innerWidth - .5) * Number(layer.dataset.depth), rotation: (event.clientY / innerHeight - .5) * 3, duration: .5, overwrite: "auto" }));
        }
      }
      function hide() { ring!.style.opacity = "0"; trails.forEach(trail => { trail.element.style.visibility = "hidden"; }); }
      window.addEventListener("pointermove", pointer);
      document.addEventListener("mouseleave", hide);
      window.addEventListener("keydown", hide);
      return () => { window.removeEventListener("pointermove", pointer); document.removeEventListener("mouseleave", hide); window.removeEventListener("keydown", hide); hide(); };
    });
    return () => media.revert();
  }, []);
  return <><div className="customCursor" ref={cursor} aria-hidden="true"><span /></div>{[14, 11.5, 9, 6.5, 4].map((size, index) => <div className="cursorTrail" key={size} aria-hidden="true" style={{ width: size, height: size, left: -size / 2, top: -size / 2, opacity: .15 - index * .025 }} />)}</>;
}
