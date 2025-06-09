import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiSettingsService {
  authApi = signal<string>('');
  bnsApi = signal<string>('');
  arApi = signal<string>('');
  posApi = signal<string>('');
}
