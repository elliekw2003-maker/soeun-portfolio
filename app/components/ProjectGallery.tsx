"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import styles from "./ProjectGallery.module.css";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
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
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);
  const current = images[index];

  function move(direction: number) {
    setIndex((previous) => (previous + direction + images.length) % images.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") return;
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
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          className={styles.image}
          sizes={
            portrait
              ? "(max-width: 386px) calc(100vw - 66px), 320px"
              : "(max-width: 650px) calc(100vw - 66px), (max-width: 1000px) calc(100vw - 122px), (max-width: 1376px) calc(62.22vw - 126px), 731px"
          }
          draggable={false}
        />
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
    </figure>
  );
}
