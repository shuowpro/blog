import { format as dateFnsFormat } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function format(date: Date, format: string) {
	return dateFnsFormat(date, format, { locale: zhCN });
}

export function formatRawDate(rawDate: string) {
	return format(new Date(rawDate), 'PPP');
}
