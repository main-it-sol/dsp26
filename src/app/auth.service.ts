import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Demo-only state. Replace with your backend/session initialization.
  readonly authenticated = signal(true);
  login(username: string, password: string): boolean {
    if (!username.trim() || !password) return false;
    this.authenticated.set(true);
    return true;
  }
  logout(): void { this.authenticated.set(false); }
}
