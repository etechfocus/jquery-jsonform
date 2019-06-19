export class StringField {

	appendField(boxBody, modelInfo, attrInfo) {
		const fieldGroup = $('<div class="form-group"></div>');
		const fieldLabel = $('<label for="' + attrInfo.getId() + '">' + attrInfo.getName() + '</label>');
		fieldGroup.append(fieldLabel);
		const fieldInput = $('<input type="text" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">');
		fieldGroup.append(fieldInput);
		boxBody.append(fieldGroup);
	}

	validate(modelInfo, attrInfo) {
		// TODO - do validation on min, max ...etc
		return true;
	}

}
