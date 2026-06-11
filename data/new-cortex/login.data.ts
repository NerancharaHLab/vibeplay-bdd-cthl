import { getUsersForRole } from '../../utils/user-roles';

export type LoginAction = 'login' | 'login-invalid-user' | 'login-invalid-pass';
export type LoginExpect = 'success-and-redirected' | 'error-invalid-credentials';

export type LoginTestCase = {
  id: string;
  name: string;
  feature: string;
  role: string;
  action: LoginAction;
  username?: string;
  password?: string;
  expect: LoginExpect;
  tags: string[];
};

const BASE_TAGS = ['@functional', '@login', '@new-cortex', '@regression'];

// Dynamically generate test cases based on users.json config
const users = getUsersForRole(undefined, 'new-cortex');

export const LoginTestCases: LoginTestCase[] = [
  ...users.map(user => ({
    id: `TC-LOGIN-${user.role.toUpperCase()}`,
    name: `Login successfully as ${user.role}`,
    feature: 'Authentication',
    role: user.role,
    action: 'login' as const,
    expect: 'success-and-redirected' as const,
    tags: user.role === 'super' ? [...BASE_TAGS, '@smoke'] : [...BASE_TAGS]
  })),
  {
    id: 'TC-LOGIN-INVALID-USER',
    name: 'Login fails with incorrect username',
    feature: 'Authentication',
    role: 'super',
    action: 'login-invalid-user',
    username: 'invalid-user-name',
    password: 'MyPassw0rd',
    expect: 'error-invalid-credentials',
    tags: [...BASE_TAGS, '@negative']
  },
  {
    id: 'TC-LOGIN-INVALID-PASS',
    name: 'Login fails with incorrect password',
    feature: 'Authentication',
    role: 'super',
    action: 'login-invalid-pass',
    username: 'user1',
    password: 'WrongPassword123',
    expect: 'error-invalid-credentials',
    tags: [...BASE_TAGS, '@negative']
  }
];
