import { Injectable } from '@angular/core';

const USERS_KEY = 'flowx_users';
const SESSION_KEY = 'flowx_session';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Session {
  userId: string;
  email: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private getUsers(): User[] {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private setUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  register(email: string, password: string, name: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    if (users.some((u) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const id = crypto.randomUUID();
    users.push({ id, email, name });
    this.setUsers(users);
    this.setSession({ userId: id, email, name });
    return { success: true };
  }

  login(email: string, password: string): { success: boolean; error?: string } {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email);
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }
    this.setSession({ userId: user.id, email: user.email, name: user.name });
    return { success: true };
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }

  getCurrentUser(): Session | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private setSession(session: Session): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}
