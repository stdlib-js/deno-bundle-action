/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

const MagicString = require( 'magic-string' );


// VARIABLES //

const MODULE_EXPORTS_RE = /^module\.exports\s*=\s*([\s\S]+?)\s*;\s*$/m;


// FUNCTIONS //

/**
* Replaces `module.exports` with a default export.
*
* @param {string} code - source to be transformed
* @param {string} id - module id
* @returns {(null|Object)} transformed source or null if no transformation was performed
*/
function transform( code, id ) {
	if ( !MODULE_EXPORTS_RE.test( code ) ) {
		return null;
	}
	const magicString = new MagicString( code );
	magicString.replace( MODULE_EXPORTS_RE, 'export default $1;' );
	return {
		'code': magicString.toString(),
		'map': magicString.generateMap()
	};
}


// MAIN //

const plugin = {
	'name': 'rollup-plugin-replace-module-exports',
	'transform': transform
};


// EXPORTS //

module.exports = plugin;