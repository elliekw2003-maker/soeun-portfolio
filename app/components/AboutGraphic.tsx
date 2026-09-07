export default function AboutGraphic() {
  return <div className="aboutGraphic" aria-hidden="true">
    <svg viewBox="0 0 440 440" fill="none">
      <defs><pattern id="diagram-stripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0V12" stroke="currentColor" strokeWidth="3" /></pattern></defs>
      <g className="graphicLayer" data-depth="12"><circle cx="225" cy="228" r="160" fill="url(#diagram-stripes)" /><circle cx="340" cy="80" r="32" fill="var(--mint)" stroke="currentColor" strokeWidth="2" /></g>
      <g className="graphicLayer" data-depth="22"><rect x="64" y="100" width="282" height="214" rx="12" fill="var(--mint)" stroke="currentColor" strokeWidth="3" /><path d="M64 140H346" stroke="currentColor" strokeWidth="3" /><circle cx="85" cy="120" r="4" fill="currentColor" /><circle cx="102" cy="120" r="4" fill="currentColor" /><path d="M133 190L109 214L133 238M271 190L295 214L271 238M221 179L193 251" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></g>
      <g className="graphicLayer" data-depth="34"><rect x="245" y="267" width="127" height="91" rx="8" fill="var(--bg)" stroke="currentColor" strokeWidth="3" /><path d="M264 290H345M264 308H320M264 326H335" stroke="currentColor" strokeWidth="3" /><circle cx="70" cy="334" r="24" fill="var(--bg)" stroke="currentColor" strokeWidth="3" /><path d="M59 334L67 342L82 325" stroke="currentColor" strokeWidth="3" /></g>
    </svg>
  </div>;
}
