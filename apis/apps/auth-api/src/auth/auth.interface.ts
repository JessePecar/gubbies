import { IsNotEmpty } from 'class-validator';

// The token's claims when it is being encoded or decoded
export interface AuthClaims {
  userId?: string;
  roleId?: string;
  storeId?: string;
  chainId?: string;
  applicationId?: string;
}

// These are what will be stored in the database
export const AuthClaimKeys: Record<string, keyof AuthClaims> = {
  USER_ID: 'userId',
  ROLE_ID: 'roleId',
  STORE_ID: 'storeId',
  CHAIN_ID: 'chainId',
  APPLICATION_ID: 'applicationId',
};

export interface UserClaim {
  code: string; // This is the binding for AuthClaimKeys.key
  userId: number;
  value: string;
}

export class AuthRequest {
  @IsNotEmpty({
    message: 'Username must be provided when logging in',
  })
  username: string;

  @IsNotEmpty({
    message: 'Password must be provided when logging in',
  })
  password: string;
}
