const Total = ({parts}: {parts: Array<any>}) => {
    
    return (
        <p>
            Number of exercises{" "}
            {parts.reduce((carry:number, part:any) => carry + part.exerciseCount, 0)}
        </p>
    );
}

export default Total;