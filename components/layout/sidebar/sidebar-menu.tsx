import { CollapseMenuButton } from "@/components/layout/sidebar/collapse-menu-button";
import { getMenuList } from "@/components/navigation/route-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Ellipsis, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuProps {
	isOpen: boolean | undefined;
}

function SidebarMenu({ isOpen }: MenuProps) {
	const pathname = usePathname();
	const menuList = getMenuList(pathname);

	return (
		<nav className="mt-8 h-full w-full">
			<ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
				{menuList.map(({ groupLabel, menus }, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
						{(isOpen && groupLabel) || isOpen === undefined ? (
							<p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
								{groupLabel}
							</p>
						) : !isOpen && isOpen !== undefined && groupLabel ? (
							<TooltipProvider>
								<Tooltip delayDuration={100}>
									<TooltipTrigger className="w-full">
										<div className="w-full flex justify-center items-center">
											<Ellipsis className="h-5 w-5" />
										</div>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>{groupLabel}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<p className="pb-2" />
						)}
						{menus.map(
							({ href, label, icon: Icon, active, submenus }, index) =>
								!submenus || submenus.length === 0 ? (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<div className="w-full" key={index}>
										<TooltipProvider disableHoverableContent>
											<Tooltip delayDuration={100}>
												<TooltipTrigger asChild>
													<Button
														variant={active ? "secondary" : "ghost"}
														className="w-full justify-start h-10 mb-1"
													>
														<Link
															href={href}
															className="w-full flex justify-start"
														>
															<span
																className={cn(isOpen === false ? "" : "mr-4")}
															>
																<Icon size={18} />
															</span>
															<p
																className={cn(
																	"max-w-[200px] truncate",
																	isOpen === false
																		? "-translate-x-96 opacity-0"
																		: "translate-x-0 opacity-100",
																)}
															>
																{label}
															</p>
														</Link>
													</Button>
												</TooltipTrigger>
												{isOpen === false && (
													<TooltipContent side="right">{label}</TooltipContent>
												)}
											</Tooltip>
										</TooltipProvider>
									</div>
								) : (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<div className="w-full" key={index}>
										<CollapseMenuButton
											icon={Icon}
											label={label}
											active={active}
											submenus={submenus}
											isOpen={isOpen}
										/>
									</div>
								),
						)}
					</li>
				))}
				<li className="w-full grow flex items-end">
					<TooltipProvider disableHoverableContent>
						<Tooltip delayDuration={100}>
							<TooltipTrigger asChild>
								<Button
									onClick={() => {}}
									variant="outline"
									className="w-full justify-center h-10 mt-5"
								>
									<span className={cn(isOpen === false ? "" : "mr-4")}>
										<LogOut size={18} />
									</span>
									<p
										className={cn(
											"whitespace-nowrap",
											isOpen === false ? "opacity-0 hidden" : "opacity-100",
										)}
									>
										Sign out
									</p>
								</Button>
							</TooltipTrigger>
							{isOpen === false && (
								<TooltipContent side="right">Sign out</TooltipContent>
							)}
						</Tooltip>
					</TooltipProvider>
				</li>
			</ul>
		</nav>
	);
}

export default SidebarMenu;
