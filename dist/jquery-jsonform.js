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
    fieldGroup.append(fieldLabel).trigger("create");
    var fieldInput = $('<input type="text" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">') 
    fieldGroup.append(fieldInput).trigger("create");
    boxBody.append(fieldGroup).trigger("create");
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
    fieldGroup.append(fieldLabel).trigger("create");
    var fieldInputGroup = $('<div class="input-group"></div>');
    var fieldIcon = $('<div class="input-group-addon"><i class="fa fa-dollar"></i></div>');
    fieldInputGroup.append(fieldIcon).trigger("create");
    var fieldInput = $('<input type="text" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">') 
    fieldInputGroup.append(fieldInput).trigger("create");
    fieldGroup.append(fieldInputGroup).trigger("create");
    boxBody.append(fieldGroup).trigger("create");
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
    fieldGroup.append(fieldLabel).trigger("create");
    var fieldInput = $('<textarea class="form-control" rows="3" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder=""></textarea>') 
    fieldGroup.append(fieldInput).trigger("create");
    boxBody.append(fieldGroup).trigger("create");
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
    fieldGroup.append(fieldLabel).trigger("create");
    var fieldInput = $('<input type="password" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" placeholder="">') 
    fieldGroup.append(fieldInput).trigger("create");
    boxBody.append(fieldGroup).trigger("create");
  }
  validate(modelInfo, attrInfo) {
    // TODO - do validation on min, max ...etc
    return true;
  }
}

class HiddenFieldHandler {
  appendField(boxBody, modelInfo, attrInfo) {
    var fieldInput = $('<input type="hidden" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">') 
    boxBody.append(fieldInput).trigger("create");
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

  handlers = [];

  register(type, handler) {
    this.handlers[type] = handler;
  }

  constructor(method, action, buttonLabel,  formId, modelInfoJSON, options) {
    this.method = method;
    this.action = action;
    this.formId = formId;
    this.buttonLabel = buttonLabel;
    this.modelInfo = new ModelInfo(modelInfoJSON);
    this.options = options;

    // register handles
    this.register(this.TYPE_HIDDEN, new HiddenFieldHandler());
    this.register(this.TYPE_STRING, new StringFieldHandler());
    this.register(this.TYPE_PASSWORD, new PasswordFieldHandler());
    this.register(this.TYPE_EMAIL, new StringFieldHandler());
    this.register(this.TYPE_TEXT, new TextFieldHandler());
    this.register(this.TYPE_CURRENCY, new CurrencyFieldHandler());
    this.register(this.TYPE_DATETIME, new StringFieldHandler());
  }

  onSubmit(event) {
    event.preventDefault();

    var attrInfoList = event.data.modelInfo.getAttrInfoList();
    for (var i in attrInfoList) {
      var attrInfo = attrInfoList[i];
      var type = attrInfo.getType();
      if (type in event.data.handlers) {
        var handler = event.data.handlers[type];
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
      boxHeader.append(title).trigger("create");

      // boxBody
      var boxBody = $('<div class="box-body"></div>');
      var attrInfoList = this.modelInfo.getAttrInfoList();
      for (var i in attrInfoList) {
        var attrInfo = attrInfoList[i];
        var type = attrInfo.getType();
        if (type in this.handlers) {
          var handler = this.handlers[type];
          handler.appendField(boxBody, this.modelInfo, attrInfo);
        }
      }

      // boxFooter
      var boxFooter = $('<div class="box-footer"></div>');
      var submitButton = $('<input type="submit" class="btn btn-primary" value="' + this.buttonLabel + '">');
      boxFooter.append(submitButton);

      form.bind('submit', this, this.onSubmit);

      form.append(boxHeader).trigger("create");
      form.append(boxBody).trigger("create");
      form.append(boxFooter).trigger("create");
      $(this.formId).replaceWith(form);
  }
}
