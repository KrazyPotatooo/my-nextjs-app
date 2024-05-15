import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'A short bio about John Doe.',
  });
};

export default handler;
