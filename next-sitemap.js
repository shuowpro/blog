const isCI = process.env.CI === 'true';
const domain = isCI ? 'suwako.dev' : 'localhost:3000';
const protocol = isCI ? 'https' : 'http';

/**
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
	exclude: ['/server-sitemap.xml'],
	generateRobotsTxt: true,
	robotsTxtOptions: {
		additionalSitemaps: [
			`${protocol}://${domain}/sitemap.xml`,
			`${protocol}://${domain}/server-sitemap.xml`,
		],
	},
	siteUrl: `${protocol}://${domain}`,
};
