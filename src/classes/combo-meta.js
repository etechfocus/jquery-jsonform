import MetaBase from "./meta-base";

/**
 * Combo Meta info structured meta info.
 */
class ComboMeta extends MetaBase {

	/**
	 * Return meta `data` if not exists return `null`
	 *
	 * @returns {*}
	 */
	getData() {
		if (this.getMeta().data !== undefined) {
			return this.getMeta().data;
		}

		return [];
	}

	/**
	 * Return `typeaheadUrl` if not exists return `null`.
	 *
	 * @returns {*}
	 */
	getTypeaheadUrl() {
		if (this.getMeta().typeaheadUrl !== undefined) {
			return this.getMeta().typeaheadUrl;
		}

		return null;
	}

	/**
	 * Return `value` key in input data.
	 *
	 * @returns {*}
	 */
	getValueKey() {
		if (this.getMeta().valueKey !== undefined) {
			return this.getMeta().valueKey;
		}

		return null;
	}

	/**
	 * Return `name` key in input data.
	 *
	 * @returns {*}
	 */
	getNameKey() {
		if (this.getMeta().nameKey !== undefined) {
			return this.getMeta().nameKey;
		}

		return null;
	}

}

export default ComboMeta;
