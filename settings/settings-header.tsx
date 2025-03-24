"use client"

import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsHeader() {
  const { toast } = useToast()

  const handleSaveAll = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your Arena Pulse platform settings</p>
      </div>
      <Button onClick={handleSaveAll}>
        <SaveIcon className="mr-2 h-4 w-4" />
        Save All Changes
      </Button>
    </div>
  )
}

