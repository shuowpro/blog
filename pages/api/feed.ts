import { NextApiRequest, NextApiResponse } from 'next';
import { generateRssFeed } from '~/lib/feed';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
	try {
		const feed = await generateRssFeed();
		res.send(feed.rss2());
	} catch (error) {
		res.send(error);
	}
}
