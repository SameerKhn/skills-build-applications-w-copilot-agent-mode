

import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ user: '', score: '' });
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setEntries(results);
        console.log('Leaderboard API:', apiUrl);
        console.log('Fetched leaderboard:', results);
      });
  }, [apiUrl]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // Add POST logic here if backend supports it
    setShowModal(false);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="card-title mb-0">Leaderboard</h2>
          <button className="btn btn-success" onClick={handleShow}>Add Entry</button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={e.id || i}>
                  <td>{e.user?.name || 'Unknown'}</td>
                  <td>{e.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Leaderboard Entry</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">User</label>
                      <input type="text" className="form-control" name="user" value={form.user} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Score</label>
                      <input type="number" className="form-control" name="score" value={form.score} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
