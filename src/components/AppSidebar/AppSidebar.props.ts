export interface ISidebar {
    nav: ISidebarItem[];
}

export interface ISidebarItem {
    id: string;
    text: string;
    link: string;
}