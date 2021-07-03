export default function SearchField({ getSubmitedData }) {
  return (
    <div>
      <div className="search-field-box">
        <form action="" method="GET" onSubmit={(e) => getSubmitedData(e)}>
          <input
            aria-label="Search for Companies"
            type="search"
            placeholder="Search for Companies"
          />
          <button type="submit" name="search_companies">Search</button>
        </form>
      </div>
    </div>
  )
}
