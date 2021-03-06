#!/usr/bin/env bash
PROFILE="default"
REGION=$(aws configure get region)
PREAMBLE="--profile ${PROFILE} --region ${REGION}"

RESTAPI_ID=$(aws apigateway get-rest-apis ${PREAMBLE} | jq '.items | .[] | select(.name == "dev-ece465-final-bloodbank") | .id' | tr -d '"')
STAGE_NAME=$(aws apigateway get-stages ${PREAMBLE} --rest-api-id ${RESTAPI_ID} | jq '.item | .[0] | .stageName' | tr -d '"')
curl -X POST https://${RESTAPI_ID}.execute-api.${REGION}.amazonaws.com/${STAGE_NAME}/user/donate --data '{"donorName": "Kevin Jiang", "donorID": "3ea0dfe0-b1cb-11eb-9cf7-990de6edfc99", "donorAge": "21", "bloodGroup": "O-", "hospitalID": "0eb0ad30-b1ec-11eb-9244-47b748e5719d", "hospitalName": "Port Authority Midtown Donor Center", "area": "Manhattan", "phone": "6462205740"}'