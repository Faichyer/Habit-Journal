import React from 'react'

type TitleProps = {
	title: String
}

const PageTitle = ({ title }: TitleProps) => {
	return <h1 className="mt-4 text-4xl tracking-widest uppercase">{title}</h1>
}

export default PageTitle
