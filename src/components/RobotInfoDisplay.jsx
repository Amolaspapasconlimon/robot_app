export default function RobotInfoDisplay({ robot }) {
  if (!robot) {
    return (
      <div className="RobotInfoFrame">
        <h3>beep boop! beep boop!</h3>
      </div>
    );
  }
  const name = robot.name.toUpperCase();
  const notFound = robot.market === "not found";
  return (
    <div className="RobotInfoFrame">
      <h3>{name}</h3>
      {notFound ? (
        <h3>Was not found!</h3>
      ) : (
        <h3>{robot.market.toUpperCase()}</h3>
      )}
    </div>
  );
}
