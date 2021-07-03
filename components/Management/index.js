import { setManagementData } from "./utils/setManagementData"
const managementRoles = [
  "MANAGEMENT",
  "ADMINISTRATION",
  "CHIEF EXECUTIVE OFFICER",
  "BOARD OF DIRECTORS",
  "CHAIRMAN",
  "DEPUTY CHAIRMAN",
  "DEPUTY",
  "STAKEHOLDER",
]

const Management = ({ relations }) => {
  const { management, boardOfDirectors } = relations

  const managementData = setManagementData(managementRoles, [
    ...management,
    ...boardOfDirectors,
  ])

  const keys = managementData.length > 0 ? Object.keys(managementData[0]) : []
  return (
    <div className="management-box">
      <h2>Management</h2>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={`only keys ${key}`}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {managementData.map((data, i) => (
            <tr key={i}>
              {keys.map((key) => (
                <th key={key}>{data[key]}</th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Management
