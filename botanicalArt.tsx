import React from 'react';

/**
 * Botanical SVG artwork tailored specifically to match the clinical and visual
 * descriptions of each plant specimen, condition, and pathology.
 */

export const BotanicalSpecimenArt: React.FC<{
  type: string;
  className?: string;
}> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'preset-monstera':
    case 'sb-1':
      // Swiss Cheese Plant / Monstera Deliciosa with lower leaf chlorosis (yellowing)
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="monstera-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#062e1e" />
              <stop offset="50%" stopColor="#041a11" />
              <stop offset="100%" stopColor="#020a06" />
            </linearGradient>
            <linearGradient id="monstera-healthy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
            <linearGradient id="monstera-yellowing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="40%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            <linearGradient id="pot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#monstera-bg)" />
          {/* Ambient Glow */}
          <circle cx="200" cy="180" r="140" fill="#10b981" opacity="0.08" filter="blur(30px)" />
          
          {/* Pot & Soil */}
          <ellipse cx="200" cy="335" rx="75" ry="18" fill="#292524" />
          <path d="M135 335 L148 385 Q200 395 252 385 L265 335 Z" fill="url(#pot-grad)" />
          <ellipse cx="200" cy="335" rx="65" ry="12" fill="#1c1917" />

          {/* Stems */}
          <path d="M200 335 Q195 250 170 160" stroke="#10b981" strokeWidth="9" strokeLinecap="round" />
          <path d="M200 335 Q210 270 260 210" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
          <path d="M200 335 Q220 280 275 295" stroke="#ca8a04" strokeWidth="7" strokeLinecap="round" />

          {/* Upper Big Fenestrated Leaf (Healthy Emerald) */}
          <g transform="translate(170, 150) rotate(-15)">
            <path
              d="M0 0 C -60 -40, -110 -110, -50 -180 C 10 -220, 90 -190, 80 -130 C 75 -70, 40 -20, 0 0 Z"
              fill="url(#monstera-healthy)"
              filter="drop-shadow(0 8px 16px rgba(0,0,0,0.4))"
            />
            {/* Fenestration Cuts */}
            <ellipse cx="-45" cy="-120" rx="14" ry="32" fill="#041a11" transform="rotate(-30 -45 -120)" />
            <ellipse cx="-30" cy="-65" rx="10" ry="24" fill="#041a11" transform="rotate(-20 -30 -65)" />
            <ellipse cx="35" cy="-130" rx="12" ry="28" fill="#041a11" transform="rotate(25 35 -130)" />
            <ellipse cx="25" cy="-75" rx="9" ry="20" fill="#041a11" transform="rotate(15 25 -75)" />
            {/* Midrib */}
            <path d="M0 0 Q 5 -100 10 -190" stroke="#6ee7b7" strokeWidth="3.5" opacity="0.6" fill="none" />
          </g>

          {/* Side Leaf (Healthy Light Green) */}
          <g transform="translate(255, 205) rotate(35)">
            <path
              d="M0 0 C -40 -30, -70 -80, -30 -130 C 10 -150, 60 -120, 50 -80 C 45 -40, 25 -10, 0 0 Z"
              fill="url(#monstera-healthy)"
              filter="drop-shadow(0 6px 12px rgba(0,0,0,0.3))"
            />
            <ellipse cx="-25" cy="-75" rx="8" ry="18" fill="#041a11" transform="rotate(-25 -25 -75)" />
            <ellipse cx="20" cy="-70" rx="7" ry="16" fill="#041a11" transform="rotate(20 20 -70)" />
            <path d="M0 0 Q 5 -60 10 -120" stroke="#6ee7b7" strokeWidth="2.5" opacity="0.5" fill="none" />
          </g>

          {/* Lower Chlorotic Leaf (Yellowing & Moisture stress symptom described) */}
          <g transform="translate(270, 290) rotate(55)">
            <path
              d="M0 0 C -35 -20, -60 -60, -25 -100 C 5 -115, 45 -90, 40 -60 C 35 -30, 20 -5, 0 0 Z"
              fill="url(#monstera-yellowing)"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.4))"
            />
            <path d="M0 0 Q 5 -45 8 -90" stroke="#fef08a" strokeWidth="2" opacity="0.7" fill="none" />
          </g>

          {/* Diagnosis Badge Label */}
          <rect x="20" y="20" width="130" height="26" rx="13" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1" />
          <text x="85" y="37" fill="#34d399" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
            CHLOROSIS SCAN
          </text>
        </svg>
      );

    case 'preset-fiddle':
    case 'sb-2':
      // Fiddle Leaf Fig with brown necrotic crispy margins
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fiddle-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c1917" />
              <stop offset="60%" stopColor="#0c0a09" />
              <stop offset="100%" stopColor="#052e16" />
            </linearGradient>
            <linearGradient id="fiddle-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="60%" stopColor="#166534" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#fiddle-bg)" />
          
          {/* Main Woody Trunk */}
          <path d="M200 380 L200 120" stroke="#78350f" strokeWidth="14" strokeLinecap="round" />
          
          {/* Lower Fiddle Leaf with Crispy Brown Tip Scorch */}
          <g transform="translate(200, 260) rotate(25)">
            <path
              d="M0 0 C 40 -15, 75 -40, 70 -85 C 65 -125, 45 -130, 50 -165 C 55 -195, -15 -205, -35 -170 C -45 -135, -25 -125, -50 -85 C -65 -45, -35 -15, 0 0 Z"
              fill="url(#fiddle-leaf)"
            />
            {/* Prominent Veins */}
            <path d="M0 0 L 10 -170" stroke="#86efac" strokeWidth="4" opacity="0.6" />
            <path d="M5 -50 Q 30 -65 55 -70" stroke="#86efac" strokeWidth="2" opacity="0.5" />
            <path d="M3 -90 Q -25 -105 -45 -110" stroke="#86efac" strokeWidth="2" opacity="0.5" />
            <path d="M8 -130 Q 30 -140 45 -145" stroke="#86efac" strokeWidth="2" opacity="0.5" />
            
            {/* Scorch Brown Margins (Symptoms) */}
            <path
              d="M50 -165 C 55 -195, -15 -205, -35 -170 Q -40 -185 -10 -195 Q 35 -190 50 -165 Z"
              fill="#78350f"
              stroke="#92400e"
              strokeWidth="2"
            />
            <path d="M60 -75 Q 75 -90 65 -115" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
            <path d="M-40 -70 Q -55 -95 -45 -115" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Upper Healthy Leaf */}
          <g transform="translate(200, 180) rotate(-20)">
            <path
              d="M0 0 C 35 -12, 65 -35, 60 -75 C 55 -110, 40 -115, 45 -145 C 48 -170, -10 -180, -30 -150 C -40 -120, -20 -110, -42 -75 C -55 -40, -30 -12, 0 0 Z"
              fill="url(#fiddle-leaf)"
              filter="drop-shadow(0 10px 15px rgba(0,0,0,0.5))"
            />
            <path d="M0 0 L 8 -150" stroke="#86efac" strokeWidth="3.5" opacity="0.7" />
          </g>

          {/* Diagnosis Badge Label */}
          <rect x="20" y="20" width="145" height="26" rx="13" fill="rgba(217, 119, 6, 0.2)" stroke="#d97706" strokeWidth="1" />
          <text x="92" y="37" fill="#fbbf24" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
            BROWN TIP SCORCH
          </text>
        </svg>
      );

    case 'preset-snake':
    case 'dis-3':
      // Snake Plant (Sansevieria) with basal rhizome rot
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="snake-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="60%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>
            <linearGradient id="snake-blade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="15%" stopColor="#15803d" />
              <stop offset="50%" stopColor="#14532d" />
              <stop offset="85%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#snake-bg)" />
          
          {/* Terracotta Planter */}
          <path d="M120 310 L135 385 Q200 395 265 385 L280 310 Z" fill="#b45309" />
          <ellipse cx="200" cy="310" rx="80" ry="16" fill="#78350f" />

          {/* Upright Sword Blades */}
          {/* Left Blade */}
          <path
            d="M160 310 Q145 200 150 110 Q155 70 160 50 Q165 70 175 120 Q185 210 180 310 Z"
            fill="url(#snake-blade)"
          />
          {/* Center Tall Blade */}
          <path
            d="M185 310 Q180 180 190 70 Q195 30 200 20 Q205 30 215 80 Q225 190 215 310 Z"
            fill="url(#snake-blade)"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))"
          />
          {/* Right Leaning Blade */}
          <path
            d="M210 310 Q225 210 240 130 Q250 80 255 60 Q252 85 245 140 Q235 225 225 310 Z"
            fill="url(#snake-blade)"
          />

          {/* Zig-Zag Patterns */}
          <path d="M187 120 Q198 123 209 120" stroke="#86efac" strokeWidth="2.5" opacity="0.4" />
          <path d="M185 160 Q200 165 215 160" stroke="#86efac" strokeWidth="2.5" opacity="0.4" />
          <path d="M183 210 Q200 215 217 210" stroke="#86efac" strokeWidth="2.5" opacity="0.4" />

          {/* Root Rot Lesion at Base (Water-soaked mush & black necrotic spot) */}
          <ellipse cx="200" cy="305" rx="55" ry="18" fill="#1c1917" opacity="0.9" />
          <path
            d="M170 310 Q180 265 200 260 Q220 265 230 310 Z"
            fill="#451a03"
            opacity="0.85"
          />
          <circle cx="195" cy="285" r="14" fill="#18181b" opacity="0.8" />
          <circle cx="210" cy="292" r="10" fill="#292524" opacity="0.9" />

          {/* Collapsing leaf symptom */}
          <path
            d="M225 310 Q260 290 310 320 Q290 335 230 315 Z"
            fill="#713f12"
            opacity="0.9"
          />

          {/* Diagnosis Badge Label */}
          <rect x="20" y="20" width="135" height="26" rx="13" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="1" />
          <text x="87" y="37" fill="#fb7185" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
            ROOT ROT WARNING
          </text>
        </svg>
      );

    case 'preset-calathea':
      // Pinstripe Prayer Plant (Calathea Ornata) with vivid pink pinstripes
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="calathea-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1029" />
              <stop offset="60%" stopColor="#0c0714" />
              <stop offset="100%" stopColor="#06251b" />
            </linearGradient>
            <linearGradient id="calathea-blade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="50%" stopColor="#022c22" />
              <stop offset="100%" stopColor="#051f18" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#calathea-bg)" />

          {/* Main Ornate Leaf */}
          <g transform="translate(200, 200) rotate(-15)">
            <ellipse cx="0" cy="0" rx="110" ry="170" fill="url(#calathea-blade)" filter="drop-shadow(0 8px 20px rgba(0,0,0,0.6))" />
            {/* Central Midrib */}
            <line x1="0" y1="165" x2="0" y2="-165" stroke="#f472b6" strokeWidth="3" opacity="0.8" />
            
            {/* Fine Pink Pinstripes */}
            {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((y, i) => (
              <g key={i}>
                <path
                  d={`M0 ${y} Q -45 ${y - 25} -85 ${y - 40}`}
                  stroke="#f472b6"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.85"
                />
                <path
                  d={`M0 ${y} Q 45 ${y - 25} 85 ${y - 40}`}
                  stroke="#f472b6"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.85"
                />
              </g>
            ))}

            {/* Crispy Brown Dry Tip Scorch */}
            <path
              d="M-25 -155 Q 0 -178 25 -155 Q 15 -145 0 -150 Q -15 -145 -25 -155 Z"
              fill="#92400e"
              stroke="#b45309"
            />
          </g>

          {/* Diagnosis Badge Label */}
          <rect x="20" y="20" width="130" height="26" rx="13" fill="rgba(244, 114, 182, 0.2)" stroke="#f472b6" strokeWidth="1" />
          <text x="85" y="37" fill="#f472b6" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
            CALATHEA ORNATA
          </text>
        </svg>
      );

    case 'preset-peacelily':
      // Peace Lily (Spathiphyllum) with elegant white spathe flower and drooping leaves
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="peace-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#042017" />
              <stop offset="60%" stopColor="#02130e" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="spathe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#peace-bg)" />

          {/* White Spathe & Yellow Spadix Flower */}
          <g transform="translate(200, 110)">
            <path
              d="M0 60 C -40 20, -45 -50, 0 -95 C 45 -50, 40 20, 0 60 Z"
              fill="url(#spathe-grad)"
              filter="drop-shadow(0 4px 15px rgba(255,255,255,0.2))"
            />
            {/* Spadix central spike */}
            <ellipse cx="0" cy="-15" rx="7" ry="32" fill="#fde047" stroke="#eab308" strokeWidth="1" />
            {/* Flower Stem */}
            <path d="M0 60 L 0 250" stroke="#10b981" strokeWidth="5" />
          </g>

          {/* Drooping Leaves (Dehydration Wilt symptom) */}
          <path
            d="M170 320 Q110 260 60 300 Q110 330 170 320 Z"
            fill="#065f46"
            opacity="0.9"
          />
          <path
            d="M230 320 Q290 260 340 300 Q290 330 230 320 Z"
            fill="#065f46"
            opacity="0.9"
          />
          <path
            d="M200 310 Q140 210 110 260 Q150 280 200 310 Z"
            fill="#047857"
          />
          <path
            d="M200 310 Q260 210 290 260 Q250 280 200 310 Z"
            fill="#047857"
          />

          {/* Ceramic Pot */}
          <path d="M140 310 L150 380 Q200 390 250 380 L260 310 Z" fill="#e2e8f0" />
          <ellipse cx="200" cy="310" rx="60" ry="14" fill="#334155" />

          {/* Diagnosis Badge Label */}
          <rect x="20" y="20" width="130" height="26" rx="13" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1" />
          <text x="85" y="37" fill="#6ee7b7" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
            PEACE LILY WILT
          </text>
        </svg>
      );

    case 'preset-pothos':
    case 'dis-5':
      // Golden Pothos with heart-shaped golden variegated cascading vines
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pothos-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#052e16" />
              <stop offset="60%" stopColor="#021c0d" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="variegated-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#84cc16" />
              <stop offset="70%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#pothos-bg)" />

          {/* Trailing Vine Curves */}
          <path d="M200 80 Q130 160 170 240 T220 360" stroke="#166534" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M200 80 Q270 150 240 260 T160 370" stroke="#15803d" strokeWidth="4.5" fill="none" strokeLinecap="round" />

          {/* Heart-shaped variegated leaves at nodes */}
          {[
            { x: 160, y: 120, r: -25, s: 0.9 },
            { x: 235, y: 150, r: 35, s: 0.95 },
            { x: 165, y: 220, r: -15, s: 1.1 },
            { x: 245, y: 260, r: 40, s: 1.0 },
            { x: 195, y: 310, r: -30, s: 0.85 },
            { x: 170, y: 370, r: 10, s: 0.75 },
          ].map((leaf, idx) => (
            <g key={idx} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
              <path
                d="M0 0 C -30 -30, -50 -65, 0 -100 C 50 -65, 30 -30, 0 0 Z"
                fill="url(#variegated-leaf)"
                filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
              />
              <path d="M0 0 Q 0 -50 0 -95" stroke="#fef08a" strokeWidth="2" opacity="0.6" />
            </g>
          ))}

          {/* Hanging Planter Hook */}
          <circle cx="200" cy="50" r="16" stroke="#d97706" strokeWidth="4" fill="none" />
          <line x1="200" y1="66" x2="200" y2="85" stroke="#d97706" strokeWidth="4" />

          {/* Diagnosis Badge Label */}
          <rect x="20" y="20" width="130" height="26" rx="13" fill="rgba(132, 204, 22, 0.2)" stroke="#84cc16" strokeWidth="1" />
          <text x="85" y="37" fill="#a3e635" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
            HEALTHY POTHOS
          </text>
        </svg>
      );

    case 'dis-1':
      // Spider Mites (Fine silky webbing & tiny bronze stippling spots on leaf blade)
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="#0c1a14" />
          {/* Leaf surface background */}
          <path d="M0 400 C 100 200, 200 100, 400 0 L 400 400 Z" fill="#14532d" />
          <path d="M150 400 Q 250 250 400 100" stroke="#86efac" strokeWidth="8" opacity="0.5" />
          
          {/* Stippling yellow spots */}
          {Array.from({ length: 45 }).map((_, i) => (
            <circle
              key={i}
              cx={180 + (i * 23) % 200}
              cy={120 + (i * 37) % 250}
              r={2 + (i % 3)}
              fill="#facc15"
              opacity="0.8"
            />
          ))}

          {/* Silky Webbing Strands */}
          <path d="M120 180 Q 220 130 320 200" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeDasharray="3 1" />
          <path d="M140 220 Q 230 170 340 230" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          <path d="M180 150 Q 240 240 290 170" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

          {/* Microscopic Spider Mite Icons */}
          <circle cx="210" cy="165" r="4" fill="#ef4444" />
          <circle cx="260" cy="190" r="3.5" fill="#ef4444" />
          <circle cx="180" cy="205" r="3" fill="#ef4444" />

          <rect x="20" y="20" width="130" height="26" rx="13" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1" />
          <text x="85" y="37" fill="#f87171" fontSize="11" fontWeight="700" textAnchor="middle">
            SPIDER MITES
          </text>
        </svg>
      );

    case 'dis-2':
      // Mealybugs (Fluffy white cotton-like clusters in leaf joints)
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="#091510" />
          {/* Green Stem & Node */}
          <path d="M180 400 L 220 0" stroke="#166534" strokeWidth="24" />
          <path d="M205 220 Q 280 180 380 160" stroke="#15803d" strokeWidth="16" />
          <path d="M195 240 Q 120 200 20 180" stroke="#15803d" strokeWidth="16" />

          {/* Fluffy White Cottony Mealybug Clusters */}
          <g filter="drop-shadow(0 2px 6px rgba(0,0,0,0.5))">
            <ellipse cx="205" cy="215" rx="20" ry="14" fill="#ffffff" />
            <ellipse cx="195" cy="205" rx="15" ry="10" fill="#f8fafc" />
            <ellipse cx="215" cy="225" rx="16" ry="12" fill="#f1f5f9" />
            <ellipse cx="235" cy="205" rx="12" ry="9" fill="#e2e8f0" />
            <ellipse cx="175" cy="225" rx="10" ry="8" fill="#e2e8f0" />
            
            {/* Segmented Mealybug oval details */}
            <line x1="195" y1="215" x2="215" y2="215" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="198" y1="211" x2="212" y2="211" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="198" y1="219" x2="212" y2="219" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>

          <rect x="20" y="20" width="125" height="26" rx="13" fill="rgba(248, 250, 252, 0.2)" stroke="#f8fafc" strokeWidth="1" />
          <text x="82" y="37" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle">
            MEALYBUGS
          </text>
        </svg>
      );

    case 'dis-4':
      // Powdery Mildew (White powdery talcum-like patches coating leaf surface)
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="#052e16" />
          {/* Big Broad Leaf */}
          <ellipse cx="200" cy="200" rx="160" ry="120" fill="#15803d" />
          <path d="M50 200 L 350 200" stroke="#86efac" strokeWidth="6" opacity="0.6" />

          {/* White Powdery Mildew Blocs */}
          <ellipse cx="140" cy="160" rx="45" ry="30" fill="rgba(255,255,255,0.75)" filter="blur(6px)" />
          <ellipse cx="260" cy="180" rx="55" ry="35" fill="rgba(255,255,255,0.8)" filter="blur(8px)" />
          <ellipse cx="180" cy="240" rx="40" ry="25" fill="rgba(255,255,255,0.7)" filter="blur(5px)" />
          
          <rect x="20" y="20" width="145" height="26" rx="13" fill="rgba(255, 255, 255, 0.2)" stroke="#ffffff" strokeWidth="1" />
          <text x="92" y="37" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle">
            POWDERY MILDEW
          </text>
        </svg>
      );

    case 'dis-6':
      // Nitrogen Deficiency (Uniform chlorosis / yellowing on older leaf)
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nitro-leaf" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="#0f172a" />
          {/* Leaf Shape */}
          <path
            d="M200 40 C 310 100, 320 280, 200 360 C 80 280, 90 100, 200 40 Z"
            fill="url(#nitro-leaf)"
            filter="drop-shadow(0 6px 16px rgba(0,0,0,0.5))"
          />
          {/* Veins */}
          <line x1="200" y1="40" x2="200" y2="360" stroke="#ca8a04" strokeWidth="5" />
          <path d="M200 130 Q 250 110 280 120" stroke="#ca8a04" strokeWidth="3" />
          <path d="M200 130 Q 150 110 120 120" stroke="#ca8a04" strokeWidth="3" />
          <path d="M200 200 Q 260 180 290 190" stroke="#ca8a04" strokeWidth="3" />
          <path d="M200 200 Q 140 180 110 190" stroke="#ca8a04" strokeWidth="3" />

          <rect x="20" y="20" width="160" height="26" rx="13" fill="rgba(250, 204, 21, 0.2)" stroke="#facc15" strokeWidth="1" />
          <text x="100" y="37" fill="#fde047" fontSize="11" fontWeight="700" textAnchor="middle">
            NITROGEN CHLOROSIS
          </text>
        </svg>
      );

    case 'dis-7':
      // Leaf Edema (Raised water blisters and corky pimples on leaf underside)
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="#042f2e" />
          {/* Succulent Fleshy Leaf Underside */}
          <circle cx="200" cy="200" r="150" fill="#0f766e" />
          
          {/* Raised Edema Blisters */}
          {[
            { cx: 160, cy: 150, r: 16 },
            { cx: 240, cy: 160, r: 20 },
            { cx: 190, cy: 230, r: 18 },
            { cx: 260, cy: 240, r: 14 },
            { cx: 130, cy: 220, r: 15 },
          ].map((b, i) => (
            <g key={i}>
              <circle cx={b.cx} cy={b.cy} r={b.r} fill="#b45309" opacity="0.9" />
              <circle cx={b.cx - 3} cy={b.cy - 3} r={b.r * 0.7} fill="#f59e0b" opacity="0.8" />
              <circle cx={b.cx - 5} cy={b.cy - 5} r={b.r * 0.3} fill="#fef3c7" opacity="0.9" />
            </g>
          ))}

          <rect x="20" y="20" width="130" height="26" rx="13" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1" />
          <text x="85" y="37" fill="#fcd34d" fontSize="11" fontWeight="700" textAnchor="middle">
            LEAF EDEMA
          </text>
        </svg>
      );

    case 'dis-8':
      // Bacterial Leaf Spot (Dark brown spots with prominent bright yellow halos)
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="#052e16" />
          {/* Leaf Background */}
          <path d="M50 350 C 50 150, 200 50, 350 50 C 350 250, 250 350, 50 350 Z" fill="#15803d" />
          
          {/* Bacterial spots with yellow halos */}
          {[
            { cx: 170, cy: 180, rHalo: 35, rCore: 18 },
            { cx: 260, cy: 140, rHalo: 28, rCore: 14 },
            { cx: 230, cy: 260, rHalo: 32, rCore: 16 },
            { cx: 120, cy: 260, rHalo: 22, rCore: 10 },
          ].map((spot, i) => (
            <g key={i}>
              {/* Bright Yellow Halo */}
              <circle cx={spot.cx} cy={spot.cy} r={spot.rHalo} fill="#fde047" opacity="0.85" filter="blur(2px)" />
              {/* Dark Necrotic Brown/Black Center */}
              <circle cx={spot.cx} cy={spot.cy} r={spot.rCore} fill="#1c1917" />
              <circle cx={spot.cx + 2} cy={spot.cy + 2} r={spot.rCore * 0.7} fill="#451a03" />
            </g>
          ))}

          <rect x="20" y="20" width="165" height="26" rx="13" fill="rgba(253, 224, 71, 0.2)" stroke="#fde047" strokeWidth="1" />
          <text x="102" y="37" fill="#fef08a" fontSize="11" fontWeight="700" textAnchor="middle">
            BACTERIAL LEAF SPOT
          </text>
        </svg>
      );

    default:
      // Generic lush botanical illustration
      return (
        <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="400" fill="#062e1e" />
          <circle cx="200" cy="200" r="120" fill="#047857" opacity="0.4" filter="blur(20px)" />
          <path
            d="M200 80 C 270 140, 290 260, 200 320 C 110 260, 130 140, 200 80 Z"
            fill="#10b981"
          />
          <line x1="200" y1="80" x2="200" y2="320" stroke="#a7f3d0" strokeWidth="4" />
        </svg>
      );
  }
};
