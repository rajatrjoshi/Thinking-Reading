import { Calendar, ChevronDown, Home, Inbox, Search, Settings } from "lucide-react"

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

// Menu items.
const starATestOptions = [
    {
        title: "WRA",
        url: "#",
        icon: Home,
    },
    {
        title: "SSCA Section 1",
        url: "#",
        icon: Inbox,
    },
    {
        title: "SSCA Section 2",
        url: "#",
        icon: Calendar,
    },
    {
        title: "SSCA Section 3",
        url: "#",
        icon: Search,
    },
    {
        title: "SSCA Section 4",
        url: "#",
        icon: Settings,
    },
]
const addUserOptions = [
    {
        title: "Add Student",
        url: "#",
        icon: Home,
    },
    {
        title: "Add Tutor",
        url: "#",
        icon: Inbox,
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
    return (
        <Sidebar>
            <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>TR Logo</SidebarGroupLabel>
                <SidebarGroupContent className="space-y-1">
                <Collapsible defaultOpen className="group/collapsible -mb-5">
                    <SidebarGroup>
                    <SidebarGroupLabel asChild>
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
                                <SidebarMenuButton asChild>
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
                <Collapsible defaultOpen className="group/collapsible -mb-5">
                    <SidebarGroup>
                    <SidebarGroupLabel asChild>
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
                                <SidebarMenuButton asChild>
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
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                    <SidebarGroupLabel asChild>
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
                                <SidebarMenuButton asChild>
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
                    <SidebarMenuButton asChild>
                        <a href="#">
                        <Inbox className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <a href="#">
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
    )
}
