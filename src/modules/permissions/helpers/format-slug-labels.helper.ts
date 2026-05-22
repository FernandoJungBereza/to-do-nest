export interface SlugLabels {
	title: string;
	description: string;
}

const ACTION_LABELS: Record<string, string> = {
	create: 'Create',
	read: 'Read',
	list: 'List',
	update: 'Update',
	delete: 'Delete',
};

function humanizeModule(module: string): string {
	return module.replace(/-/g, ' ');
}

function resourceLabel(module: string, action: string): string {
	const base = humanizeModule(module);

	if (action === 'list') {
		if (module === 'user') {
			return 'users';
		}

		if (module === 'permissions') {
			return 'permissions';
		}

		return base.endsWith('s') ? base : `${base}s`;
	}

	return base;
}

export function buildSlugLabels(slug: string): SlugLabels {
	const dotIndex = slug.indexOf('.');

	if (dotIndex === -1) {
		return {
			title: slug,
			description: slug,
		};
	}

	const module = slug.slice(0, dotIndex);
	const action = slug.slice(dotIndex + 1);
	const actionLabel = ACTION_LABELS[action] ?? action.charAt(0).toUpperCase() + action.slice(1);
	const resource = resourceLabel(module, action);
	const title = `${actionLabel} ${resource}`;
	const description = `Permission to ${actionLabel.toLowerCase()} ${resource} (${slug})`;

	return { title, description };
}
