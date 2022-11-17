// https://github.com/getndazn/dazn-lambda-powertools/blob/master/packages/lambda-powertools-eventbridge-client/index.js

process.env.AWS_NODEJS_CONNECTION_REUSE_ENABLED = "1"
import AwsEventBridge from "aws-sdk/clients/eventbridge"

export const eventBusName = "new-relic-aws-lambda-event-bus-dev"
export const eventSource = "new-relic-aws-lambda-src"

const client = new AwsEventBridge()

export const EventBridge: AwsEventBridge = client
