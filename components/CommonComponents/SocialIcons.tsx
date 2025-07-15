import React from 'react';
import { FbIcon, InstagramIcon, XIcon } from '../shared/Icons';
import Link from 'next/link';

const socialIcons = [
  { id: 1, link: 'https://www.facebook.com/Propvivo', icon: <FbIcon /> },
  { id: 2, link: 'https://x.com/propvivo', icon: <XIcon /> }, 
  { id: 3, link: 'https://www.instagram.com/propvivo/?hl=en', icon: <InstagramIcon /> },
];

const SocialIcons = () => {
  return (
    <>
      <h3 className="text-lg text-white font-normal">Follow us on:</h3>
      <div className="flex gap-6 mt-5">
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
