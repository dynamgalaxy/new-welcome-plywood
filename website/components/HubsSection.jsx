"use client";
import { useState } from "react";
import { hubs } from "../lib/hubs";
import { pakistanPath } from "../lib/pakistanMap";

export default function HubsSection() {
  const [active, setActive] = useState(null);
  const hub = active === null ? null : hubs[active];

  return <section className="hubs-section section-wrap" aria-labelledby="hubs-title">
    <div className="hubs-heading"><span className="eyebrow">EXPLORE THE NETWORK</span><h2 id="hubs-title">Our hubs</h2><p>12 sample locations across Pakistan.</p></div>
    <div className="hubs-map">
      <div className="hubs-map-canvas" role="group" aria-label="Sample hub locations across Pakistan" onPointerLeave={(event) => { if (event.pointerType === "mouse") setActive(null); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}>
        <svg className="hubs-map-svg" viewBox="0 0 600 500" role="img" aria-label="Outline map of Pakistan"><defs><pattern id="pakistan-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.7" fill="#796d60"/></pattern></defs><path d={pakistanPath} fill="url(#pakistan-dots)" stroke="#7a6a59" strokeWidth=".8" strokeOpacity=".35"/></svg>
        {hubs.map((item, index) => <button key={item.id} className={`hub-pin${index === active ? " is-active" : ""}`} type="button" style={{ left: `${item.x}%`, top: `${item.y}%` }} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-label={`Show ${item.city} sample location`} aria-pressed={index === active}><svg viewBox="0 0 28 36" fill="none" aria-hidden="true"><path d="M14 2C7.9 2 3 6.9 3 13c0 8.3 11 20 11 20s11-11.7 11-20C25 6.9 20.1 2 14 2Z"/><circle cx="14" cy="13" r="4"/></svg></button>)}
        {hub && <article className={`hub-card${hub.y < 55 ? " hub-card-below" : ""}`} style={{ left: `${hub.x}%`, top: `${hub.y}%` }} aria-live="polite"><div className="hub-card-top"><span>LOCATION {String(hub.id).padStart(2, "0")} / 12</span><span>PREVIEW</span></div><h3>{hub.city}</h3><div className="hub-card-photo"><img key={hub.id} src={hub.image} alt="Illustrative wood and interior display" loading="lazy"/></div><a href={hub.directions} target="_blank" rel="noopener noreferrer" aria-label={`Get directions to ${hub.city} city area on Google Maps`}>Get directions on Google <span aria-hidden="true">↗</span></a></article>}
      </div>
    </div>
    <div className="hubs-mobile-picker"><label htmlFor="hub-location">Choose a location</label><select id="hub-location" value={active ?? ""} onChange={(event) => setActive(Number(event.target.value))}><option value="" disabled>Select a city</option>{hubs.map((item, index) => <option key={item.id} value={index}>{item.city}</option>)}</select></div>
  </section>;
}
