function ScoreCard({ label, score, description }) {
  return (
    <article className="score-card">
      <span>{label}</span>
      <strong>{score}</strong>
      {description ? <p>{description}</p> : null}
    </article>
  );
}

export default ScoreCard;
