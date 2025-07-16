import React from 'react';
import { FbColoredIcon, FbIcon, InstagramColoredIcon, InstagramIcon, XColoredIcon, XIcon } from '../shared/Icons';
import Link from 'next/link';

const socialIcons = [
  { id: 1, link: 'https://www.facebook.com/Propvivo', icon: <FbColoredIcon /> },
  { id: 2, link: 'https://x.com/propvivo', icon: <XColoredIcon /> }, 
  { id: 3, link: 'https://www.instagram.com/propvivo/?hl=en', icon: <InstagramColoredIcon /> },
];

const SocialIcons = () => {
  return (
    <>
      <h3 className="text-lg text-white font-normal">Follow us on:</h3>
      <div className="flex gap-4 mt-4">
        {socialIcons.map((item) => (
          <Link key={item.id} href={item.link} passHref>
            <a target="_blank" rel="noopener noreferrer">
              {item.icon}
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SocialIcons;
