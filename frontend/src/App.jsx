import React, { useEffect, useState } from 'react';

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ description: '', start_time: '', end_time: '' });

  const fetchHours = async () => {
    const res = await fetch('http://localhost:3001/api/hours');
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchHours();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3001/api/hours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ description: '', start_time: '', end_time: '' });
    fetchHours();
  };

  return (
    <div>
      <h1>Gestión de Horas</h1>
      <form onSubmit={handleSubmit}>
        <input name="description" value={form.description} onChange={handleChange} placeholder="Descripción" />
        <input name="start_time" value={form.start_time} onChange={handleChange} placeholder="Inicio" />
        <input name="end_time" value={form.end_time} onChange={handleChange} placeholder="Fin" />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {entries.map((e) => (
          <li key={e.id}>{`${e.description} | ${e.start_time} - ${e.end_time}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
