export const applicationName = '';
export const applicationIcon = 'mdi-cash-register';
export const hasSidebar = true;
export const hasSidebarClosable = false;

export const sections = [
	{
		name: 'Dashboard',
		url: '/',
		icon: 'mdi-view-dashboard',
	},
	{
		name: 'Basic Form',
		url: '/form',
		icon: 'mdi-book-open-variant',
	},
	{
		name: 'Data grid',
		url: '/grid',
		icon: 'mdi-table-large',
	},
];
export const environment = process.env.NODE_ENV;
export const apiBaseUrl = process.env.VUE_APP_API_URL
	? process.env.VUE_APP_API_URL
	: 'http://localhost:3000';
