import React from 'react';
interface ISvgIconProps {
  iconId: string;
  className?: string;
  onClick?: () => any;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
  title?: string;
}

interface IIcons {
  [Key: string]: {
    viewBox: string;
    content: JSX.Element;
  };
}

const SvgIcons = ({
  iconId,
  className = '',
  onClick,
  fill = 'currentColor',
  stroke = 'currentColor',
  strokeWidth = '20px',
  title = ''
}: ISvgIconProps) => (
  <svg
    onClick={onClick}
    className={className}
    viewBox={icons[iconId].viewBox}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
  >
    <>
    <title>{title}</title>
    {icons[iconId].content}
    </>
  </svg>
);

export default SvgIcons;

const icons: IIcons = {
  play: {
    viewBox: '0 0 400 400',
    content: (
      <>
        <circle cx="200" cy="200" r="180" fill="white" />
        <polygon points="280,200 160,280 160,120" fill="white" />
      </>
    )
  },
  pause: {
    viewBox: '0 0 400 400',
    content: (
      <>
        <circle cx="200" cy="200" r="180" fill="white" />
        <rect x="120" y="120" width="60" height="160" fill="white" />
        <rect x="220" y="120" width="60" height="160" fill="white" />
      </>
    )
  },
  stop: {
    viewBox: '0 0 400 400',
    content: (
      <>
        <circle cx="200" cy="200" r="180" fill="white" />
        <rect x="120" y="120" width="160" height="160" fill="white" />
      </>
    )
  },
  edit: {
    viewBox: '0 0 32 32',
    content: (
      <path
        d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628
      1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"
      />
    )
  },
  add: {
    viewBox: '0 0 32 32',
    content: (
      <path
        d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1
      1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"
      />
    )
  },
  delete: {
    viewBox: '0 0 32 32',
    content: (
      <path
        d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357
      0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357
      0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771
      -0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0
      0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229
      1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708
      -9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586
      -4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"
      />
    )
  }
};
