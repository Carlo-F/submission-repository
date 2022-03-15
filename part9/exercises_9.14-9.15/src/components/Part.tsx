const Part = ({part}: any) => {
    
    return (
        <div>
            <p>
                {part.name} {part.exerciseCount}
            </p>
        </div>
    )
}

export default Part;