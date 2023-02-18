import React from 'react';

type TitleProps = {
    title: string | undefined
    subtitle: string | undefined
}

const Title: React.FC<TitleProps> = ({title, subtitle}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
};

export default Title;