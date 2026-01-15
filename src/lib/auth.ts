import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./jwt";

export interface AuthenticatedRequest extends NextApiRequest {
  user: {
    id: string;
    email: string;
  };
}

export function requireAuth(
  handler: (
    req: AuthenticatedRequest,
    res: NextApiResponse
  ) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    (req as AuthenticatedRequest).user = decoded;
    return handler(req as AuthenticatedRequest, res);
  };
}
