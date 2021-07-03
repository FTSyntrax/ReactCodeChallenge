
export default function CompanyInformation({company}) {
  return (
    <div className="information-box">
      <h2>General Company Information</h2>
      <h1>{company.company_name}</h1>
      <div className="company-information">
        {company.vat ? (
          <span>
            <strong>VAT: </strong>
            {`${company.local_organization_id.country} ${company.local_organization_id.id}`}
          </span>
        ) : null}
        {!company.email.hidden ? (
          <span>
            <strong>Email: </strong>
            {`${company.email.email}`}
          </span>
        ) : null}
        {!company.phone.hidden && company.phone.hidden != null ? (
          <span>
            <strong>Phone: </strong>
            {`${company.phone.phone_number}`}
          </span>
        ) : null}
        <span>
          <strong>Score: </strong>
          {company.score}
        </span>
        <span>
          <strong>Full Address: </strong>
          {`${company.address.country}, ${company.address.city}, ${company.address.zipcode}, ${company.address.number}, ${company.address.street}`}
        </span>
        <span>
          <strong>Status: </strong>
          {company.status}
        </span>
        <span>
          <strong>Type: </strong>
          {company.company_type.long}
        </span>
        {company.main_industry_code ? (
          <span>
            <strong>Main industry code: </strong>
            {`${company.main_industry_code.code}`}
          </span>
        ) : null}
        <span>
          <strong>Organization id: </strong>
          {company.local_organization_id.id}
        </span>
        {company.registered_capital ? (
          <span>
            <strong>Registered capital: </strong>
            {`${company.registered_capital.value.toFixed(2)} ${
              company.registered_capital.currency
            }`}
          </span>
        ) : null}
        <span>
          <strong>Date of incorporation: </strong>
          {company.date_of_incorporation}
        </span>
        <span>
          <strong>Secondary names:</strong>
          {company.company_secondary_names?.map((name) => {
            if (
              name.valid_to !== null &&
              new Date(name.valid_to).valueOf() < new Date().valueOf()
            ) {
              return false
            } else {
              return (
                <span
                  style={{
                    display: "inline-block",
                    border: "none",
                    border: "2px solid #dfdfdf",
                    marginRight: "10px",
                    marginLeft: "auto",
                    padding: "3px 10px",
                  }}
                >
                  {name.name}
                  <br />
                </span>
              )
            }
          })}
        </span>
        <span>
          <strong>Risk assessment: </strong>
          {company.risk_assessment}
        </span>
        {company.number_of_employees ? (
          <span>
            <strong>Number of employees: </strong>
            {`${company.number_of_employees.specific}`}
          </span>
        ) : null}
        {company.webpage ? (
          <span>
            <strong>Webpage: </strong>
            <a
              href={`https://${company.webpage}`}
              target="_blank"
              rel="norefferer"
            >{`${company.webpage}`}</a>
          </span>
        ) : null}
      </div>
    </div>
  )
}