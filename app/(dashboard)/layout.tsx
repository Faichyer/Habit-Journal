import DashboardLayout from "@/components/layout/dashboard-layout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const supabase = createServerComponentClient({ cookies });
	const { data, error } = await supabase.auth.getUser();

	if (!data.user) {
		redirect("/login");
	}

	return <DashboardLayout>{children}</DashboardLayout>;
}
