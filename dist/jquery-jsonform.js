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

  register(type, handler) {
    FormBuilder.handlers[type] = handler;
  }

  constructor(method, action, buttonLabel,  formId, modelInfoJSON, options) {
    this.method = method;
    this.action = action;
    this.formId = formId;
    this.buttonLabel = buttonLabel;
    this.modelInfo = new ModelInfo(modelInfoJSON);
    this.options = options;

    // register handles
    this.register(FormBuilder.TYPE_HIDDEN, new HiddenFieldHandler());
    this.register(FormBuilder.TYPE_STRING, new StringFieldHandler());
    this.register(FormBuilder.TYPE_PASSWORD, new PasswordFieldHandler());
    this.register(FormBuilder.TYPE_EMAIL, new StringFieldHandler());
    this.register(FormBuilder.TYPE_TEXT, new TextFieldHandler());
    this.register(FormBuilder.TYPE_CURRENCY, new CurrencyFieldHandler());
    this.register(FormBuilder.TYPE_DATETIME, new StringFieldHandler());
  }

  onSubmit(event) {
    event.preventDefault();

    var attrInfoList = event.data.modelInfo.getAttrInfoList();
    for (var i in attrInfoList) {
      var attrInfo = attrInfoList[i];
      var type = attrInfo.getType();
      if (type in FormBuilder.handlers) {
        var handler = FormBuilder.handlers[type];
        var isValid = handler.validate(event.data.modelInfo, attrInfo);
        if (!isValid) {
          // TODO - display error
          return false; 
        }
      }
    }

    // everything is good, let's submit
    $(this).unbind().submit();
  }

  build() {
      var form = $('<form role="form" method="' + this.method + '" action="' + this.action + '"></form>');

      // boxHeader
      var boxHeader = $('<div class="box-header"></div>');
      var title = $('<div>' + this.modelInfo.getName() + '</div>');
      boxHeader.append(title);

      // boxBody
      var boxBody = $('<div class="box-body"></div>');
      var attrInfoList = this.modelInfo.getAttrInfoList();
      for (var i in attrInfoList) {
        var attrInfo = attrInfoList[i];
        var type = attrInfo.getType();
        if (type in FormBuilder.handlers) {
          var handler = FormBuilder.handlers[type];
          handler.appendField(boxBody, this.modelInfo, attrInfo);
        }
      }

      // boxFooter
      var boxFooter = $('<div class="box-footer"></div>');
      var submitButton = $('<input type="submit" class="btn btn-primary" value="' + this.buttonLabel + '">');
      boxFooter.append(submitButton);

      form.bind('submit', this, this.onSubmit);

      form.append(boxHeader);
      form.append(boxBody);
      form.append(boxFooter);
      $(this.formId).replaceWith(form);
  }
}

FormBuilder.TYPE_HIDDEN = "hidden";
FormBuilder.TYPE_STRING = "string";
FormBuilder.TYPE_PASSWORD = "password";
FormBuilder.TYPE_EMAIL = "email";
FormBuilder.TYPE_TEXT = "text";
FormBuilder.TYPE_CURRENCY = "currency";
FormBuilder.TYPE_DATETIME = "datetime";

FormBuilder.handlers = [];

