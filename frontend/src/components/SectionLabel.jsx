export default function SectionLabel({ text, dark }) {
  return (
    <div className="section-label">
      <div className="section-label__line" />
      <span className={`section-label__text${dark ? ' section-label__text--dark' : ''}`}>
        {text}
      </span>
    </div>
  );
}
