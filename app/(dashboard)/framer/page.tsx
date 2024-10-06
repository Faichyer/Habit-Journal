"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function Page() {
	const [isVisibile, setIsVisible] = React.useState(false);
	return (
		<div
			className={
				"h-full flex flex-col grow items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2"
			}
		>
			<h1>Dashboard</h1>
			<p>Welcome to the dashboard</p>
			<Button variant={"default"} onClick={() => setIsVisible(!isVisibile)}>
				{isVisibile ? "Hide" : "Show"}
			</Button>
			<div className={"flex grow w-full justify-center items-center h-full"}>
				<motion.div
					whileHover={{
						scale: 1.1,
						z: 0,
						transition: {
							duration: 0.5,
						},
					}}
					whileTap={{ scale: 0.9, rotate: 360, z: [0, 0.25, 0.5] }}
				>
					<Button variant={"default"}>Click me</Button>
				</motion.div>
			</div>
		</div>
	);
}

export default Page;
