import React from 'react';

const Comment = ({str}) => {

    return (
        <div>
            {console.log(str)}
            {str.map((item, index) => {
                return <p key={index}>{item}</p>
            })}
        </div>
    );
};

export default Comment;
