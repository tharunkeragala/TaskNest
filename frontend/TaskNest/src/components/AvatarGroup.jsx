import React from "react";
import { DEFAULT_AVATAR } from "../constants/images";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
  // Remove empty / invalid values
  const validAvatars = avatars.filter(Boolean);

  // If no avatars, show default avatar
  if (validAvatars.length === 0) {
    return (
      <div className="flex items-center">
        <img
          src={DEFAULT_AVATAR}
          alt="Default avatar"
          className="w-9 h-9 rounded-full border-2 border-white"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {validAvatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar || DEFAULT_AVATAR}
          alt={`Avatar ${index + 1}`}
          className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
        />
      ))}

      {validAvatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{validAvatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
