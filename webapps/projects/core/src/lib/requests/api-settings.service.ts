import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'any',
})
export class ApiSettingsService {
  authApi = signal<string>('/auth-api');
  bnsApi = signal<string>('/bns-api');
  arApi = signal<string>('/ar-api');
  posApi = signal<string>('pos-api');
}
