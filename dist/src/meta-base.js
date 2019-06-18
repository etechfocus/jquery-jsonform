/**
 * Base meta class for fields.
 */
export default class MetaBase {

	constructor(meta) {
		this.meta = meta;
	}

	/**
	 * Return meta
	 *
	 * @returns {object}
	 */
	getMeta() {
		//	Return empty object if meta not defined or empty
		if (typeof this.meta !== 'object') {
			return {};
		}

		return this.meta;
	}

	/**
	 * Return field placeholder or default if exists
	 *
	 * @param {string} [_default]
	 * @returns {*}
	 */
	getPlaceholder(_default) {
		if (this.getMeta().placehoder === undefined) {
			return _default;
		}

		return this.getMeta().placeholder;
	}

}
