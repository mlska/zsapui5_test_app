sap.ui.define(["sap/ui/core/mvc/Controller"], function (BaseController) {
  "use strict";

  return BaseController.extend("zscarrapp.controller.App", {
    onInit() {
      this.getScarrData();
    },
    getScarrData: function () {
      var oScarrModel = this.getOwnerComponent().getModel("scarr");
      oScarrModel.read("/scarrSet", {
        success: function (oData) {
          // console.log("data fetched");
        },
        error: function (oData) {
          console.warn(oData);
        },
      });
    },
  });
});
