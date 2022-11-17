import { EventBridgeEvent } from "aws-lambda"

type Event = EventBridgeEvent<"checkoutProcessValidated", unknown>

const handler = async (event: Event) => {
    const eventBody = { detailType: event["detail-type"], detail: event.detail, source: event.source }
    console.log("START CHECKOUT", { eventBody })
}

module.exports = {
    handler,
}
