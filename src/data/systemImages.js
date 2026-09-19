// Fire Fighting
import dryWetRiser from "../assets/systems/fire-fighting/Dry_wet_riser_systems.jpg";
import hoseReel from "../assets/systems/fire-fighting/Fire_Hose_Reel_and_Cabinets.jpg";
import hydrant from "../assets/systems/fire-fighting/Fire_hydrant.jpg";
import landingValve from "../assets/systems/fire-fighting/Landing_valve.jpg";
import sprinklers from "../assets/systems/fire-fighting/Sprinklers.jpg";

// Fire Pump
import dieselPump from "../assets/systems/fire-pump/Diesel_Engine_Driven_Fire_Pump.jpg";
import electricPump from "../assets/systems/fire-pump/Electric_Motor_Driven_Fire_Pump.jpg";
import pumpSet from "../assets/systems/fire-pump/Fire_pump_set.jpg";
import turbinePump from "../assets/systems/fire-pump/Vertical_Turbine_Fire_Pump.jpg";

// Fire Suppression
import fs1 from "../assets/systems/fire-suppression/fs1.jpg";
import fs2 from "../assets/systems/fire-suppression/fs2.jpg";
import fs3 from "../assets/systems/fire-suppression/fs3.jpg";
import fs4 from "../assets/systems/fire-suppression/fs4.jpg";

// Fire Extinguisher
import extinguisher from "../assets/systems/fire-extinguisher/Fire_extinguisher.jpg";

// Fire Alarm & Voice Evacuation
import fe1 from "../assets/systems/fire-alarm/fe1.jpg";
import fe2 from "../assets/systems/fire-alarm/fe2.jpg";

// Public Address
import pas1 from "../assets/systems/public-address/pas1.jpg";
import pas2 from "../assets/systems/public-address/pas2.jpg";

// Emergency Lighting
import el1 from "../assets/systems/emergency-light/el1.jpg";
import el2 from "../assets/systems/emergency-light/el2.jpg";
import el3 from "../assets/systems/emergency-light/el3.jpg";

// Access Control
import acs1 from "../assets/systems/access-control/acs1.jpg";

// CCTV
import cc1 from "../assets/systems/cctv/cc1.jpg";
import cc2 from "../assets/systems/cctv/cc2.jpg";

// Smoke Management
import sms1 from "../assets/systems/smoke-management/sms1.jpg";
import sms2 from "../assets/systems/smoke-management/sms2.jpg";
import sms3 from "../assets/systems/smoke-management/sms3.jpg";
import sms4 from "../assets/systems/smoke-management/sms4.jpg";
import sms5 from "../assets/systems/smoke-management/sms5.jpg";

export const fireFightingGroups = [
  {
    title: "Fire Pump Sets",
    items: [
      { src: pumpSet, name: "Complete Fire Pump Set", desc: "Fully assembled diesel/electric duty-standby pump skid, factory piped and tested." },
      { src: dieselPump, name: "Diesel Engine-Driven Fire Pump", desc: "UL/FM listed diesel driver for standby fire water supply during power outages." },
      { src: electricPump, name: "Electric Motor-Driven Fire Pump", desc: "Motor-driven centrifugal fire pump for mains-powered primary duty service." },
      { src: turbinePump, name: "Vertical Turbine Fire Pump", desc: "Vertical turbine pump for drawing suction from wells, tanks or reservoirs." },
    ],
  },
  {
    title: "Hose Reels, Hydrants & Risers",
    items: [
      { src: hoseReel, name: "Fire Hose Reel & Cabinets", desc: "Wall-mounted hose reel cabinets for first-response firefighting by occupants." },
      { src: hydrant, name: "Fire Hydrants", desc: "External pillar hydrants providing a fire brigade connection point on site." },
      { src: landingValve, name: "Landing Valves", desc: "Riser-mounted landing valves for firefighter hose connection on each floor." },
      { src: dryWetRiser, name: "Dry & Wet Riser Systems", desc: "Vertical riser piping delivering water to upper floors of high-rise buildings." },
      { src: sprinklers, name: "Automatic Sprinklers", desc: "Heat-activated sprinkler heads for automatic fire suppression coverage." },
    ],
  },
  {
    title: "Suppression & Extinguishers",
    items: [
      { src: fs1, name: "Suppression Cylinders", desc: "Clean-agent suppression cylinders for total-flooding protection of enclosed risk areas." },
      { src: fs2, name: "Nozzles & Manifolds", desc: "Discharge nozzles and manifold piping distributing agent from the cylinder bank." },
      { src: fs3, name: "Suppression Control Panel", desc: "Dedicated release control panel monitoring and triggering the suppression bank." },
      { src: fs4, name: "Detection & Release Devices", desc: "Server-room suppression cylinder bank with linked detection and release wiring." },
      { src: extinguisher, name: "Portable Fire Extinguishers", desc: "Powder, water, CO2, foam, wet chemical and clean-agent portable extinguishers." },
    ],
  },
];

export const fireAlarmImages = [
  { src: fe1, name: "Addressable Fire Alarm Control Panel", brand: "Honeywell", desc: "Multi-loop networkable control panel with active or passive repeater options." },
  { src: fe2, name: "Smoke Detectors & Notification Devices", brand: "Honeywell", desc: "Addressable smoke detector heads for early warning across protected zones." },
];

export const voiceEvacImages = [
  { src: pas1, name: "Ceiling & Wall Speakers", desc: "Indoor cabinet speakers, paging horns and a gooseneck microphone console." },
  { src: pas2, name: "PA Amplifiers & Control Rack", desc: "Rack-mounted amplifiers and a paging console for zoned voice evacuation." },
];

export const emergencyLightImages = [
  { src: el1, name: "Central Battery System Panel", brand: "Teknoware", desc: "IntelliPanel central battery cabinets supplying emergency circuits building-wide." },
  { src: el2, name: "Exit & Emergency Luminaires", brand: "Teknoware", desc: "Illuminated running-man exit signs for wall and ceiling mounting." },
  { src: el3, name: "Emergency Bulkhead Luminaires", brand: "Teknoware", desc: "Surface and recessed emergency luminaires for escape route illumination." },
];

export const elvImages = [
  { src: acs1, name: "Access Control Readers & Turnstiles", desc: "Card and biometric readers controlling door entry at protected access points." },
  { src: cc1, name: "Dome & Bullet Cameras", desc: "Indoor/outdoor dome and bullet cameras with DVR and monitoring station." },
  { src: cc2, name: "PTZ & NVR Camera Systems", desc: "Pan-tilt-zoom cameras networked to an NVR for centralized live monitoring." },
];

export const smokeManagementImages = [
  { src: sms1, name: "Axial Smoke Extraction Fan", desc: "High-temperature axial duct fan rated F400/F300 for smoke extract duty." },
  { src: sms2, name: "Boxed Smoke Extraction Fan", desc: "Acoustic-cased centrifugal fan unit rated F400 for ducted smoke extraction." },
  { src: sms3, name: "Roof-Mounted Smoke Extract Fan", desc: "Weatherproof roof-mounted extract fan rated F400 at 120°C for stairwell venting." },
  { src: sms4, name: "In-Duct Jet Smoke Fan", desc: "Inline jet-type duct fan rated F400/F300 for car park smoke ventilation." },
  { src: sms5, name: "Motorized Fire & Smoke Dampers", desc: "MFSD combination dampers isolating ductwork to contain fire and smoke spread." },
];
