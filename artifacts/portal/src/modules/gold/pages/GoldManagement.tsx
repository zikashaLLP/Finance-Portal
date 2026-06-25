import { Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GoldManagement() {
  return (
    <Tabs defaultValue="pure" className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="px-8 pt-6 pb-0 border-b border-border flex items-center justify-between shrink-0">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">
            Gold Management
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Track gold stock, rates &amp; transactions
          </p>
          <TabsList className="bg-transparent p-0 h-auto gap-6 justify-start rounded-none">
            <TabsTrigger
              value="pure"
              className="rounded-none border-b-[3px] border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pure Gold
            </TabsTrigger>
            <TabsTrigger
              value="old"
              className="rounded-none border-b-[3px] border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Old Gold
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Bell */}
        <div className="flex items-center gap-2 shrink-0 self-start mt-1">
          <button className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          </button>
        </div>
      </div>

      {/* Tab content */}
      <TabsContent value="pure" className="flex-1 p-8 mt-0">
        <div className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
          Pure Gold content coming soon
        </div>
      </TabsContent>

      <TabsContent value="old" className="flex-1 p-8 mt-0">
        <div className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
          Old Gold content coming soon
        </div>
      </TabsContent>
    </Tabs>
  );
}
