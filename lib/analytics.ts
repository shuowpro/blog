import splitbee from '@splitbee/web';
import { useEffect } from 'react';

export function useAnalytics() {
	useEffect(() => {
		if (process.env.CI === 'false') return;

		splitbee.init({
			disableCookie: true,
		});
	}, []);
}
