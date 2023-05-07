import { Injectable } from '@angular/core';
import * as _ from 'lodash';

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication any.
 * The any interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {

  private _credentials: any;

  constructor() {
    const savedCredentials  = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey) || '';
    this._credentials = JSON.parse(savedCredentials);
  }

  get credentials(): any | null {
    return this._credentials;
  }
  get fullName(): string {
    return `${this.credentials?.firstName ?? ''} ${this.credentials?.lastName ?? ''}`?.trim();
  }

  setCredentials(any?: any, remember?: boolean) {  
    if (any) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(any));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
