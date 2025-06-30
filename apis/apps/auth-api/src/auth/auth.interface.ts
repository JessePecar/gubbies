import { IsNotEmpty } from 'class-validator';

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
