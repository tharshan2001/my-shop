import type { NextApiRequest } from "next";

export interface NextApiRequestWithFiles extends NextApiRequest {
  files: Express.Multer.File[];
}