export class HiddenFieldHandler {

	appendField(boxBody, modelInfo, attrInfo) {
		const fieldInput = $('<input type="hidden" class="form-control" name="' + attrInfo.getId() + '" id="' + attrInfo.getId() + '" value="' + attrInfo.getValue() + '" placeholder="">');
		boxBody.append(fieldInput);
	}

	validate(modelInfo, attrInfo) {
		return true;
	}
}
