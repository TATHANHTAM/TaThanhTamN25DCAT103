import { useState } from 'react';

const priorities = { high: 'Cao', medium: 'Trung bình', low: 'Thấp' };

export default function App() {
  const [form, setForm] = useState({ name: '', priority: 'medium' });
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const completedCount = tasks.filter((task) => task.completed).length;

  function addTask(event) {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError('Vui lòng nhập tên công việc.');
      return;
    }
    setTasks((current) => [...current, {
      id: crypto.randomUUID(), name, priority: form.priority, completed: false,
    }]);
    setForm((current) => ({ ...current, name: '' }));
    setError('');
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">LAB · REACT HOOKS</p>
        <h1>Bảng quản lý công việc</h1>
        <p className="subtitle">Sắp xếp công việc, theo dõi tiến độ mỗi ngày.</p>
      </header>

      <section className="stats" aria-label="Thống kê công việc" aria-live="polite">
        <div className="stat"><span>Tổng số công việc</span><strong>{tasks.length}</strong></div>
        <div className="stat"><span>Số công việc đã hoàn thành</span><strong className="green">{completedCount}</strong></div>
        <div className="stat"><span>Số công việc chưa làm</span><strong className="orange">{tasks.length - completedCount}</strong></div>
      </section>

      <section className="panel" aria-labelledby="add-heading">
        <h2 id="add-heading">Thêm công việc mới</h2>
        <form onSubmit={addTask} noValidate>
          <div className="field name-field">
            <label htmlFor="task-name">Tên công việc</label>
            <input id="task-name" placeholder="Bạn cần làm gì hôm nay?" value={form.name}
              aria-invalid={Boolean(error)} aria-describedby={error ? 'name-error' : undefined}
              onChange={(event) => {
                setForm((current) => ({ ...current, name: event.target.value }));
                setError('');
              }} />
          </div>
          <div className="field">
            <label htmlFor="priority">Mức độ ưu tiên</label>
            <select id="priority" value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}>
              {Object.entries(priorities).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <button className="primary" type="submit">+ Thêm</button>
        </form>
        {error && <p id="name-error" className="error" role="alert">{error}</p>}
      </section>

      <section className="panel" aria-labelledby="list-heading">
        <div className="list-header">
          <h2 id="list-heading">Danh sách công việc</h2>
          <button className="clear" disabled={completedCount === 0} onClick={() => setTasks((current) => current.filter((task) => !task.completed))}>Xóa các mục đã xong</button>
        </div>
        {tasks.length === 0 ? (
          <div className="empty"><span aria-hidden="true">✓</span><h3>Chưa có công việc nào</h3><p>Thêm công việc đầu tiên để bắt đầu nhé.</p></div>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
                <div className="task-content"><h3>{task.name}</h3><div className="task-meta"><span className={`badge ${task.priority}`}>{priorities[task.priority]}</span><span>{task.completed ? 'Hoàn thành' : 'Chưa làm'}</span></div></div>
                <div className="actions">
                  <button aria-label={`Đổi trạng thái: ${task.name}`} aria-pressed={task.completed} onClick={() => toggleTask(task.id)}>Đổi trạng thái</button>
                  <button className="delete" aria-label={`Xóa: ${task.name}`} onClick={() => deleteTask(task.id)}>Xóa</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer>Dữ liệu được giữ trong phiên hiện tại và sẽ đặt lại khi tải lại trang.</footer>
    </main>
  );
}
