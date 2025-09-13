export class BaseClient {
  protected async transformOptions(init?: RequestInit): Promise<RequestInit> {
    const opts: RequestInit = {
      ...init,
      credentials: "include",
      headers: {
        ...(init?.headers ?? {}),
      },
    };
    return opts;
  }
}
