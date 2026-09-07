"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import styles from "./ProjectGallery.module.css";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  revision?: string;
};

type ProjectGalleryProps = {
  projectTitle: string;
  images: readonly [GalleryImage, ...GalleryImage[]];
  aspectRatio: number;
  portrait?: boolean;
};

export default function ProjectGallery({
  projectTitle,
  images,
  aspectRatio,
  portrait = false,
}: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [actualSize, setActualSize] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const suppressClick = useRef(false);
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);
  const current = images[index];

  useEffect(() => {
    if (!expanded) return;
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; opener.current?.focus({ preventScroll: true }); };
  }, [expanded]);

  function enlarge(target: HTMLElement) {
    if (suppressClick.current) { suppressClick.current = false; return; }
    opener.current = target;
    setActualSize(false);
    setExpanded(true);
  }

  function move(direction: number) {
    setIndex((previous) => (previous + direction + images.length) % images.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (expanded || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") return;
    suppressClick.current = false;
    // A second finger cancels the swipe so pinch zoom stays a browser gesture.
    if (!event.isPrimary) {
      swipe.current = null;
      return;
    }
    swipe.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = swipe.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = Math.abs(event.clientX - start.x);
    const dy = Math.abs(event.clientY - start.y);
    // Once a vertical scroll starts, it must never become a slide change.
    if (dy > 12 && dy > dx) swipe.current = null;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClick.current = true;
      move(dx < 0 ? 1 : -1);
    }
  }

  return (
    <figure
      className={`${styles.gallery} ${portrait ? styles.portrait : ""}`}
      aria-label={`${projectTitle} screenshots`}
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <div
        className={styles.frame}
        style={{ aspectRatio }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { swipe.current = null; }}
        onLostPointerCapture={() => { swipe.current = null; }}
      >
        <button className={styles.imageButton} type="button" aria-label={`${projectTitle}: enlarge ${current.caption}`} onClick={event => enlarge(event.currentTarget)}>
        <Image
          key={current.src}
          src={current.revision ? `${current.src}?v=${current.revision}` : current.src}
          alt={current.alt}
          fill
          quality={90}
          className={styles.image}
          sizes={
            portrait
              ? "(max-width: 386px) calc(100vw - 66px), 320px"
              : "(max-width: 650px) calc(100vw - 66px), (max-width: 1000px) calc(100vw - 90px), (max-width: 1560px) calc(64vw - 143.76px), 855px"
          }
          draggable={false}
        />
        </button>
      </div>
      <figcaption className={styles.footer}>
        <span className={styles.caption}>
          {/* Reserve the tallest caption at every width without clipping text. */}
          {images.map((image) => (
            <span key={image.src} className={styles.captionSizer} aria-hidden="true">
              {image.caption}
            </span>
          ))}
          <span>{current.caption}</span>
        </span>
        <span className={styles.controls}>
          <span className={styles.counter}>{index + 1} / {images.length}</span>
          <button type="button" aria-label={`${projectTitle}: enlarge image`} onClick={event => enlarge(event.currentTarget)}><span aria-hidden="true">⤢</span></button>
          <button type="button" aria-label={`${projectTitle}: previous image`} onClick={() => move(-1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" aria-label={`${projectTitle}: next image`} onClick={() => move(1)}>
            <span aria-hidden="true">→</span>
          </button>
        </span>
      </figcaption>
      <p className={styles.status} aria-live="polite" aria-atomic="true">
        {index + 1} of {images.length}: {current.caption}
      </p>
      {expanded && <dialog ref={dialog} className={styles.lightbox} aria-label={`${projectTitle}: ${current.caption}, original image`} onClose={() => setExpanded(false)}>
        <div className={styles.lightboxHeader}><p>{current.caption} · {index + 1} / {images.length}</p><div><button type="button" aria-pressed={actualSize} onClick={() => setActualSize(value => !value)}>{actualSize ? "Fit to screen" : "Actual size"}</button><button type="button" autoFocus onClick={() => dialog.current?.close()}>Close ×</button></div></div>
        <div className={`${styles.originalFrame} ${actualSize ? styles.actualSize : ""}`} tabIndex={0} aria-label="Original image; scroll to inspect when actual size is selected">
          <Image src={current.src} alt={current.alt} width={current.width} height={current.height} unoptimized className={styles.original} style={actualSize ? { width: current.width } : undefined} />
        </div>
      </dialog>}
    </figure>
  );
}
