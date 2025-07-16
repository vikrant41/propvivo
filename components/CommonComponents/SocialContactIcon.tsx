import React from 'react';
import { FbColoredIcon, FbGreenIcon, FbIcon, InstagramColoredIcon, InstagramIcon, InstaGreenIcon, XColoredIcon, XGreenIcon, XIcon } from '../shared/Icons';
import Link from 'next/link';

const socialIcons = [
  { id: 1, link: 'https://www.facebook.com/Propvivo', icon: <FbColoredIcon /> },
  { id: 2, link: '', icon: <XColoredIcon /> }, 
  { id: 3, link: 'https://www.instagram.com/propvivo/?hl=en', icon: <InstagramColoredIcon /> },
];

const SocialContactIcon = () => {
  return (
    <>
      <h5 className="font-medium">Follow us on:</h5>
      <div className="flex gap-x-4">
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

export default SocialContactIcon;
