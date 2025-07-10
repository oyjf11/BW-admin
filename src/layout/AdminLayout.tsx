import type { ReactNode } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 侧边栏 */}
      <aside className="flex flex-col bg-white shadow w-60">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-xl font-bold">管理后台</span>
        </div>
        <NavigationMenu className="flex-1">
          <NavigationMenuList className="flex flex-col p-2">
            <NavigationMenuItem>
              <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-100">资源管理</a>
            </NavigationMenuItem>
            {/* 可拓展菜单 */}
          </NavigationMenuList>
        </NavigationMenu>
      </aside>
      {/* 内容区域 */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
