/**
 * Describe field attributes
 */
class AttrInfo {
	constructor(props) {
		this.props = props;
	}

	getId() {
		return this.props.id;
	}

	getName() {
		return this.props.name;
	}

	getType() {
		return this.props.type;
	}

	getValue() {
		if (typeof(this.props.value) == 'undefined') {
			return '';
		}
		return this.props.value;
	}

	/**
	 * Return `meta` property. If set `type` parameter return structured meta object eg getMeta(ComboMeta) return
	 * instance of the ComboMeta where contained encapsulated meta info.
	 *
	 * @param {Function} [type] - Class for meta info
	 * @returns {*}
	 */
	getMeta(
		//	Class for meta info
		type
	) {
		//	Return `meta` object
		if (typeof type === 'function') {
			return new type(this.props.meta);
		}

		//	Return raw `meta` object
		return this.props.meta;
	}

}

export default AttrInfo;
