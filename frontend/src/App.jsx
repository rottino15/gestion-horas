import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
<<<<<<< HEAD
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
=======
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDay, setSelectedDay] = useState(today);
  const [monthEntries, setMonthEntries] = useState([]);
  const [entries, setEntries] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [form, setForm] = useState({ day: today, description: '', start_time: '', end_time: '' });

  const fetchMonth = async (month) => {
    const res = await fetch(`http://localhost:3001/api/hours?month=${month}`);
    const data = await res.json();
    setMonthEntries(data);
  };

  useEffect(() => {
    const month = selectedDay.slice(0, 7);
    fetchMonth(month);
  }, [selectedDay]);

  useEffect(() => {
    setForm((f) => ({ ...f, day: selectedDay }));
    const dayEntries = monthEntries.filter((e) => e.day === selectedDay);
    setEntries(dayEntries);
    let total = 0;
    monthEntries.forEach((e) => {
      const start = new Date(`1970-01-01T${e.start_time}:00Z`);
      const end = new Date(`1970-01-01T${e.end_time}:00Z`);
      total += end - start;
    });
    setTotalHours(total / 1000 / 60 / 60);
  }, [monthEntries, selectedDay]);
>>>>>>> 27qwgj-codex/crear-sistema-de-registro-de-horas

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
<<<<<<< HEAD
    setForm({ description: '', start_time: '', end_time: '' });
    fetchHours();
  };

  return (

    <div className="container">
      <h1>Gestión de Horas</h1>
=======
    setForm({ ...form, description: '', start_time: '', end_time: '' });
    const month = selectedDay.slice(0, 7);
    fetchMonth(month);
  };

  return (
    <div className="container">
      <h1>Gestión de Horas</h1>

      <div className="controls">
        <label>
          Día:
          <input
            type="date"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          />
        </label>
        <div className="summary">Horas en el mes: {totalHours.toFixed(2)}</div>
      </div>

>>>>>>> 27qwgj-codex/crear-sistema-de-registro-de-horas
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
<<<<<<< HEAD
=======
          type="time"
>>>>>>> 27qwgj-codex/crear-sistema-de-registro-de-horas
        />
        <input
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          placeholder="Fin"
<<<<<<< HEAD
        />
        <button type="submit">Agregar</button>
      </form>
=======
          type="time"
        />
        <button type="submit">Agregar</button>
      </form>

>>>>>>> 27qwgj-codex/crear-sistema-de-registro-de-horas
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
