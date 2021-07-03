/**
 * Bring order to chaos!
 */
import { monthsToYears } from "date-fns"


const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

const stripFunctions = (array, roles) => {
  return array?.map((person) => ({
    ...person,
    functions: person.functions.filter((x) => roles.includes(x.function)),
  }))
}

function monthDiff(d1, d2 = new Date()) {
  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

const handleProgressBar = (from) => {
  const monthsPassed = monthDiff(new Date(from))
  if (monthsPassed < 24) {
    return `linear-gradient(90deg, var(--red-color) ${monthsPassed}%, white ${monthsPassed}%)`
  }
  if (monthsPassed < 55) {
    return `linear-gradient(90deg, var(--yellow-color) ${monthsPassed}%, white ${monthsPassed}%)`
  }
  if (monthsPassed >= 55) {
    return `linear-gradient(90deg, var(--green-color) ${monthsPassed}%, white ${monthsPassed}%)`
  }
}

const boardLast = (a, b) => {
  if (a.functionReal === "BOARD OF DIRECTORS") return 1
  if (b.functionReal === "BOARD OF DIRECTORS") return -1
  return 0
}

export const setManagementData = (managementRoles, data) => {
  const returnValue = []
  stripFunctions(removeDuplicates(data, "name"), managementRoles)
  ?.filter((x) => x.functions.length)
  ?.forEach((person) => {
    person?.functions?.forEach((func) => {
        const monthText =
          monthDiff(new Date(func?.valid_from)) > 1 ? " months" : "month"
        const yearText =
          monthsToYears(monthDiff(new Date(func?.valid_from))) > 1
            ? " years"
            : " year"
        returnValue.push({
          name: person?.name,
          position: func?.title,
          from: func?.valid_from ? func?.valid_from : "-",
          seniority: func?.valid_from ? (
            <div>
              <div>
                {monthsToYears(monthDiff(new Date(func?.valid_from))) >= 1
                  ? monthsToYears(monthDiff(new Date(func?.valid_from))) +
                    yearText
                  : monthDiff(new Date(func?.valid_from)) + monthText}{" "}
              </div>
              <div
                style={{
                  background: handleProgressBar(func?.valid_from),
                  border: "1px solid #dfdfdf",
                  borderRadius: "25rem",
                  height: "0.8rem",
                  marginTop: ".25rem",
                }}
              ></div>
            </div>
          ) : (
            "-"
          ),
          seniorityOrder: func?.valid_from,
          functionReal: func?.function,
        })
      })
    })
  return returnValue.sort((a, b) => boardLast(a, b))
}
