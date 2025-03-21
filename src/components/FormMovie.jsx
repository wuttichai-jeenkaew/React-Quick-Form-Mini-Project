import React, { useState } from "react";


const FormMovie = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [opinion, setOpinion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', favoriteMovie: '', opinion: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { name: '', email: '', favoriteMovie: '', opinion: '' };

    if (!name) newErrors.name = 'โปรดใส่ชื่อของคุณ';
    if (!email) newErrors.email = 'โปรดใส่อีเมลของคุณ';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'โปรดใส่อีเมลให้ถูกต้อง';
    if (!favoriteMovie) newErrors.favoriteMovie = 'กรุณาเลือกหนังที่คุณชอบ';
    

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (!hasErrors) {
      console.log({ name, email, favoriteMovie});
      setSubmitted(true);
    }
};


  const resetForm = () => {
    setName('');
    setEmail('');
    setFavoriteMovie('');
    setOpinion('');
    setErrors({ name: '', email: '', favoriteMovie: ''});
    setSubmitted(false);
  };

  const movies = [
    { title: "Avatar (2009)", director: "James Cameron" },
    { title: "Inception (2010)", director: "Christopher Nolan" },
    { title: "Interstellar (2014)", director: "Christopher Nolan" },
    { title: "The Shawshank Redemption (1994)", director: "Frank Darabont" },
    { title: "Pulp Fiction (1994)", director: "Quentin Tarantino" },
    { title: "Parasite (2019)", director: "Bong Joon-ho" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        {submitted ? (
            
        <div className="bg-green-100 p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-white bg-gradient-to-r from-purple-700 to-indigo-600 pt-4 flex items-center -my-8 -mx-6 py-5">
          <span className="ml-6 text-4xl">🎬</span> Movie Survey
        </h2>
          <h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center">
            <span className="material-icons mr-2">✅</span> ส่งแบบสำรวจสำเร็จ!
          </h2>
          <p><strong>ชื่อ:</strong> {name}</p>
          <p><strong>อีเมล:</strong> {email}</p>
          <p><strong>หนังที่เลือก:</strong> <span className="text-sm font-medium text-purple-700 col-span-2">{favoriteMovie}</span></p>
          <p><strong>ความคิดเห็น:</strong> <p className="text-sm bg-gray-50 p-3 rounded-md">{opinion}</p></p>
          <button onClick={resetForm} className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            ทำแบบสำรวจใหม่
          </button>
        </div>
      ) : (
           <>
 
           
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h2 className="text-2xl font-bold mb-6 text-white bg-gradient-to-r from-purple-700 to-indigo-600 pt-4 flex items-center -my-8 -mx-8 py-5">
          <span className="ml-6 text-4xl">🎬</span> Movie Survey
        </h2>


        <label className="block mb-2 font-semibold">ชื่อ </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="กรุณากรอกชื่อของคุณ"
          className={`w-full mb-1 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-purple-500`}
        />
        {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

        <label className="block mb-2 font-semibold">อีเมล </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={`w-full mb-1 p-2 border ${errors.email === 'โปรดใส่อีเมลของคุณ' ? 'border-red-500' : errors.email === 'โปรดใส่อีเมลให้ถูกต้อง' ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:border-purple-500`}
        />
         {errors.email && <p className={`text-sm mb-4 ${errors.email === 'โปรดใส่อีเมลของคุณ' ? 'text-red-500' : 'text-red-500'}`}>{errors.email}</p>}

        <label className={`block mb-2 font-semibold`}>เลือกหนังที่คุณชอบ </label>
        {movies.map((movie, index) => (
        <>
     
          <div key={index} className="mb-2 flex" >
            <input
              type="radio"
              name="favoriteMovie"
              value={movie.title}
              checked={favoriteMovie === movie.title}
              onChange={(e) => setFavoriteMovie(e.target.value)}
              className="mr-2"
            />
            <label>
              <span>{movie.title}</span>
              <br />
              <span className="text-gray-400 ">Director: {movie.director}</span>
            </label>
          </div>
          </>
        ))}
        {errors.favoriteMovie && <p className="text-red-500 text-sm mb-4">{errors.favoriteMovie}</p>}

        <label className="block mb-2 font-semibold">ความคิดเห็นเกี่ยวกับหนัง</label>
        <textarea value={opinion} onChange={(e) => setOpinion(e.target.value)} placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..." className={`w-full p-2 border 'border-gray-300'} rounded focus:outline-none focus:border-purple-500 mb-1`} rows="3" /> 
        <div className="flex justify-between pt-4">
          <button type="button" onClick={resetForm} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">รีเซ็ต</button>
          <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">ส่งแบบสำรวจ</button>
        </div>
      </form>
      </>
    )}
    </div>
  );
};


export default FormMovie;
