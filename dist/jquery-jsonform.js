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

  getMeta() {
    return this.props.meta;
  }

};

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
};

////////////////////
// Handlers
////////////////////
class StringFieldHandler {
  appendField(boxBody, modelInfo, attrInfo) {
    var fieldGroup = $('<div class="form-group"></div>');
    var fieldLabel = $('<label for="' + attrInfo.getId() +'">' + attrInfo.getName() + '</label>');
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
    var fieldLabel = $('<label for="' + attrInfo.getId() +'">' + attrInfo.getName() + '</label>');
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
    var fieldLabel = $('<label for="' + attrInfo.getId() +'">' + attrInfo.getName() + '</label>');
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
    var fieldLabel = $('<label for="' + attrInfo.getId() +'">' + attrInfo.getName() + '</label>');
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

////////////////////
// FormBuilder
////////////////////
class FormBuilder {

  TYPE_HIDDEN = "hidden";
  TYPE_STRING = "string";
  TYPE_PASSWORD = "password";
  TYPE_EMAIL = "email";
  TYPE_TEXT = "text";
  TYPE_CURRENCY = "currency";
  TYPE_DATETIME = "datetime";

  _handlers = [];
  _sections = [];

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
    this.registerHandler(this.TYPE_HIDDEN, new HiddenFieldHandler());
    this.registerHandler(this.TYPE_STRING, new StringFieldHandler());
    this.registerHandler(this.TYPE_PASSWORD, new PasswordFieldHandler());
    this.registerHandler(this.TYPE_EMAIL, new StringFieldHandler());
    this.registerHandler(this.TYPE_TEXT, new TextFieldHandler());
    this.registerHandler(this.TYPE_CURRENCY, new CurrencyFieldHandler());
    this.registerHandler(this.TYPE_DATETIME, new StringFieldHandler());
  }

  registerHandler(type, handler) {
    this._handlers[type] = handler;
  }

  onSubmit(event) {
    event.preventDefault();

    for (var i in event.data._sections) {
      var section = event.data._sections[i];
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

    // everything is good, let's submit
    $(this).unbind().submit();
  }

  openForm(formHeaderId) {
    this._formHeader = $('<form role="form" method="' + this.options.method + '" action="' + this.options.action + '"></form>');
    $(formHeaderId).wrap(this._formHeader);
  }

  getHandlers() {
    return this._handlers;
  }

  getHandler(type) {
    return this._handlers[type];
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
      if (type in this._handlers) {
        var handler = this._handlers[type];
        handler.appendField(boxBody, modelInfo, attrInfo);
      }
    }

    // boxFooter
    var boxFooter = $('<div class="box-footer"></div>');

    box.append(boxHeader);
    box.append(boxBody);
    box.append(boxFooter);

    $(sectionId).replaceWith(box);

    this._sections.push({'modelInfo':modelInfo, 'box':box});
  }

  closeForm(formFooterId) {
    this._formFooter = $('<input type="submit" class="btn btn-primary" value="' + this.options.buttonLabel + '">');
    $(formFooterId).replaceWith(this._formFooter);
      this._formFooter.bind('click', this, this.onSubmit);
  }
}
