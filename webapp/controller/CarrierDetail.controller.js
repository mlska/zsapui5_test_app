sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  function (Controller, History) {
    "use strict";

    return Controller.extend("zscarrapp.controller.CarrierDetail", {
      onInit: function () {
        this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this._oRouter.attachRouteMatched(this.onRouteMatched, this);
      },
      onNavBack: function () {
        var oHistory = History.getInstance();
        var sPreviousPath = oHistory.getPreviousHash();

        if (sPreviousPath !== undefined) {
          window.history.go(-1);
        } else {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("main", true);
        }
      },
      onRouteMatched: function () {
        var sCarrier = this.getCarrierID();
        var isValid = this.checkRoute(sCarrier); //called when routed to view
        if (isValid) {
          this.getCarrierFlights();
          this.getCurrentCarrierInfo();
        }
      },
      getCurrentCarrierInfo: function () {
        var sCarrier = this.getCarrierID();
        // var sPath = "/scarrSet('" + sCarrier + "')";
        // var oCarrierData = this.getOwnerComponent()
        //   .getModel("scarr")
        //   .getProperty(sPath);
        // var oCarrierDetailModel =
        //   this.getOwnerComponent().getModel("carrierDetail");
        // oCarrierDetailModel.setData(oCarrierData);
        var oScarrModel = this.getOwnerComponent().getModel("scarr");
        oScarrModel.read("/scarrSet('" + sCarrier + "')", {
          success: function (oData) {
            var oCarrierDetailModel =
              this.getOwnerComponent().getModel("carrierDetail");
            oCarrierDetailModel.setData(oData);
          }.bind(this),
          error: function (oData) {
            console.warn(oData);
          },
        });
      },
      getCarrierFlights: function () {
        var sCarrier = this.getCarrierID();
        // var oCarrierFilter = new sap.ui.model.Filter(
        //   "Carrid",
        //   sap.ui.model.FilterOperator.EQ,
        //   sCarrier
        // );
        // var aFilters = [];
        // aFilters.push(oCarrierFilter);
        var oSflightModel = this.getOwnerComponent().getModel("sflight");
        oSflightModel.read(
          "/scarrSet('" + sCarrier + "')" + "/scarr_to_sflight",
          {
            //filters: [aFilters],
            success: function (oData) {
              //oData parsed to JSON and bind to table
              console.log(oData);
              var convertedOData = oData.results.map(function (result) {
                result.Fldate = result.Fldate.toLocaleString();
                return result;
              });
              var oTable = this.getView().byId("idSflightTable");
              var oJSONModel = new sap.ui.model.json.JSONModel();
              oJSONModel.setData(convertedOData); //results because of nested data in model
              oTable.setModel(oJSONModel);
            }.bind(this),
            error: function (oData) {
              console.warn(oData);
            },
          }
        );
      },
      checkRoute: function (sPath) {
        var regex = /^[A-Z]{2}$/; //check if url ends with Carrid (Two capital letters)
        return regex.test(sPath);
      },
      getCarrierID: function () {
        return window.location.href.slice(-2);
      },
    });
  }
);
