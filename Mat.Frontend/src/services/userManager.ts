import { UserManager } from "oidc-client-ts";

const baseUrl = window.location.origin;

export const userManager = new UserManager({
  authority: import.meta.env.VITE_AUTH,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: `${baseUrl}/callback`,
  response_type: "code",
  scope: "openid profile email",
  post_logout_redirect_uri: `${baseUrl}/`,
});
