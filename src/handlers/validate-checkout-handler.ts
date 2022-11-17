import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { EventBridge, eventBusName, eventSource } from "../event-bridge"
import { AWSError, EventBridge as AwsEventBridge } from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"

const checkEventSent = (result: PromiseResult<AwsEventBridge.PutEventsResponse, AWSError>) =>
    result.FailedEntryCount === undefined || result.FailedEntryCount === 0

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body = event.body || JSON.stringify({ message: "No body provided" })
    console.log("VALIDATE CHECKOUT", { body })

    const detailType = "checkoutProcessValidated"

    try {
        const result = await EventBridge.putEvents({
            Entries: [
                {
                    EventBusName: eventBusName,
                    Source: eventSource,
                    DetailType: detailType,
                    Detail: body,
                },
            ],
        }).promise()

        return checkEventSent(result)
            ? {
                  statusCode: 200,
                  body: `Event sent (${detailType}) successfully`,
              }
            : {
                  statusCode: 500,
                  body: `Failed to send ${result.FailedEntryCount} event(s) to event bus ${eventBusName}`,
              }
    } catch (error) {
        const message = `Unable to send event of type ${detailType} to event bus ${eventBusName}: ${error}`
        console.error(message)
        return {
            statusCode: 500,
            body: message,
        }
    }
}

module.exports = {
    handler,
}
