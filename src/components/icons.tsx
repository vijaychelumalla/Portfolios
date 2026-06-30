import React from "react";

export type IconProps = React.SVGProps<SVGSVGElement>;

export const HtmlIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="html-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E44D26" />
        <stop offset="100%" stopColor="#F16529" />
      </linearGradient>
    </defs>
    <path
      d="M6.4 56.6L2.6 6.4h58.8l-3.8 50.2L32 61.2 6.4 56.6z"
      fill="url(#html-grad)"
    />
    <path
      d="M32 11.2v44.6l19.5-3.8 3.2-40.8H32z"
      fill="#F16529"
      opacity="0.3"
    />
    <path
      d="M32 19.4H19.8l.8 9.2H32v-9.2zm0 14.8H25l.4 5 6.6 1.8v-6.8z"
      fill="#FFF"
    />
    <path
      d="M32 19.4v9.2h12.2l-.9 10-11.3 3v6.8l17.8-4.8 2.2-24.2H32z"
      fill="#EAEAEA"
    />
    <path
      d="M32 34.2h6.8l-.6 6.8-6.2 1.7v-8.5z"
      fill="#EAEAEA"
    />
  </svg>
);

export const CssIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="css-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#264DE4" />
        <stop offset="100%" stopColor="#2965F1" />
      </linearGradient>
    </defs>
    <path
      d="M6.4 56.6L2.6 6.4h58.8l-3.8 50.2L32 61.2 6.4 56.6z"
      fill="url(#css-grad)"
    />
    <path
      d="M32 11.2v44.6l19.5-3.8 3.2-40.8H32z"
      fill="#2965F1"
      opacity="0.3"
    />
    <path
      d="M32 19.4H20.2l2.6 28.6L32 50.8V44l-5.6-1.5-.4-4.5H32v-9.2H25.4l-.4-4.6H32v-4.8z"
      fill="#FFF"
    />
    <path
      d="M32 19.4v4.8h17l-.8 9.2H32v9.2h10.8l-1 11-9.8 2.6v6.8l17.8-4.8 2.8-31.2H32z"
      fill="#EAEAEA"
    />
    <path
      d="M32 33.4h11.2l-.8 9-10.4 2.8v-11.8z"
      fill="#EAEAEA"
    />
  </svg>
);

export const JsIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="js-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5DE19" />
        <stop offset="100%" stopColor="#E7A818" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="url(#js-grad)" />
    <path
      d="M50.2 51.2c-2.1 3.7-5.9 5.3-10.7 5.3-6.7 0-10.2-3.7-10.7-9.1h6.7c.3 2.4 1.6 3.7 4 3.7 2.4 0 3.7-1.1 3.7-3.2v-22h7v22c0 2.1 0 3.2 0 3.2zM23.5 40.8c.5 3.2 2.7 5.1 5.9 5.1 2.7 0 4.5-1.3 4.5-3.7 0-2.7-1.9-3.7-5.1-5.1l-1.9-.8c-4.8-1.9-7.7-4.5-7.7-9.3 0-5.6 4.5-9.6 11-9.6 6.1 0 9.9 3.2 10.4 8.5h-6.7c-.3-2.4-1.6-3.7-3.7-3.7-1.9 0-3.5 1.1-3.5 2.9 0 2.1 1.3 2.9 4 4l1.9.8c5.3 2.1 8.8 4.5 8.8 9.9 0 5.9-4.5 10.2-11.8 10.2-7 0-11.5-3.7-12-10.2h6.7z"
      fill="#1F1F1F"
    />
  </svg>
);

export const TsIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="ts-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3178C6" />
        <stop offset="100%" stopColor="#0058A3" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="url(#ts-grad)" />
    <path
      d="M18 25.4h9.6v25.8H34V25.4h9.6V18.8H18v6.6zm31.2 15.4c.5 3.2 2.7 5.1 5.9 5.1 2.7 0 4.5-1.3 4.5-3.7 0-2.7-1.9-3.7-5.1-5.1l-1.9-.8c-4.8-1.9-7.7-4.5-7.7-9.3 0-5.6 4.5-9.6 11-9.6 6.1 0 9.9 3.2 10.4 8.5H59c-.3-2.4-1.6-3.7-3.7-3.7-1.9 0-3.5 1.1-3.5 2.9 0 2.1 1.3 2.9 4 4l1.9.8c5.3 2.1 8.8 4.5 8.8 9.9 0 5.9-4.5 10.2-11.8 10.2-7 0-11.5-3.7-12-10.2h6.7z"
      fill="#FFF"
    />
  </svg>
);

export const ReactIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="react-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00F2FE" />
        <stop offset="100%" stopColor="#4FACFE" />
      </linearGradient>
    </defs>
    <g transform="translate(32, 32)">
      <circle r="5" fill="url(#react-grad)" />
      <ellipse rx="26" ry="10" stroke="url(#react-grad)" strokeWidth="3" fill="none" transform="rotate(0)" />
      <ellipse rx="26" ry="10" stroke="url(#react-grad)" strokeWidth="3" fill="none" transform="rotate(60)" />
      <ellipse rx="26" ry="10" stroke="url(#react-grad)" strokeWidth="3" fill="none" transform="rotate(120)" />
    </g>
  </svg>
);

export const NextIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="32" cy="32" r="30.5" fill="#000" stroke="#FFF" strokeOpacity="0.25" strokeWidth="2" />
    <path
      d="M46.7 48L28.5 24v20H24.5V16h4.5l14.4 19.2V16H47.5v32z"
      fill="#FFF"
    />
    <rect x="40.7" y="16" width="4" height="20" fill="#FFF" />
  </svg>
);

export const TailwindIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="tw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <g transform="translate(4, 12) scale(1.75)">
      <path
        d="M16 7.3C12.8 7.3 10.4 8.9 8.8 12.1c2.4-.8 4.4-.4 6 1.2 1.2 1.2 2 2.8 3.6 4.4 2.7 2.7 5.9 3.6 9.6 2.8 2.4-.5 4.3-2.1 5.3-4.8-2.4.8-4.4.4-6-1.2-1.2-1.2-2-2.8-3.6-4.4-2.7-2.7-5.9-3.6-9.6-2.8zM8 15.3C4.8 15.3 2.4 16.9.8 20.1c2.4-.8 4.4-.4 6 1.2 1.2 1.2 2 2.8 3.6 4.4 2.7 2.7 5.9 3.6 9.6 2.8 2.4-.5 4.3-2.1 5.3-4.8-2.4.8-4.4.4-6-1.2-1.2-1.2-2-2.8-3.6-4.4-2.7-2.7-5.9-3.6-9.6-2.8z"
        fill="url(#tw-grad)"
      />
    </g>
  </svg>
);

export const NodeIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#689F63" />
        <stop offset="100%" stopColor="#339933" />
      </linearGradient>
    </defs>
    <path
      d="M32 2.6L8 16.5v27.8l24 13.9 24-13.9V16.5L32 2.6zm19.5 40.4L32 54.3V27.2l19.5-11.3v27.1z"
      fill="url(#node-grad)"
    />
    <path
      d="M32 2.6L8 16.5v27.8l24 13.9V46.5L12.5 39.8V20.2L32 9V2.6z"
      fill="#689F63"
      opacity="0.65"
    />
  </svg>
);

export const ExpressIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="express-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EAEAEA" />
        <stop offset="100%" stopColor="#9C9C9C" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="#1C1C1E" stroke="url(#express-grad)" strokeOpacity="0.2" strokeWidth="2" />
    <text
      x="32"
      y="41"
      fill="url(#express-grad)"
      fontSize="28"
      fontWeight="900"
      fontFamily="'Inter', system-ui, sans-serif"
      textAnchor="middle"
      letterSpacing="-0.04em"
    >
      ex
    </text>
  </svg>
);

export const MongoIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="mongo-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#439A45" />
        <stop offset="100%" stopColor="#3F8F41" />
      </linearGradient>
      <linearGradient id="mongo-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10AA50" />
        <stop offset="100%" stopColor="#13AA52" />
      </linearGradient>
    </defs>
    <g transform="translate(14, 2) scale(1.5)">
      <path
        d="M12 1c-.3 0-5.8 4.7-5.8 10.3c0 5.2 3.8 8.7 5.8 10.7c2-2 5.8-5.5 5.8-10.7C17.8 5.7 12.3 1 12 1zm0 2.2c1.7 2.3 3.6 4.7 3.6 8.1c0 3.3-2.1 5.9-3.6 7.4V3.2z"
        fill="url(#mongo-grad2)"
      />
      <path
        d="M12 3.2v14.5c-1.5-1.5-3.6-4.1-3.6-7.4c0-3.4 1.9-5.8 3.6-8.1z"
        fill="url(#mongo-grad1)"
      />
    </g>
  </svg>
);

export const GitIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="git-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F05032" />
        <stop offset="100%" stopColor="#DE4C30" />
      </linearGradient>
    </defs>
    <path
      d="M61.8 29.4L34.6 2.2c-1.6-1.6-4-1.6-5.6 0L2.2 29.4c-1.6 1.6-1.6 4 0 5.6l27.2 27.2c1.6 1.6 4 1.6 5.6 0l27.2-27.2c1.6-1.6 1.6-4.1 0-5.6z"
      fill="url(#git-grad)"
    />
    <g fill="#FFF">
      <circle cx="32" cy="46.6" r="6" />
      <circle cx="32" cy="20.2" r="6" />
      <circle cx="20.2" cy="32" r="6" />
      <path d="M32 26.2v14.4M20.2 32h5.8" stroke="#FFF" strokeWidth="5.5" />
    </g>
  </svg>
);

export const GithubIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="32" cy="32" r="30.5" fill="#181717" stroke="#FFF" strokeOpacity="0.2" strokeWidth="2" />
    <path
      d="M32 14.8c-9.6 0-17.3 7.7-17.3 17.3 0 7.7 5 14.2 11.9 16.5.9.2 1.2-.4 1.2-.8v-2.9c-4.8 1-5.8-2.3-5.8-2.3-.8-2-1.9-2.6-1.9-2.6-1.6-1.1.1-1.1.1-1.1 1.7.1 2.6 1.8 2.6 1.8 1.5 2.6 4 1.8 5 1.4.2-1.1.6-1.8 1.1-2.2-3.8-.4-7.8-1.9-7.8-8.5 0-1.9.7-3.4 1.8-4.6-.2-.4-.8-2.2.2-4.5 0 0 1.4-.5 4.7 1.8a16.6 16.6 0 018.9 0c3.3-2.3 4.7-1.8 4.7-1.8 1 2.3.4 4.1.2 4.5 1.1 1.2 1.8 2.7 1.8 4.6 0 6.6-4 8.1-7.9 8.5.6.5 1.2 1.6 1.2 3.2V48c0 .4.3 1 .1.8 7-2.3 12-8.8 12-16.5 0-9.6-7.7-17.3-17.3-17.3z"
      fill="#FFF"
    />
  </svg>
);
