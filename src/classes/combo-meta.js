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

}

export default ComboMeta;
