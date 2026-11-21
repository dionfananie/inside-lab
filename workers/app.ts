import { authApi } from './api/auth';
import { checkApi } from './api/check';
import { dashboardApi } from './api/dashboard';
import { sessionViewsApi } from './api/session-views';
import { createRequestHandler } from "react-router";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

declare global {
  interface Env {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;
    ADMIN_EMAILS: string;
  }
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/auth')) return authApi(request, env);
    if (url.pathname.startsWith('/api/check')) return checkApi(request, env);
    if (url.pathname.startsWith('/api/session-views')) return sessionViewsApi(request, env);
    if (url.pathname.startsWith('/api/dashboard')) return dashboardApi(request, env);
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
