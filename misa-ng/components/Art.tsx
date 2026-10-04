export default function Art({
  i = 0,
  className = "",
}: {
  i?: number;
  className?: string;
}) {
  const offset = (i * 47) % 90;
  const glowX = 80 + (i % 3) * 120;

  return (
    <svg
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Main architectural gradient */}
        <linearGradient
          id={`sky-${i}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#05080D" />
          <stop offset="45%" stopColor="#101722" />
          <stop offset="72%" stopColor="#473016" />
          <stop offset="100%" stopColor="#0A0D12" />
        </linearGradient>

        {/* Warm horizon */}
        <linearGradient
          id={`horizon-${i}`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#7A4208" stopOpacity="0" />
          <stop offset="45%" stopColor="#FFB52A" stopOpacity=".28" />
          <stop offset="70%" stopColor="#F59A16" stopOpacity=".12" />
          <stop offset="100%" stopColor="#7A4208" stopOpacity="0" />
        </linearGradient>

        {/* Building gradient */}
        <linearGradient
          id={`building-${i}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#17202C" />
          <stop offset="55%" stopColor="#0D131C" />
          <stop offset="100%" stopColor="#06090E" />
        </linearGradient>

        {/* Glass */}
        <linearGradient
          id={`glass-${i}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#394758" stopOpacity=".8" />
          <stop offset="100%" stopColor="#111923" stopOpacity=".2" />
        </linearGradient>

        {/* Golden glow */}
        <radialGradient id={`glow-${i}`}>
          <stop offset="0%" stopColor="#FFB52A" stopOpacity=".65" />
          <stop offset="45%" stopColor="#F59A16" stopOpacity=".2" />
          <stop offset="100%" stopColor="#F59A16" stopOpacity="0" />
        </radialGradient>

        {/* Soft vignette */}
        <radialGradient id={`vignette-${i}`}>
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity=".65" />
        </radialGradient>

        {/* Grain */}
        <filter id={`noise-${i}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <filter id={`blur-${i}`}>
          <feGaussianBlur stdDeviation="35" />
        </filter>

        <clipPath id={`frame-${i}`}>
          <rect width="800" height="1000" />
        </clipPath>
      </defs>

      <g clipPath={`url(#frame-${i})`}>
        {/* =====================================================
            SKY
        ====================================================== */}
        <rect
          width="800"
          height="1000"
          fill={`url(#sky-${i})`}
        />

        {/* Atmospheric glow */}
        <ellipse
          cx={glowX}
          cy="575"
          rx="280"
          ry="220"
          fill={`url(#glow-${i})`}
          filter={`url(#blur-${i})`}
        />

        {/* Horizon light */}
        <rect
          x="0"
          y="590"
          width="800"
          height="150"
          fill={`url(#horizon-${i})`}
        />

        {/* Subtle architectural grid */}
        <g opacity=".08">
          {Array.from({ length: 12 }).map((_, k) => (
            <line
              key={`v-${k}`}
              x1={k * 80}
              y1="0"
              x2={k * 80}
              y2="1000"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
          ))}

          {Array.from({ length: 13 }).map((_, k) => (
            <line
              key={`h-${k}`}
              x1="0"
              y1={k * 80}
              x2="800"
              y2={k * 80}
              stroke="#FFFFFF"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* =====================================================
            DISTANT CITY
        ====================================================== */}
        <g opacity=".5">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
            const height = 90 + ((k * 43 + offset) % 150);
            const x = k * 110 - 30;

            return (
              <rect
                key={k}
                x={x}
                y={650 - height}
                width={85}
                height={height}
                fill="#0B1017"
              />
            );
          })}
        </g>

        {/* =====================================================
            MAIN ARCHITECTURE
        ====================================================== */}

        {/* Rear tower */}
        <rect
          x="70"
          y="330"
          width="190"
          height="670"
          fill={`url(#building-${i})`}
        />

        {/* Rear tower edge */}
        <line
          x1="260"
          y1="330"
          x2="260"
          y2="1000"
          stroke="#394351"
          strokeOpacity=".35"
        />

        {/* Main tower */}
        <polygon
          points="285,220 575,275 575,1000 285,1000"
          fill={`url(#building-${i})`}
        />

        {/* Right tower */}
        <polygon
          points="575,390 755,330 755,1000 575,1000"
          fill="#080D14"
        />

        {/* Main tower glass face */}
        <polygon
          points="305,250 555,300 555,970 305,970"
          fill={`url(#glass-${i})`}
          opacity=".42"
        />

        {/* =====================================================
            VERTICAL ARCHITECTURAL LINES
        ====================================================== */}
        <g
          stroke="#596575"
          strokeWidth="2"
          opacity=".28"
        >
          <line x1="105" y1="350" x2="105" y2="1000" />
          <line x1="150" y1="350" x2="150" y2="1000" />
          <line x1="195" y1="350" x2="195" y2="1000" />
          <line x1="240" y1="350" x2="240" y2="1000" />

          <line x1="350" y1="265" x2="350" y2="1000" />
          <line x1="410" y1="275" x2="410" y2="1000" />
          <line x1="470" y1="285" x2="470" y2="1000" />
          <line x1="530" y1="295" x2="530" y2="1000" />
        </g>

        {/* =====================================================
            WINDOWS — REAR BUILDING
        ====================================================== */}
        <g>
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => {
              const lit =
                (row + col + i) % 4 !== 0;

              return (
                <rect
                  key={`rear-${row}-${col}`}
                  x={91 + col * 43}
                  y={390 + row * 72}
                  width="20"
                  height="31"
                  rx="1"
                  fill={lit ? "#D98B24" : "#202B38"}
                  opacity={lit ? ".55" : ".6"}
                />
              );
            })
          )}
        </g>

        {/* =====================================================
            WINDOWS — MAIN TOWER
        ====================================================== */}
        <g>
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => {
              const lit =
                (row * 2 + col + i) % 5 !== 0;

              return (
                <rect
                  key={`main-${row}-${col}`}
                  x={325 + col * 57}
                  y={335 + row * 68}
                  width="29"
                  height="37"
                  rx="1"
                  fill={lit ? "#E7A03A" : "#263240"}
                  opacity={lit ? ".6" : ".55"}
                />
              );
            })
          )}
        </g>

        {/* =====================================================
            RIGHT BUILDING WINDOWS
        ====================================================== */}
        <g opacity=".6">
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 2 }).map((_, col) => (
              <rect
                key={`right-${row}-${col}`}
                x={610 + col * 65}
                y={405 + row * 73}
                width="35"
                height="40"
                fill={
                  (row + col + i) % 3
                    ? "#A86A1A"
                    : "#1A2430"
                }
              />
            ))
          )}
        </g>

        {/* =====================================================
            HORIZONTAL FLOOR LINES
        ====================================================== */}
        <g
          stroke="#FFFFFF"
          strokeOpacity=".1"
          strokeWidth="1"
        >
          {Array.from({ length: 8 }).map((_, k) => (
            <line
              key={k}
              x1="285"
              y1={340 + k * 80}
              x2="575"
              y2={395 + k * 80}
            />
          ))}
        </g>

        {/* =====================================================
            FOREGROUND LANDSCAPE
        ====================================================== */}
        <path
          d="M0 820 C150 775 230 835 350 805 C480 770 610 820 800 760 L800 1000 L0 1000Z"
          fill="#05080C"
        />

        {/* Road / foreground reflection */}
        <path
          d="M0 910 C190 870 360 875 800 820 L800 1000 L0 1000Z"
          fill="#080C11"
        />

        <path
          d="M170 1000 L390 845 L460 845 L680 1000Z"
          fill="#111820"
          opacity=".7"
        />

        {/* Golden road reflection */}
        <path
          d="M335 1000 L410 850 L438 850 L510 1000Z"
          fill="#C47A16"
          opacity=".1"
        />

        {/* =====================================================
            LIGHT ACCENT
        ====================================================== */}
        <circle
          cx={glowX}
          cy="600"
          r="38"
          fill="#FFB52A"
          opacity=".18"
        />

        <circle
          cx={glowX}
          cy="600"
          r="9"
          fill="#FFD477"
          opacity=".7"
        />

        {/* =====================================================
            VIGNETTE
        ====================================================== */}
        <rect
          width="800"
          height="1000"
          fill={`url(#vignette-${i})`}
        />

        {/* =====================================================
            FILM GRAIN
        ====================================================== */}
        <rect
          width="800"
          height="1000"
          filter={`url(#noise-${i})`}
          opacity=".035"
        />

        {/* Editorial frame */}
        <rect
          x="24"
          y="24"
          width="752"
          height="952"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity=".08"
        />
      </g>
    </svg>
  );
}