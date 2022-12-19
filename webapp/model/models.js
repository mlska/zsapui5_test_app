sap.ui.define(
  [
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/Device",
  ],
  /**
   * provide app-view type models (as in the first "V" in MVVC)
   *
   * @param {typeof sap.ui.model.json.JSONModel} JSONModel
   * @param {typeof sap.ui.Device} Device
   *
   * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
   */
  function (JSONModel, ODataModel, Device) {
    "use strict";

    return {
      createDeviceModel: function () {
        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode("OneWay");
        return oModel;
      },
      createODataModel: function () {
        var oModel = new ODataModel("/sap/opu/odata/SAP/ZSCARR_APP_SRV", false);
        oModel.setDefaultBindingMode("TwoWay");
        return oModel;
      },
      createJSONModel: function () {
        var oModel = new JSONModel();
        return oModel;
      },
    };
  }
);
