import $ from 'jquery';
class cloudHelper {
    constructor(props) {
        // super(props);
        // this.state = { 
        //     engineName : 'FPFF02' 
        // };
        this.engineName = "FPFF02";

        this.CLOUDABISSCANR_BASE_API_URL = "http://localhost:15896/";
        this.CLOUDABISSCANR_FP_CAPTURE_API_PATH = "api/CloudScanr/FPCapture";

        this.EnumCaptureMode = {
            "TemplateOnly": "TemplateOnly",
            "TemplateWithImage": "TemplateWithImage",
            "ImageOnly": "ImageOnly"
        }
        this.EnumBiometricImageFormat = {
            "WSQ": "WSQ",
            "JPEG": "JPEG",
            "TIFF": "TIFF",
            "BMP": "BMP",
            "GIF": "GIF",
            "JPEG2000": "JPEG2000",
            "PNG": "PNG"
        }
        this.EnumSingleCaptureMode = {
            "LeftFingerCapture": "LeftFingerCapture",
            "RightFingerCapture": "RightFingerCapture"
        }
        this.EnumCaptureOperationName = {
            "IDENTIFY": "IDENTIFY",
            "VERIFY": "VERIFY",
            "ENROLL": "ENROLL",
            "UPDATE": "UPDATE"
        }
        this._cloudABISScanrBaseAPI = this.CLOUDABISSCANR_BASE_API_URL;
    }
    // var engineName = "FPFF02";
    // var EnumCaptureMode = {
    //     "TemplateOnly": "TemplateOnly",
    //     "TemplateWithImage": "TemplateWithImage",
    //     "ImageOnly": "ImageOnly"
    // }


    captureBiometric(buttonName) {
        // debugger
        // var buttonName = "Register"
        // console.log(buttonName)
        document.getElementById('templateXML').value = '';
        document.getElementById('serverResult').style.display = 'none';
        document.getElementById('serverResult').innerHTML = '';

        var deviceName = this.getCookieValue("CSDeviceName");
        var templateFormat = this.getCookieValue("CSTempalteFormat");
        this.engineName = this.getCookieValue("CABEngineName");
        // document.getElementById('lblCurrentDeviceName').innerHTML = 'Current Device Name: ' + deviceName;

        var apiPath = "http://localhost:15896/";

        //Init CloudABIS Scanr
        this.CloudABISScanrInit(apiPath);
        var captureType = "SingleCapture";
        var quickScan = "Disable";

        if (this.engineName === "FPFF02") {
            // console.log(captureType);
            this.FingerPrintCapture(deviceName, quickScan, templateFormat, captureType, this.EnumCaptureMode.TemplateOnly, this.EnumBiometricImageFormat.WSQ,
                this.EnumSingleCaptureMode.LeftFingerCapture, 180.0, this.EnumCaptureOperationName.ENROLL, this.CaptureResult, buttonName);
        }

    }

    getCookieValue(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /*
    * Hnadle capture data
    */
    CaptureResult(captureResponse, buttonName) {

        //debugger
        document.getElementById('serverResult').style.display = 'block';
        if (captureResponse.CloudScanrStatus != null && captureResponse.CloudScanrStatus.Success) {

            if (captureResponse.TemplateData != null && captureResponse.TemplateData.length > 0) {
                var connect = new cloudHelper();
                // document.getElementById('templateXML').value = connect.PHPEncodeHTML(captureResponse.TemplateData);
                localStorage.setItem('templateXML', connect.PHPEncodeHTML(captureResponse.TemplateData))
            }
            else if (this.engineName === 'IRIS01' && captureResponse.BioImageData != null && captureResponse.BioImageData.length > 0) {
                document.getElementById('templateXML').value = captureResponse.BioImageData;
            }
            else {
                document.getElementById('lblTemplate').style.display = 'none';
            }
            document.getElementById('serverResult').innerHTML = "Capture success. Please click on " + buttonName + " button";
        }
        else if (captureResponse.CloudScanrStatus != null) {
            document.getElementById('serverResult').innerHTML = captureResponse.CloudScanrStatus.Message;
        } else {
            document.getElementById('serverResult').innerHTML = captureResponse;
        }
    }



    CloudABISScanrInit(cloudABISScanrBaseAPI) {
        this._cloudABISScanrBaseAPI = cloudABISScanrBaseAPI;
    }

    FingerPrintCapture(deviceName, quickScan, templateFormat, captureType, captureMode, bioMetricImageFormat, singleCaptureMode, captureTimeout, captureOperationName, callback, buttonName) {
        var url = this._cloudABISScanrBaseAPI + this.CLOUDABISSCANR_FP_CAPTURE_API_PATH;


        $.support.cors = true;
        $.ajax({
            crossDomain: true,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: url,
            async: true,
            data: JSON.stringify({
                "DeviceName": deviceName,
                "TemplateFormat": templateFormat, "QuickScan": quickScan, "CaptureType": captureType, "CaptureMode": captureMode, "BioMetricImageFormat": bioMetricImageFormat,
                "SingleCaptureMode": singleCaptureMode, "CaptureTimeOut": captureTimeout, "CaptureOperationName": captureOperationName

            }),
            success: function (ret) {
                var res = JSON.parse(JSON.stringify(ret));
                // console.log(res)
                callback(res, buttonName);
            },
            error: function (xhr, status, error) {
                callback('CloudABIS-Scanr may not installed or may not started. Please check and try again.');

            }
        });


    }

    PHPEncodeHTML(biometircXMLData) {
        return biometircXMLData.replace(/</g, '&lt')
            .replace(/ /g, '%20')
            .replace(/"/g, '%5C&quot')
            .replace(/>/g, '&gt');
    }
}
export default cloudHelper;