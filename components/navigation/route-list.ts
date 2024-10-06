import {
	CalendarCheck2,
	LayoutGrid,
	LineChart,
	type LucideIcon,
	Settings,
	Tag,
	Users,
} from "lucide-react";

type Submenu = {
	href: string;
	label: string;
	active?: boolean;
};

type Menu = {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon;
	submenus?: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: "",
			menus: [
				{
					href: "/",
					label: "Dashboard",
					active: pathname === "/",
					icon: LayoutGrid,
					submenus: [],
				},
			],
		},
		{
			groupLabel: "Habits",
			menus: [
				{
					href: "/habits",
					label: "Habits",
					active: pathname.includes("/habits"),
					icon: CalendarCheck2,
					submenus: [
						{
							href: "/habits",
							label: "All Habits",
						},
						{
							href: "/habits/new",
							label: "New Habit",
						},
					],
				},
				{
					href: "/analytics",
					label: "Analytics",
					active: pathname.includes("/analytics"),
					icon: LineChart,
				},
			],
		},
		{
			groupLabel: "Settings",
			menus: [
				{
					href: "/users",
					label: "Users",
					active: pathname.includes("/users"),
					icon: Users,
				},
				{
					href: "/account",
					label: "Account",
					active: pathname.includes("/account"),
					icon: Settings,
				},
			],
		},
	];
}
