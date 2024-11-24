import React from "react";

type TitleProps = {
    title: string;
};

const PageTitle = ({title}: TitleProps) => {
    return (
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
            {title}
        </h1>
    );
};

export default PageTitle;
