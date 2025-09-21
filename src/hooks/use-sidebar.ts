"use client"

import * as React from "react"
import {
  SidebarContext,
  type SidebarContextProps,
} from "@/components/ui/sidebar"

export function useSidebar(): SidebarContextProps {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}
