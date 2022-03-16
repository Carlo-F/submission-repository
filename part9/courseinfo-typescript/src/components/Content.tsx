import Part from './Part';
import { CoursePart } from '../types';

const Content = ({parts}: {parts: CoursePart[]}) => {
    return (
        <div>
            {parts.map(
                part => <Part key={part.name} part={part} />
            )}
        </div>
    );
  }

export default Content;