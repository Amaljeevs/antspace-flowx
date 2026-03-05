import { Injectable } from '@angular/core';

const THEME_KEY = 'flowx_theme';
const DEFAULT_THEME = 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme: 'light' | 'dark' = DEFAULT_THEME;

  constructor() {
    const saved = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
    if (saved === 'light' || saved === 'dark') {
      this.theme = saved;
    }
    this.apply();
  }

  get current(): 'light' | 'dark' {
    return this.theme;
  }

  toggle(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, this.theme);
    this.apply();
  }

  private apply(): void {
    const root = document.documentElement;
    if (this.theme === 'dark') {
      root.classList.add('dark');
      root.dataset['theme'] = 'dark';
    } else {
      root.classList.remove('dark');
      delete root.dataset['theme'];
    }
  }
}
