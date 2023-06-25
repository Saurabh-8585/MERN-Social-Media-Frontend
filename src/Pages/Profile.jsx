import React from 'react'

const Profile = () => {
  const user = {
    name: 'John Doe',
    photo: "https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg",
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'New York, USA',
    website: 'https://example.com',
    social: {
      twitter: 'https://twitter.com/example',
      linkedin: 'https://linkedin.com/in/example',
    },
  };
  return (
    <div className="p-5 flex items-center justify-center  w-full">
      <div className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-800 p-4 rounded-xl border w-full max-w-xl shadow-sm ">
      <div className="flex flex-col items-center">
        <img src={user.photo} alt={user.name} className="w-32 h-32 rounded-full mb-4" />
        <h2 className="text-xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.bio}</p>
        <p className="text-gray-600 mb-4">{user.location}</p>
        <a href={user.website} className="text-blue-500 hover:underline mb-4" target="_blank" rel="noopener noreferrer">
          {user.website}
        </a>
      </div>
      <div className="flex justify-center gap-4">
        <a href={user.social.twitter} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href={user.social.linkedin} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  </div>

  )
}

export default Profile