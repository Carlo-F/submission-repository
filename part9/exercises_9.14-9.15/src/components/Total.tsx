const Total = ({courseParts}: {courseParts: Array<any>}) => {
    
    return (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry:number, part:any) => carry + part.exerciseCount, 0)}
        </p>
    );
}

export default Total;