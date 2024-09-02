import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png'

const Header = () => {
    
  const navigate = useNavigate();

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    if (selectedType !== "All") {
      navigate(`/pokemon/type/${selectedType.toLowerCase()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className='header flex flex-col bg-rose-600'>
      <div className='flex justify-center'>
        <img src={Logo} alt="logo" className='w-96' />
      </div>

      <form className='m-3'>
        <label className="mr-3" htmlFor="type">Select Type</label>
        <select name="type" id="type" onChange={handleTypeChange}>
          <option value="All">All</option>
          <option value="Normal" className='bg-gray-500'>Normal</option>
          <option value="Fighting" className='bg-amber-500'>Fighting</option>
          <option value="Flying" className='bg-sky-300'>Flying</option>
          <option value="Poison" className='bg-purple-700'>Poison</option>
          <option value="Ground" className='bg-amber-900'>Ground</option>
          <option value="Rock"className='bg-stone-700'>Rock</option>
          <option value="Bug" className='bg-lime-600'>Bug</option>
          <option value="Ghost" className='bg-fuchsia-950'>Ghost</option>
          <option value="Steel" className='bg-indigo-600'>Steel</option>
          <option value="Fire" className='bg-red-600'>Fire</option>
          <option value="Water" className='bg-blue-600'>Water</option>
          <option value="Grass" className='bg-green-600'>Grass</option>
          <option value="Electric" className='bg-yellow-300'>Electric</option>
          <option value="Psychic" className='bg-fuchsia-600'>Psychic</option>
          <option value="Ice" className='bg-blue-300'>Ice</option>
          <option value="Dragon" className='bg-blue-800'>Dragon</option>
          <option value="Dark" className='bg-neutral-700'>Dark</option>
          <option value="Fairy" className='bg-rose-500'>Fairy</option>
        </select>
      </form>
    </header>
  );
};

export default Header;