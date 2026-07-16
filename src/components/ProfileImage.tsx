import { useState } from 'react';
import myPic from '../assets/mypic.jpeg';
import './styles/ProfileImage.css';

interface ProfileImageProps {
  alt?: string;
  className?: string;
}

const ProfileImage = ({ alt = "Profile Picture", className = "" }: ProfileImageProps) => {
  const [error, setError] = useState(false);

  // Fallback to placeholder if image fails to load
  const imageSrc = error ? `${import.meta.env.BASE_URL}images/placeholder.webp` : myPic;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`profile-image ${className}`}
      onError={() => setError(true)}
    />
  );
};

export default ProfileImage;
