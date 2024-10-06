"use client";

import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
	const sidebar = useStore(useSidebarToggle, (state) => state);

	if (!sidebar) return null;

	return (
		<React.Fragment>
			<Sidebar />
			<main
				className={cn(
					"min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
					sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
				)}
			>
				<div className={"p-2"}>
					<Header />
					<div className="container pt-8 pb-8">{children}</div>
				</div>
			</main>
			<footer
				className={cn(
					"transition-[margin-left] ease-in-out duration-300",
					sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
				)}
			>
				<Footer />
			</footer>
		</React.Fragment>
	);
}

export default DashboardLayout;
