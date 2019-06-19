export class CurrencyField {
	appendField(boxBody, modelInfo, attrInfo) {
		const fieldGroup = $('<div class="form-group"></div>');
		const fieldLabel = $('<label for="' + attrInfo.getId() + '">' + attrInfo.getName() + '</label>');
		fieldGroup.append(fieldLabel);
		const fieldInputGroup = $('<div class="input-group"></div>');
		const fieldIcon = $('<div class="input-group-addon"><i class="fa fa-dollar"></i></div>');
		fieldInputGroup.append(fieldIcon);
		const fieldInput = $('<input type="text" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">');
		fieldInputGroup.append(fieldInput);
		fieldGroup.append(fieldInputGroup);
		boxBody.append(fieldGroup);
	}

	validate(modelInfo, attrInfo) {
		// TODO - do validation on min, max ...etc
		return true;
	}

}
