"use client"

import React, {useEffect} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {usePathname} from "next/navigation";

function Breadcrumbs() {
    const path = usePathname();
    const [breadcrumbs, setBreadcrumbs] = React.useState<{page: string, link: string}[]>([]);

    useEffect(() => {
        if (path === '/') {
            setBreadcrumbs([{page: '', link: '/'}])
        } else {
            const paths = path.split('/');
            const breadcrumbs = paths.map((path, index) => {
                return {
                    page: path,
                    link: paths.slice(0, index + 1).join('/')
                }
            });
            setBreadcrumbs(breadcrumbs);console.log(breadcrumbs)
        }

    }, [path]);
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {
                    breadcrumbs.map(({page, link}, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem >
                                <BreadcrumbLink asChild>
                                    <Link className={'capitalize'} href={link ==='' ? '/' : link}>{
                                        page === '' ? 'Home' : page
                                    }</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {
                                index === breadcrumbs.length - 1 ? null : <BreadcrumbSeparator/>
                            }
                        </React.Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default Breadcrumbs;