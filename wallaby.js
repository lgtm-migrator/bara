const path = require('path')
module.exports = wallaby => {
  process.env.NODE_PATH +=
    path.delimiter + path.join(wallaby.projectCacheDir, 'packages')
  return {
    autoDetect: true,
    files: [
      'packages/**/*.+(ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!packages/**/node_modules/**',
      '!packages/**/*.test.ts*',
      '!packages/**/*.d.ts*',
    ],
    tests: ['packages/**/*.test.ts*', '!packages/**/node_modules/**'],
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React',
      }),
    },
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
    debug: true,
  }
}
