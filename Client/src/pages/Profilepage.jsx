import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import assests from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const Profilepage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState(authUser?.fullName || ''); // default fallback
  const [bio, setBio] = useState(authUser?.bio || '');
  const [loading, setLoading] = useState(false); // ✅ added
  const [error, setError] = useState(''); // ✅ added

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio });
        navigate('/');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        const base64Image = reader.result;
        await updateProfile({ profilePic: base64Image, fullName: name, bio });
        navigate('/');
      };
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg font-semibold'>Profile Details</h3>

          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept='.png, .jpg, .jpeg'
              hidden
            />
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) : assests.avatar_icon}
              alt='Profile Preview'
              className='w-12 h-12 rounded-full object-cover'
            />
            Upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder='Your Name'
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          />

          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder='Write profile bio'
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
            rows={4}
          ></textarea>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer hover:opacity-90 transition duration-300 disabled:opacity-50'
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>

        <img
          className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover'
          src={authUser?.profilePic || assests.logo_icon}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Profilepage;
