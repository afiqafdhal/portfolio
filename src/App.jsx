import { useEffect, useMemo, useState } from "react";
import "./App.css";

// ======================================================
// AFIQ AFDHAL — ENGINEERING PORTFOLIO
// Complete App.jsx with interactive lanyard
// ======================================================

const profile = {
  name: "Afiq Afdhal",
  firstName: "Afiq",
  lastName: "Afdhal",
  title: "Mechatronics Engineering",
  location: "Kuala Lumpur, Malaysia",
  email: "afiqafdhal247@gmail.com",
  phone: "018-4024703",
  photo: "/images/profile.jpg",
  resume: "",
  linkedin: "https://www.linkedin.com/in/afiq-afdhal-1318081b6",
  github: "https://github.com/afiqafdhal",
  description:
    "Mechatronics Engineering graduate with hands-on exposure to manufacturing digitalisation, industrial IoT, automation and computer vision. I develop practical solutions that connect machines, software and data.",
};

// ======================================================
// ORGANIZATIONS
// ======================================================

const projectSources = [
  {
    id: "industrial",
    category: "Industrial Projects",
    label: "WORKPLACE PROJECTS",
    short: "SGI",
    title: "Sugihara Grand Industries",
    fullName: "Sugihara Grand Industries Sdn. Bhd.",
    logo: "/logos/sugihara-logo.png",
    description:
      "Industrial digital transformation projects involving manufacturing systems, production monitoring, industrial IoT and connected engineering solutions.",
    location: "Port Klang, Selangor",
  },
  {
    id: "uitm",
    category: "UiTM Projects",
    label: "ACADEMIC PROJECTS",
    short: "UiTM",
    title: "Universiti Teknologi MARA",
    fullName: "Universiti Teknologi MARA (UiTM)",
    logo: "/logos/uitm-logo.png",
    description:
      "Academic engineering projects involving mechatronics, computer vision, artificial intelligence, robotics and practical technical research.",
    location: "Malaysia",
  },
];

const organizationLogos = {
  "Sugihara Grand Industries Sdn. Bhd.":
    "/logos/sugihara-logo.png",
  "Autoliv Hirotako Sdn. Bhd.":
    "/logos/autoliv-logo.png",
  "Cape EMS Berhad":
    "/logos/cape-ems-logo.png",
  "Malaysia Automotive, Robotics and IoT Institute (MARii)":
    "/logos/marii-logo.png",
  "Universiti Teknologi MARA":
    "/logos/uitm-logo.png",
  "Enter Corridor Training Centre":
    "/logos/enter-corridor-logo.png",
};

// ======================================================
// PROJECT DATA
// ======================================================

const projects = [
  {
    id: 1,
    title: "Industrial Production Monitoring",
    group: "Industrial Projects",
    category: "Industrial Projects",
    type: "Industrial IoT",
    status: "Development",
    year: "2026",
    featured: true,
    subtitle: "Connected manufacturing visibility",
    description:
      "Production monitoring using machine signals, edge computing, industrial communication and real-time dashboards.",
    challenge:
      "Manufacturing production information needs to be collected accurately and presented clearly to support monitoring and operational decision-making.",
    contribution:
      "Worked with industrial sensors, Raspberry Pi, Python, MQTT communication and monitoring tools during industrial training at Sugihara Grand Industries.",
    technologies: [
      "Python",
      "Raspberry Pi",
      "MQTT",
      "Node-RED",
      "Grafana",
    ],
    image: "/projects/production-monitoring.png",
    accent: "blue",
    workflow: [
      "Machine status",
      "Production output",
      "Downtime monitoring",
      "Performance dashboard",
    ],
  },
  {
    id: 2,
    title: "SUGIHARA RollFlow — RFID Roll Tracking System",
    group: "Industrial Projects",
    category: "Industrial Projects",
    type: "RFID & Industrial IoT",
    status: "Development",
    year: "2026",
    featured: false,
    subtitle: "Multi-station material tracking and traceability",
    description:
      "Developing an industrial RFID-based tracking system to monitor automotive carpet roll movements across production and storage stations. The solution combines UHF RFID readers, Raspberry Pi, Python, React, Node.js APIs and PostgreSQL to support automated roll identification and material traceability.",
    challenge:
      "Tracking material roll movement across multiple manufacturing and storage stations requires accurate identification, consistent inventory records and visibility into material status.",
    contribution:
      "Contributed to RFID reader integration, EPC-based tag detection, Raspberry Pi data acquisition, scan filtering, React dashboards, Node.js and Express APIs, PostgreSQL integration and GitHub collaboration.",
    technologies: [
      "UHF RFID",
      "Raspberry Pi",
      "Python",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
      "RS232",
      "TCP/IP",
      "Git",
    ],
    image: "/projects/rfid-rollflow.png",
    accent: "violet",
    workflow: [
      "RFID tag identification",
      "Multi-station roll movement",
      "Inventory & traceability",
      "Real-time tracking dashboard",
    ],
  },
  
{
  id: 3,
  title: "AI-Based Fruit Ripeness Detection",
  group: "UiTM Projects",
  category: "UiTM Projects",
  type: "Final Year Project",
  status: "FYP Prototype",
  year: "2026",
  featured: false,
  subtitle: "Final Year Project | Computer Vision & AI",
  description:
    "Final Year Project (FYP) focused on developing an AI-based fruit ripeness detection system using computer vision, YOLOv8, camera integration and real-time inference.",
  challenge:
    "Manual fruit ripeness inspection can be repetitive and inconsistent, creating an opportunity to develop an automated classification system using computer vision.",
  contribution:
    "Designed, developed and tested an AI-based fruit ripeness detection prototype as my Final Year Project at Universiti Teknologi MARA (UiTM), using YOLOv8, Python, OpenCV and Raspberry Pi for real-time camera inference.",
  technologies: [
    "Python",
    "YOLOv8",
    "OpenCV",
    "Raspberry Pi",
    "Computer Vision",
  ],
  image: "/projects/fruit-ripeness.png",
  accent: "violet",
  workflow: [
    "Camera inference",
    "Ripeness detection",
    "YOLOv8 classification",
    "Real-time results",
  ],
},

   
];

const categories = [
  "All",
  "Industrial Projects",
  "UiTM Projects",
];

// ======================================================
// EXPERIENCE
// ======================================================

const experience = [
  {
    date: "Oct 2026 — Present",
    title: "Digital Transformation Intern",
    company: "Sugihara Grand Industries Sdn. Bhd.",
    location: "Port Klang, Selangor",
    description:
      "Attached to the Digital Transformation Unit, gaining practical experience in manufacturing digitalisation, programming, electronics, networking, sensors and industrial IoT applications.",
  },
  {
    date: "Dec 2020 — Mar 2021",
    title: "Warehouse Intern",
    company: "Autoliv Hirotako Sdn. Bhd.",
    location: "Balakong, Selangor",
    description:
      "Gained practical exposure to warehouse operations, material handling, inventory control and delivery preparation within a manufacturing environment.",
  },
  {
    date: "Sep 2020 — Nov 2020",
    title: "Maintenance Intern",
    company: "Cape EMS Berhad",
    location: "Senai, Johor",
    description:
      "Assisted in facility maintenance involving electrical systems, air conditioning, lighting and general building services.",
  },
  {
    date: "Sep 2020 — Oct 2020",
    title: "Technical Short Course",
    company: "Malaysia Automotive, Robotics and IoT Institute (MARii)",
    location: "Pangkor, Perak",
    description:
      "Participated in technical training related to automotive, robotics and industrial technology.",
  },
];

const education = [
  {
    level: "Bachelor's Degree",
    title:
      "Bachelor of Mechatronics Engineering Technology (Hons.)",
    institution: "Universiti Teknologi MARA",
    date: "Oct 2022 — Oct 2026",
    description:
      "Engineering technology studies covering mechatronics, electronics, control systems, robotics and industrial applications.",
  },
  {
    level: "Diploma",
    title: "Diploma in Mechatronics Robotics",
    institution: "Enter Corridor Training Centre",
    date: "2016 — 2020",
    description:
      "Technical studies in mechatronics, robotics, mechanical systems and practical engineering.",
  },
];

// ======================================================
// ENGINEERING TOOLKIT
// ======================================================

const skills = [
  {
    number: "01",
    category: "OPERATIONS",
    title: "Manufacturing & improvement",
    tools:
      "Sensors · Automation · Production Monitoring · Manufacturing Digitalisation · Troubleshooting",
    summary:
      "Applying engineering knowledge to improve manufacturing processes and operational efficiency.",
  },
  {
    number: "02",
    category: "CONNECTIVITY",
    title: "Industrial IoT & edge",
    tools:
      "Raspberry Pi · Industrial Sensors · UHF RFID · EPC · RS232 · TCP/IP · MQTT · Node-RED",
    summary:
      "Connecting industrial equipment, RFID tracking systems and real-time manufacturing data.",
  },
  {
    number: "03",
    category: "APPLICATIONS",
    title: "Software & databases",
    tools:
      "Python · JavaScript · React · Vite · Node.js · Express · REST APIs · PostgreSQL · SQLite",
    summary:
      "Developing frontend interfaces, backend services and databases for connected engineering applications.",
  },
  {
    number: "04",
    category: "AUTOMATION",
    title: "Applied AI & workflows",
    tools:
      "YOLOv8 · OpenCV · ONNX · Computer Vision · Image Processing · AI Detection",
    summary:
      "Developing and testing intelligent detection systems and practical computer vision applications.",
  },
  {
    number: "05",
    category: "DELIVERY",
    title: "Deployment & reporting",
    tools:
      "Linux · Git · GitHub · Grafana · InfluxDB · Dashboards · Testing · Data Visualisation",
    summary:
      "Deploying, monitoring and maintaining software applications and industrial data systems.",
  },
  {
    number: "06",
    category: "ENGINEERING",
    title: "Design & control tools",
    tools:
      "Mechatronics · Electronics · Embedded Systems · Arduino · Control Systems · Technical Documentation",
    summary:
      "Combining mechanical, electrical and software principles to support practical engineering solutions.",
  },
];

// ======================================================
// REUSABLE COMPONENTS
// ======================================================

function SectionHeader({ number, label, title, subtitle }) {
  return (
    <div className="section-head">
      <div className="section-kicker">
        <span>{number} / {label}</span>
      </div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function SocialIcon({ type, size = 19 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "linkedin") {
    return (
      <svg {...props} fill="currentColor" stroke="none">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.6 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9H7.12v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
      </svg>
    );
  }

  if (type === "github") {
    return (
      <svg {...props} fill="currentColor" stroke="none">
        <path d="M12 .75a11.25 11.25 0 0 0-3.558 21.924c.562.105.768-.244.768-.543 0-.268-.01-.978-.015-1.919-3.127.68-3.787-1.507-3.787-1.507-.512-1.302-1.25-1.649-1.25-1.649-1.022-.698.077-.684.077-.684 1.13.08 1.724 1.16 1.724 1.16 1.003 1.718 2.632 1.222 3.273.934.102-.727.393-1.222.714-1.503-2.496-.284-5.12-1.248-5.12-5.556 0-1.227.44-2.23 1.16-3.016-.116-.285-.503-1.427.11-2.976 0 0 .945-.302 3.094 1.152A10.78 10.78 0 0 1 12 6.42c.956.004 1.918.129 2.818.379 2.148-1.454 3.091-1.152 3.091-1.152.615 1.55.228 2.691.112 2.976.722.786 1.158 1.79 1.158 3.016 0 4.318-2.627 5.268-5.131 5.547.404.35.765 1.04.765 2.096 0 1.514-.014 2.734-.014 3.105 0 .302.203.654.773.542A11.25 11.25 0 0 0 12 .75Z" />
      </svg>
    );
  }

  if (type === "resume") {
    return (
      <svg {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7 10-7" />
    </svg>
  );
}


function SafeImage({ src, alt, className = "", fallback }) {
  const [failedSrc, setFailedSrc] = useState(null);

  const imageSrc = src?.startsWith("/")
    ? `${import.meta.env.BASE_URL}${src.slice(1)}`
    : src;

  if (!imageSrc || failedSrc === imageSrc) {
    return <>{fallback}</>;
  }

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onError={() => setFailedSrc(imageSrc)}
    />
  );
}


// ======================================================
// INTERACTIVE LANYARD
// The entire badge and straps swing together.
// ======================================================

function InteractiveLanyard() {
  const [swingCount, setSwingCount] = useState(0);

  return (
    <div className="hero-portrait final-lanyard">
      <div className="final-lanyard-stage">

        <button
          key={swingCount}
          type="button"
          className={`final-lanyard-body ${
            swingCount > 0 ? "final-swing" : ""
          }`}
          onClick={() => setSwingCount((n) => n + 1)}
          aria-label="Swing the portfolio ID card"
          title="Click or tap to swing"
        >

          <svg
  className="final-lanyard-strap"
  viewBox="0 0 320 150"
  aria-hidden="true"
>
  <defs>
    <linearGradient id="realFabric" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#111116" />
      <stop offset="30%" stopColor="#33333B" />
      <stop offset="70%" stopColor="#24242C" />
      <stop offset="100%" stopColor="#0F1015" />
    </linearGradient>

    <linearGradient id="realMetal" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#737780" />
      <stop offset="25%" stopColor="#F0F1F3" />
      <stop offset="55%" stopColor="#A7ABB2" />
      <stop offset="85%" stopColor="#E2E3E6" />
      <stop offset="100%" stopColor="#686B73" />
    </linearGradient>
  </defs>

  {/* WOVEN FABRIC LOOP */}
  <path
    d="M86 -40 C108 5 135 62 160 98"
    stroke="url(#realFabric)"
    strokeWidth="19"
    strokeLinecap="round"
    fill="none"
  />

  <path
    d="M234 -40 C212 5 185 62 160 98"
    stroke="url(#realFabric)"
    strokeWidth="19"
    strokeLinecap="round"
    fill="none"
  />

  {/* FABRIC STITCHING */}
  <path
    d="M91 -40 C113 5 140 62 165 98"
    stroke="#8B8790"
    strokeWidth="1.1"
    strokeDasharray="3 5"
    opacity="0.6"
    fill="none"
  />

  <path
    d="M229 -40 C207 5 180 62 155 98"
    stroke="#8B8790"
    strokeWidth="1.1"
    strokeDasharray="3 5"
    opacity="0.6"
    fill="none"
  />

  {/* FABRIC END CONNECTOR */}
  <rect
    x="149"
    y="91"
    width="22"
    height="18"
    rx="4"
    fill="#25252B"
    stroke="#4C4B53"
    strokeWidth="1.5"
  />

  {/* SWIVEL CONNECTOR */}
  <rect
    x="154"
    y="106"
    width="12"
    height="12"
    rx="4"
    fill="url(#realMetal)"
    stroke="#777B82"
  />

  {/* METAL RING */}
  <ellipse
    cx="160"
    cy="122"
    rx="8"
    ry="10"
    fill="none"
    stroke="url(#realMetal)"
    strokeWidth="4"
  />

  {/* SNAP HOOK */}
  <path
    d="M155 126 L155 133 Q160 141 165 133 L165 126"
    stroke="url(#realMetal)"
    strokeWidth="4"
    strokeLinecap="round"
    fill="none"
  />
</svg>

          <div className="final-lanyard-card">
            <div className="final-lanyard-slot" />

            <div className="final-lanyard-top">
              <span>AA / ENGINEERING PORTFOLIO</span>
              <span>2026</span>
            </div>

            <div className="final-lanyard-photo">
              <SafeImage
                src={profile.photo || "/images/profile.jpg"}
                alt="Afiq Afdhal professional portrait"
                fallback={
                  <div className="final-lanyard-placeholder">
                    <strong>AA</strong>
                    <small>PERSONAL PORTRAIT</small>
                  </div>
                }
              />
            </div>

            <div className="final-lanyard-identity">
              <div>
                <small>PROFILE / 001</small>
                <h3>AFIQ AFDHAL</h3>
                <p>Mechatronics Engineering</p>
              </div>

              <strong className="final-lanyard-mark">
                aa.
              </strong>
            </div>

            <div className="final-lanyard-bottom">
              <span>INDUSTRIAL IoT · AUTOMATION</span>
              <span>MY</span>
            </div>
          </div>
        </button>

        <div className="final-lanyard-hint">
          <span className="final-lanyard-dot" />
          CLICK OR TAP TO SWING
        </div>
      </div>

      <div className="portrait-caption">
        <span>AFIQ AFDHAL</span>
        <span>
          MECHATRONICS ENGINEERING
          <br />
          DIGITAL TRANSFORMATION
        </span>
      </div>

      <style>{`
        .portfolio .final-lanyard {
          width: 100%;
          min-width: 0;
        }

        .portfolio .final-lanyard-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 485px;
          width: 100%;
          overflow: hidden;
          border-radius: 6px;
          background-color: #f0edf3;
          background-image:
            linear-gradient(rgba(130,112,150,.045) 1px,transparent 1px),
            linear-gradient(90deg,rgba(130,112,150,.045) 1px,transparent 1px);
          background-size: 25px 25px;
        }

        .portfolio .final-lanyard-body {
          position: relative;
          width: 320px;
          max-width: 96%;
          height: 440px;
          flex-shrink: 0;
          padding: 0;
          border: 0;
          margin: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          transform: rotate(0deg);
          transform-origin: 50% 0;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        
 animation: lanyardEntrance 2.2s ease-out both;}

        .portfolio .final-lanyard-strap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 150px;
          overflow: visible;
          z-index: 4;
          pointer-events: none;
        }

        .portfolio .final-lanyard-card {
          position: absolute;
          top: 130px;
          left: 50%;
          width: min(91%, 290px);
          box-sizing: border-box;
          padding: 17px;
          transform: translateX(-50%);
          text-align: left;
          pointer-events: none;
          background: #ffffff;
          border: 1px solid #d8d4dd;
          border-radius: 11px;
          box-shadow:
            0 24px 42px rgba(42,32,51,.15),
            0 5px 12px rgba(42,32,51,.05);
        }

        .portfolio .final-lanyard-slot {
          width: 39px;
          height: 6px;
          margin: -8px auto 14px;
          border-radius: 8px;
          background: #dcd9e0;
        }

        .portfolio .final-lanyard-top {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 12px;
          color: #857198;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .8px;
        }

        .portfolio .final-lanyard-photo {
          position: relative;
          height: 165px;
          overflow: hidden;
          border-radius: 4px;
          border: 1px solid #e3dce9;
          background: #eae4f1;
        }

        .portfolio .final-lanyard-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
        }

        .portfolio .final-lanyard-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #9c84b1;
        }

        .portfolio .final-lanyard-placeholder strong {
          font-family: Manrope, sans-serif;
          font-size: 78px;
          font-weight: 800;
          letter-spacing: -6px;
          line-height: 1;
        }

        .portfolio .final-lanyard-placeholder small {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .portfolio .final-lanyard-identity {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 10px;
          padding: 17px 0 14px;
        }

        .portfolio .final-lanyard-identity small {
          color: #927ba5;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .portfolio .final-lanyard-identity h3 {
          margin: 6px 0 5px;
          color: #1c1a20;
          font-family: Manrope, sans-serif;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.2;
        }

        .portfolio .final-lanyard-identity p {
          margin: 0;
          color: #73707a;
          font-size: 10px;
        }

        .portfolio .final-lanyard-mark {
          color: #967caf;
          font-size: 29px;
          font-weight: 800;
        }

        .portfolio .final-lanyard-bottom {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          padding-top: 11px;
          border-top: 1px solid #e7e2e9;
          color: #7c7087;
          font-size: 8px;
          font-weight: 700;
        }

        .portfolio .final-lanyard-hint {
          position: absolute;
          bottom: 12px;
          right: 14px;
          display: flex;
          align-items: center;
          gap: 7px;
          color: #8b7899;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          pointer-events: none;
        }

        .portfolio .final-lanyard-dot {
          width: 6px;
          height: 6px;
          background: #967ab0;
          border-radius: 50%;
        }

        
/* INITIAL DROP WHEN WEBSITE OPENS */

@keyframes lanyardEntrance {
  0% {
    transform: translateY(-520px) rotate(-10deg);
    opacity: 0;
  }

  45% {
    opacity: 1;
  }

  55% {
    transform: translateY(22px) rotate(10deg);
  }

  70% {
    transform: translateY(-8px) rotate(-7deg);
  }

  82% {
    transform: translateY(3px) rotate(-1deg);
  }

  92% {
    transform: translateY(0) rotate(-5deg);
  }

  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
}

/* CLICK TO SWING AGAIN */

@keyframes finalBadgeSwing {
  0% {
    transform: rotate(0deg);
  }

  15% {
    transform: rotate(12deg);
  }

  35% {
    transform: rotate(-9deg);
  }

  55% {
    transform: rotate(5deg);
  }

  75% {
    transform: rotate(-5deg);
  }

  90% {
    transform: rotate(-2deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

      `}</style>
    </div>
  );
}
function ProjectOrganization({ source, count }) {
  return (
    <div className="organization-header">
      <div className="organization-label">
        {source.label}
      </div>

      <div className="organization-main">
        <div className="organization-logo">
          <SafeImage
            src={source.logo}
            alt={`${source.title} logo`}
            fallback={<span>{source.short}</span>}
          />
        </div>

        <div className="organization-text">
          <h3>{source.title}</h3>
          <span>{source.fullName}</span>
        </div>

        <div className="organization-count">
          {count} {count === 1 ? "PROJECT" : "PROJECTS"}
        </div>
      </div>

      <p className="organization-description">
        {source.description}
      </p>

      <div className="organization-location">
        <span>⌖</span> {source.location}
      </div>
    </div>
  );
}

// ======================================================
// PROJECT VISUAL
// ======================================================

function ProjectVisual({ project }) {
  const isIndustrial =
    project.category === "Industrial Projects";

  return (
    <div className="concept-preview">
      <div className="concept-window">
        <div className="concept-window-top">
          <span className="concept-dots">● ● ●</span>
          <span>
            {project.type.includes("RFID")
              ? "RFID / ROLL TRACKING"
              : isIndustrial
              ? "INDUSTRIAL / WORKFLOW"
              : "ACADEMIC / AI"}
          </span>
          <span>↗</span>
        </div>

        <div className="concept-window-body">
          <span className="concept-eyebrow">
            CONCEPTUAL WORKFLOW
          </span>
          <h4>{project.title}</h4>

          {(project.workflow || []).map((entry, index) => (
            <div className="concept-list-row" key={entry}>
              <span>▪</span>
              <span>{entry}</span>
              <small>
                {String(index + 1).padStart(2, "0")}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// PROJECT CARDS
// ======================================================

function ProjectCard({ project, onOpen }) {
  return (
    <article className="editorial-project-card">
      <button
        type="button"
        className={`editorial-project-visual ${project.accent}`}
        onClick={() => onOpen(project)}
        aria-label={`Explore ${project.title}`}
      >
        <SafeImage
          src={project.image}
          alt={project.title}
          fallback={<ProjectVisual project={project} />}
        />

        <span className="editorial-visual-index">
          {String(project.id).padStart(2, "0")}
        </span>
      </button>

      <div className="editorial-project-info">
        <div className="editorial-project-meta">
          <span>{project.type.toUpperCase()}</span>
          <span>{project.status}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="editorial-technology-list">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="editorial-project-footer">
          <span>
            {project.group} · {project.year}
          </span>
          <button
            type="button"
            onClick={() => onOpen(project)}
          >
            Project details ↗
          </button>
        </div>
      </div>
    </article>
  );
}

// ======================================================
// PROJECT DETAILS POPUP
// ======================================================

function ProjectDetails({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
    >
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-topbar">
          <span>
            PROJECT CASE STUDY /{" "}
            {String(project.id).padStart(2, "0")}
          </span>
          <button type="button" onClick={onClose}>
            Close ×
          </button>
        </div>

        <div className={`modal-visual ${project.accent}`}>
          <SafeImage
            src={project.image}
            alt={project.title}
            fallback={
              <span className="visual-monogram">
                {String(project.id).padStart(2, "0")}
              </span>
            }
          />
        </div>

        <div className="modal-body">
          <div className="project-meta">
            <span>{project.group}</span>
            <span>{project.year}</span>
            <span>{project.status}</span>
          </div>

          <h2 id="project-detail-title">
            {project.title}
          </h2>

          <p className="modal-intro">
            {project.description}
          </p>

          <div className="case-study-block">
            <h3>01 / The Challenge</h3>
            <p>{project.challenge}</p>
          </div>

          <div className="case-study-block">
            <h3>02 / My Contribution</h3>
            <p>{project.contribution}</p>
          </div>

          <div className="case-study-block">
            <h3>03 / Technology Stack</h3>
            <div className="technology-row">
              {project.technologies.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>

          <p className="modal-disclaimer">
            Additional photographs, architecture diagrams and
            verified project results can be added later.
          </p>
        </div>
      </section>
    </div>
  );
}

// ======================================================
// PROFESSIONAL HIGHLIGHT ICON
// ======================================================

function HighlightIcon({ type }) {
  const base = {
    width: 23,
    height: 23,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "gear") {
    return (
      <svg {...base}>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M10 2h4l.6 2.2 2 1.1 2.2-.6 2 3.5-1.6 1.7v2.2l1.6 1.7-2 3.5-2.2-.6-2 1.1L14 22h-4l-.6-2.2-2-1.1-2.2.6-2-3.5 1.6-1.7v-2.2L3.2 10l2-3.5 2.2.6 2-1.1z" />
      </svg>
    );
  }

  if (type === "network") {
    return (
      <svg {...base}>
        <rect x="2" y="3" width="7" height="7" rx="1.5" />
        <rect x="15" y="3" width="7" height="7" rx="1.5" />
        <rect x="8.5" y="15" width="7" height="7" rx="1.5" />
        <path d="M5.5 10v3h6.5v2M18.5 10v3H12" />
      </svg>
    );
  }

  return (
    <svg {...base}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
    </svg>
  );
}

// ======================================================
// ENGINEERING VISION ICON
// ======================================================

function VisionIcon({ type }) {
  const props = {
    width: 27,
    height: 27,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "sensor") {
    return (
      <svg {...props}>
        <path d="M12 20v-8M8.5 9a5 5 0 0 1 7 0M5.5 6a9 9 0 0 1 13 0" />
        <circle cx="12" cy="11" r="1.5" />
        <path d="M9 20h6" />
      </svg>
    );
  }

  if (type === "cpu") {
    return (
      <svg {...props}>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </svg>
    );
  }

  if (type === "database") {
    return (
      <svg {...props}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <rect x="2" y="3" width="20" height="15" rx="2" />
      <path d="M8 21h8M12 18v3m-6-8 4-4 3 2 5-5" />
    </svg>
  );
}

// ======================================================
// MAIN APPLICATION
// ======================================================

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const filteredProjects = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" ||
        project.category === activeCategory;

      const matchesStatus =
        status === "All" ||
        project.status === status;

      const matchesSearch =
        !keyword ||
        [
          project.title,
          project.subtitle,
          project.description,
          project.category,
          project.type,
          ...project.technologies,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return (
        matchesCategory &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [activeCategory, search, status]);

  const groupedProjects = useMemo(() => {
    return projectSources
      .map((source) => ({
        source,
        items: filteredProjects.filter(
          (project) => project.category === source.category
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredProjects]);

  function resetFilters() {
    setActiveCategory("All");
    setSearch("");
    setStatus("All");
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
    } catch {
      window.prompt("Copy email address:", profile.email);
    }
  }

  return (
    <div className="portfolio">
      {/* HEADER */}

      <header className="site-header">
        <div className="container header-inner">
          <a
            className="logo"
            href="#home"
            onClick={() => setMobileMenu(false)}
          >
            <span className="logo-symbol">aa.</span>
            <span className="logo-text">
              AFIQ AFDHAL
              <small>ENGINEERING PORTFOLIO</small>
            </span>
          </a>

          <nav className={mobileMenu ? "nav open" : "nav"}>
            <a href="#projects" onClick={() => setMobileMenu(false)}>
              Projects
            </a>
            <a href="#experience" onClick={() => setMobileMenu(false)}>
              Experience
            </a>
            <a href="#skills" onClick={() => setMobileMenu(false)}>
              Skills
            </a>
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMobileMenu(false)}
            >
              Contact ↗
            </a>
          </nav>

          <button
            type="button"
            className="mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? "Close ×" : "Menu ☰"}
          </button>
        </div>
      </header>

      <main>
        {/* ======================================================
            HERO SECTION
        ====================================================== */}

        <section id="home" className="hero container">
          <div className="hero-copy">
            <div className="hero-status">
              <span className="status-indicator" />
              MECHATRONICS · DIGITAL TRANSFORMATION
            </div>

            <h1>
              {profile.firstName}
              <br />
              {profile.lastName}
              <br />
              <span>Portfolio</span>
            </h1>

            <div className="hero-role">
              <span className="hero-role-line" />
              <p>
                Mechatronics Engineering
                <br />
                <strong>
                  Industrial IoT · Automation · Computer Vision
                </strong>
              </p>
            </div>

            <p className="hero-lead">
              {profile.description}
            </p>

            <div className="hero-buttons">
              <a className="button button-dark" href="#projects">
                Explore my work <span>↗</span>
              </a>

              <a
                className="button button-outline"
                href="#experience"
              >
                My experience <span>↗</span>
              </a>
            </div>

            <div className="hero-social-links">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-button"
                >
                  <SocialIcon type="linkedin" />
                  <span>LinkedIn</span>
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-button"
                >
                  <SocialIcon type="github" />
                  <span>GitHub</span>
                </a>
              )}

              {profile.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-button"
                >
                  <SocialIcon type="resume" />
                  <span>Resume / CV</span>
                </a>
              )}

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-button"
              >
                <SocialIcon type="mail" />
                <span>Email</span>
              </a>

              <button
                type="button"
                className="hero-social-button"
                onClick={copyEmail}
              >
                <span>{emailCopied ? "✓" : "⧉"}</span>
                <span>
                  {emailCopied ? "Copied!" : "Copy Email"}
                </span>
              </button>
            </div>

            <div className="location-line">
              <span className="location-dot" />
              {profile.location.toUpperCase()}
            </div>
          </div>

          {/* ONLY ONE INTERACTIVE LANYARD */}
          <InteractiveLanyard />
        </section>

        {/* ======================================================
            PROFESSIONAL HIGHLIGHTS
        ====================================================== */}

        <section className="overview">
          <div className="container">
            <div className="overview-heading">
              <span>PROFESSIONAL HIGHLIGHTS</span>
              <span>ENGINEERING / TECHNOLOGY</span>
            </div>

            <div className="overview-grid">
              <div className="highlight-card">
                <div className="highlight-icon">
                  <HighlightIcon type="gear" />
                </div>
                <h3>Mechatronics & Automation</h3>
                <p>
                  Sensor integration, embedded systems,
                  and practical automation.
                </p>
              </div>

              <div className="highlight-card">
                <div className="highlight-icon">
                  <HighlightIcon type="network" />
                </div>
                <h3>Industrial IoT & Digitalisation</h3>
                <p>
                  Raspberry Pi, MQTT, real-time monitoring,
                  and connected manufacturing.
                </p>
              </div>

              <div className="highlight-card">
                <div className="highlight-icon">
                  <HighlightIcon type="code" />
                </div>
                <h3>Software & Computer Vision</h3>
                <p>
                  Python, React, OpenCV,
                  and AI-based image detection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            SELECTED PROJECTS
        ====================================================== */}

        <section id="projects" className="section container">
          <SectionHeader
            number="01"
            label="ENGINEERING PROJECTS"
            title="Selected projects."
            subtitle="Explore my industrial and academic engineering projects, technical contributions and technologies."
          />

          <div className="project-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  activeCategory === category
                    ? "filter active"
                    : "filter"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category === "All"
                  ? "All projects"
                  : category}
              </button>
            ))}
          </div>

          <div className="search-toolbar">
            <label>
              Search projects
              <input
                type="search"
                placeholder="Search projects, technologies or keywords..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </label>

            <label>
              Project status
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
              >
                <option value="All">All statuses</option>
                <option value="Development">Development</option>
                <option value="Prototype">Prototype</option>
              </select>
            </label>

            <button
              type="button"
              className="reset-button"
              onClick={resetFilters}
            >
              Reset ↺
            </button>
          </div>

          <div className="project-results-summary">
            <div>
              <span>PROJECT EXPLORER</span>
              <h3>Engineering & technology</h3>
              <p>
                Projects organized by workplace and academic origin.
              </p>
            </div>

            <strong>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}
            </strong>
          </div>

          {groupedProjects.length === 0 ? (
            <div className="empty-results">
              <h3>No matching projects.</h3>
              <p>
                Try another keyword or change your filters.
              </p>
              <button type="button" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          ) : (
            groupedProjects.map(({ source, items }) => (
              <section
                className="project-organization-section"
                key={source.id}
                aria-label={source.category}
              >
                <ProjectOrganization
                  source={source}
                  count={items.length}
                />

                <div
                  className={`project-grid ${
                    source.id === "industrial"
                      ? "industrial-project-grid"
                      : "academic-project-grid"
                  }`}
                >
                  {items.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpen={setSelectedProject}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </section>

        {/* ======================================================
            EXPERIENCE & EDUCATION
        ====================================================== */}

        <section
          id="experience"
          className="section background-soft"
        >
          <div className="container">
            <SectionHeader
              number="02"
              label="PROFESSIONAL BACKGROUND"
              title={
                <>
                  Experience &
                  <br />
                  education.
                </>
              }
              subtitle="A journey through mechatronics training, industrial exposure and practical engineering."
            />

            <div className="background-layout">
              <div className="experience-list">
                {experience.map((item, index) => (
                  <article
                    className="experience-item"
                    key={index}
                  >
                    <div className="date-column">
                      {item.date}
                    </div>

                    <div className="experience-content">
                      <div className="experience-with-logo">
                        <div className="experience-logo">
                          <SafeImage
                            src={organizationLogos[item.company]}
                            alt={`${item.company} logo`}
                            fallback={
                              <span>
                                {item.company
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((word) => word[0])
                                  .join("")}
                              </span>
                            }
                          />
                        </div>

                        <div className="experience-info">
                          <h3>{item.title}</h3>
                          <h4>{item.company}</h4>
                          <small>{item.location}</small>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="education-side">
                <div className="aside-label">
                  ACADEMIC BACKGROUND
                </div>
                <h3>Education</h3>

                {education.map((item, index) => (
                  <article
                    className="education-item"
                    key={index}
                  >
                    <div className="education-with-logo">
                      <div className="education-logo">
                        <SafeImage
                          src={
                            organizationLogos[item.institution]
                          }
                          alt={`${item.institution} logo`}
                          fallback={
                            <span>
                              {item.institution ===
                              "Universiti Teknologi MARA"
                                ? "UiTM"
                                : "ECTC"}
                            </span>
                          }
                        />
                      </div>

                      <div className="education-info">
                        <span className="education-level">
                          {item.level}
                        </span>
                        <h4>{item.title}</h4>
                        <p className="education-institution">
                          {item.institution}
                        </p>
                        <small>{item.date}</small>
                      </div>
                    </div>

                    <p className="education-description">
                      {item.description}
                    </p>
                  </article>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* ======================================================
            ENGINEERING TOOLKIT
        ====================================================== */}

        <section id="skills" className="section container">
          <SectionHeader
            number="03"
            label="TECHNICAL SKILLS"
            title="Engineering toolkit."
            subtitle="Technical knowledge developed through academic studies, industrial training and hands-on engineering applications."
          />

          <div className="skills-grid">
            {skills.map((skill) => (
              <div
                className="skill-item"
                key={skill.number}
              >
                <div className="skill-index">
                  {skill.number} / {skill.category}
                </div>
                <h3>{skill.title}</h3>
                <p className="skill-tools">
                  {skill.tools}
                </p>
                <p className="skill-summary">
                  {skill.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================
            ENGINEERING VISION
        ====================================================== */}

        <section className="engineering-vision-section">
          <div className="container">
            <div className="vision-section-label">
              04 / ENGINEERING VISION
            </div>

            <div className="engineering-vision-layout">
              <div className="vision-content">
                <div className="vision-eyebrow">
                  WHAT DRIVES MY WORK
                </div>

                <h2>
                  Engineering
                  <br />
                  beyond machines.
                </h2>

                <p className="vision-description">
                  My focus is on connecting physical engineering
                  systems with modern software and data
                  technologies. Through industrial IoT, RFID
                  tracking, production monitoring and intelligent
                  applications, I aim to develop practical
                  solutions that improve manufacturing visibility,
                  efficiency and traceability.
                </p>

                <div className="vision-tags">
                  <span>Industrial IoT</span>
                  <span>RFID Tracking</span>
                  <span>Automation</span>
                  <span>Digital Solutions</span>
                </div>
              </div>

              <div className="vision-diagram">
                <div className="vision-diagram-header">
                  <span>PHYSICAL SYSTEMS</span>
                  <span>DIGITAL INTEGRATION</span>
                </div>

                <div className="vision-system-flow">
                  <div className="vision-node">
                    <VisionIcon type="sensor" />
                    <strong>Sensors & RFID</strong>
                    <small>Data acquisition</small>
                  </div>

                  <span className="vision-flow-arrow">→</span>

                  <div className="vision-node">
                    <VisionIcon type="cpu" />
                    <strong>Edge Devices</strong>
                    <small>Raspberry Pi</small>
                  </div>

                  <span className="vision-flow-arrow">→</span>

                  <div className="vision-node">
                    <VisionIcon type="database" />
                    <strong>Data Systems</strong>
                    <small>APIs & databases</small>
                  </div>
                </div>

                <div className="vision-down-arrow">↓</div>

                <div className="vision-result">
                  <VisionIcon type="monitor" />
                  <strong>
                    INTELLIGENT MANUFACTURING
                  </strong>
                  <p>
                    Monitoring · Traceability · Automation
                  </p>
                </div>

                <div className="vision-diagram-footer">
                  <span>CONNECTED SYSTEMS</span>
                  <span>ENGINEERING + TECHNOLOGY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            CONTACT
        ====================================================== */}

        <section id="contact" className="contact-section">
          <div className="container contact-layout">
            <div className="contact-main">
              <div className="overline">
                05 / CONTACT
              </div>

              <h2>
                Engineering
                <br />
                opportunities.
              </h2>

              <p className="contact-description">
                Interested in engineering roles, industrial
                digital transformation, automation and
                technology collaboration.
              </p>

              <a
                className="contact-email"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
                <span>↗</span>
              </a>

              <div className="contact-location">
                <span className="contact-location-icon">⌖</span>
                {profile.location}
              </div>
            </div>

            <aside className="career-panel">
              <div className="career-panel-top">
                <span className="career-panel-label">
                  CAREER INTERESTS
                </span>
                <span className="career-panel-symbol">
                  ↗
                </span>
              </div>

              <h3>
                Connecting engineering
                <br />
                with technology.
              </h3>

              <p>
                My professional interests focus on bridging
                physical engineering systems with modern
                software, connected devices and intelligent
                manufacturing solutions.
              </p>

              <div className="career-panel-divider" />

              <div className="career-interest-list">
                <span>Industrial IoT</span>
                <span>Automation</span>
                <span>Digital Transformation</span>
                <span>Software Integration</span>
              </div>

              <div className="career-panel-bottom">
                <span className="career-status-dot" />
                <span>
                  ENGINEERING & TECHNOLOGY
                </span>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="footer">
        <div className="container footer-inner">
          <span>
            © {2026} {profile.name}
          </span>
          <span>
            Mechatronics · Engineering · Technology
          </span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>

      {/* PROJECT DETAILS MODAL */}

      <ProjectDetails
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
