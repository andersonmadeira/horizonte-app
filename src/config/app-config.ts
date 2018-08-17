import { Injectable } from '@angular/core';
import { CONFIG } from './config';

@Injectable()
export class AppConfig {  
  public apiKey: string;

  constructor() {
    this.apiKey = this.readString('API_KEY', '');
  }

  private readString(key: string, defaultValue?: string): string {
    const v = CONFIG[key];
    return v === undefined ? defaultValue : String(v);
  }
}