const App = () => {

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CoursePartDescription {
    type: "special";
    requirements: Array<string>;
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  const Header = ({name}: {name: string}) => {

    return (
        <h1>{name}</h1>
    );
}

const Content = ({parts}: {parts: CoursePart[]}) => {
  return (
      <div>
          <Part part={parts[0]} />
          <Part part={parts[1]} />
          <Part part={parts[2]} />
          <Part part={parts[3]} />
          <Part part={parts[4]} />
      </div>
  );
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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

const Total = ({parts}: {parts: CoursePart[]}) => {
    
  return (
      <p>
          Number of exercises{" "}
          {parts.reduce((carry:number, part:any) => carry + part.exerciseCount, 0)}
      </p>
  );
}

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;