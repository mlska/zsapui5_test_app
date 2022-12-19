sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("zscarrapp.controller.Main", {
      onInit: function () {
        this.updateTableWithScarrData();
      },
      onPressItem: function (oEvent) {
        var oRowData = this.getSelectedRowData(oEvent);

        var oCarrierDetailModel =
          this.getOwnerComponent().getModel("carrierDetail");
        oCarrierDetailModel.setData(oRowData);

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("carrierdetail", {
          carrid: oRowData.Carrid,
        });
      },
      updateTableWithScarrData: function () {
        var oScarrModel = this.getOwnerComponent().getModel("scarr");
        oScarrModel.read("/scarrSet", {
          success: function (oData) {
            //oData parsed to JSON and bind to table
            var oTable = this.getView().byId("idScarrTable");
            var oJSONModel = new sap.ui.model.json.JSONModel();
            oJSONModel.setData(oData.results); //results because of nested data in model
            oTable.setModel(oJSONModel);
          }.bind(this),
          error: function (oData) {
            console.warn(oData);
          },
        });
      },
      getSelectedRowData: function (oEvent) {
        //Get data of selected object (for table)
        var path = oEvent
          .getParameter("listItem")
          .getBindingContext()
          .getPath();
        var selectedRow = this.byId("idScarrTable")
          .getModel()
          .getProperty(path);
        return selectedRow;
      },
    });
  }
);
