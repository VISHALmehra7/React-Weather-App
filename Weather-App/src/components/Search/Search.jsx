import React from 'react'

function Search({search,setSearch,handleSearch}) {
  return (
    <div>
        <input className='border-none bg-gray-200 rounded-md p-2 m-2 ' type="text" placeholder='Enter city name' name="search" value={search} onChange={(event)=>setSearch(event.target.value)} />

        <button className='bg-slate-700 p-2 rounded-md text-white' onClick={handleSearch} >Search Weather</button>
    </div>
  )
}

export default Search