import { verifyToken } from "@/lib/auth/verifyToken";

/**
 * Middleware to protect API routes
 * Usage: export const GET = withAuth(async (req, { user }) => { ... })
 */
export function withAuth(handler, options = {}) {
  return async (req, context) => {
    const { allowedRoles = [] } = options;

    // Verify token
    const result = await verifyToken(req);

    if (result.error) {
      return new Response(
        JSON.stringify({ error: result.error }),
        { status: result.status }
      );
    }

    // Check role permissions (if specified)
    if (allowedRoles.length > 0 && !allowedRoles.includes(result.user.role)) {
      return new Response(
        JSON.stringify({ error: "Insufficient permissions" }),
        { status: 403 }
      );
    }

    // Attach user to context and call handler
    return handler(req, { ...context, user: result.user });
  };
}