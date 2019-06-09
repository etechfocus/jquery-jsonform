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
class TextFieldHandler {
  getField(modelInfo, attrInfo) {
    return $('<input type="text" class="form-control" id="' + attrInfo.getId() + '" placeholder="">') 
  }
}

class PasswordFieldHandler {
  getField(modelInfo, attrInfo) {
    return $('<input type="password" class="form-control" id="' + attrInfo.getId() + '" placeholder="">') 
  }
}

////////////////////
// FormBuilder
////////////////////
class FormBuilder {

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

  constructor() {
    this.register(this.TYPE_STRING, new TextFieldHandler());
    this.register(this.TYPE_PASSWORD, new PasswordFieldHandler());
    this.register(this.TYPE_EMAIL, new TextFieldHandler());
    this.register(this.TYPE_TEXT, new TextFieldHandler());
    this.register(this.TYPE_CURRENCY, new TextFieldHandler());
    this.register(this.TYPE_DATETIME, new TextFieldHandler());
  }

  build(action, formId, modelInfoJSON) {
      var modelInfo = new ModelInfo(modelInfoJSON);

      var form = $('<form role="form" action="' + action + '"></form>');

      // boxHeader
      var boxHeader = $('<div class="box-header"></div>');
      var title = $('<div>' + modelInfo.getName() + '</div>');
      boxHeader.append(title);

      // boxBody
      var boxBody = $('<div class="box-body"></div>');
      var attrInfoList = modelInfo.getAttrInfoList();
      for (var i in attrInfoList) {
        var attrInfo = attrInfoList[i];
        var fieldGroup = $('<div class="form-group"></div>');
        var fieldLabel = $('<label for="' + attrInfo.getId() +'">' + attrInfo.getName() + '</label>');
        fieldGroup.append(fieldLabel);
        var handler = this.handlers[attrInfo.getType()];
        var fieldInput = handler.getField(modelInfo, attrInfo);
        fieldGroup.append(fieldInput);
        boxBody.append(fieldGroup);
      }

      // boxFooter
      var boxFooter = $('<div class="box-footer"></div>');
      var submitButton = $('<button type="submit" class="btn btn-primary">Add</button>');
      boxFooter.append(submitButton);

      form.append(boxHeader);
      form.append(boxBody);
      form.append(boxFooter);
      $(formId).replaceWith(form);
  }
}
