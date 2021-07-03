import * as React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Management from "@/components/Management"
import { companyRelations } from "@/requests"
import CompanyInformation from "@/components/Information/CompanyInfomation"
import CompanyHighlights from "@/components/Highlights/CompanyHighlights"

export default function Company() {
  const router = useRouter()
  const { id } = router.query
  let highlightsArr = []

  const [relations, setRelations] = React.useState(null)
  const [information, setInformation] = React.useState(null)
  const [highlights, setHighlights] = React.useState(null)

  React.useEffect(() => {
    if (id != null) {
      let sortHighlights = (data) => {
        const orderHighlights = (a, b) => {
          // Negavite First
          if (a[1].classification === "negative" && a[1].weight < b[1].weight)
            return -1
          if (b[1].classification === "negative" && a[1].weight > b[1].weight)
            return 1
          // Positive Second
          if (a[1].classification === "positive" && a[1].weight < b[1].weight)
            return -1
          if (b[1].classification === "positive" && a[1].weight > b[1].weight)
            return 1
          // If classification is the same, sort by Weight Descending (The lower the weight, the higher the priority)
          if (a[1].weight > b[1].weight) return 1
          if ((a[1].classification === "neutral" && b[1].classification === "neutral") && (a[1].weight < b[1].weight)) return -1
          return 0
        }
    
        let sortedHighlights = Object.entries(data).sort(orderHighlights)
    
        return highlightsArr = Object.entries(data).map((item, i) => 
          Object.assign({}, item, sortedHighlights[i]),
        )
    
      }
      companyRelations({ id }).then((res) => {
        setRelations(res)
      })
      
      fetch(`/api/company/basics/${id}`)
      .then((res) => res.json())
      .then(({ data }) => setInformation(data))
      .catch((err) => console.log(err))
      
      fetch(`/api/company/highlights/${id}`)
      .then((res) => res.json())
      .then(({ data }) => setHighlights(sortHighlights(data)))
        .catch((err) => console.log(err))
    }
  }, [id])

 

  return (
    <div>
      <Link href="/"><a className="back-home">Home</a></Link>
      {information ? <CompanyInformation company={information} /> : null}
      {highlights ? <CompanyHighlights company={highlights} /> : null}
      {relations ? <Management relations={relations} /> : null}
    </div>
  )
}