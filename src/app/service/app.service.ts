import { Injectable } from '@angular/core';
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private location:  Location
  ) {
  }

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

  updateUrl(page: number, urlString: string, filters: Record<string, any> = {}): void {
    const queryParams = this.buildQueryParams({ page, ...filters });
    const finalUrl = `/${urlString}?${queryParams}`;
    this.location.go(finalUrl);
  }

  buildQueryParams(queryParams: Record<string, any>): string {
    const queryParamsArray = Object.entries(queryParams)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
    return queryParamsArray.join('&');
  }

}
