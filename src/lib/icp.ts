import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

let authClient: AuthClient | null = null;
let agent: HttpAgent | null = null;

export async function initAuthClient(): Promise<void> {
  authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated();
  } else {
    authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: handleAuthenticated
    });
  }
}

async function handleAuthenticated(): Promise<void> {
  if (!authClient) {
    throw new Error("AuthClient is not initialized");
  }
  
  const identity: any = authClient.getIdentity();
  agent = new HttpAgent({ identity });

  
  console.log("Authenticated with identity:", identity);
}

export { authClient, agent };