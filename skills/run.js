const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Color helpers for premium terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function logHeader(message) {
  console.log(`\n${colors.bright}${colors.cyan}=== ${message} ===${colors.reset}\n`);
}

function logInfo(message) {
  console.log(`${colors.blue}ℹ ${colors.reset}${message}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✔ ${colors.reset}${message}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠ ${colors.reset}${message}`);
}

function logError(message) {
  console.log(`${colors.red}✘ ${colors.reset}${message}`);
}

// 1. Parse and validate command line arguments
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
${colors.bright}${colors.magenta}Cortex Automation Test Runner${colors.reset}

${colors.bright}Usage:${colors.reset}
  npm run site:module <site> <module> [options]         ${colors.dim}- Run a specific module on a site${colors.reset}
  npm run site:testcase <site> "<testcase>" [options]   ${colors.dim}- Run a specific test case on a site${colors.reset}

${colors.bright}Alternative (Direct Node):${colors.reset}
  node run.js site:module <site> <module> [options]
  node run.js site:testcase <site> "<testcase>" [options]
  node run.js <site> <module> [options]                  ${colors.dim}- (Legacy direct run)${colors.reset}
  node run.js <site> -t "<testcase>" [options]            ${colors.dim}- (Legacy direct grep)${colors.reset}

${colors.bright}Arguments:${colors.reset}
  ${colors.bright}<site>${colors.reset}         Target environment: ${colors.green}new-cortex${colors.reset}, ${colors.green}tmh${colors.reset}, ${colors.green}sbh${colors.reset}, ${colors.green}nuh${colors.reset}
  ${colors.bright}<module>${colors.reset}       Test module name:
                 • ${colors.cyan}login${colors.reset}                 (tests/login.spec.ts)
                 • ${colors.cyan}medical-record${colors.reset}        (tests/medical-record.spec.ts)
                 • ${colors.cyan}medical-record-search${colors.reset} (tests/medical-record-search.spec.ts)
                 • ${colors.cyan}advance-visits${colors.reset}        (tests/advance-visits.spec.ts)
                 • ${colors.cyan}check-apps${colors.reset}            (tests/check_apps.spec.ts)

${colors.bright}Options:${colors.reset}
  ${colors.bright}-t, --testcase <name>${colors.reset}  Grep filter to run specific test case title
  ${colors.bright}--headless${colors.reset}            Run in headless mode (default is headed browser mode)
  ${colors.bright}--project <name>${colors.reset}      Browser project: chromium (default), firefox, webkit
  ${colors.bright}-u, --role <role>${colors.reset}      Filter by USER_ROLE (e.g., super, nurse, physician)

${colors.bright}Examples:${colors.reset}
  npm run site:module new-cortex login
  npm run site:testcase new-cortex "Login test for user"
  node run.js site:module tmh login --headless
  node run.js site:testcase sbh "Login test"
  `);
  process.exit(0);
}

const VALID_SITES = ['new-cortex', 'tmh', 'sbh', 'nuh'];
const FILE_MAP = {
  'login': 'login/login.spec.ts',
  'medical-record': 'medical-record/medical-record.spec.ts',
  'medical-record-search': 'medical-record/medical-record-search.spec.ts',
  'advance-visits': 'reception/advance-visits.spec.ts',
  'check-apps': 'reception/check_apps.spec.ts',
};

// Determine if we are using the new command styles (site:module or site:testcase)
let mode = null; // 'site:module', 'site:testcase', or null
let siteArg = null;
let nextArgIndex = 0;

const firstArg = args[0].toLowerCase();
if (firstArg === 'site:module' || firstArg === 'site:testcase') {
  mode = firstArg;
  siteArg = args[1];
  nextArgIndex = 2;
} else {
  // Legacy direct mode: node run.js <site> <module>
  siteArg = args[0];
  nextArgIndex = 1;
}

if (!siteArg) {
  logError(`Please specify a site. Supported sites are: ${VALID_SITES.join(', ')}`);
  process.exit(1);
}

const site = siteArg.toLowerCase();
if (!VALID_SITES.includes(site)) {
  logError(`Invalid site: "${colors.bright}${siteArg}${colors.reset}". Supported sites are: ${VALID_SITES.join(', ')}`);
  process.exit(1);
}

let testcaseFilter = null;
let moduleNameOrPath = null;
let headless = false;
let browserProject = 'chromium';
let userRole = null;

// If in site:module, the next argument is the module name
if (mode === 'site:module') {
  const moduleName = args[nextArgIndex];
  if (moduleName && !moduleName.startsWith('-')) {
    moduleNameOrPath = moduleName;
    nextArgIndex++;
  } else {
    logError(`Please specify a test module. Available modules: ${Object.keys(FILE_MAP).join(', ')}`);
    process.exit(1);
  }
}

// If in site:testcase, the next argument is the testcase filter
if (mode === 'site:testcase') {
  const tc = args[nextArgIndex];
  if (tc && !tc.startsWith('-')) {
    testcaseFilter = tc;
    nextArgIndex++;
  } else {
    logError(`Please specify a testcase filter string (e.g. npm run site:testcase new-cortex "Login test")`);
    process.exit(1);
  }
}

// Parse the rest of the arguments
for (let i = nextArgIndex; i < args.length; i++) {
  const arg = args[i];
  if (arg === '-t' || arg === '--testcase') {
    testcaseFilter = args[++i];
  } else if (arg === '-u' || arg === '--role') {
    userRole = args[++i];
  } else if (arg === '--headless') {
    headless = true;
  } else if (arg === '--project') {
    browserProject = args[++i];
  } else if (!moduleNameOrPath && !arg.startsWith('-')) {
    moduleNameOrPath = arg;
  }
}

// Resolve dynamic module file path under tests/<site>/
let moduleFile = null;
if (moduleNameOrPath) {
  const specBasename = FILE_MAP[moduleNameOrPath.toLowerCase()] || moduleNameOrPath;
  if (specBasename.startsWith('tests/')) {
    moduleFile = specBasename;
  } else {
    moduleFile = `tests/${site}/${specBasename}`;
  }
} else {
  // If no module is specified, default to running all tests in the site folder
  moduleFile = `tests/${site}`;
}

// 2. Build Playwright command line options
const playwrightArgs = ['playwright', 'test'];

if (moduleFile) {
  playwrightArgs.push(moduleFile);
}

if (testcaseFilter) {
  playwrightArgs.push('-g', testcaseFilter);
}

playwrightArgs.push(`--project=${browserProject}`);

if (!headless) {
  playwrightArgs.push('--headed');
}

// 3. Prepare Environment Variables
const env = {
  ...process.env,
  SITE: site,
};

if (userRole) {
  env.USER_ROLE = userRole;
}

logHeader('CORTEX AUTOMATION RUNNER');
logInfo(`Target Site  : ${colors.bright}${colors.green}${site.toUpperCase()}${colors.reset}`);
if (moduleFile) {
  logInfo(`Test Module  : ${colors.bright}${colors.cyan}${moduleFile}${colors.reset}`);
}
if (testcaseFilter) {
  logInfo(`Filter (Grep): "${colors.bright}${colors.yellow}${testcaseFilter}${colors.reset}"`);
}
if (userRole) {
  logInfo(`User Role    : ${colors.bright}${colors.magenta}${userRole}${colors.reset}`);
}
logInfo(`Browser      : ${colors.bright}${browserProject}${colors.reset}`);
logInfo(`Mode         : ${colors.bright}${headless ? 'Headless' : 'Headed (Browser Open)'}${colors.reset}`);
console.log('');

// 4. Spawn Playwright process
logInfo(`Running command: SITE=${site}${userRole ? ` USER_ROLE=${userRole}` : ''} npx playwright ${playwrightArgs.slice(1).join(' ')}`);
console.log('------------------------------------------------------------\n');

const child = spawn('npx', playwrightArgs, {
  cwd: path.join(__dirname, '..'),
  env,
  stdio: 'inherit',
  shell: true,
});

child.on('close', (code) => {
  console.log('\n------------------------------------------------------------');
  if (code === 0) {
    logSuccess(`${colors.bright}${colors.green}Tests passed successfully!${colors.reset}`);
    process.exit(0);
  } else {
    logError(`${colors.bright}${colors.red}Tests failed with exit code ${code}.${colors.reset}`);
    process.exit(code);
  }
});
