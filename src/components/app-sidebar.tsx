"use client";

import {ChevronDown, Home, Inbox, Settings, FileText, User, GraduationCap } from "lucide-react"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Logo from "./logo"
import Link from "next/link"

// Menu items.
const starATestOptions = [
    {
        title: "WRA",
        url: "/assessment/wra",
        icon: FileText,
    },
    {
        title: "SSCA Section 1",
        url: "/assessment/ssca-section1",
        icon: FileText,
    },
    {
        title: "SSCA Section 2",
        url: "#",
        icon: FileText,
    },
    {
        title: "SSCA Section 3",
        url: "#",
        icon: FileText,
    },
    {
        title: "SSCA Section 4",
        url: "#",
        icon: FileText,
    },
]
const addUserOptions = [
    {
        title: "Add Student",
        url: "#",
        icon: GraduationCap,
    },
    {
        title: "Add Tutor",
        url: "#",
        icon: User,
    },
]
const trackOptions = [
    {
        title: "Add TR Program Data",
        url: "#",
        icon: Home,
    },
    {
        title: "Add Assessment Results",
        url: "#",
        icon: Inbox,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    // Helper function to check if a menu item is active
    const isActive = (url: string) => pathname === url

    return (
        <>
        <Sidebar>
            <Logo className="p-5 bg-[var(--color-tertiary)]" />
            <SidebarContent>
            <SidebarGroup>
                {/* <SidebarGroupLabel>
                </SidebarGroupLabel> */}
                <SidebarGroupContent className="space-y-1">
                <Collapsible defaultOpen className="group/collapsible -mb-2">
                    <SidebarGroup>
                    <SidebarGroupLabel asChild className="text-md">
                        <CollapsibleTrigger>
                        Start a Test
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                        <SidebarMenu>
                            {starATestOptions.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton 
                                  asChild 
                                  className={isActive(item.url) ? "bg-[var(--color-tertiary)] text-[var(--color-secondary)]" : "hover:bg-[var(--color-tertiary)] hover:opacity-50 hover:text-[var(--color-white)]"}>
                                <a href={item.url}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.title}</span>
                                </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                <Collapsible defaultOpen className="group/collapsible -mb-2">
                    <SidebarGroup>
                    <SidebarGroupLabel asChild className="text-md">
                        <CollapsibleTrigger>
                        Add Student / Tutor
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                        <SidebarMenu>
                            {addUserOptions.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton 
                                  asChild
                                  className={isActive(item.url) ? "bg-[var(--color-tertiary)] text-[var(--color-secondary)] bg-[var(--color-tertiary)]" : "hover:bg-[var(--color-tertiary)] hover:opacity-50 hover:text-[var(--color-white)]"}>
                                <Link href={item.url}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.title}</span>
                                </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                    <SidebarGroupLabel asChild className="text-md">
                        <CollapsibleTrigger>
                        Track Progress
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                        <SidebarGroupContent>
                        <SidebarMenu>
                            {trackOptions.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton 
                                  asChild
                                  className={isActive(item.url) ? "bg-[var(--color-tertiary)] text-[var(--color-secondary)] bg-[var(--color-tertiary)]" : "hover:bg-[var(--color-tertiary)] hover:opacity-50 hover:text-[var(--color-white)]"}
                                >
                                <a href={item.url}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.title}</span>
                                </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                <SidebarMenu>
                    <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild
                      className={isActive("#") ? "bg-[var(--color-tertiary)] text-[var(--color-secondary)]" : ""}
                    >
                        <a href="#">
                        <Inbox className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild
                      className={isActive("#settings") ? "bg-[var(--color-tertiary)] text-[var(--color-secondary)] bg-[var(--color-tertiary)]" : "hover:bg-[var(--color-tertiary)] hover:opacity-50 hover:text-[var(--color-white)]"}
                    >
                        <a href="#settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            </SidebarContent>
        </Sidebar>
        </>
    )
}
