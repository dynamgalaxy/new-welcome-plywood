"use client";
import { useState } from "react";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  return <div className="compare-panel" style={{ "--split": `${position}%` }} aria-label="Interior before and after comparison">
    <img className="compare-image" src="/assets/comparison/after.png" alt="Kitchen with finished walnut cabinetry" loading="lazy" decoding="async" draggable="false" />
    <img className="compare-image compare-image-before" src="/assets/comparison/before.png" alt="The same kitchen with gray cabinetry" loading="lazy" decoding="async" draggable="false" />
    <div className="compare-divider" aria-hidden="true"><span className="compare-handle">⠿</span></div>
    <span className="compare-label compare-label-before">Before</span>
    <span className="compare-label compare-label-after">After</span>
    <span className="compare-instruction">DRAG TO COMPARE</span>
    <input className="compare-range" type="range" min="0" max="100" value={position} onInput={(event) => setPosition(Number(event.currentTarget.value))} onChange={(event) => setPosition(Number(event.currentTarget.value))} aria-label="Reveal before and after interior preview" aria-valuetext={`${position}% before`} />
  </div>;
}
