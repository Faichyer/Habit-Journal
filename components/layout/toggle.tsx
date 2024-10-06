"use client";

import { Button } from "@/components/ui/button";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function Toggle() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// When mounted on the client, set mounted to true
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// While the component is not mounted, render nothing or a placeholder
		return null;
	}

	return (
		<Button
			variant="default"
			size="icon"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className={`overflow-hidden rounded-full ${
				theme === "dark"
					? "bg-blue-800 hover:bg-blue-900"
					: "bg-amber-500 hover:bg-amber-700"
			} transition-colors`}
		>
			{theme === "dark" ? (
				<Moon className="h-5 w-5" />
			) : (
				<SunMedium className="h-5 w-5 text-white" />
			)}
		</Button>
	);
}

export default Toggle;
