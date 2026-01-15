import Image from "next/image";
import React from "react";

const ListIcon = ({
  size = undefined,
  color = '#000000',
  strokeWidth = 1,
  background = 'transparent',
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push('scaleX(-1)');
  if (flipVertical) transforms.push('scaleY(-1)');


  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        opacity,
        transform: transforms.join(' ') || undefined,
        filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
        backgroundColor: background !== 'transparent' ? background : undefined
      }}
    >
      <path fill="currentColor" d="M2 4V3h2v1zm4 0V3h8v1zm0 3V6h8v1zm0 3V9h8v1zM2 7V6h2v1zm0 3V9h2v1zm4 3v-1h8v1zm-4 0v-1h2v1z"/>
    </svg>
  );
};


const Navbar = () => {
  return (
    <header className="px-6 pt-3 pb-2 sticky top-0 bg-white z-10">
      <div className="flex justify-between items-center">

        {/* Left Button (Grid icon) */}
        <button className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
           <ListIcon />
          </div>
        </button>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm">
          <Image
            src="https://i.pravatar.cc/100?img=33"
            alt="Profile"
            width={40}
            height={40}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
