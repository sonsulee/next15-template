export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // Settings to allow URLs in footer
      issuePrefixes: ['#'],
      referenceActions: null,
      issuePrefixesCaseSensitive: false,
      // Allow URL pattern in footer
      noteKeywords: [
        'BREAKING CHANGE',
        'BREAKING-CHANGE',
        'BREAKING CHANGES',
        'URL',
      ],
    },
  },
  // Custom rule settings
  rules: {
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [0, 'always', 100], // Disable footer length limit to accommodate URLs
    'footer-leading-blank': [1, 'always'],
    'footer-empty': [0, 'never'],
  },
}
