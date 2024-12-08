import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  loggedUser: any;
  private readonly STORAGE_KEY = 'resetData';

  setResetData(email: string, id: string): void {
    const resetData = { email, id };
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(resetData));
  }

  getResetData(): { email: string; id: string } | null {
    const data = sessionStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearResetData(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
