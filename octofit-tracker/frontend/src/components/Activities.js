

import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ type: '', duration: '', date: '' });
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities API:', apiUrl);
        console.log('Fetched activities:', results);
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
          <h2 className="card-title mb-0">Activities</h2>
          <button className="btn btn-success" onClick={handleShow}>Add Activity</button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a, i) => (
                <tr key={a.id || i}>
                  <td>{a.type}</td>
                  <td>{a.duration}</td>
                  <td>{a.date}</td>
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
                  <h5 className="modal-title">Add Activity</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Type</label>
                      <input type="text" className="form-control" name="type" value={form.type} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Duration (min)</label>
                      <input type="number" className="form-control" name="duration" value={form.duration} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date</label>
                      <input type="date" className="form-control" name="date" value={form.date} onChange={handleChange} required />
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

export default Activities;
