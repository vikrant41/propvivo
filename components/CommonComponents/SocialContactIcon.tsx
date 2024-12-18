import React from 'react';
import { FbGreenIcon, FbIcon, InstagramIcon, InstaGreenIcon, XGreenIcon, XIcon } from '../shared/Icons';
import Link from 'next/link';

const socialIcons = [
  { id: 1, link: 'https://www.facebook.com/Propvivo', icon: <FbGreenIcon /> },
  { id: 2, link: '', icon: <XGreenIcon /> }, 
  { id: 3, link: 'https://www.instagram.com/propvivo/?hl=en', icon: <InstaGreenIcon /> },
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
