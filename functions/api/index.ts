// Auto-generated index.ts for Pages Functions routing
import type { Request } from 'itty-router';

import { ResumeGeneratorBackendHandler } from './ResumeGeneratorBackend';
import { TemplateLibraryBackendHandler } from './TemplateLibraryBackend';
import { ATSOptimizationBackendHandler } from './ATSOptimizationBackend';
import { CareerAdviceBackendHandler } from './CareerAdviceBackend';

export async function onRequest({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/api/ResumeGeneratorBackend") return ResumeGeneratorBackendHandler(request);
  if (path === "/api/TemplateLibraryBackend") return TemplateLibraryBackendHandler(request);
  if (path === "/api/ATSOptimizationBackend") return ATSOptimizationBackendHandler(request);
  if (path === "/api/CareerAdviceBackend") return CareerAdviceBackendHandler(request);

  return new Response("Not found", { status: 404 });
}
