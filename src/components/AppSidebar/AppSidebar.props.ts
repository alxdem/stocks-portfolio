export interface ISidebar {
    nav: ISidebarItem[];
    isOpen: boolean;
}

export interface ISidebarItem {
    id: string;
    text: string;
    link: string;
}