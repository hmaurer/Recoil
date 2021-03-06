/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+perf_viz
 * @flow strict-local
 * @format
 */
'use strict';

import type {RecoilState} from 'Recoil_RecoilValue';

const atom = require('Recoil_atom');
const {useRecoilValue} = require('Recoil_Hooks');
const {noWait, waitForAll, waitForNone} = require('Recoil_WaitFor');
const {readOnlySelector} = require('recoil/RecoilUtils');

const numberAtom: RecoilState<number> = atom({key: 'number', default: 0});
const stringAtom: RecoilState<string> = atom({key: 'string', default: ''});

// eslint-disable-next-line no-unused-vars
let num: number;
// eslint-disable-next-line no-unused-vars
let str: string;

//////////////
// waitForAll
//////////////

// Test tuple unwrapping of types
// eslint-disable-next-line fb-www/react-hooks
const arrayResults = useRecoilValue(
  // $FlowExpectedError
  waitForAll([readOnlySelector(numberAtom), readOnlySelector(stringAtom)]),
);
num = arrayResults[0];
str = arrayResults[1];
num = arrayResults[1];
// $FlowExpectedError
str = arrayResults[0];

// Test object unwrapping of types
// eslint-disable-next-line fb-www/react-hooks
const objResults = useRecoilValue(
  // $FlowExpectedError
  waitForAll({num: numberAtom, str: stringAtom}),
);
num = objResults.num;
str = objResults.str;
num = objResults.str;
// $FlowExpectedError
str = objResults.num;

//////////////
// waitForNone
//////////////

// Test tuple unwrapping of types
// eslint-disable-next-line fb-www/react-hooks
const arrayResultsNone = useRecoilValue(
  // $FlowExpectedError
  waitForNone([readOnlySelector(numberAtom), readOnlySelector(stringAtom)]),
);
num = arrayResultsNone[0].valueOrThrow();
str = arrayResultsNone[1].valueOrThrow();
num = arrayResultsNone[1].valueOrThrow();
// $FlowExpectedError
str = arrayResultsNone[0].valueOrThrow();

// Test object unwrapping of types
// eslint-disable-next-line fb-www/react-hooks
const objResultsNone = useRecoilValue(
  // $FlowExpectedError
  waitForNone({num: numberAtom, str: stringAtom}),
);
num = objResultsNone.num.valueOrThrow();
str = objResultsNone.str.valueOrThrow();
num = objResultsNone.str.valueOrThrow();
// $FlowExpectedError
str = objResultsNone.num.valueOrThrow();

//////////////
// noWait
//////////////

num = useRecoilValue(noWait(numberAtom)).valueOrThrow(); // eslint-disable-line fb-www/react-hooks
// $FlowExpectedError
str = useRecoilValue(noWait(numberAtom)).valueOrThrow(); // eslint-disable-line fb-www/react-hooks
