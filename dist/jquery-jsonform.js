/**
 * Base meta class for fields.
 */
class MetaBase {

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

////////////////////
// AttrInfo
////////////////////
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

////////////////////
// ModelInfo
////////////////////
class ModelInfo {
	constructor(props) {
		this.props = props;
	}

	getName() {
		return this.props.name;
	}

	getAttrInfoList() {
		var attrInfoList = [];
		for (var i in this.props.attrs) {
			attrInfoList.push(new AttrInfo(this.props.attrs[i]));
		}
		return attrInfoList;
	}
}

////////////////////
// Handlers
////////////////////
class StringFieldHandler {
	appendField(boxBody, modelInfo, attrInfo) {
		var fieldGroup = $('<div class="form-group"></div>');
		var fieldLabel = $('<label for="' + attrInfo.getId() + '">' + attrInfo.getName() + '</label>');
		fieldGroup.append(fieldLabel);
		var fieldInput = $('<input type="text" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">')
		fieldGroup.append(fieldInput);
		boxBody.append(fieldGroup);
	}

	validate(modelInfo, attrInfo) {
		// TODO - do validation on min, max ...etc
		return true;
	}
}

class CurrencyFieldHandler {
	appendField(boxBody, modelInfo, attrInfo) {
		var fieldGroup = $('<div class="form-group"></div>');
		var fieldLabel = $('<label for="' + attrInfo.getId() + '">' + attrInfo.getName() + '</label>');
		fieldGroup.append(fieldLabel);
		var fieldInputGroup = $('<div class="input-group"></div>');
		var fieldIcon = $('<div class="input-group-addon"><i class="fa fa-dollar"></i></div>');
		fieldInputGroup.append(fieldIcon);
		var fieldInput = $('<input type="text" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">')
		fieldInputGroup.append(fieldInput);
		fieldGroup.append(fieldInputGroup);
		boxBody.append(fieldGroup);
	}

	validate(modelInfo, attrInfo) {
		// TODO - do validation on min, max ...etc
		return true;
	}
}

class TextFieldHandler {
	appendField(boxBody, modelInfo, attrInfo) {
		var fieldGroup = $('<div class="form-group"></div>');
		var fieldLabel = $('<label for="' + attrInfo.getId() + '">' + attrInfo.getName() + '</label>');
		fieldGroup.append(fieldLabel);
		var fieldInput = $('<textarea class="form-control" rows="3" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder=""></textarea>')
		fieldGroup.append(fieldInput);
		boxBody.append(fieldGroup);
	}

	validate(modelInfo, attrInfo) {
		// TODO - do validation on min, max ...etc
		return true;
	}
}

class PasswordFieldHandler {
	appendField(boxBody, modelInfo, attrInfo) {
		var fieldGroup = $('<div class="form-group"></div>');
		var fieldLabel = $('<label for="' + attrInfo.getId() + '">' + attrInfo.getName() + '</label>');
		fieldGroup.append(fieldLabel);
		var fieldInput = $('<input type="password" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" placeholder="">')
		fieldGroup.append(fieldInput);
		boxBody.append(fieldGroup);
	}

	validate(modelInfo, attrInfo) {
		// TODO - do validation on min, max ...etc
		return true;
	}
}

class HiddenFieldHandler {
	appendField(boxBody, modelInfo, attrInfo) {
		var fieldInput = $('<input type="hidden" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">')
		boxBody.append(fieldInput);
	}

	validate(modelInfo, attrInfo) {
		return true;
	}
}

/**
 * Combo form field
 */
class ComboFieldHandler {

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

class ComboField {


	/**
	 * Form container
	 *
	 * @type {object|null}
	 */
	boxBody = null;

	/**
	 * Model info
	 *
	 * @type {ModelInfo|null}
	 */
	modelInfo = null;

	/**
	 * Attribute info
	 *
	 * @type {AttrInfo|null}
	 */
	attrInfo = null;

	/**
	 * Meta info
	 *
	 * @type {ComboMeta|null}
	 */
	meta = null;

	/**
	 * `value` key in input data
	 *
	 * @type {string}
	 */
	valueKey = 'value';

	/**
	 * `name` key in input data
	 *
	 * @type {string}
	 */
	nameKey = 'name';

	/**
	 * Current data in select. If in `meta` set `typeaheadUrl` option will be saved last result.
	 *
	 * @type {object[]|null}
	 */
	data = null;

	/**
	 * Field group/wrap where place field with field.
	 *
	 * @type {object|null}
	 */
	eFieldGroup = null;

	/**
	 * Current field.
	 *
	 * @type {object|null}
	 */
	eField = null;

	/**
	 * Current active dropdown list.
	 *
	 * @type {object|null}
	 */
	eActiveDropdownList = null;

	/**
	 * @param {object} boxBody - Form container
	 * @param {ModelInfo} modelInfo
	 * @param {AttrInfo} attrInfo
	 */
	constructor(
		boxBody,
		modelInfo,
		attrInfo
	) {
		this.boxBody = boxBody;
		this.modelInfo = modelInfo;
		this.attrInfo = attrInfo;

		/** @type ComboMeta */
		this.meta = attrInfo.getMeta(ComboMeta);

		this.beforeInit()
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
	 * Append field
	 */
	appendField() {
		//  Set placeholder for default
		let name = this.meta.getPlaceholder('-- Select value --');
		//  Select options
		let options = '';

		this.getData().forEach((item) => {
			if (item.value.toString() === this.attrInfo.getValue()) {
				name = item.name;
			}

			options += '\
				<option\
					value="' + item.value + '"\
				>\
					' + item.name + '\
				</option>';
		});

		this.eField = $('\
			<div \
				class="form-control form-control-combo" \
				id="' + this.attrInfo.getId() + '"\
			>\
				<select\
					id="' + this.attrInfo.getId() + '"\
					style="display: none;"\
				>\
					' + options + '\
				</select>\
				<div class="name">\
					<span>\
						' + name + '\
					</span>\
				</div>\
			</div>\
      	');

		//	Put field in wrap
		this.eFieldGroup = $('<div class="form-group"></div>');
		const fieldLabel = $('<label for="' + this.attrInfo.getId() + '">' + this.attrInfo.getName() + '</label>');
		this.eFieldGroup.append(fieldLabel);
		this.eFieldGroup.append(this.eField);

		this.boxBody.append(this.eFieldGroup);

		//	Add actions to the field
		this.addActions();
	}

	/**
	 * Add actions for the field
	 */
	addActions() {
		const eBody = $('body');
		let fieldInFocus = false;

		this.eField.on('click', () => {
			fieldInFocus = !fieldInFocus;

			if (fieldInFocus) {
				this.eActiveDropdownList = this.addDropdownList(this.eField, this.getData());
				this.toPosition();
				//this.toPosition(eField, eActiveDropdownList);
				this.toSize(this.eField, this.eActiveDropdownList);

				this.eActiveDropdownList.find('.combobox-search input').focus();
			} else {
				this.removeDropdownList(this.eActiveDropdownList);
			}
		});

		//	Hide dropdown list if click outside of the field or dropdown list
		$(document).on('click', (e) => {
			if (fieldInFocus === null || !this.eActiveDropdownList) {
				return;
			}

			const eTarget = $(e.target);

			//	Skip if click on field or dropdown list
			if (//	Form field match
				this.eField.is(eTarget) || this.eField.has(eTarget).length !== 0 ||
				//	Dropdown list
				this.eActiveDropdownList.is(eTarget) || this.eActiveDropdownList.has(eTarget).length !== 0
			) {
				return;
			}

			//	Remove dropdown list if click outside of field of dropdown list
			this.removeDropdownList();

			fieldInFocus = false;
		});

		//	Hide dropdown list select item
		eBody.on('click', '.combobox-item', (e) => {
			const eTarget = $(e.target).closest('.combobox-item');
			const value = eTarget.attr('data-value').toString();
			let name = '';

			//	Find name for option
			this.getData().forEach((item) => {
				if (item.value.toString() === value) {
					name = item.name;
				}
			});

			this.removeDropdownList(this.eActiveDropdownList);

			fieldInFocus = false;

			//	Update form field value
			this.eField.find('select').val(value);
			this.eField.find('.name span').text(name);
		});

		//	Reposition list
		$(window).on('resize', () => {
			//	Position only dropdown list that lead to this field
			if (!fieldInFocus) {
				return;
			}

			this.toPosition(this.eActiveDropdownList);
			this.toSize(this.eActiveDropdownList);
		});

		//	Dropdown search
		eBody.on('keyup', '.combobox-search', (e) => {
			//	Skip if not active
			if (!this.eActiveDropdownList) {
				return;
			}

			const value = e.target.value;
			let items = '';

			this.getData().forEach((item) => {
				//	Find matches
				if (value.length > 0 && item.name.toLowerCase().indexOf(value.toLowerCase()) === -1) {
					return;
				}

				items += '\
						<div class="combobox-item" data-value="' + item.value + '">\
							<span class="name">\
								' + item.name + '\
							</span>\
						</div>\
						';
			});

			this.eActiveDropdownList.find('.combobox-content')
				.empty()
				.html(items);

			this.toPosition();
		});
	}

	/**
	 * Add dropdown list to DOM and return link to it node.
	 */
	addDropdownList() {
		const tpl = $('\
			<div class="combobox">\
				<div class="combobox-content-wrap">\
					<div class="combobox-search">\
						<input \
							type="text" \
							class="form-control"\
							>\
					</div>\
					<div class="combobox-content"></div>\
				</div>\
			</div>\
			');

		this.getData().forEach((item) => {
			//	Value
			if (item.value === undefined) {
				return;
			}

			const value = item.value;

			//	Name
			let name = item.name;

			if (name === undefined) {
				name = '';
			}

			tpl.find('.combobox-content').append($('\
				<div class="combobox-item" data-value="' + value + '">\
					<span class="name">\
						' + name + '\
					</span>\
				</div>\
				'));
		});

		$('body').append(tpl);

		return tpl;
	}

	/**
	 * Remove active combobox
	 */
	removeDropdownList() {
		$(this.eActiveDropdownList).remove();
	}

	/**
	 * Move dropdown list to right position near the active field
	 */
	toPosition() {
		const eSearch = this.eActiveDropdownList.find('.combobox-search');
		const searchHeight = parseFloat(eSearch.outerHeight());
		const eContent = this.eActiveDropdownList.find('.combobox-content');
		const dropdownListHeight = parseFloat(this.eActiveDropdownList.outerHeight());
		const scrollTop = parseFloat($(window).scrollTop());
		const borderWidth = parseFloat(this.eActiveDropdownList.find('.combobox-content-wrap').css('borderWidth'));

		let top = this.eField.offset().top + this.eField.outerHeight() - borderWidth;
		let atBottom = true;

		//	Check that dropdown list not out of document height
		if (top + dropdownListHeight > scrollTop + $(window).height()) {
			//	Move dropdown list top of the field
			top = this.eField.offset().top - dropdownListHeight + borderWidth;
			atBottom = false;
		}

		this.eActiveDropdownList.css({
			left: this.eField.offset().left + 'px',
			top: top + 'px'
		});

		//	Align search field
		//	Align search at bottom
		if (atBottom) {
			eSearch.css({
				top: 0,
				bottom: ''
			});
			eContent.css({
				marginTop: eSearch.outerHeight() + 'px',
				marginBottom: 0
			});
		}
		//	Align search field at top
		else {
			eSearch.css({
				top: '',
				bottom: 0
			});
			eContent.css({
				marginTop: 0,
				marginBottom: eSearch.outerHeight() + 'px'
			});
		}
	}

	/**
	 * Resize dropdown list fit to field
	 */
	toSize() {
		//	Skip if dropdown list now not open
		if (!this.eActiveDropdownList) {
			return;
		}

		this.eActiveDropdownList.width(this.eField.outerWidth() + 'px');
	}

}

////////////////////
// FormBuilder
////////////////////
class FormBuilder {

	constructor(options) {

		var defaultOptions = {
			method: 'post',
			action: '#',
			buttonLabel: 'Submit'
		};

		options = options || {};
		for (var opt in defaultOptions) {
			if (defaultOptions.hasOwnProperty(opt) && !options.hasOwnProperty(opt)) {
				options[opt] = default_options[opt];
			}
		}

		this.options = options;

		// register handles
		this.registerHandler(FormBuilder.TYPE_HIDDEN, new HiddenFieldHandler());
		this.registerHandler(FormBuilder.TYPE_STRING, new StringFieldHandler());
		this.registerHandler(FormBuilder.TYPE_PASSWORD, new PasswordFieldHandler());
		this.registerHandler(FormBuilder.TYPE_EMAIL, new StringFieldHandler());
		this.registerHandler(FormBuilder.TYPE_TEXT, new TextFieldHandler());
		this.registerHandler(FormBuilder.TYPE_CURRENCY, new CurrencyFieldHandler());
		this.registerHandler(FormBuilder.TYPE_DATETIME, new StringFieldHandler());
		this.registerHandler(FormBuilder.TYPE_COMBO, new ComboFieldHandler());
	}

	registerHandler(type, handler) {
		FormBuilder.handlers[type] = handler;
	}

	onSubmit(event) {
		/*
			for (var i in FormBuilder.sections) {
			  var section = FormBuilder.sections[i];
			  var modelInfo = section['modelInfo'];
			  var attrInfoList = section['modelInfo'].getAttrInfoList();
			  for (var i in attrInfoList) {
				var attrInfo = attrInfoList[i];
				var type = attrInfo.getType();
				if (type in event.data.getHandlers()) {
				  var handler = event.data.getHandler(type);
				  var isValid = handler.validate(modelInfo, attrInfo);
				  if (!isValid) {
					// TODO - display error
					return false;
				  }
				}
			  }
			}
		*/

		// everything is good, let's submit
		return true;
	}

	openForm(formHeaderId) {
		this._formHeader = $('<form role="form" method="' + this.options.method + '" action="' + this.options.action + '"></form>');
		$(formHeaderId).wrap(this._formHeader);
		$(document).on('submit', this._formHeader, this.onSubmit);
	}

	getHandlers() {
		return FormBuilder.handlers;
	}

	getHandler(type) {
		return FormBuilder.handlers[type];
	}

	createSection(sectionId, modelInfoJson) {
		var modelInfo = new ModelInfo(modelInfoJson);
		var box = $('<div class="box"></div>');

		// boxHeader
		var boxHeader = $('<div class="box-header"></div>');
		var title = $('<div>' + modelInfo.getName() + '</div>');
		boxHeader.append(title);

		// boxBody
		var boxBody = $('<div class="box-body"></div>');
		var attrInfoList = modelInfo.getAttrInfoList();
		for (var i in attrInfoList) {
			var attrInfo = attrInfoList[i];
			var type = attrInfo.getType();
			if (type in FormBuilder.handlers) {
				var handler = FormBuilder.handlers[type];
				handler.appendField(boxBody, modelInfo, attrInfo);
			}
		}

		// boxFooter
		var boxFooter = $('<div class="box-footer"></div>');

		box.append(boxHeader);
		box.append(boxBody);
		box.append(boxFooter);

		$(sectionId).replaceWith(box);

		FormBuilder.sections.push({'modelInfo': modelInfo, 'box': box});
	}

	closeForm(formFooterId) {
		this._formFooter = $('<input type="submit" class="btn btn-primary" value="' + this.options.buttonLabel + '">');
		$(formFooterId).replaceWith(this._formFooter);
	}
}

FormBuilder.TYPE_HIDDEN = "hidden";
FormBuilder.TYPE_STRING = "string";
FormBuilder.TYPE_PASSWORD = "password";
FormBuilder.TYPE_EMAIL = "email";
FormBuilder.TYPE_TEXT = "text";
FormBuilder.TYPE_CURRENCY = "currency";
FormBuilder.TYPE_DATETIME = "datetime";
FormBuilder.TYPE_COMBO = "combo";

FormBuilder.handlers = [];
FormBuilder.sections = [];
