<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use cloudabis_sdk\ApiManager\CloudABISAPI;
use cloudabis_sdk\Utilities\CloudABISConstant;
use cloudabis_sdk\Models\CloudABISBiometricRequest;
use cloudabis_sdk\Models\EnumOperationName;
use cloudabis_sdk\Utilities\CloudABISResponseParser;

class CloudABISConnectorController extends Controller
{

    private $_appkey = "";
    private $_secretKey = "";
    private $_apiBaseUrl = "";
    private $_customerKey = "";
    private $_engineName = "";

    public function __construct($appKey, $secretKey, $apiBaseUrl, $customerKey, $engineName)
    {
        $this->_appkey = $appKey;
        $this->_secretKey = $secretKey;
        $this->_apiBaseUrl = $apiBaseUrl;
        $this->_customerKey = $customerKey;
        $this->_engineName = $engineName;

        if (is_null($this->_apiBaseUrl) || $this->_apiBaseUrl == "") {
            throw new Exception("Please provide the api base url.");
        }

        if (substr($this->_apiBaseUrl, -1) != "/") {
            $this->_apiBaseUrl = $this->_apiBaseUrl . "/";
        }

    }

    public function GetCloudABISToken()
    {
        $cloudABISAPI = new CloudABISAPI($this->_appkey, $this->_secretKey, $this->_apiBaseUrl);
        return $cloudABISAPI->GetToken();
    }

    public function Register($template, $registrationid, $token, $format)
    {
        $afterFormatTemplateXML = $this->FormatTemplateXML($template);

        $biometricRequest = new CloudABISBiometricRequest();
        $biometricRequest->RegistrationID = $registrationid;
        $biometricRequest->BiometricXml = $afterFormatTemplateXML;
        $biometricRequest->CustomerKey = $this->_customerKey;
        $biometricRequest->EngineName = $this->_engineName;
        $biometricRequest->Format = $format;
        $biometricRequest->Token = $token;

        $cloudABISAPI = new CloudABISAPI($this->_appkey, $this->_secretKey, $this->_apiBaseUrl);
        $matchingResponse = $cloudABISAPI->Register($biometricRequest);
        $matchingResponse = json_decode($matchingResponse);
        //var_dump($matchingResponse);
        if ($matchingResponse != null){
            if ($matchingResponse->OperationName == EnumOperationName::Register && $matchingResponse->OperationResult == 'SUCCESS') {
                return response()->json([
                    "success"=>true,
                    "message" => 'Registration successful',
                ],200);
            } elseif ($matchingResponse->OperationName == EnumOperationName::IsRegistered && $matchingResponse->OperationResult == CloudABISConstant::YES) {
                return response()->json([
                    "success"=>false,
                    "message" => CloudABISConstant::YES_MESSAGE,
                ],200);
            } else {
                return response()->json([
                    "success"=>false,
                    "message" => CloudABISResponseParser::GetResponseMessage($matchingResponse->OperationResult),
                ],200);
            }
        }
        else{
            return response()->json([
                "success"=>false,
                "message" => "Error registering thumbprint, please try again",
            ],200);
            // var_dump('Error registering thumbprint, please try again');
        }
    }

    public function Verify($template, $matric_no, $token, $format){
        $afterFormatTemplateXML = $this->FormatTemplateXML($template);

        $biometricRequest = new CloudABISBiometricRequest();
        $biometricRequest->RegistrationID = $matric_no;
        $biometricRequest->BiometricXml = $afterFormatTemplateXML;
        $biometricRequest->CustomerKey = $this->_customerKey;
        $biometricRequest->EngineName = $this->_engineName;
        $biometricRequest->Format = $format;
        $biometricRequest->Token = $token;

        $cloudABISAPI = new CloudABISAPI($this->_appkey, $this->_secretKey, $this->_apiBaseUrl);
        $matchingResponse = $cloudABISAPI->Verify($biometricRequest);
        $matchingResponse = json_decode($matchingResponse);
        // return $matchingResponse;
        if ($matchingResponse != null){
            if($matchingResponse->OperationResult == "VS"){
                return [
                    'status'=>true,
                    'data'=>$matchingResponse->BestResult,
                    'message'=>CloudABISResponseParser::GetResponseMessage($matchingResponse->OperationResult)
                ];
            }else{
                return [
                    'status'=>false,
                    'message'=>CloudABISResponseParser::GetResponseMessage($matchingResponse->OperationResult)
                ];
            }
        } else{
            return CloudABISResponseParser::GetErrorMessage($matchingResponse[0]);
        }

    }

    public function FormatTemplateXML($template){
        $templateXML = str_replace('&lt', '<', $template);
        $templateXML = str_replace('%20', ' ', $templateXML);
        $templateXML = str_replace('%5C&quot', '\"', $templateXML);
        $templateXML = str_replace('&gt', '>', $templateXML);

        return $templateXML;
    }
}
