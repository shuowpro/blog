import { format as dateFnsFormat } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function format(date: Date, format: string) {
	return dateFnsFormat(date, format, { locale: zhCN });
}
