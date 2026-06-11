import { getUsersForRole } from '../../utils/user-roles';

export type LoginAction = 'login';
export type LoginExpect = 'success-and-redirected';

export type LoginTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: LoginAction;
  expect: LoginExpect;
  tags: string[];
};

const BASE_TAGS = ['@functional', '@login', '@new-cortex', '@regression'];

// Dynamically generate test cases based on users.json config
const users = getUsersForRole(undefined, 'new-cortex');

export const LoginTestCases: LoginTestCase[] = users.map(user => ({
  id: `TC-LOGIN-${user.role.toUpperCase()}`,
  name: `Login successfully as ${user.role}`,
  feature: 'Authentication',
  role: user.role,
  action: 'login',
  expect: 'success-and-redirected',
  tags: user.role === 'super' ? [...BASE_TAGS, '@smoke'] : [...BASE_TAGS]
}));
