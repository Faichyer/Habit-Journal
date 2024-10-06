"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";

interface TransitionLinkProps extends LinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function TransitionLink({
	href,
	children,
	className,
	...props
}: TransitionLinkProps) {
	const router = useRouter();

	const handleTransition = async (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		e.preventDefault();
		const body = document.querySelector("main");
		body?.classList.add("page-transition");
		await sleep(500);
		router.push(href);
		await sleep(500);
		body?.classList.remove("page-transition");
	};

	return (
		<Link
			href={href}
			onClick={handleTransition}
			className={className}
			{...props}
		>
			{children}
		</Link>
	);
}

export default TransitionLink;
