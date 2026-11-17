export default function RobotSearchBar({ name, setName, handleSubmit }) {
  return (
    <div className="RobotSearchFrame">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="robot name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}