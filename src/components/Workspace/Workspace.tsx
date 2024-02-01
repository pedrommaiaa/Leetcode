import React from 'react';
import Split from 'react-split';
import ProblemDescrition from './ProblemDescription/ProblemDescrition';

type WorkspaceProps = {};

const Workspace:React.FC<WorkspaceProps> = () => {
    return <Split className='split' minSize={0}>
        <ProblemDescrition />
        <div>Code editor here</div>
    </Split>;
}
export default Workspace;