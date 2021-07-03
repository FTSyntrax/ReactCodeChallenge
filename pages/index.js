import {useState} from 'react'
import SearchField from "./SearchField"
import Link from "next/link"

export default function Home() {
  const [ hasResult, setResults ] = useState(null)

  const getSubmitedData = (e) => {
    e.preventDefault()
    let formValue = encodeURIComponent(e.target[0].value)
    if (formValue == '') return false
    fetch(`/api/search?query=${formValue}`)
      .then((res) => res.json())
      .then((data) => setResults(data.data))
      .catch((err) => console.log(err))
  }
  return (
    <div className="search-page">
      <SearchField getSubmitedData={(e) => getSubmitedData(e)} />
      <div className="companies-box">
        {hasResult && hasResult.length ? (
          hasResult.map((company) => (
            <Link
              key={company.local_organization_id.id}
              href={`/company/${company.local_organization_id.id}`}
            >
              <a>
                {company.company_name}
                <span className="company-status">{company.status}</span>
              </a>
            </Link>
          ))
        ) : (
          <span className="no-companies">
            Please enter name, id, email or phone number
          </span>
        )}
      </div>
    </div>
  )
}



