// Thanks to  https://medium.com/@amcdnl/version-stamping-your-app-with-the-angular-cli-d563284bb94d

//const { gitDescribeSync } = require('git-describe');
const { version } = require('./package.json');
// const branch = require('git-branch');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

/** Builds more extensive Git info 
const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false
});*/
const gitInfo = {};

gitInfo.version = version;
// gitInfo.branch = branch.sync();  // Uncomment this line to utilize branch features (red header for develop branch)

const file = resolve(__dirname, '.', 'src', 'assets', 'version.ts');
writeFileSync(file,
`// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

console.log(`Wrote version ${gitInfo.version} info to ${relative(resolve(__dirname, '..'), file)}`);