'use client'
import { SlashIcon } from "@radix-ui/react-icons";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const PathListItems = () => {
    const path = usePathname();
    const pathParts = path.split("/").filter(Boolean); // Filter out empty strings
    return (
        <BreadcrumbList>
            {pathParts.map((item, index) => {
                const isDashboardPath = item.startsWith('/dashboard');
                const isLastIndex = index === pathParts.length - 1;

                if (index === 0 || (isDashboardPath && index < pathParts.length - 1)) {
                    return (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={`/${item}`}>
                                <span className="text-muted-foreground">{item}</span>
                            </BreadcrumbLink>
                            <SlashIcon />
                        </BreadcrumbItem>
                    );
                } else if (isLastIndex) {
                    return (
                        <BreadcrumbItem key={index}>
                            <span className="text-muted-foreground">{item}</span>
                        </BreadcrumbItem>
                    );
                } else {
                    return (
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={`/dashboard/${item}`}>
                                <span className="text-muted-foreground">...</span>
                            </BreadcrumbLink>
                            <SlashIcon />
                        </BreadcrumbItem>
                    );
                }
            })}
        </BreadcrumbList>
    );
};

export default PathListItems;
