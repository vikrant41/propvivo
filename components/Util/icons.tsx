export const SuccessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_1443_13529)">
      <circle cx={16} cy={14} r={12} fill="#1E9932" />
    </g>
    <path
      d="M14.0007 16.7998L11.6674 14.4665C11.6063 14.4047 11.5337 14.3557 11.4536 14.3222C11.3735 14.2888 11.2875 14.2715 11.2007 14.2715C11.1139 14.2715 11.0279 14.2888 10.9478 14.3222C10.8677 14.3557 10.795 14.4047 10.734 14.4665C10.6723 14.5275 10.6232 14.6002 10.5898 14.6803C10.5563 14.7604 10.5391 14.8464 10.5391 14.9332C10.5391 15.02 10.5563 15.1059 10.5898 15.1861C10.6232 15.2662 10.6723 15.3388 10.734 15.3998L13.5274 18.1932C13.7874 18.4532 14.2074 18.4532 14.4674 18.1932L21.534 11.1332C21.5958 11.0722 21.6448 10.9995 21.6783 10.9194C21.7118 10.8393 21.729 10.7533 21.729 10.6665C21.729 10.5797 21.7118 10.4937 21.6783 10.4136C21.6448 10.3335 21.5958 10.2609 21.534 10.1998C21.473 10.1381 21.4003 10.089 21.3202 10.0556C21.2401 10.0221 21.1542 10.0049 21.0674 10.0049C20.9805 10.0049 20.8946 10.0221 20.8145 10.0556C20.7344 10.089 20.6617 10.1381 20.6007 10.1998L14.0007 16.7998Z"
      fill="white"
    />
    <defs>
      <filter
        id="filter0_d_1443_13529"
        x={0}
        y={0}
        width={32}
        height={32}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.117647 0 0 0 0 0.6 0 0 0 0 0.196078 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1443_13529"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1443_13529"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const TostErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_d_2821_5946)">
      <circle cx={16} cy={14} r={12} fill="#FF4D4D" />
    </g>
    <path
      d="M15.9982 10V15.3333M16.0315 18V18.0667H15.9648V18H16.0315Z"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="filter0_d_2821_5946"
        x={0}
        y={0}
        width={32}
        height={32}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.219608 0 0 0 0 0.219608 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2821_5946"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2821_5946"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
