import React from 'react';

export interface ISuccessMessageProps {
    success: string;
}

const SuccessMessage: React.FunctionComponent<ISuccessMessageProps> = (props) => {
    const { success } = props;

    if (success === '') return null;
    return <small className="text-success">{success}</small>;
};

export default SuccessMessage;
