import React from 'react';
import useFetchSVG from '@/hooks/use-fetch-svg';
const SvgIcon = ({ url, className, style , ...props }) => {
  const svgContent = useFetchSVG(url);

  return (
    <div
      className={className}
      style={style}
      {...props}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};



export default SvgIcon;
