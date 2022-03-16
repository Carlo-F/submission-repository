import assertNever from "../utils";
import { CoursePart } from "../types";

const Part = ({part}: {part: CoursePart}) => {
  
    switch (part.type) {
      case "normal":
        return (
          <div>
            <p>
              <strong>{part.name}</strong> ({part.type}) - {part.description}: {part.exerciseCount}
            </p>
          </div>
        )
      case "groupProject":
        return (
          <div>
            <p>
              <strong>{part.name}</strong> ({part.type}, {part.groupProjectCount}): {part.exerciseCount}
            </p>
          </div>
        )
      case "submission":
        return (
          <div>
            <p>
              <strong>{part.name}</strong> ({part.type}) - {part.description} &quot;{part.exerciseSubmissionLink}&quot;: {part.exerciseCount}
            </p>
          </div>
        )
      case "special":
        return (
          <div>
            <p>
              <strong>{part.name}</strong> ({part.type}: {part.requirements.toString()}) - {part.description} : {part.exerciseCount}
            </p>
          </div>
        )
      default:
        return assertNever(part)
    }
  }

export default Part;