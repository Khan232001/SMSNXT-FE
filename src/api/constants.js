export const BASE_URL = 'https://your-backend-url.com/api';

export const endpoints = {
  // Authentication
  login: '/auth/login',
  adminLogin: '/auth/admin/login',
  signUp: '/auth/signup',

  // User Dashboard
  userDashboard: '/user/dashboard',
  orderHistory: '/user/orders/history',
  messaging: '/user/messaging',
  senderIDManagement: '/user/senderids',
  subscriptionPlans: '/user/plans',
  campaignManagement: '/user/campaigns',
  contactManagement: '/user/contacts',
  reporting: '/user/reporting',

  // Admin Dashboard
  adminDashboard: '/admin/dashboard',
  manageCustomers: '/admin/customers',
  managePlans: '/admin/plans',
  managePayments: '/admin/payments',
  manageCampaigns: '/admin/campaigns',
  manageOrders: '/admin/orders',
  senderIDManagementAdmin: '/admin/senderids',
  smsGateway: '/admin/sms-gateway',
  systemSettings: '/admin/settings',
  adminReports: '/admin/reports',

  // Common
  contact: '/contact',
  pricing: '/pricing',
  terms: '/terms',
  policy: '/policy',
};
