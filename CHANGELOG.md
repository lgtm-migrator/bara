# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.4.0](https://github.com/nampdn/bara/compare/v2.3.2...v2.4.0) (2019-04-24)


### Bug Fixes

* **barn:** not emit init state and latest value ([00aa16d](https://github.com/nampdn/bara/commit/00aa16d)), closes [#47](https://github.com/nampdn/bara/issues/47)


### Features

* **basics:** add `useBasicsStream` for convenient usage ([6029ff7](https://github.com/nampdn/bara/commit/6029ff7)), closes [#44](https://github.com/nampdn/bara/issues/44)
* **core:** add remember to `useCustomEvent` ([148b2f0](https://github.com/nampdn/bara/commit/148b2f0)), closes [#47](https://github.com/nampdn/bara/issues/47)
* **core:** new operate `addDebugListener` for debugging ([8d8f8c7](https://github.com/nampdn/bara/commit/8d8f8c7)), closes [#52](https://github.com/nampdn/bara/issues/52)





## [2.3.2](https://github.com/nampdn/bara/compare/v2.3.1...v2.3.2) (2019-04-22)


### Bug Fixes

* **basics:** add ActionPipe typing for createPipe operator ([bfd99af](https://github.com/nampdn/bara/commit/bfd99af))
* **basics:** fix export and typing on createPipe ([193d718](https://github.com/nampdn/bara/commit/193d718))





## [2.3.1](https://github.com/nampdn/bara/compare/v2.3.0...v2.3.1) (2019-04-19)


### Bug Fixes

* **core:** addListener of createEmitter instance will throw error if parameters is not correct ([28c18b7](https://github.com/nampdn/bara/commit/28c18b7))
* **core:** emitterMap process could not iterable ([8109697](https://github.com/nampdn/bara/commit/8109697))





# [2.3.0](https://github.com/nampdn/bara/compare/v2.2.0...v2.3.0) (2019-04-19)


### Bug Fixes

* **basics:** remove useInitStream from hook ([5040311](https://github.com/nampdn/bara/commit/5040311))
* **core:** prevent duplicate stream registration ([9d01ca5](https://github.com/nampdn/bara/commit/9d01ca5))
* **core:** trigger is not map to triggerRegistry ([00e01eb](https://github.com/nampdn/bara/commit/00e01eb))
* **core:** WIP on duplicate stream ([d95ffb9](https://github.com/nampdn/bara/commit/d95ffb9))
* **deps:** update dependency cli-ux to v5.2.1 ([7c1bcbd](https://github.com/nampdn/bara/commit/7c1bcbd))


### Features

* **barn:** new operator `setBarnState` based on `useEmitter` ([d4a2bd0](https://github.com/nampdn/bara/commit/d4a2bd0)), closes [#35](https://github.com/nampdn/bara/issues/35)
* **basics:** add "and" and "or" operator for "createPipe" function ([746b164](https://github.com/nampdn/bara/commit/746b164)), closes [#42](https://github.com/nampdn/bara/issues/42)
* **basics:** add createPipe as an alias of createSequencePipe ([5da12ef](https://github.com/nampdn/bara/commit/5da12ef)), closes [#41](https://github.com/nampdn/bara/issues/41)
* **basics:** add createSequencePipe operator ([c37d30f](https://github.com/nampdn/bara/commit/c37d30f)), closes [#34](https://github.com/nampdn/bara/issues/34)
* **core:** add setupEmitter ([f31f547](https://github.com/nampdn/bara/commit/f31f547))
* **core:** complete `createEmitter` with `useEmitter` hook ([8d85655](https://github.com/nampdn/bara/commit/8d85655)), closes [#35](https://github.com/nampdn/bara/issues/35)
* **core:** export all from xstream ([07bd747](https://github.com/nampdn/bara/commit/07bd747))
* **core:** WIP on adding useEmitter ([59f62d3](https://github.com/nampdn/bara/commit/59f62d3))





# [2.2.0](https://github.com/nampdn/bara/compare/v2.1.0...v2.2.0) (2019-04-10)


### Bug Fixes

* **barn:** replace `fbemitter` with `xstream` because of license ([b5cb6e0](https://github.com/nampdn/bara/commit/b5cb6e0))


### Features

* **bara:** bundle with @bara/barn ([193e15c](https://github.com/nampdn/bara/commit/193e15c)), closes [#14](https://github.com/nampdn/bara/issues/14)
* **barn:** able to set state and handle key change dynamically ([b3faace](https://github.com/nampdn/bara/commit/b3faace)), closes [#14](https://github.com/nampdn/bara/issues/14)
* **barn:** able to setState and useBarn by property path ([8fc2ecc](https://github.com/nampdn/bara/commit/8fc2ecc)), closes [#14](https://github.com/nampdn/bara/issues/14)
* **core:** add MemoryStream support ([ad99a45](https://github.com/nampdn/bara/commit/ad99a45)), closes [#14](https://github.com/nampdn/bara/issues/14)
* **core:** add useCustomEvent hook ([0b45c87](https://github.com/nampdn/bara/commit/0b45c87)), closes [#14](https://github.com/nampdn/bara/issues/14)





# [2.1.0](https://github.com/nampdn/bara/compare/v2.0.0...v2.1.0) (2019-04-06)


### Bug Fixes

* **basics:** change useStream API for init/timer ([47dc33b](https://github.com/nampdn/bara/commit/47dc33b))
* **basics:** remove condition useless of init ([f26d209](https://github.com/nampdn/bara/commit/f26d209))
* **core:** ensure trigger entity before do register ([d318814](https://github.com/nampdn/bara/commit/d318814))


### Features

* **bara:** add @bara/basics to bara package ([88e0f40](https://github.com/nampdn/bara/commit/88e0f40))
* **bara:** export all operators from @bara/core ([c66facd](https://github.com/nampdn/bara/commit/c66facd))
* **basics:** add basics bara stream ([24a3775](https://github.com/nampdn/bara/commit/24a3775))
* **basics:** add init feature ([ce04488](https://github.com/nampdn/bara/commit/ce04488))
* **basics:** implement timer feature with elapsed ([4d15e7d](https://github.com/nampdn/bara/commit/4d15e7d))
* **core:** upgrade useStream API ([5d3761e](https://github.com/nampdn/bara/commit/5d3761e)), closes [#11](https://github.com/nampdn/bara/issues/11)


### BREAKING CHANGES

* **core:** switch from object config to function config





# [2.0.0](https://github.com/nampdn/bara/compare/v1.2.0...v2.0.0) (2019-04-04)


### Features

* **bara:** export @bara/core functions ([4dcff4a](https://github.com/nampdn/bara/commit/4dcff4a))
* **bara:** export createEventType function ([36cdea2](https://github.com/nampdn/bara/commit/36cdea2))
* **core:** add createEventType function ([1ecdd76](https://github.com/nampdn/bara/commit/1ecdd76))
* **core:** add types for BaraStream ([d5084d3](https://github.com/nampdn/bara/commit/d5084d3))
* **core:** add useAction ([e410062](https://github.com/nampdn/bara/commit/e410062))
* **core:** bootstraped useCondition with useEvent before execute an action ([2618992](https://github.com/nampdn/bara/commit/2618992)), closes [#10](https://github.com/nampdn/bara/issues/10)
* **core:** do not print log in production environment ([3c3b46a](https://github.com/nampdn/bara/commit/3c3b46a))
* **core:** implement useStream ([96153f0](https://github.com/nampdn/bara/commit/96153f0))
* **core:** implemented useEvent for useTrigger ([0245d58](https://github.com/nampdn/bara/commit/0245d58))
* **core:** make useStream, useTrigger, useEvent usable :tada: ([b7a2b51](https://github.com/nampdn/bara/commit/b7a2b51))
* **core:** useTriggerHook could attach other TriggerEntityType ([b8f9dce](https://github.com/nampdn/bara/commit/b8f9dce))
* **core:** WIP on add useAction operator ([b0d1774](https://github.com/nampdn/bara/commit/b0d1774))


### BREAKING CHANGES

* **core:** change useTrigger API





# [1.2.0](https://github.com/nampdn/bara/compare/v1.1.10...v1.2.0) (2019-03-05)


### Features

* **core:** add setup options for extending a module ([d0d62a1](https://github.com/nampdn/bara/commit/d0d62a1))





## [1.1.10](https://github.com/nampdn/bara/compare/v1.1.9...v1.1.10) (2019-03-04)


### Bug Fixes

* **bara:** optimize package and docs ([454d6fe](https://github.com/nampdn/bara/commit/454d6fe))





## [1.1.9](https://github.com/nampdn/bara/compare/v1.1.8...v1.1.9) (2019-03-04)


### Bug Fixes

* **core:** validate useEvent ([ec41ae4](https://github.com/nampdn/bara/commit/ec41ae4))





## [1.1.8](https://github.com/nampdn/bara/compare/v1.1.7...v1.1.8) (2019-03-04)


### Bug Fixes

* **bara:** temporary disable optimize ([165dd5d](https://github.com/nampdn/bara/commit/165dd5d))





## [1.1.7](https://github.com/nampdn/bara/compare/v1.1.6...v1.1.7) (2019-03-04)


### Bug Fixes

* **bara:** webpack module for node ([1c9070b](https://github.com/nampdn/bara/commit/1c9070b))





## [1.1.6](https://github.com/nampdn/bara/compare/v1.1.5...v1.1.6) (2019-03-04)


### Bug Fixes

* **bara:** webpack set target for library ([64054d6](https://github.com/nampdn/bara/commit/64054d6))





## [1.1.5](https://github.com/nampdn/bara/compare/v1.1.4...v1.1.5) (2019-03-04)


### Bug Fixes

* **bara:** specify library type for bara package ([9859d67](https://github.com/nampdn/bara/commit/9859d67))





## [1.1.4](https://github.com/nampdn/bara/compare/v1.1.3...v1.1.4) (2019-03-04)


### Bug Fixes

* **bara:** export correctly ([56f28f6](https://github.com/nampdn/bara/commit/56f28f6))





## [1.1.3](https://github.com/nampdn/bara/compare/v1.1.2...v1.1.3) (2019-03-04)


### Bug Fixes

* **bara:** set main and module entries for package ([b624830](https://github.com/nampdn/bara/commit/b624830))





## [1.1.2](https://github.com/nampdn/bara/compare/v1.1.1...v1.1.2) (2019-03-04)


### Bug Fixes

* **bara:** bundle using webpack instead of pure tsc ([004bd11](https://github.com/nampdn/bara/commit/004bd11))





## [1.1.1](https://github.com/nampdn/bara/compare/v1.1.0...v1.1.1) (2019-03-04)

**Note:** Version bump only for package bara





# [1.1.0](https://github.com/nampdn/bara/compare/v0.1.0...v1.1.0) (2019-03-04)


### Features

* **bara:** gen bara package ([79136f7](https://github.com/nampdn/bara/commit/79136f7))
* **cli:** add some initial commands ([0128f88](https://github.com/nampdn/bara/commit/0128f88))
* **core:** add core API ([#6](https://github.com/nampdn/bara/issues/6)) ([f574cc4](https://github.com/nampdn/bara/commit/f574cc4))
