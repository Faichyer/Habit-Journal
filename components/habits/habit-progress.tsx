"use client";

import { Progress } from "@/components/ui/progress";
import React from "react";

function HabitProgress() {
	const [progress, setProgress] = React.useState(13);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<Progress value={progress} className="text-primary" />
			<h3 className="text-sm text-muted-foreground mt-1">13% complete</h3>
		</div>
	);
}

export default HabitProgress;
