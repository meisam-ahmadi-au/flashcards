import React from 'react';
interface ISvgIconProps {
  iconId: string;
  className?: string;
  onClick?: () => any;
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
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
  strokeWidth = '20px'
}: ISvgIconProps) => (
  <svg
    onClick={onClick}
    className={'svg ' + className}
    viewBox={icons[iconId].viewBox}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
  >
    {icons[iconId].content}
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
  }
};
