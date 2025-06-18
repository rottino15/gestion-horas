import React, { useEffect, useState } from 'react';
import './App.css';

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

    <div className="container">
      <h1>Gestión de Horas</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          placeholder="Inicio"
        />
        <input
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          placeholder="Fin"
        />
        <button type="submit">Agregar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id}>
              <td>{e.description}</td>
              <td>{e.start_time}</td>
              <td>{e.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
