/**
 * FormBuilder main class.
 */
import {HiddenFieldHandler} from "./classes/hidden-field-handler";
import {StringField} from "./classes/string-field";
import {PasswordField} from "./classes/password-field";
import {TextField} from "./classes/text-field";
import {CurrencyField} from "./classes/currency-field";
import {ComboFieldHandler} from "./classes/combo-field";
import './scss/jquery-jsonform.scss';

export class FormBuilder {

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
		this.registerHandler(FormBuilder.TYPE_STRING, new StringField());
		this.registerHandler(FormBuilder.TYPE_PASSWORD, new PasswordField());
		this.registerHandler(FormBuilder.TYPE_EMAIL, new StringField());
		this.registerHandler(FormBuilder.TYPE_TEXT, new TextField());
		this.registerHandler(FormBuilder.TYPE_CURRENCY, new CurrencyField());
		this.registerHandler(FormBuilder.TYPE_DATETIME, new StringField());
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
