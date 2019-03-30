import { AuthServiceConfig, LoginOpt, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from '../../environments/environment';

export function getAuthServiceConfig(): AuthServiceConfig {
  const googleLoginOpt: LoginOpt = {
    scope: 'profile email'
  };

  return new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.client_id, googleLoginOpt)
    }
  ]);
}
