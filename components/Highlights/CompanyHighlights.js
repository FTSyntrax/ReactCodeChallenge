export default function CompanyInformation({company}) {
  const classificationStyle = (classification) => {
    if(classification === 'negative') return {color: "var(--red-color)"}
    if(classification === 'positive') return {color: "var(--green-color)"}
    if(classification === 'neutral') return {color: "#aaa"}
  }
  return (
    <div className="highlights-box">
      <h2>Company Highlights</h2>
      <div className="legend">
        <strong>Legend -></strong>
        <span>
          <strong>Negative:</strong> <span className="color-box"></span>
        </span>

        <span>
          <strong>Positive:</strong> <span className="color-box"></span>
        </span>

        <span>
          <strong>Neutral:</strong> <span className="color-box"></span>
        </span>
      </div>
      {company.map((data, i) => (
        <div className="highlight" key={i}>
          <span className="highlight-title">
            <strong style={classificationStyle(data[1].classification)}>
              {data[1].title}
            </strong>
          </span>
          <p
            data-classification={data[1].classification}
            data-weight={data[1].weight}
            className="highlight-desc"
          >
            {data[1].message}
          </p>
        </div>
      ))}
    </div>
  )
}
