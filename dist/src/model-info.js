class ModelInfo {
	constructor(props) {
		this.props = props;
	}

	getName() {
		return this.props.name;
	}

	getAttrInfoList() {
		const attrInfoList = [];

		for (const i in this.props.attrs) {
			attrInfoList.push(new AttrInfo(this.props.attrs[i]));
		}

		return attrInfoList;
	}
}

export default ModelInfo;
