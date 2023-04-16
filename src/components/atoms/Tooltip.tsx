import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

function Tooltip({ text, children }: TooltipProps) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative">
      <div
        className="inline-block"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute z-10 p-2 text-white bg-gray-700 rounded-md">
          {text}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
