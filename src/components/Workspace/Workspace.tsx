import React from 'react';
import Split from 'react-split';
import ProblemDescrition from './ProblemDescription/ProblemDescrition';
import Playground from './Playground/Playground';

type WorkspaceProps = {};

const Workspace:React.FC<WorkspaceProps> = () => {
    return <Split className='split' minSize={0}>
        <ProblemDescrition />
        <Playground />
    </Split>;
}
export default Workspace;