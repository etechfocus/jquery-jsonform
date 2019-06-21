/**
 * Combo form field handler. Create field instance.
 */
import ComboMeta from "./combo-meta";

export class ComboFieldHandler {

	/**
	 * Append field
	 *
	 * @param {object} boxBody - Form container
	 * @param {ModelInfo} modelInfo
	 * @param {AttrInfo} attrInfo
	 */
	appendField(
		boxBody,
		modelInfo,
		attrInfo
	) {
		const field = new ComboField(boxBody, modelInfo, attrInfo);

		field.appendField();
	}

	/**
	 * Validate field
	 *
	 * @param modelInfo
	 * @param attrInfo
	 * @returns {boolean}
	 */
	validate(modelInfo, attrInfo) {
		return true;
	}

}

/**
 * Combo form field with listeners, handlers and view layout.
 */
export class ComboField {

	/**
	 * @param {*} boxBody - Form container
	 * @param {ModelInfo} modelInfo
	 * @param {AttrInfo} attrInfo
	 */
	constructor(
		boxBody,
		modelInfo,
		attrInfo
	) {
		/**
		 * Form container
		 *
		 * @type {object|null}
		 */
		this.boxBody = boxBody;

		/**
		 * Model info
		 *
		 * @type {ModelInfo|null}
		 */
		this.modelInfo = modelInfo;

		/**
		 * Attribute info
		 *
		 * @type {AttrInfo|null}
		 */
		this.attrInfo = attrInfo;

		/**
		 * Meta info
		 *
		 * @type {ComboMeta|null}
		 */
		this.meta = attrInfo.getMeta(ComboMeta);

		/**
		 * Current data in select. If in `meta` set `typeaheadUrl` option will be saved last result.
		 *
		 * @type {object[]|null}
		 */
		this.data = null;

		/**
		 * Field group/wrap where place field with field.
		 *
		 * @type {object|null}
		 */
		this.eFieldGroup = null;

		/**
		 * Current field.
		 *
		 * @type {object|null}
		 */
		this.eField = null;

		this.beforeInit();
	}

	/**
	 * Initialize necessary statements.
	 */
	beforeInit() {
		//	Check if set `typeaheadUrl` option
		if (this.meta.getTypeaheadUrl()) {
			this.data = [];

			return;
		}

		//	If use predefined values
		if (!Array.isArray(this.meta.getData())) {
			this.data = [];
		}

		this.data = this.meta.getData();
	}

	/**
	 * Return data.
	 *
	 * @returns {object[]}
	 */
	getData() {
		//	Ensure that data is array
		if (!Array.isArray(this.data)) {
			return [];
		}

		//	@todo: Add data filter allow specific properties and throw excess

		return this.data;
	}

	/**
	 * Return `value` key in input data.
	 *
	 * @returns {*}
	 */
	getValueKey() {
		//	Return default value
		if (this.meta.getValueKey() === null) {
			return 'value';
		}

		return this.meta.getValueKey();
	}

	/**
	 * Return `name` key in input data.
	 *
	 * @returns {*}
	 */
	getNameKey() {
		//	Return default value
		if (this.meta.getNameKey() === null) {
			return 'name';
		}

		return this.meta.getNameKey();
	}

	/**
	 * Append field
	 */
	appendField() {
		//  Set placeholder for default
		let placeholder = this.meta.getPlaceholder('-- Select value --');

		this.eField = $('\
			<div \
				class="form-control form-control-combo" \
				id="' + this.attrInfo.getId() + '"\
			>\
				<select\
					id="' + this.attrInfo.getId() + '"\
				>\
				</select>\
			</div>\
      	');

		//	Put field in wrap
		this.eFieldGroup = $('<div class="form-group"></div>');
		const fieldLabel = $('<label for="' + this.attrInfo.getId() + '">' + this.attrInfo.getName() + '</label>');
		this.eFieldGroup.append(fieldLabel);
		this.eFieldGroup.append(this.eField);
		this.boxBody.append(this.eFieldGroup);

		//	Init Select2
		const select2Options = {
			allowClear: true,
			placeholder: placeholder,
			width: '100%',
			containerCssClass: 'jquery-jsonform-combo-container',
			dropdownCssClass: 'jquery-jsonform-combo-dropdown'
		};

		//	Interactive data
		if (this.meta.getTypeaheadUrl() !== null) {
			select2Options.ajax = {
				url: this.meta.getTypeaheadUrl(),
				//	Process sending data
				data: function (params) {
					//	Wrap data
					return {
						term: params.term,
					};
				},
				//	Process request response
				processResults: (response) => {
					if (response.code !== 200) {
						console.error(response.message);

						return [];
					}

					let data = [];

					//	Parse response from server
					if (Array.isArray(response.data)) {
						data = response.data.map((item) => {
							return {
								id: item[this.getValueKey()],
								text: item[this.getNameKey()]
							}
						});
					}

					//	Return filtered data from server
					return {
						results: data
					};
				}
			}
		}
		//	Static data
		else {
			//	Data
			const select2Data = this.getData().map((item) => {
				return {
					id: item[this.getValueKey()],
					text: item[this.getNameKey()]
				}
			});

			select2Data.unshift({
				id: '',
				text: ''
			});

			select2Options.data = select2Data;
		}

		this.eFieldGroup.find('select').select2(select2Options);
	}

}
