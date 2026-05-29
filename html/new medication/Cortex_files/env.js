(function (window) {
  window.env = window.env || {};

  // Environment variables
  window.env.LANG = 'th';
  window.env.TIMEZONE = 'Asia/Bangkok';
  window.env.KEYCLOAK_URL = 'https://id-dev-x.cortexcloud.co';
  window.env.KEYCLOAK_REALM = 'cortex';
  window.env.KEYCLOAK_CLIENT_ID = 'cortex-ui';
  window.env.KEYCLOAK_REDIRECT_URI = 'https://dev-x.cortexcloud.co/cortex';
  window.env.KEYCLOAK_SILENT_CHECK_SSO_REDIRECT_URI = 'https://dev-x.cortexcloud.co/cortex/silent-check-sso.html';
  window.env.KEYCLOAK_REFRESH_TOKEN_INTERVAL = '240000';
  window.env.APP_V1_BASE_URL = 'https://dev-x.cortexcloud.co';
  window.env.EMR_SERVER_URL = 'https://dev-x.cortexcloud.co/emr-api';
  window.env.GENERATED_EMR_SERVER_URL = 'https://dev-x.cortexcloud.co/generated-emr-api';
  window.env.CORTEX_SERVER_URL = 'https://dev-x.cortexcloud.co/cortex-api';
  window.env.DEMOGRAPHIC_SERVER_URL = 'https://dev-x.cortexcloud.co/new-demographic-api';
  window.env.PRINTER_PROXY_URL = 'http://localhost:8081';
  window.env.SCANNER_PROXY_URL = 'http://localhost:8080';
  window.env.PDF_GENERATOR_URL = 'https://dev-x.cortexcloud.co/py-pdf-document-api';
  window.env.APP_VERSION = 'v2.2.4';
  window.env.SESSION_IDLE_TIMEOUT = '1800';
  window.env.OPENEHR_SERVER_URL = 'https://dev-x.cortexcloud.co/ehrbase';
  window.env.TERMINOLOGY_SERVER_URL = 'https://dev-x.cortexcloud.co/terminology-api';
  window.env.DIAGNOSIS_SEARCH_SERVER_URL = 'https://dev-x.cortexcloud.co/diagnosis-search';
  window.env.PACS_URL = 'http://localhost:9090';
  window.env.PCE_URL = 'https://pcm.hokoon.com';
  window.env.NHSO_APP_URL = '';
  window.env.PDFJS_ENGINE_URL = 'https://dev-x.cortexcloud.co/cortex/pdfjs.js';
  window.env.CUSTOM_FORM_SERVER_URL = 'https://dev-x.cortexcloud.co/cortex-form';
  window.env.PDF_SERVER_URL = 'https://dev-x.cortexcloud.co/pdf-document-api';
})(this);
