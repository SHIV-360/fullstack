
"use client";

import * as React from "react";
import { Moon, Sun, Palette, Check } from "lucide-react";
import { useTheme } from "@/context/theme-context";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themes } from "@/lib/themes";

export function ThemeSwitcher() {
  const { theme, setTheme, mode, setMode } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    const selectedTheme = themes.find((t) => t.name === newTheme);
    if (!selectedTheme) return;
  
    setTheme(newTheme);
  
    if (selectedTheme.name === 'evergreen' || selectedTheme.name === 'tokyo-night') {
      setMode('dark');
    } else if (selectedTheme.name === 'nord') {
      setMode('light');
    }
  };

  const isDarkModeOnly = theme === 'evergreen' || theme === 'tokyo-night';
  const isLightModeOnly = theme === 'nord';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setMode("light")} disabled={isDarkModeOnly}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode("dark")} disabled={isLightModeOnly}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode("system")} disabled={isDarkModeOnly || isLightModeOnly}>
          <Sun className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="mr-2 h-4 w-4" />
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {themes.map((t) => (
                <DropdownMenuItem
                  key={t.name}
                  onClick={() => handleThemeChange(t.name)}
                >
                  <div
                    className="w-4 h-4 rounded-full mr-2 border"
                    style={{ backgroundColor: `hsl(${t.colors.dark.primary})` }}
                  />
                  <span>{t.label}</span>
                  {theme === t.name && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
