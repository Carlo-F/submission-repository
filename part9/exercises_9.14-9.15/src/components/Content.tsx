import Part from './Part';

const Content = ({parts}: {parts: Array<any>}) => {
    return (
        <div>
            <Part part={parts[0]} />
            <Part part={parts[1]} />
            <Part part={parts[2]} />
        </div>
    );
}

export default Content;